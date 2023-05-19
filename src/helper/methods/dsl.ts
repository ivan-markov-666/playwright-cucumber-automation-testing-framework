/**
 * @description Dsl class is a wrapper class for playwright methods.
 *              It contains the methods that are used to perform actions on the browser.
 */

// Import required packages.
import { Page, BrowserContext, expect } from '@playwright/test';
import Assert from './assert';
import {
  catchErrorMessage,
  messages,
  errorMessage,
  alertMessage,
} from './other';
import { elementTimeOut } from '../../config/configuration';

// Define the wrapper class for playwright methods.
export default class Dsl {
  // Define the constructor for the wrapper class.
  constructor(private page: Page, private context: BrowserContext) {}

  // Define the assert class.
  assert = new Assert(this.page);

  /**
   * @description         This method is used to set screen size.
   * @param widthSize     Provide the width size of the screen.
   * @param heightSize    Provide the height size of the screen.
   * @usage               await dsl.screenSize({number}, {number});
   * @example             await dsl.screenSize(1920, 1080);
   */
  async screenSize(widthSize: number, heightSize: number) {
    try {
      if (widthSize > 0 || heightSize > 0) {
        // Change the screen size.
        await this.page.setViewportSize({
          width: widthSize,
          height: heightSize,
        });
        // Log the message.
        messages(
          `The screen size was set to: ${widthSize} width and ${heightSize} height.`,
        );
      }
      // If the numbers are negative or it is 0.
      else if (widthSize <= 0 || heightSize <= 0) {
        errorMessage(
          'You entered a negative value. Please enter a positive integer value.',
        );
      }
      // If the numbers are not an integer.
      else if (!Number.isInteger(widthSize) || !Number.isInteger(heightSize)) {
        errorMessage('You need to enter an integer value.');
      }
      // Everything else...
      else {
        errorMessage(
          'You entered an invalid value. Please provide a positive integer number for two parameters.',
        );
      }
    } catch (error) {
      // Catch the error message.
      catchErrorMessage('screenSize', 'dsl.ts', error);
    }
  }

  /**
   * @description         This method is used to get the page title.
   * @param url           Provide the url of the page.
   * @usage               await dsl.navigateTo({string});
   * @example             await dsl.navigateTo('https://www.google.com/');
   */
  async navigateTo(url: string) {
    try {
      // Navigate to the url.
      await this.page.goto(url, {
        // Wait for the page to load.
        waitUntil: 'domcontentloaded',
      });
      // Assert the url.
      await this.assert.assertURL(url);
      // Log the message.
      messages(`Navigated to: ${url}`);
      messages(`Waiting until 'domcontentloaded'`);
      messages(`Verify the url.`);
    } catch (error) {
      catchErrorMessage('navigateTo', 'dsl.ts', error);
    }
  }

  /**
   * @description     This method is used to navigate to a specific URL.
   * @param verifyUrl Provide the expected url of the page.
   * @usage           await dsl.goto('https://www.google.com/');
   * @example         await dsl.goto('https://www.google.com/');
   */
  async goBack(verifyUrl: string) {
    try {
      // Navigate back to the previous URL.
      await this.page.goBack();
      // Validate that the page is loaded the correct URL.
      try {
        // Verify that the browser loads the correct URL.
        await expect(this.page).toHaveURL(verifyUrl);
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          'goBack',
          'dsl.ts',
          `It seems that the expected URL does not match the actual URL. \n ${error}`,
        );
      }
      // Log the message.
      messages(`The user was navigated back to: ${this.page.url()}}`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('goBack', 'dsl.ts', error);
    }
  }

  /**
   * @description       This method is used to navigate forward.
   * @param verifyUrl   Optional. Provide the URL (string) you want to verify that the user was redirected forward.
   * @usage             await dsl.goForword({string});
   * @example           await dsl.goForword('https://www.example.com');
   */
  async goForward(verifyUrl?: string) {
    try {
      // Navigate to the forward URL.
      await this.page.goForward({
        // Wait until the page is loaded.
        waitUntil: 'domcontentloaded',
      });
      // Verify that the browser loads the correct URL.
      if (verifyUrl) {
        // Validate that the page is loaded the correct URL.
        try {
          await expect(this.page).toHaveURL(verifyUrl);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            'goForward',
            'dsl.ts',
            `It seems that the expected URL does not match the actual URL. \n ${error}`,
          );
        }
      }
      // Log the message.
      messages(
        `The user was redirected to the forwarded URL address: ${this.page.url()}`,
      );
    } catch (error) {
      // Catch the error message.
      catchErrorMessage('goForword', 'dsl.ts', error);
    }
  }

  /**
   * @description                           This method opens a new browser window after clicking on a specific element.
   * @param locatorForcesOpeningNewWindow   Provide the locator of the element that forces opening a new browser window.
   * @param verifyLocatorOrElement          Optional. Provide the locator or element that you want to verify that loads in the new browser window.
   * @returns                               Returns the new browser window.
   * @usage                                 await dsl.openNewBrowserWindowAfterClick({locator}, {locator or element});
   * @example                               await dsl.openNewBrowserWindowAfterClick('a', 'h1');
   */
  async openNewBrowserWindowAfterClick(
    locatorForcesOpeningNewWindow: any,
    verifyLocatorOrElement?: any,
  ) {
    try {
      // Get a page after a specific action (e.g. clicking a link).
      const [newPage] = await Promise.all([
        // Wait for a specific event to happen. In this case, we are waiting for the browser to open a new window.
        this.context.waitForEvent('page'),
        // Click over an element to force open the new browser window.
        this.click(locatorForcesOpeningNewWindow),
      ]);
      // Wait until the opening of the new browser window happens.
      await newPage.waitForLoadState();
      // If the parameter "verifyLocatorOrElement" is provided - verify if the verification element loads in the new (switched) browser window.
      if (verifyLocatorOrElement != null) {
        await this.element(await newPage.locator(verifyLocatorOrElement));
      }
      // Log the message.
      messages(`The browser window was switched.`);
      // Return the switched browser focus as an object.
      return newPage;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('openNewBrowserWindowAfterClick', 'dsl.ts', error);
    }
  }

  /**
   * @description               This method is used to select an element.
   *                            It can be used to select an element by locator or by element.
   *                            It can also be used to select an element with a timeout period.
   * @param locatorOrElement    Provide the locator (string) or element (object) of the element.
   * @param timeoutPeriod       Optional. Provide the timeout period (number) for the element.
   * @returns                   Returns the element.
   *                            It can be 'string' or 'object'.
   *                            It can be used to perform actions on the element.
   * @usage                     await dsl.element({string}, {number});
   * @example                   await dsl.element('#id', 3000).sendKeys('text');
   * @example                   await dsl.element('//button[@id="submit"]', 3000).click();
   * @example                   let elementName: any = page.locator("#id");
   *                            await dsl.element(elementName, 10000).click();
   */
  async element(locatorOrElement: any, timeoutPeriod?: number) {
    try {
      let element: any; // Declare an internal variable for assigning the element value.
      // If the provided value is a string, this is just a selector.
      if (typeof locatorOrElement === 'string') {
        // We need to transform this selector into an element.
        element = this.page.locator(locatorOrElement);
      }
      // If the provided value is an object, this is the whole element.
      else if (
        typeof locatorOrElement === 'object' ||
        locatorOrElement instanceof Object
      ) {
        // So we don't need to do anything else unique.
        element = locatorOrElement;
      }
      // If the provided value is not a string or an object, this is not supported.
      else {
        errorMessage(
          'You have entered a not supported data type for selecting an element. Please provide a locator (string) or element (object).',
        );
      }

      // Validate that the element is present in the DOM tree.
      try {
        // Wait for the element to be visible.
        await element.waitFor({ state: 'visible', timeout: timeoutPeriod });
        // Verify that the element is visible.
        await expect(element).toBeVisible({
          timeout: timeoutPeriod,
        });
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `element`,
          `The element is not visible in the page. Maybe you have problem with the locator, please see your locator. \n ${error}`,
        );
      }

      // Validate that the element is the only one in the DOM tree.
      try {
        // Verify that the element is the only one in the DOM tree.
        await expect(element).toHaveCount(1, {
          timeout: timeoutPeriod,
        });
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `element`,
          `The element is not the only one in the DOM tree. You need to provide locator that selects only one element. \n ${error}`,
        );
      }

      // Validate that the element is focused.
      try {
        // Focus on the element.
        await element.focus();
        // Verify that the element is focused.
        await expect(element).toBeFocused();
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `element`,
          `The element is not focused. \n ${error}`,
        );
      }

      // Validate that the element is not hidden.
      try {
        // Verify that the element is not hidden.
        await expect(element).not.toBeHidden({
          timeout: timeoutPeriod,
        });
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `element`,
          `The element is hidden. \n ${error}`,
        );
      }

      // Validate that the element is not disabled.
      try {
        // Verify that the element is enabled.
        await expect(element).toBeEnabled({
          timeout: timeoutPeriod,
        });
        // Verify that the element is not disabled.
        await expect(element).not.toBeDisabled({
          timeout: timeoutPeriod,
        });
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `element`,
          `The element is disabled. \n ${error}`,
        );
      }
      // Add the information message.
      if (timeoutPeriod == null) {
        messages(`The element was selected.`);
      } else {
        // Log the message.
        messages(
          `The element was selected. Timeout was set to: ${timeoutPeriod} milliseconds.`,
        );
      }
      // Return the selected element.
      return element;
    } catch (error) {
      // Catch the error message.
      catchErrorMessage('element', 'dsl.ts', error);
    }
  }

  /**
   * @description                   This method is used to navigate to a specific URL.
   * @param locatorOrElement        Provide the locator or the element that is used to verify if the page is loaded.
   * @param attributeName           Provide the attribute name that is used to verify if the page is loaded.
   * @param expectedAttributeValue  Optional. Provide the expected attribute value that is used to verify if the page is loaded.
   * @returns                       Return the attribute value.
   * @usage                         await dsl.goto({string}, {string}, {string});
   * @example                       await dsl.goto('h1', 'class', 'heading');
   */
  async getAttribute(
    locatorOrElement: string,
    attributeName: string,
    expectedAttributeValue?: string,
  ) {
    try {
      // Assign the element to a variable.
      const element = await this.element(
        locatorOrElement,
        elementTimeOut.timeout,
      );
      // Get the attribute value from the element.
      const attributeValue = await element.getAttribute(attributeName);
      // If the expected attribute value parameter is provided - verify that the inspected attribute value is correct.
      if (expectedAttributeValue != null) {
        // Verify that the attribute value is correct.
        try {
          expect(await attributeValue).toEqual(expectedAttributeValue);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `getAttribute`,
            `The attribute value is not correct. \n ${error}`,
          );
        }
      }
      // Log the message.
      messages(`The attribute value is: ${attributeValue}`);
      // Return the attribute value.
      return attributeValue;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('getAttribute', 'dsl.ts', error);
    }
  }

  /**
   * @description             This method is used to get the inner text of an element.
   * @param locatorOrElement  Provide the locator or the element that will be used to get the inner text.
   * @param expectedTextValue Optional. Provide the expected text value that will be used to verify if the inner text is correct.
   * @returns                 Return the inner text of the element.
   * @usage                   await dsl.getInnerText({string}, {string});
   * @example                 await dsl.getInnerText('h1', 'heading');
   */
  async getInnerText(locatorOrElement: any, expectedTextValue?: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorOrElement, elementTimeOut.timeout);
      // Get the text of an inspected element and assign it to a variable.
      const elementTextValue = (await locatorOrElement.innerText()).valueOf();
      // Make a verification. If there is provided string for the expected value parameter - assert to verify that the inspected element contains the exact text.
      if (expectedTextValue != null) {
        try {
          expect(elementTextValue).toEqual(expectedTextValue);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `getInnerText`,
            `The expected value is not the same like actual one. \n ${error}`,
          );
        }
      }
      // Log the message.
      messages(`The text value is: ${elementTextValue}`);
      // Return the text value.
      return elementTextValue;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('getInnerText', 'dsl.ts', error);
    }
  }

  /**
   * @description             This method is used to get the text of an element.
   * @param locatorOrElement  Provide the locator or the element that will be used to get the text.
   * @param expectedTextValue Optional. Provide the expected text value that will be used to verify if the text is correct.
   * @returns                 Return the text of the element.
   * @usage                   await dsl.getText({string}, {string});
   * @example                 await dsl.getText('h1', 'heading');
   */
  async getText(locatorOrElement: any, expectedTextValue?: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorOrElement, elementTimeOut.timeout);

      // Get the text of an inspected element and assign it to a variable. As you can see, we are getting the first value from the list because "all text contents" return an array list.
      const elementTextValue: string = await (
        await locatorOrElement.allTextContents()
      )[0];

      // Make a verification. If there is provided string for the expected value parameter - assert to verify that the inspected element contains the exact text.
      if (expectedTextValue != null) {
        try {
          expect(elementTextValue).toEqual(expectedTextValue);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `getText`,
            `The expected value is not the same like actual one. \n ${error}`,
          );
        }
      }

      // Log the message.
      messages(
        `The automated test reads the element text value. The element text value is: '${elementTextValue}' .`,
      );

      // Return the containing element text.
      return elementTextValue;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('getText', 'dsl.ts', error);
    }
  }

  /**
   * @description             This method is used to get the text of all element from a list.
   * @param locatorOrElement  Provide the locator or the element that will be used to get the text.
   * @param sequenceNumber    Provide the sequence number of the element that will be used to get the text.
   * @param expectedTextValue Optional. Provide the expected text value that will be used to verify if the text is correct.
   * @returns                 Return the text of the element.
   * @usage                   await dsl.getAllTexts({string}, {number}, {string});
   * @example                 await dsl.getAllTexts('h1', 0, 'heading');
   */
  async getAllTexts(
    locatorOrElement: any,
    sequenceNumber: number,
    expectedTextValue?: string,
  ) {
    try {
      // Call this method to verify that the element is present and ready for usage.
      const currentElement = await this.element(
        locatorOrElement,
        elementTimeOut.timeout,
      );

      const listLength = (await currentElement.allTextContents()).length;

      // Check if the provided number is within the list length.
      if (sequenceNumber < listLength) {
        // Get the text of the inspected element and assign it to a variable.
        const elementTextValue: string = (
          await currentElement.allTextContents()
        )[sequenceNumber];

        // Make a verification. If a string for the expected value parameter is provided, assert to verify that the inspected element contains the exact text.
        if (expectedTextValue != null) {
          try {
            expect(elementTextValue).toEqual(expectedTextValue);
          } catch (error) {
            // Catch the error message.
            catchErrorMessage(
              `dsl`,
              `getAllTexts`,
              `The expected value is not the same like actual one. \n ${error}`,
            );
          }
        }

        // Log the message. Change the message as needed.
        messages(
          `The automated test reads the element text value. The element text value is: '${elementTextValue}'.`,
        );

        // Return the element text.
        return elementTextValue;
      } else {
        // Provide a valid number.
        errorMessage(
          `It seems that you called a value that doesn't exist. The list size is '${listLength}'. Please provide a number between 0 and ${
            listLength - 1
          }.`,
        );
      }
    } catch (error) {
      // Catch the error message.
      catchErrorMessage('getAllTexts', 'dsl.ts', error);
    }
  }

  /**
   * @description             This method is used send text to an input text element.
   * @param locatorOrElement  Provide the locator or the element that will be used to send text.
   * @param text              Provide the text that will be sent to the input text element.
   */
  async sendKeys(locatorOrElement: any, text: string) {
    try {
      let element;
      if (typeof locatorOrElement === 'string') {
        element = await this.page.$(locatorOrElement);
      } else {
        element = await locatorOrElement.elementHandle();
      }

      await element.fill(text);

      try {
        expect(await element.inputValue()).toEqual(text);
      } catch (error) {
        catchErrorMessage(
          `dsl`,
          `sendKeys`,
          `The text that was send is not the same like the text in the input text element! \n ${error}`,
        );
      }

      messages(
        `The automated test fill with text inside the input text element with value: '${text}'.`,
      );
    } catch (error) {
      catchErrorMessage('sendKeys', 'dsl.ts', error);
    }
  }

  /**
   * @description                       This method is used to send text to an multy select input text element and verify that the element contains the sent text.
   * @param locatorOrElement            Provide the locator or the element that will be used to send text.
   * @param text                        Provide the text that will be sent to the input text element.
   * @param loctorOrElementVerificator  Provide the locator or the element that will be used to verify that the element contains the sent text.
   * @usage                             await dsl.sendKeysMultySelect({string}, {string}, {string});
   * @example                           await dsl.sendKeysMultySelect('input', 'text', 'input');
   */
  async sendKeysMultySelect(
    locatorOrElement: any,
    text: string,
    loctorOrElementVerificator?: any,
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorOrElement, elementTimeOut.timeout);
      // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press('Control+A');
      // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press('Meta+A');

      // Fill the element with text.
      await locatorOrElement.fill(text);
      // Press the "Enter" key of the keyboard.
      await this.page.keyboard.press('Enter');
      // Verify that the input text element contains the sent text data.
      // If the element we use is the same as the element, that will verify the operation was compleated correctly. Or if we don't provide a verification element - because it is the same as a used element.
      if (
        locatorOrElement == loctorOrElementVerificator ||
        loctorOrElementVerificator == null
      ) {
        const verificateValueIsCorrect: string = await (
          await locatorOrElement.allTextContents()
        )[0];
        try {
          expect(verificateValueIsCorrect).toEqual(text);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `sendKeysMultySelect`,
            `The text that was send is not the same like the text in the input text element! \n ${error}`,
          );
        }
      }
      // If we provide different element for verificaiton.
      else {
        const verificateValueIsCorrect: string = await (
          await loctorOrElementVerificator.allTextContents()
        )[0];
        try {
          expect(verificateValueIsCorrect).toEqual(text);
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `sendKeysMultySelect`,
            `The text that was send is not the same like the text in the input text element! \n ${error}`,
          );
        }
      }
      // Log the message.
      messages(
        `The automated test fill with text inside the multi-select element with the value: '${text}'.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('sendKeysMultySelect', 'dsl.ts', error);
    }
  }

  /**
   * @description               This method is used to click on radio button or checkbox element.
   * @param locatorOrElement    Provide the locator or the element that will be used to click.
   * @param checkOrClickAction  Optional. Provide the action that will be used to click on the element. The default value is "click".
   * @usage                     await dsl.checkRadioButtonCheckBox({string}, {string});
   * @example                   await dsl.checkRadioButtonCheckBox('input', 'click');
   * @example                   await dsl.checkRadioButtonCheckBox('input', 'check');
   */
  async checkRadioButtonCheckBox(
    locatorOrElement: any,
    checkOrClickAction?: string,
  ) {
    try {
      // Validate that the element is not checked.
      try {
        // Verify the element is not checked.
        expect(await this.page.isChecked(locatorOrElement)).toBeFalsy();
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `checkRadioButtonCheckBox`,
          `The element is already checked. Please check only elements that are not checked yet! \n ${error}`,
        );
      }
      // If the checkOrClickAction value is not null.
      if (checkOrClickAction != null) {
        // If the provided action is "check".
        if (checkOrClickAction == 'check') {
          // Check the element using "check" action.
          await this.page.check(locatorOrElement, { force: true });
        }
        // If the provided action is "click".
        else if (checkOrClickAction == 'click') {
          // Check the element using "click" action.
          await this.page.click(locatorOrElement, { force: true });
        }
        // Unit test.
        else {
          errorMessage(
            `You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'check' or 'click' value for the 'checkOrClickAction' parameter.`,
          );
        }
      } else {
        // Check the element using "click" action.
        await this.page.click(locatorOrElement, { force: true });
      }
      // Validate that the element is not checked.
      try {
        // Verify the element is checked.
        expect(await this.page.isChecked(locatorOrElement)).toBeTruthy();
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `checkRadioButtonCheckBox`,
          `The element is not checked. The element should be checked, but it is not checked yet after the action, that was executed on the element! \n ${error}`,
        );
      }

      // Log the message.
      messages(`The automated test checks the element.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('checkRadioButtonCheckBox', 'dsl.ts', error);
    }
  }

  /**
   * @description               This method is used to uncheck checkbox element.
   * @param locator             Provide the locator that will be used to uncheck.
   * @param checkOrClickAction  Optional. Provide the action that will be used to uncheck the element. The default value is "uncheck".
   * @usage                     await dsl.unCheckBox({string}, {string});
   * @example                   await dsl.unCheckBox('input', 'uncheck');
   */
  async unCheckBox(locator: any, checkOrClickAction?: string) {
    try {
      // Wait for the element to be visible.
      await this.element(locator, elementTimeOut.timeout);
      // Validate that the element is checked.
      try {
        // Verify the element is checked.
        expect(await this.page.isChecked(locator)).toBeTruthy();
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `unCheckBox`,
          `The element is not checked. Please uncheck only elements that are checked yet! \n ${error}`,
        );
      }
      // If the checkOrClickAction value is not null.
      if (checkOrClickAction != null) {
        // If the provided action is "uncheck".
        if (checkOrClickAction == 'uncheck') {
          // Check the element using "uncheck" action.
          await this.page.uncheck(locator, { force: true });
        }
        // If the provided action is "click".
        else if (checkOrClickAction == 'click') {
          // Check the element using "click" action.
          await this.page.click(locator, { force: true });
        }
        // Unit test.
        else {
          catchErrorMessage(
            'unCheckBox',
            'dsl.ts',
            `You provided the wrong action data. If you want to provide data for this parameter, please provide only the 'uncheck' or 'click' value for the 'checkOrClickAction' parameter.`,
          );
        }
      } else {
        // Check the element using "click" action.
        await this.page.click(locator, { force: true });
      }
      // Validate that the element is not checked.
      try {
        // Verify the element is not checked.
        expect(await this.page.isChecked(locator)).toBeFalsy();
      } catch (error) {
        // Catch the error message.
        catchErrorMessage(
          `dsl`,
          `unCheckBox`,
          `The element is checked. The element should be unchecked, but it is not unchecked yet after the action, that was executed on the element! \n ${error}`,
        );
      }

      // Log the message.
      messages(`The automated test unchecks the check box element.`);
    } catch (error) {
      // Catch the error message.
      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('unCheckBox', 'dsl.ts', error);
    }
  }

  /**
   * @description           This method is used to simulate double click with the mouse over the element.
   * @param locator         Provide the locator that will be used to make double click.
   * @usage                 await dsl.doubleClick({string});
   * @example               await dsl.doubleClick('input');
   */
  async doubleClick(locator: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, elementTimeOut.timeout);
      // Make double-click mouse action over selected element.
      await this.page.dblclick(locator, { force: true });

      // Log the message.
      messages(
        `The automated test makes the double mouse (left) click over the element.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('doubleClick', 'dsl.ts', error);
    }
  }

  async rightClick(locator: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, elementTimeOut.timeout);
      // Make right-click mouse action over selected element.
      await this.page.click(locator, {
        button: 'right',
        force: true,
      });

      // Log the message.
      messages(
        `The automated test makes the right click with the mouse over the element.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('rightClick', 'dsl.ts', error);
    }
  }

  /**
   * @description               This method is used to click on element.
   * @param locatorOrElement    Provide the locator or the element that will be used to click.
   * @usage                     await dsl.click({string});
   * @example                   await dsl.click('input');
   */
  async click(locatorOrElement: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorOrElement, elementTimeOut.timeout);

      // Click over the element using the locator.
      await this.page.click(locatorOrElement, { force: true });

      // Log the message.
      messages(
        `The automated test makes the left click with the mouse over the element.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('click', 'dsl.ts', error);
    }
  }

  /**
   * @description               This method is used to hover over element.
   * @param locator             Provide the locator that will be used to hover.
   * @usage                     await dsl.hover({string});
   * @example                   await dsl.hover('input');
   */
  async hover(locator: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, elementTimeOut.timeout);
      // Hover over the element.
      await this.page.hover(locator, { force: true });

      // Log the message.
      messages(`The automated test hovers the element.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('hover', 'dsl.ts', error);
    }
  }

  /**
   * @description           This method is used to click on element on the exact position.
   * @param locator         Provide the locator that will be used to click.
   * @param xValue          Provide the x (positive) value that will be used to click.
   * @param yValue          Provide the y (positive) value that will be used to click.
   * @usage                 await dsl.clickPosition({string}, {number}, {number});
   * @example               await dsl.clickPosition('input', 10, 10);
   */
  async clickPosition(locator: string, xValue: number, yValue: number) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, elementTimeOut.timeout);
      // If the numbers are positive numbers...
      if (xValue > 0 || yValue > 0) {
        // ...click over the element on the exact position using the locator.
        await this.page.click(locator, {
          position: { x: xValue, y: yValue },
          force: true,
        });
      }
      // If the numbers are negative or it is 0.
      else if (xValue <= 0 || yValue <= 0) {
        catchErrorMessage(
          'clickPosition',
          'dsl.ts',
          `You entered a negative value. Please enter a positive integer value.`,
        );
      }
      // If the numbers are not an integer.
      else if (!Number.isInteger(xValue) || !Number.isInteger(yValue)) {
        catchErrorMessage(
          'clickPosition',
          'dsl.ts',
          `You need to enter an integer value.`,
        );
      }
      // Everything else...
      else {
        catchErrorMessage(
          'clickPosition',
          'dsl.ts',
          `You entered an invalid value. Please provide a positive integer number for two parameters.`,
        );
      }

      // Log the message.
      messages(
        `The automated test makes the left click with the mouse over the element on a specific position with coordinates: X:${xValue} and Y:${yValue}.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('clickPosition', 'dsl.ts', error);
    }
  }

  /**
   * @description          This method is used to click on element with holding keyboard key/s.
   * @param locator        Provide the locator that will be used to click.
   * @param keyboardKey    Provide the keyboard key/s that will be used to click.
   * @usage                await dsl.clickWithHoldingKeyboardKey({string}, {string});
   * @example              await dsl.clickWithHoldingKeyboardKey('input', 'Alt');
   */
  async clickWithHoldingKeyboardKey(
    locator: string,
    keyboardKey: 'Alt' | 'Control' | 'Meta' | 'Shift',
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator, elementTimeOut.timeout);
      // Send keyboard key/s to inspected element.
      await this.page.click(locator, {
        modifiers: [keyboardKey],
        force: true,
      });

      // Log the message.
      messages(
        `The automated test makes click with keyboard key/s using: '${keyboardKey}'.}`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('clickWithHoldingKeyboardKey', 'dsl.ts', error);
    }
  }

  /**
   * @description                                       This method is used to download file and save it in specific path directory.
   * @param locator                                     Provide the locator that will be used to download the file.
   * @param downloadFolderPathWithFileNameAndExtension  Optional. Provide the path directory where the file will be saved.
   * @usage                                             await dsl.downloadFile({string}, {string});
   * @example                                           await dsl.downloadFile('input', 'C:/Users/Downloads/file.jpg');
   */
  async downloadFile(
    locator: string,
    downloadFolderPathWithFileNameAndExtension?: string,
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator);
      // Initialize the downloading process.
      const [download] = await Promise.all([
        // Start waiting for the download process.
        this.page.waitForEvent('download'),
        // Perform the action that initiates the download.
        this.page.locator(locator).click(),
      ]);
      // Wait for the download process to complete.
      if (downloadFolderPathWithFileNameAndExtension != null) {
        // Save downloaded file in specific path direcotry.
        await download.saveAs(downloadFolderPathWithFileNameAndExtension);
      } else if (downloadFolderPathWithFileNameAndExtension == null) {
        // Save downloaded files automatically. Alert the downloaded file will download with a random name, with no extension, and it will be deleted when the automation is stopped.
        await download.path();
      } else {
        catchErrorMessage(
          'downloadFile',
          'dsl.ts',
          `This error should never happen!`,
        );
      }

      // Add the information message.
      if (downloadFolderPathWithFileNameAndExtension != null) {
        // Log the message.
        messages(`The automated test downloads a file.`);
      } else {
        // Log the message.
        messages(
          `The automated test downloads a file in the: '${downloadFolderPathWithFileNameAndExtension}'.`,
        );
      }
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('downloadFile', 'dsl.ts', error);
    }
  }

  /**
   * @description                                   This method is used to upload file.
   * @param locator                                 Provide the locator that will be used to upload the file.
   * @param uploadFilePathWithFileNameAndExtension  Provide the path directory where the file is located.
   * @usage                                         await dsl.uploadFile({string}, {string});
   * @example                                       await dsl.uploadFile('input', 'C:/Users/Downloads/file.jpg');
   */
  async uploadFile(
    locator: string,
    uploadFilePathWithFileNameAndExtension: string,
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator);
      // Upload the file by providing the element locator and file path.
      await this.page.setInputFiles(
        locator,
        uploadFilePathWithFileNameAndExtension,
      );

      // Log the message.
      messages(`The automated test uploads a file successfully.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('uploadFile', 'dsl.ts', error);
    }
  }

  /**
   * @description           This method is used to handle the alert pop-up window.
   * @param locator         Provide the locator that will be used to click the element that forces the alert pop-up window.
   * @param alertMessage    Optional. Provide the message that is expected to be displayed in the alert pop-up window.
   * @usage                 await dsl.alertAccept({string}, {string});
   * @example               await dsl.alertAccept('button', 'Alert message.');
   */
  async alertAccept(locator: string, alertMessage?: string) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locator);
      // Handle the alert pop-up window.
      this.page.once('dialog', async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // Validate the message that is displayed in the alert pop-up window.
          try {
            // ...assert to verify that the pop-up window contains the expected text.
            expect(dialog.message()).toEqual(alertMessage);
          } catch (error) {
            // Catch the error message.
            catchErrorMessage(
              'alertAccept',
              'dsl.ts',
              `The message that you provide is not shown in the Alert window! \n ${error}`,
            );
          }
        }
        // Accept the pop-up window.
        await dialog.accept();
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);
      // Log the message.
      messages(`The automation accepted the Alert pop-up window.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('alertAccept', 'dsl.ts', error);
    }
  }

  /**
   * @description         This method is used to cancel the alert pop-up window.
   * @param locator       Provide the locator that will be used to click the element that forces the alert pop-up window.
   * @param alertMessage  Optional. Provide the message that is expected to be displayed in the alert pop-up window.
   * @usage               await dsl.alertCancel({string}, {string});
   * @example             await dsl.alertCancel('button', 'Alert message.');
   */
  async alertCancel(locator: string, alertMessage?: string) {
    try {
      // Handle the alert pop-up window.
      this.page.once('dialog', async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // Validate the message that is displayed in the alert pop-up window.
          try {
            // ...assert to verify that the pop-up window contains the expected text.
            expect(dialog.message()).toEqual(alertMessage);
          } catch (error) {
            // Catch the error message.
            catchErrorMessage(
              'alertCancel',
              'dsl.ts',
              `The message that you provide is not shown in the Alert window! \n ${error}`,
            );
          }
        }
        // Dismiss the pop-up window.
        await dialog.dismiss();
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);

      // Log the message.
      messages(`The automation dismissed the Alert pop-up window.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('alertCancel', 'dsl.ts', error);
    }
  }

  /**
   * @description         This method is used to type text in the alert pop-up window and accept it.
   * @param locator       Provide the locator that will be used to click the element that forces the alert pop-up window.
   * @param textValue     Provide the text that will be typed in the alert pop-up window.
   * @param alertMessage  Optional. Provide the message that is expected to be displayed in the alert pop-up window.
   * @usage               await dsl.alertTypeValueAndAccept({string}, {string}, {string});
   * @example             await dsl.alertTypeValueAndAccept('button', 'Text value', 'Alert message.');
   */
  async alertTypeValueAndAccept(
    locator: string,
    textValue: string,
    alertMessage?: string,
  ) {
    try {
      // Handle the alert pop-up window.
      this.page.once('dialog', async (dialog) => {
        // If we provide the alertMessage parameter...
        if (alertMessage != null) {
          // Validate the message that is displayed in the alert pop-up window.
          try {
            // ...assert to verify that the pop-up window contains the expected text.
            expect(dialog.message()).toEqual(alertMessage);
          } catch (error) {
            // Catch the error message.
            catchErrorMessage(
              'alertTypeValueAndAccept',
              'dsl.ts',
              `The message that you provide is not shown in the Alert window! \n ${error}`,
            );
          }
        }
        // Accept the pop-up window and provide text that will fill it inside the input text element (located inside the alert pop-up window).
        await dialog.accept(textValue);
      });
      // Click the element that forces the alert pop-up window. It is a bit confusing, but we should take this action after handling the alert pop-up window.
      await this.click(locator);

      // Log the message.
      messages(
        `The automation accepts and fills the value ${textValue} in the Alert pop-up window.}`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('alertTypeValueAndAccept', 'dsl.ts', error);
    }
  }

  async iFrame(iFrameLocator: string) {
    try {
      // ADD THE METHOD STEPS HERE.

      // Log the message.
      messages(`message about test steps that are performed`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('iFrame', 'dsl.ts', error);
    }
  }

  async iFrameNested(parentIframeLocator: string, childIframeLocator: string) {
    try {
      // Assign the parent iFrame focus to the variable.
      const iFrameParent = await this.iFrame(parentIframeLocator);

      // Log the message.
      messages(`The automation successfully switched to neasted iFrame.`);
      // Return the switched focus inside the nested iFrame.
      // return await iFrameParent.frameLocator(childIframeLocator);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('iFrameNested', 'dsl.ts', error);
    }
  }

  /**
   * @description                 This method is used to select value from a drop-down list by clicking over the drop-down list element and then clicking over the drop-down value element.
   * @param locatorDropDownList   Provide the locator that will be used to click the drop-down list element.
   * @param locatorDropDownValue  Provide the locator that will be used to click the drop-down value element.
   * @usage                       await dsl.dropDown_ByClick({string}, {string});
   * @example                     await dsl.dropDown_ByClick('button', 'Alert message.');
   */
  async dropDown_ByDoubleClick(
    locatorDropDownList: string,
    locatorDropDownValue: string,
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorDropDownList, elementTimeOut.timeout);

      // Click over the drop-down list element to list the drop-down values.
      await this.page.click(locatorDropDownList, { force: true });

      // Because we are not able to use the "focus()" function over the listed drop-down list value, we can't use "dsl.element()" method from this class. That's why we will add the following few lines of code for verification that the drop-down value is ready for usage.
      let elementDropDownValue: any; // Declare an internal variable for assigning the element value.
      // If the provided value is a string, this is just a selector.
      if (typeof locatorDropDownValue === 'string') {
        // We need to transform this selector into an element.
        elementDropDownValue = this.page.locator(locatorDropDownValue);
      }
      // Unit test.
      else {
        catchErrorMessage(
          'dropDown_ByDoubleClick',
          'dsl.ts',
          `You have entered a not supported data type. Please provide a locator (string).`,
        );
      }
      // Wait for the element to be visible.
      await elementDropDownValue.waitFor({
        state: 'visible',
        timeout: elementTimeOut.timeout,
      });
      // Verify that the element is visible.
      await expect(elementDropDownValue).toBeVisible({
        timeout: elementTimeOut.timeout,
      });
      // Verify that the element is not hidden.
      await expect(elementDropDownValue).not.toBeHidden({
        timeout: elementTimeOut.timeout,
      });
      // Verify that the element is enabled.
      await expect(elementDropDownValue).toBeEnabled({
        timeout: elementTimeOut.timeout,
      });
      // Verify that the element is not disabled.
      await expect(elementDropDownValue).not.toBeDisabled({
        timeout: elementTimeOut.timeout,
      });
      // Verify that the element is the only one in the DOM tree.
      await expect(elementDropDownValue).toHaveCount(1, {
        timeout: elementTimeOut.timeout,
      });

      // Get the drop-down list value.
      const dropDownListValue: string = await (
        await elementDropDownValue.allTextContents()
      )[0];

      // Click over the drop-down value to choose this value.
      await this.page.click(locatorDropDownValue, { force: true });

      // Log the message.
      messages(
        `The automated test selected a value ${dropDownListValue} from the drop-down list.`,
      );

      alertMessage(
        `This method doesn't do any assertion. You need to check if the automation test selected the correct drop-down value!`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('dropDown_ByDoubleClick', 'dsl.ts', error);
    }
  }

  /**
   * @description                   This method is used to select value from an old style drop-down list.
   * @param locatorDropDownList     Provide the locator that will be used to click the drop-down list element.
   * @param DropDownAttributeValue  Provide the attribute value of the drop-down list element that will be used to select the drop-down value.
   * @usage                         await dsl.dropDown_oldStyle({string}, {string});
   * @example                       await dsl.dropDown_oldStyle('button', 'Alert message.');
   */
  async dropDown_oldStyle(
    locatorDropDownList: string,
    DropDownAttributeValue: string,
  ) {
    try {
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorDropDownList, elementTimeOut.timeout);

      // Declare an element.
      const oldStyleDropDownList = this.page.locator(locatorDropDownList);
      // Select by value.
      await oldStyleDropDownList.selectOption(DropDownAttributeValue);
      // Verify that automation selected the value correctly.
      await expect(oldStyleDropDownList).toHaveValue(DropDownAttributeValue);

      // Log the message.
      messages(
        `The automated test selected a value '${DropDownAttributeValue}' from the drop-down list.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('dropDown_oldStyle', 'dsl.ts', error);
    }
  }

  // Create new dsl method template.
  /**
   * @description         This method is used to...
   * @usage               await dsl.exampleMethod();
   * @example             await dsl.exampleMethod();
   */
  async exampleMethod() {
    try {
      // Test Steps here.

      // Assert the test steps.

      // Log the message. Chaange the message with the message that is used.
      messages(`message about test steps that are performed`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('exampleMethod', 'dsl.ts', error);
    }
  }

  /**
   * @description                             This method is used to click on an element and open a new browser window in a result (of the click action).
   * @param locatorForcesOpeningNewWindow     Provide the locator of the element that forces opening a new browser window.
   * @param verifyLocatorOrElement            Optional. Provide the locator or the element that is used to verify if the new browser window is opened.
   * @returns                                 Return the new browser window as an object.
   * @usage                                   await dsl.clickAndOpenNewWindow({string}, {string});
   * @example                                 await dsl.clickAndOpenNewWindow('a[href="https://www.google.com/"]', 'h1');
   */
  async clickAndOpenNewTab(
    locatorForcesOpeningNewWindow: string,
    verifyLocatorOrElement?: string,
  ) {
    try {
      // Click on the element
      await this.page.click(locatorForcesOpeningNewWindow, {
        button: 'middle',
      });

      // Wait for the new window (tab) to open
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.page.waitForEvent('popup'), // Wait for the clicked element to open a new window
      ]);

      // Bring focus to the new tab
      await newPage.bringToFront();

      // Verify if the new tab is opened by checking the locator or the element that is located on the new tab (window) page.
      if (verifyLocatorOrElement) {
        await this.element(verifyLocatorOrElement);
      }

      // Log a message
      messages('A new tab has been opened after clicking the element.');

      // Return the new tab as a result
      return newPage;
    } catch (error) {
      catchErrorMessage('clickAndOpenNewTab', 'dsl.ts', error);
      throw error;
    }
  }

  /**
   * @description       This method is used to get the page title.
   * @param locator     Provide the locator of the element.
   * @usage             await dsl.waitAndClick({string});
   * @example           await dsl.waitAndClick('h1');
   */
  async waitAndClick(locator: string) {
    // Get the element.
    const element = this.page.locator(locator);
    // Wait for the element to be visible.
    await element.waitFor({
      state: 'visible',
    });
    // Click on the element.
    await element.click();
  }
}

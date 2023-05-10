/**
 * @description Dsl class is a wrapper class for playwright methods.
 *              It contains the methods that are used to perform actions on the browser.
 */

// Import required packages.
import { Page, BrowserContext, expect } from '@playwright/test';
import Assert from './assert';
import { catchErrorMessage, messages, errorMessage } from './other';
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
   * @usage               await dsl.goto({string});
   * @example             await dsl.goto('https://www.google.com/');
   */
  async goto(url: string) {
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
      catchErrorMessage('goto', 'dsl.ts', error);
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
      // Verify that the browser loads the correct URL.
      await expect(this.page).toHaveURL(verifyUrl);
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
        await expect(this.page).toHaveURL(verifyUrl);
      }
      // Log the message. Chaange the message with the message that is used.
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
      // Log the message. Chaange the message with the message that is used.
      messages(`The browser window was switched.`);
      // Return the switched browser focus as an object.
      return newPage;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      // !!! Change the method name with the method name that is used.
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
      // Focus on the element.
      await element.focus();
      // Wait for the element to be visible.
      await element.waitFor({ state: 'visible', timeout: timeoutPeriod });
      // Verify that the element is visible.
      await expect(element).toBeVisible({
        timeout: timeoutPeriod,
      });
      // Verify that the element is not hidden.
      await expect(element).not.toBeHidden({
        timeout: timeoutPeriod,
      });
      // Verify that the element is enabled.
      await expect(element).toBeEnabled({
        timeout: timeoutPeriod,
      });
      // Verify that the element is not disabled.
      await expect(element).not.toBeDisabled({
        timeout: timeoutPeriod,
      });
      // Verify that the element is the only one in the DOM tree.
      await expect(element).toHaveCount(1, {
        timeout: timeoutPeriod,
      });

      // Add the information message.
      if (timeoutPeriod == null) {
        messages(`The element was selected.`);
      } else {
        // Log the message. Chaange the message with the message that is used.
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
        expect(await attributeValue).toEqual(expectedAttributeValue);
      }
      // Log the message. Chaange the message with the message that is used.
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
        expect(elementTextValue).toEqual(expectedTextValue);
      }
      // Log the message. Chaange the message with the message that is used.
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
        expect(elementTextValue).toEqual(expectedTextValue);
      }

      // Log the message. Chaange the message with the message that is used.
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
          expect(elementTextValue).toEqual(expectedTextValue);
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
      // Call this method, to verify that the element is present and it is ready for usage.
      await this.element(locatorOrElement, elementTimeOut.timeout);
      // Send Ctrl+A to the element. This will work for Windows and Linux. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press('Control+A');
      // Send Meta+A to the element. This will work for macOS. We are using this to select all containing text inside inspected input text element.
      await this.page.keyboard.press('Meta+A');

      // Fill the element with text.
      await locatorOrElement.fill(text);
      // Verify that the input text element contains the sent text data.
      expect(await locatorOrElement.inputValue()).toEqual(text);
      // Log the message. Chaange the message with the message that is used.
      messages(
        `The automated test fill with text inside the input text element with value: '${text}'.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
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
        expect(verificateValueIsCorrect).toEqual(text);
      }
      // If we provide different element for verificaiton.
      else {
        const verificateValueIsCorrect: string = await (
          await loctorOrElementVerificator.allTextContents()
        )[0];
        expect(verificateValueIsCorrect).toEqual(text);
      }
      // Log the message. Chaange the message with the message that is used.
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
      // Verify the element is not checked.
      expect(await this.page.isChecked(locatorOrElement)).toBeFalsy();
      await expect(locatorOrElement).not.toBeChecked();
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
      // Verify the element is checked.
      expect(await this.page.isChecked(locatorOrElement)).toBeTruthy();
      await expect(locatorOrElement).toBeChecked();

      // Log the message. Chaange the message with the message that is used.
      messages(`The automated test checks the element.`);
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('checkRadioButtonCheckBox', 'dsl.ts', error);
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
      await this.element(locatorOrElement, elementTimeOut.timeout);

      // Click over the element using the locator.
      await this.page.click(locatorOrElement, { force: true });

      // Log the message. Chaange the message with the message that is used.
      messages(
        `The automated test makes the left click with the mouse over the element.`,
      );
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('click', 'dsl.ts', error);
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
      // !!! Change the method name with the method name that is used.
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
  async clickAndOpenNewWindow(
    locatorForcesOpeningNewWindow: any,
    verifyLocatorOrElement?: any,
  ) {
    try {
      // Get a page after a specific action (e.g. clicking a link).
      const [newPage] = await Promise.all([
        // Wait for a specific event to happen. In this case, we are waiting for the browser to open a new window.
        this.context.waitForEvent('page'),
        // !!!ALERT!!!
        // Change this code when we have custom method for clicking on element.
        this.page.click(locatorForcesOpeningNewWindow),
      ]);
      // Wait until the opening of the new browser window happens.
      await newPage.waitForLoadState();
      // If the parameter "verifyLocatorOrElement" is provided - verify if the verification element loads in the new (switched) browser window.
      if (verifyLocatorOrElement != null) {
        await this.element(newPage.locator(verifyLocatorOrElement));
      }
      // Log the message. Chaange the message with the message that is used.
      messages(
        `The automation test switched the focus to the second browser tab.`,
      );
      // Return the switched browser focus as an object.
      return newPage;
    } catch (error) {
      // Catch the error message.
      catchErrorMessage('clickAndOpenNewWindow', 'dsl.ts', error);
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

  /**
   * @description       This method is used to navigate to the url.
   * @param url         Provide the url address.
   * @usage             await dsl.navigateTo({string});
   * @example           await dsl.navigateTo('https://www.google.com/');
   */
  async navigateTo(url: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(url)]);
  }
}

/**
 * @description Wrapper class for assertion methods of Playwright.
 */

// Import required packages.
import { ElementHandle, expect, Page } from '@playwright/test';
import { catchErrorMessage, messages } from './other';

// Define the wrapper class for assertion methods of Playwright.
export default class Assert {
  // Define the constructor for the wrapper class.
  constructor(private page: Page) {}

  /**
   * @description     This method is used to assert the title of the page.
   * @param title     Provide the title that will be asserted.
   * @usage           await assert.assertTitle('string');
   * @example         await assert.assertTitle('Hello World!');
   */
  async assertTitle(title: string) {
    // Assert the title by checking if it is equal to the text.
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * @description     This method is used to assert the title of the page by checking if it contains the text.
   * @param title     Provide the title that will be asserted.
   * @usage           await assert.assertTitleContains('string');
   * @example         await assert.assertTitleContains('Hello World!');
   */
  async assertTitleContains(title: string) {
    // Get the text.
    const pageTitle = await this.page.title();
    // Assert the title by checking if it contains the text.
    expect(pageTitle).toContain(title);
  }

  /**
   * @description     This method is used to assert the URL of the page by checking if it contains the text.
   * @param url       Provide the url that will be asserted.
   * @usage           await assert.assertURLContains('string');
   * @example         await assert.assertURLContains('https://www.google.com/');
   */
  async assertURLContains(url: string) {
    // Get the url.
    const pageURL = this.page.url();
    // Assert the url by checking if it contains the text.
    expect(pageURL).toContain(url);
  }

  /**
   * @description     This method is used to verify that the actual url is equal to the expected url.
   * @param verifyUrl Provide the url that will be asserted.
   * @usage           await assert.expectURL('string');
   * @example         await assert.expectURL('https://www.qa4free.com/');
   */
  async assertURL(verifyUrl: string) {
    // Validate that the page is loaded the correct URL.
    try {
      // Verify that the browser loads the correct URL.
      await expect(this.page).toHaveURL(verifyUrl);
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        'goBack',
        'dsl.ts',
        `It seems that the expected URL does not match the actual URL. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to assert that the element is visible in the DOM tree.
   * @param element         Provide the element that will be asserted.
   * @param timeoutPeriod   Optional. Provide the timeout period for the assertion.
   * @usage                 await assert.assertElementToBeVisible('string', 3000);
   * @example               await assert.assertElementToBeVisible('Hello World!', 3000);
   */
  async assertElementToBeVisible(element: any, timeoutPeriod?: number) {
    // Validate that the element is present in the DOM tree.
    try {
      // Wait for the element to be visible.
      await element.waitFor({ state: 'visible', timeout: timeoutPeriod });
      // Verify that the element is visible.
      await expect(await element).toBeVisible({
        timeout: timeoutPeriod,
      });
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `element`,
        `The element is not visible in the page. Maybe you have problem with the locator, please see your locator. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to assert that the element is only one in the DOM tree.
   * @param element         Provide the element that will be asserted.
   * @param timeoutPeriod   Optional. Provide the timeout period for the assertion.
   * @usage                 await assert.assertElementOnlyOneInDomTree('string', 3000);
   * @example               await assert.assertElementOnlyOneInDomTree('Hello World!', 3000);
   */
  async assertElementOnlyOneInDomTree(element: any, timeoutPeriod?: number) {
    // Validate that the element is the only one in the DOM tree.
    try {
      // Verify that the element is the only one in the DOM tree.
      await expect(await element).toHaveCount(1, {
        timeout: timeoutPeriod,
      });
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `element`,
        `The element is not the only one in the DOM tree. You need to provide locator that selects only one element. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to assert that the element is focused.
   * @param element         Provide the element that will be asserted.
   * @usage                 await assert.assertElementIsFocused('string');
   * @example               await assert.assertElementIsFocused('Hello World!');
   */
  async assertElementIsFocused(element: any) {
    // Validate that the element is focused.
    if (await element) {
      const isFocusable = await this.isElementFocusable(await element);
      if (isFocusable == true) {
        try {
          // Focus on the element.
          await element.focus();
          // Verify that the element is focused.
          await expect(await element).toBeFocused();
        } catch (error) {
          // Catch the error message.
          catchErrorMessage(
            `dsl`,
            `element`,
            `The element is not focused. \n ${await error}`,
          );
          // Re-throw the error to fail the test.
          throw await error;
        }
      }
    }
  }

  /**
   * @description       This method is used to assert that the element can be focused.
   * @param element     Provide the element that will be asserted.
   * @returns           Return true if the element is focusable.
   *                    Return false if the element is not focusable.
   * @usage             await assert.isElementFocusable({string});
   * @example           await assert.isElementFocusable('#id');
   */
  async isElementFocusable(element: ElementHandle<HTMLElement>) {
    try {
      const focusableTags = ['input', 'textarea', 'select', 'button', 'a'];
      const isContentEditable = await element.evaluate(
        (el) => el.isContentEditable,
      );

      if (isContentEditable) {
        messages(
          `The element is focusable, because the element content is editable.`,
        );
        return true;
      }

      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      if (focusableTags.includes(tagName)) {
        messages(
          `The element is focusable, because the element is '${tagName}'.`,
        );
        return true;
      }

      const tabIndexAttr = await element.getAttribute('tabindex');
      if (tabIndexAttr && parseInt(tabIndexAttr, 10) >= 0) {
        messages(
          `The element is focusable, because contains 'tabindex' attribute.`,
        );
        return true;
      }

      const hasHrefAttr = await element.getAttribute('href');
      if (tagName === 'a' && hasHrefAttr) {
        messages(
          `The element is focusable, because the element is 'a' tag and has href attribute.`,
        );
        return true;
      }
      messages(`The element is not focusable.`);
      return false;
    } catch (error) {
      // Catch the error message.

      // eslint-disable-next-line prettier/prettier
      catchErrorMessage('isElementFocusable', 'dsl.ts', await error);
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to assert that the element is not hidden.
   * @param element         Provide the element that will be asserted.
   * @param timeoutPeriod   Optional. Provide the timeout period for the assertion.
   * @usage                 await assert.assertElementIsVisible({string}, {number});
   * @example               await assert.assertElementIsVisible('#id', 3000);
   */
  async assertElementIsVisible(element: any, timeoutPeriod?: number) {
    try {
      // Verify that the element is not hidden.
      await expect(await element).not.toBeHidden({
        timeout: timeoutPeriod,
      });
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `element`,
        `The element is hidden. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to assert that the element is not disabled.
   * @param element         Provide the element that will be asserted.
   * @param timeoutPeriod   Optional. Provide the timeout period for the assertion.
   * @usage                 await assert.assertElementIsEnabled({string}, {number});
   * @example               await assert.assertElementIsEnabled('#id', 3000);
   */
  async assertElementIsEnabled(element: any, timeoutPeriod?: number) {
    try {
      // Verify that the element is enabled.
      await expect(await element).toBeEnabled({
        timeout: timeoutPeriod,
      });
      // Verify that the element is not disabled.
      await expect(await element).not.toBeDisabled({
        timeout: timeoutPeriod,
      });
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `element`,
        `The element is disabled. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
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
  }

  /**
   * @description                     This method is used to assert that the element attribute value is correct.
   * @param attributeValue            Provide the attribute value that will be asserted.
   * @param expectedAttributeValue    Provide the expected attribute value.
   * @usage                           await assert.assertAttributeValues({string}, {string});
   * @example                         await assert.assertAttributeValues('#id', 'first-name');
   */
  async assertAttributeValues(
    attributeValue: string,
    expectedAttributeValue: string,
  ) {
    // Verify that the attribute value is correct.
    try {
      expect(attributeValue).toEqual(expectedAttributeValue);
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `getAttribute`,
        `The attribute value is not correct. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description             This method is used to verify that the element contains the expected text value.
   * @param elementTextValue  Provide the element text value that will be asserted.
   * @param expectedTextValue Provide the expected text value.
   * @usage                   await assert.assertTextValues({string}, {string});
   * @example                 await assert.assertTextValues('#id', 'first-name');
   */
  async assertTextValues(elementTextValue: string, expectedTextValue: string) {
    try {
      expect(elementTextValue).toEqual(expectedTextValue);
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `getInnerText`,
        `The expected value is not the same like actual one. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description             This method is used to verify that the input text element contains the expected text value.
   * @param element           Provide the element that will be asserted.
   * @param text              Provide the expected text value.
   * @usage                   await assert.assertTextInTheInputField({string}, {string});
   * @example                 await assert.assertTextInTheInputField('#id', 'John Doe');
   */
  async assertTextInTheInputField(element: any, text: string) {
    try {
      expect(await element.inputValue()).toEqual(text);
    } catch (error) {
      catchErrorMessage(
        `dsl`,
        `sendKeys`,
        `The text that was send is not the same like the text in the input text element! \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description             This method is used to verify that the element is not checked.
   * @param locatorOrElement  Provide the element that will be asserted.
   * @usage                   await assert.assertElementIsNotChecked({string});
   * @example                 await assert.assertElementIsNotChecked('#id');
   */
  async assertElementIsNotChecked(locatorOrElement: any) {
    try {
      // Verify the element is not checked.
      expect(await this.page.isChecked(await locatorOrElement)).toBeFalsy();
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `checkRadioButtonCheckBox`,
        `The element is already checked. Please check only elements that are not checked yet! \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description             This method is used to verify that the element is checked.
   * @param locatorOrElement  Provide the element that will be asserted.
   * @usage                   await assert.assertElementIsNotChecked({string});
   * @example                 await assert.assertElementIsNotChecked('#id');
   */
  async assertElementIsChecked(locatorOrElement: any) {
    try {
      // Verify the element is not checked.
      expect(await this.page.isChecked(await locatorOrElement)).toBeTruthy();
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `checkRadioButtonCheckBox`,
        `The element is already checked. Please check only elements that are not checked yet! \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description           This method is used to verify the pop-up message.
   * @param expectedMessage Provide the message that is displayed in the pop-up window.
   * @param assertedMessage Provide the expected message that should be displayed in the pop-up window.
   */
  async assertPopUpMessage(expectedMessage: string, assertedMessage: string) {
    // Validate the message that is displayed in the alert pop-up window.
    try {
      // ...assert to verify that the pop-up window contains the expected text.
      expect(expectedMessage).toEqual(assertedMessage);
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        'alertAccept',
        'dsl.ts',
        `The message that you provide is not shown in the Alert window! \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }

  /**
   * @description                           This method is used to verify that the selected drop-down list value is correct.
   * @param oldStyleDropDownListElement     Provide the element that will be asserted.
   * @param DropDownAttributeValueElement   Provide the expected attribute value.
   * @usage                                 await assert.assertSelectedDropDownValue({string}, {string});
   * @example                               await assert.assertSelectedDropDownValue('#id', 'Street');
   */
  async assertSelectedDropDownValue(
    oldStyleDropDownListElement: any,
    DropDownAttributeValueElement: string,
  ) {
    // Verify that automation selected the value correctly.
    try {
      await expect(await oldStyleDropDownListElement).toHaveValue(
        DropDownAttributeValueElement,
      );
    } catch (error) {
      // Catch the error message.
      catchErrorMessage(
        `dsl`,
        `selectDropDownListValue`,
        `The drop-down list value was not selected properly. \n ${await error}`,
      );
      // Re-throw the error to fail the test.
      throw await error;
    }
  }
}

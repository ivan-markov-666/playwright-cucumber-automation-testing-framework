/**
 * @description This file contains the wrapper class for the clickAndOpenNewWindowPage.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class clickAndOpenNewWindowPage extends BasePage {
  // Defina url for the page.
  private Elements = {
    url: 'https://demoqa.com/browser-windows',
  };

  /**
   * @description                               This method is used to navigate to the url.
   */
  async navigateTo() {
    // Navigate to the url.
    await this.base.navigateTo(this.Elements.url);
  }

  /**
   * @description                               This method is used to click on the element and open a new window.
   * @param locatorForcesOpeningNewWindow       Provide the locator of the element.
   * @param verifyLocatorOrElement              Provide the locator of the element to verify.
   * @usage                                     await pom.clickAndOpenNewWindowPage({string}, {string});
   * @example                                   await pom.clickAndOpenNewWindowPage('#tabButton', '#sampleHeading');
   */
  async clickAndOpenNewWindowPage(
    locatorForcesOpeningNewWindow: string,
    verifyLocatorOrElement?: string,
  ) {
    // Click on the element and open a new window.
    await this.base.clickAndOpenNewTab(
      locatorForcesOpeningNewWindow,
      verifyLocatorOrElement,
    );
  }
}

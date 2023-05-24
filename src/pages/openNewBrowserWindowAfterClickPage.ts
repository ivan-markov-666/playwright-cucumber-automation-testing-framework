/**
 * @description This file contains example for opening new browser window after click over the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class OpenNewBrowserWindowAfterClick extends BasePage {
  // Define the constructor for the wrapper class.
  async openNewBrowserWindowAfterClick() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/browser-windows`);
    await this.base.openNewBrowserWindowAfterClick(
      `tabButton`,
      `sampleHeading`,
    );
  }
}

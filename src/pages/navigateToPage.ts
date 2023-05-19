/**
 * @description This file contains example for navigating to the page.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class NavigateTo extends BasePage {
  // Define the constructor for the wrapper class.

  /**
   * @description   This method is used to navigate to the page.
   */
  async navigateTo() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/`);
  }
}

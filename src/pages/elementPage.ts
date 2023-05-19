/**
 * @description This file contains example for locating the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class Element extends BasePage {
  // Define the constructor for the wrapper class.
  async element() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Verify the element is present.
    await this.base.element(`#userName`);
  }
}

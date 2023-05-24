/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class GetInnerText extends BasePage {
  // Define the constructor for the wrapper class.
  async getInnerText() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Get the element inner text.
    await this.base.getInnerText(`#userName-label`, `Full Name`);
  }
}

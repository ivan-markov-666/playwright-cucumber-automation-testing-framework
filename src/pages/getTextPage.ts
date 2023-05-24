/**
 * @description This file contains example for getting the text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class GetText extends BasePage {
  // Define the constructor for the wrapper class.
  async getText() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Get the element text.
    await this.base.getText(`#userName-label`, `Full Name`);
  }
}

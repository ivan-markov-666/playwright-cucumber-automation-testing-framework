/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class SendKeys extends BasePage {
  // Define the constructor for the wrapper class.
  async sendKeys() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Get the element inner text.
    await this.base.sendKeys(`#userName`, `Testing`);
  }
}

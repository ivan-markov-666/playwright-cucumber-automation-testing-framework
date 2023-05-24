/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class ClickWithHoldingKeyboardKey extends BasePage {
  // Define the constructor for the wrapper class.
  async clickWithHoldingKeyboardKey() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/browser-windows`);
    // Check the checkbox.
    await this.base.clickWithHoldingKeyboardKey(`#windowButton`, `Control`);
  }
}

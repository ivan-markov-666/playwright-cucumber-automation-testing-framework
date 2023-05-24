/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class Hover extends BasePage {
  // Define the constructor for the wrapper class.
  async hover() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/tool-tips`);
    // Check the checkbox.
    await this.base.hover(`#toolTipButton`);
  }
}

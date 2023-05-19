/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class RightClick extends BasePage {
  // Define the constructor for the wrapper class.
  async rightClick() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/buttons`);
    // Check the checkbox.
    await this.base.rightClick(`#rightClickBtn`);
  }
}

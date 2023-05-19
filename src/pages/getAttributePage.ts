/**
 * @description This file contains example for getting the attribute value.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class GetAttribute extends BasePage {
  // Define the constructor for the wrapper class.
  async getAttribute() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Get the attribute value.
    await this.base.getAttribute(`#userName`, `placeholder`, `Full Name`);
  }
}

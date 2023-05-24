/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class DropDown_oldStyle extends BasePage {
  // Define the constructor for the wrapper class.
  async dropDown_oldStyle() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/select-menu`);
    // Check the checkbox.
    await this.base.dropDown_oldStyle(`#oldSelectMenu`, `1`);
  }
}

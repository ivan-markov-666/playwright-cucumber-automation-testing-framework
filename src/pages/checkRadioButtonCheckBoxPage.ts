/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class CheckRadioButtonCheckBox extends BasePage {
  // Define the constructor for the wrapper class.
  async checkRadioButtonCheckBox() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/automation-practice-form`);
    // Check the checkbox.
    await this.base.checkRadioButtonCheckBox(`#hobbies-checkbox-1`, `check`);
  }
}

/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class SendKeysMultySelect extends BasePage {
  // Define the constructor for the wrapper class.
  async sendKeysMultySelect() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/automation-practice-form`);
    // Get the element inner text.
    await this.base.sendKeysMultySelect(
      `#subjectsContainer`,
      `Maths`,
      `#react-select-2-option-0`,
    );
  }
}

/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class AlertTypeValueAndAccept extends BasePage {
  // Define the constructor for the wrapper class.
  async alertTypeValueAndAccept() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/alerts`);
    // Check the checkbox.
    await this.base.alertTypeValueAndAccept(
      `#promtButton`,
      `John Doe`,
      `Please enter your name`,
    );
  }
}

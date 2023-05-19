/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class realExampleFE extends BasePage {
  // Define the constructor for the wrapper class.
  async realExampleFE() {
    // Set the screen size.
    await this.base.screenSize(1920, 1080);
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Fill with the text into the "Full Name" field.
    await this.base.sendKeys(`#userName`, `John Doe`);
    // Fill with the text into the "Email" field.
    await this.base.sendKeys(`#userEmail`, `test@test.com`);
    // Fill with the text into the "Current Address" field.
    await this.base.sendKeys(`#currentAddress`, `Test Current Address`);
    // Fill with the text into the "Permanent Address" field.
    await this.base.sendKeys(`#permanentAddress`, `Test Permanent Address`);
    // Click on the "Submit" button.
    await this.base.click(`#submit`);
  }
}

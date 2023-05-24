/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the locators.
const locators = {
  // Define the locator for the "Full Name" field.
  fullName: `#userName`,
  // Define the locator for the "Email" field.
  email: `#userEmail`,
  // Define the locator for the "Current Address" field.
  currentAddress: `#currentAddress`,
  // Define the locator for the "Permanent Address" field.
  permanentAddress: `#permanentAddress`,
  // Define the locator for the "Submit" button.
  submit: `//button[@id='submit']`,
};

// Define the wrapper class for playwright methods.
export default class ExampleFEPage extends BasePage {
  // Define the base URL.
  async navigateTo(endpoint: string) {
    await this.base.navigateTo(this.baseURL + endpoint);
  }

  // Fill with the text into the "Full Name" field.
  async fillFullName(fullName: string) {
    await this.base.sendKeys(locators.fullName, fullName);
  }

  // Fill with the text into the "Email" field.
  async fillEmail(email: string) {
    await this.base.sendKeys(locators.email, email);
  }

  // Fill with the text into the "Current Address" field.
  async fillCurrentAddress(currentAddress: string) {
    await this.base.sendKeys(locators.currentAddress, currentAddress);
  }

  // Fill with the text into the "Permanent Address" field.
  async fillPermanentAddress(permanentAddress: string) {
    await this.base.sendKeys(locators.permanentAddress, permanentAddress);
  }

  // Click on the "Submit" button.
  async clickSubmit() {
    await this.base.click(locators.submit);
  }
}

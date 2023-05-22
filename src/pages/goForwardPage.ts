/**
 * @description This file contains example for going back to the previous page.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class goForward extends BasePage {
  // Define the constructor for the wrapper class.
  async goForward() {
    // Go forward.
    await this.base.goForward(`https://demoqa.com/radio-button`);
  }
}

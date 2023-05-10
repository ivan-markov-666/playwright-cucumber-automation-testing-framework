/**
 * @description Wrapper class for navigating to the forward page.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class goForward extends BasePage {
  // Define the constructor for the wrapper class.
  async goForward() {
    // Go forward.
    await this.base.goForward();
  }
}

/**
 * @description Page Object for the Screen Size page of the application.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class screenSizePage extends BasePage {
  // Define the constructor for the wrapper class.
  async fullHD() {
    // Change the screen size.
    await this.base.screenSize(1920, 1080);
  }
}

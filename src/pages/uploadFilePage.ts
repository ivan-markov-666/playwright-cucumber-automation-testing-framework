/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class UploadFile extends BasePage {
  // Define the constructor for the wrapper class.
  async uploadFile() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/upload-download`);
    // Check the checkbox.
    await this.base.uploadFile(`#uploadFile`, `upload\test-image.jpg`);
  }
}

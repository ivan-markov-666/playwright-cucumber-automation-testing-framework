/**
 * @description This file contains example for getting all the texts of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class GetAllTexts extends BasePage {
  // Define the constructor for the wrapper class.
  async getAllTexts() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/tool-tips`);
    // Get all the texts of the element.
    await this.base.getAllTexts(
      `(//*[@*='texToolTopContainer']/a)[1]`,
      0,
      `Contrary`,
    );
  }
}

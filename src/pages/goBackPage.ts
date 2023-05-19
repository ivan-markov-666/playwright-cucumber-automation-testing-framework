/**
 * @description This file contains example for going back to the previous page.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class GoBack extends BasePage {
  // Define the constructor for the wrapper class.
  async goBack() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/text-box`);
    // Click on the element.
    await this.base.click(`#item-1`);
    // Verify the element is present.
    await this.base.element(`//*[@class='rct-title']`);
    // Go back to the previous page.
    await this.base.goBack(`https://demoqa.com/text-box`);
  }
}

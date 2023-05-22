/**
 * @description This file contains example for getting the inner text of the element.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class IFrame extends BasePage {
  // Define the constructor for the wrapper class.
  async iFrame() {
    // Go to the page.
    await this.base.navigateTo(`https://demoqa.com/frames`);
    // Select iFrame element.
    const iFrame = await this.base.iFrame(`#frame1`);
    // Get the inner text of the element.
    const iFrameTextValue = await iFrame.innerText(`#sampleHeading`);
    console.log(`The iFrame Text: ${iFrameTextValue}`);
  }
}

/**
 * @description This file contains example for static wait.
 */

// Import required packages.
import BasePage from './basePage';

// Define the wrapper class for playwright methods.
export default class StaticWait extends BasePage {
  // Define the constructor for the wrapper class.
  async staticWait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}

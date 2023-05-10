/**
 * @description Page Object for the Print Message page of the application.
 */

// Import required packages.
import BasePage from './basePage';
import { infoMessage } from '../helper/methods/other';

// Define the wrapper class for playwright methods.
export default class printMessagePage extends BasePage {
  // Define the constructor for the wrapper class.
  async printSuccessMessage() {
    // Print the success message.
    infoMessage('The test was finished successfully!');
  }
}

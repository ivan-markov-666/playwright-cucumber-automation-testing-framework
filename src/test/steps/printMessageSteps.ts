/**
 * @description This file contains the step definitions for the print message feature.
 */

// Import the custom methods.
import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import printMessagePage from '../../pages/printMessagePage';

// Define the page object.
let pom: printMessagePage;

// Define the step definitions.
defineStep('Print message for testing', async function () {
  // Initialize the page object.
  pom = new printMessagePage(fixture.page);
  // Change the screen size.
  await pom.printSuccessMessage();
  // Log the message.
  fixture.logger.info('I print the message for testing.');
});

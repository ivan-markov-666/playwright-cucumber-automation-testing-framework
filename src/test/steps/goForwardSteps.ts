/**
 * @description        This file contains the step definitions for the Go Forward page of the application.
 */

// Import the custom methods.
import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import goForwardSteps from '../../pages/goForwardPage';

// Define the page object.
let pom: goForwardSteps;

// Define the step definitions.
defineStep('Go forward', async function () {
  // Initialize the page object.
  pom = new goForwardSteps(fixture.page);
  // Change the screen size.
  await pom.goForward();
  // Log the message.
  fixture.logger.info('The user was navigated to the forward page.');
});

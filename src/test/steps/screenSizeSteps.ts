/**
 * @description        This file contains the step definitions for the Screen Size page of the application.
 */

// Import the custom methods.
import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import ScreenSizePage from '../../pages/screenSizePage';

// Define the page object.
let pom: ScreenSizePage;

// Define the step definitions.
defineStep('Set the screen to FullHD', async function () {
  // Initialize the page object.
  pom = new ScreenSizePage(fixture.page);
  // Change the screen size.
  await pom.fullHD();
  // Log the message.
  fixture.logger.info('I set the screen size to FullHD.');
});

/**
 * @description        This file contains the step definitions for the Screen Size page of the application.
 */

// Import the custom methods.
import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import clickAndOpenNewWindowPage from '../../pages/clickAndOpenNewWindowPage';

// Define the page object.
let pom: clickAndOpenNewWindowPage;

defineStep('Navigate to the browser-windows page', async function () {
  // Initialize the page object.
  pom = new clickAndOpenNewWindowPage(fixture.page, fixture.context);
  // Navigate to the url.
  await pom.navigateTo();
  // Log the message.
  fixture.logger.info('I navigated to the "browser-windows" page.');
});

// Define the step definitions.
defineStep('Click on the element and open a new page', async function () {
  // Change the screen size.
  await pom.clickAndOpenNewWindowPage('#tabButton', '#sampleHeading');
  // Log the message.
  fixture.logger.info('I clicked on the element and opened a new page.');
});

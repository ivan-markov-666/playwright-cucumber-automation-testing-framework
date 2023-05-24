/**
 * @description: This file contains the hooks for the cucumber framework which are executed before and after the scenario.
 */

// Import required packages.
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext } from '@playwright/test';
import { fixture } from './pageFixture';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';

// Define the hooks for the cucumber framework.
let browser: Browser;
let context: BrowserContext;

// Define the hooks for the cucumber framework.
BeforeAll(async function () {
  // Get the environment variables.
  getEnv();
  // Invoke the browser.
  browser = await invokeBrowser();
});

/**
 * @description       This hook is executed before each scenario.
 * @param {pickle}    This parameter contains the scenario details.
 */
Before(async function ({ pickle }) {
  // Get the scenario name.
  const scenarioName = pickle.name + pickle.id;
  // Create the logger.
  context = await browser.newContext();
  // Create the page.
  const page = await context.newPage();
  // Set the page.
  fixture.page = page;
  // Set the logger.
  fixture.logger = createLogger(options(scenarioName));
});

/**
 * @description       This hook is executed after each scenario.
 */
After(async function ({ pickle, result }) {
  // Log the scenario status.
  console.log(result?.status);
  // Check if the scenario is failed. If the scenario is failed, then take the screenshot.
  if (result?.status == Status.FAILED) {
    // Take the screenshot.
    const img = await fixture.page.screenshot({
      // Define the path for the screenshot.
      path: `./test-results/screenshots/${pickle.name}.png`,
      // Define the type for the screenshot.
      type: 'png',
    });
    // Attach the screenshot to the report.
    await this.attach(img, 'image/png');
  }

  // Close the page.
  await fixture.page.close();
  // Close the context.
  await context.close();
});

/**
 * @description      This hook is executed after all the scenarios.
 */
AfterAll(async function () {
  // Close the browser, because if the browser is not closed, then the browser will be running in the background. This will cause the memory leak.
  if (context && fixture.page) {
    // Close the page, context and browser.
    await fixture.page.close();
    // Close the context.
    await context.close();
    // Close the browser.
    await browser.close();
    // Close the logger.
    fixture.logger.close();
  }
});

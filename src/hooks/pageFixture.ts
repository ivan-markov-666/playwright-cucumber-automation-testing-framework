/**
 * @description This file contains the fixture for the page.
 *              This fixture is used to set the page and logger.
 */

// Import required packages.
import { Page, BrowserContext } from '@playwright/test';
import { Logger } from 'winston';

// Define the fixture for the page.
export const fixture = {
  // Define the page for the fixture.
  page: undefined as Page,
  // Define the logger for the fixture.
  logger: undefined as Logger,
  // Define the context for the fixture.
  context: undefined as BrowserContext,
};

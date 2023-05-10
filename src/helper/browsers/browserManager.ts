/**
 * @description This file contains the browser manager which is responsible for launching the browser.
 */

// Import required packages.
import { LaunchOptions, chromium, firefox, webkit } from '@playwright/test';
import { browserConfig } from '../../config/configuration';

// Define the options for launching the browser.
const options: LaunchOptions = {
  ...browserConfig,
};

// Define the function to launch the browser.
export const invokeBrowser = () => {
  // Get the browser type from the .env file.
  const browserType = process.env.BROWSER;
  // Check if the browser type is defined in the .env file.
  switch (browserType) {
    case 'chrome':
      return chromium.launch(options);
    case 'firefox':
      return firefox.launch(options);
    case 'webkit':
      return webkit.launch(options);
    default:
      throw new Error(
        `Browser type "${browserType}" is not supported or it is not defined in the .env file.`,
      );
  }
};

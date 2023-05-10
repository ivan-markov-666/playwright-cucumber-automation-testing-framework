/**
 * @description This file contains the code to generate the report.
 */

// Import required packages.
import * as report from 'multiple-cucumber-html-reporter';

// Generate the report.
report.generate({
  // Define the jsonDir path.
  jsonDir: 'test-results',
  // Define the path to save the report.
  reportPath: 'test-results/reports/',
  // Define the name of the report.
  reportName: 'Playwright Automation Report',
  // Define the page title of the report.
  pageTitle: 'BookCart App test report',
  // Define the display duration of the report.
  displayDuration: false,
  // Define the custom metadata for the report.
  metadata: {
    // Define the browser details.
    browser: {
      // Define the browser name.
      name: 'chrome',
      // Define the browser version.
      version: '112',
    },
    // Define the device details.
    device: 'Koushik - PC',
    // Define the platform (os) details.
    platform: {
      // Define the platform (os) name.
      name: 'Windows',
      // Define the platform (os) version.
      version: '10',
    },
  },
  // Define the custom data for the report.
  customData: {
    // Define the title of the custom data.
    title: 'Test Info',
    // Define the data for the custom data.
    data: [
      // Define the data for the custom data.
      { label: 'Project', value: 'Book Cart Application' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'Smoke-1' },
    ],
  },
});

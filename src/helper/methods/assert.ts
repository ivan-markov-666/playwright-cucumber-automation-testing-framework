/**
 * @description Wrapper class for assertion methods of Playwright.
 */

// Import required packages.
import { expect, Page } from '@playwright/test';

// Define the wrapper class for assertion methods of Playwright.
export default class Assert {
  // Define the constructor for the wrapper class.
  constructor(private page: Page) {}

  /**
   * @description     This method is used to assert the title of the page.
   * @param title     Provide the title that will be asserted.
   * @usage           await assert.assertTitle('string');
   * @example         await assert.assertTitle('Hello World!');
   */
  async assertTitle(title: string) {
    // Assert the title by checking if it is equal to the text.
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * @description     This method is used to assert the title of the page by checking if it contains the text.
   * @param title     Provide the title that will be asserted.
   * @usage           await assert.assertTitleContains('string');
   * @example         await assert.assertTitleContains('Hello World!');
   */
  async assertTitleContains(title: string) {
    // Get the text.
    const pageTitle = await this.page.title();
    // Assert the title by checking if it contains the text.
    expect(pageTitle).toContain(title);
  }

  /**
   * @description     This method is used to assert the URL of the page.
   * @param url       Provide the url that will be asserted.
   * @usage           await assert.assertURL('string');
   * @example         await assert.assertURL('https://www.google.com/');
   */
  async assertURL(url: string) {
    // Assert the url by checking if it is equal to the url.
    await expect(this.page).toHaveURL(url);
  }

  /**
   * @description     This method is used to assert the URL of the page by checking if it contains the text.
   * @param url       Provide the url that will be asserted.
   * @usage           await assert.assertURLContains('string');
   * @example         await assert.assertURLContains('https://www.google.com/');
   */
  async assertURLContains(url: string) {
    // Get the url.
    const pageURL = this.page.url();
    // Assert the url by checking if it contains the text.
    expect(pageURL).toContain(url);
  }
}

import { Page, BrowserContext } from '@playwright/test';
import Dsl from '../helper/methods/dsl';

export default class BasePage {
  protected base: Dsl;

  // Define the constructor for the wrapper class.
  constructor(protected page: Page, protected context: BrowserContext) {
    // Define the wrapper class for playwright methods.
    this.base = new Dsl(page, context);
  }
  // Define the base URL.
  baseURL = process.env.BASEURL;
}

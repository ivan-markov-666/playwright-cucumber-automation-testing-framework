import { Page, BrowserContext } from '@playwright/test';
import Dsl from '../helper/methods/dsl';

export default class BasePage {
  protected base: Dsl;

  constructor(protected page: Page, protected context: BrowserContext) {
    this.base = new Dsl(page, context);
  }
}

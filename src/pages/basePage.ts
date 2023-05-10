import { Page } from '@playwright/test';
import Dsl from '../helper/methods/dsl';

export default class BasePage {
  protected base: Dsl;

  constructor(protected page: Page) {
    this.base = new Dsl(page);
  }
}

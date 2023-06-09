import { expect, Page, BrowserContext } from '@playwright/test';
import Pom from '../helper/methods/dsl';

export default class LoginPage {
  private base: Pom;
  constructor(private page: Page, private context: BrowserContext) {
    this.base = new Pom(page, context);
  }

  private Elements = {
    userInput: 'Username',
    passwordInput: 'Password',
    loginBtn: "button[color='primary']",
    errorMessage: 'alert',
  };

  async navigateToLoginPage() {
    await this.base.navigateTo('/login');
    await expect(this.page).toHaveTitle('BookCart');
  }
  async enterUserName(user: string) {
    await this.page.getByLabel(this.Elements.userInput).fill(user);
  }
  async enterPassword(Password: string) {
    await this.page.getByLabel(this.Elements.passwordInput).fill(Password);
  }

  async clickLoginButton() {
    await this.base.waitAndClick(this.Elements.loginBtn);
  }

  getErrorMessage() {
    return this.page.getByRole('alert');
  }

  async loginUser(user: string, password: string) {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

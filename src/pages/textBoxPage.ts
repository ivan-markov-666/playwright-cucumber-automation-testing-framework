import { expect } from '@playwright/test';
import BasePage from './basePage';

export default class textBoxPage extends BasePage {
  private Elements = {
    fullName: '#userName',
    email: '#userEmail',
    currentAddress: '#currentAddress',
    permanentAddress: '#permanentAddress',
    submit_button: '#submit',
    validateName: '#name',
  };

  private Data = {
    url: 'https://demoqa.com/text-box',
  };

  async fullHD() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async navigateToForm() {
    await this.base.goto(this.Data.url);
  }

  async fillFullName(fullName: string) {
    const test: any = await this.base.element(this.Elements.fullName);
    await test.type(fullName);
    // await test.fill(fullName);

    // const test2: any = this.page.locator(this.Elements.fullName);
    // await test2.type(fullName);
    // await test2.fill(fullName);
  }

  async fillEmail(email: string) {
    await this.page.type(this.Elements.email, email);
  }

  async fillCurrentAddress(currentAddress: string) {
    await this.page.type(this.Elements.currentAddress, currentAddress);
  }

  async fillPermanentAddress(permanentAddress: string) {
    await this.page.type(this.Elements.permanentAddress, permanentAddress);
  }

  async clickSubmitButton() {
    await this.page.click(this.Elements.submit_button);
  }

  async validateName() {
    const element = await this.page.$(this.Elements.validateName);
    expect(await element.textContent());
  }
}

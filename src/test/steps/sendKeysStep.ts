import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import SendKeys from '../../pages/sendKeysPage';
let pom: SendKeys;

defineStep(`Test the sendKeys dsl method`, async function () {
  pom = new SendKeys(fixture.page, fixture.context);
  pom.sendKeys();
  fixture.logger.info('Test the sendKeys dsl method');
});

import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import SendKeysMultySelect from '../../pages/sendKeysMultySelectPage';
let pom: SendKeysMultySelect;

defineStep(`Test the sendKeysMultySelect dsl method`, async function () {
  pom = new SendKeysMultySelect(fixture.page, fixture.context);
  fixture.logger.info('Test the sendKeysMultySelect dsl method');
  await pom.sendKeysMultySelect();
});

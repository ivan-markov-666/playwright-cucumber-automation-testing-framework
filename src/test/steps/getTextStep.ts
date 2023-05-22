import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import GetText from '../../pages/getTextPage';
let pom: GetText;

defineStep(`Test the getText dsl method`, async function () {
  pom = new GetText(fixture.page, fixture.context);
  await pom.getText();
  fixture.logger.info('Test the getText dsl method');
});

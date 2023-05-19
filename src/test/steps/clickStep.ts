import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Click from '../../pages/clickPage';
let pom: Click;

defineStep(`Test the click dsl method`, async function () {
  pom = new Click(fixture.page, fixture.context);
  pom.click();
  fixture.logger.info('Test the click dsl method');
});

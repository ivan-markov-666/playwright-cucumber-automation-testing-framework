import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import GoBack from '../../pages/goBackPage';
let pom: GoBack;

defineStep(`Test the goBack dsl method`, async function () {
  pom = new GoBack(fixture.page, fixture.context);
  fixture.logger.info('Test the goBack dsl method');
  await pom.goBack();
});

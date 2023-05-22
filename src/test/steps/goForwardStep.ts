import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import goForward from '../../pages/goForwardPage';
import GoBack from '../../pages/goBackPage';
let pom: goForward;
let goBack: GoBack;

defineStep(`Test the goForward dsl method`, async function () {
  pom = new goForward(fixture.page, fixture.context);
  goBack = new GoBack(fixture.page, fixture.context);
  await goBack.goBack();
  await pom.goForward();
  fixture.logger.info('Test the goForward dsl method');
});

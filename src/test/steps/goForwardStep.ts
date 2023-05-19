import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import goForward from '../../pages/goForwardPage';
let pom: goForward;

defineStep(`Test the goForward dsl method`, async function () {
  pom = new goForward(fixture.page, fixture.context);
  pom.goForward();
  fixture.logger.info('Test the goForward dsl method');
});

import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import AlertAccept from '../../pages/alertAcceptPage';
let pom: AlertAccept;

defineStep(`Test the alertAccept dsl method`, async function () {
  pom = new AlertAccept(fixture.page, fixture.context);
  fixture.logger.info('Test the alertAccept dsl method');
  await pom.alertAccept();
});

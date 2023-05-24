import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import AlertTypeValueAndAccept from '../../pages/alertTypeValueAndAcceptPage';
let pom: AlertTypeValueAndAccept;

defineStep(`Test the alertTypeValueAndAccept dsl method`, async function () {
  pom = new AlertTypeValueAndAccept(fixture.page, fixture.context);
  fixture.logger.info('Test the alertTypeValueAndAccept dsl method');
  await pom.alertTypeValueAndAccept();
});

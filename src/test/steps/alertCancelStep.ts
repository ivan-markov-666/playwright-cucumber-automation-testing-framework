import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import AlertCancel from '../../pages/alertCancelPage';
let pom: AlertCancel;

defineStep(`Test the alertCancel dsl method`, async function () {
  pom = new AlertCancel(fixture.page, fixture.context);
  pom.alertCancel();
  fixture.logger.info('Test the alertCancel dsl method');
});

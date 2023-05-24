import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import NavigateTo from '../../pages/navigateToPage';
let pom: NavigateTo;

defineStep(`Test the navigateTo dsl method`, async function () {
  pom = new NavigateTo(fixture.page, fixture.context);
  fixture.logger.info('Test the navigateTo dsl method');
  await pom.navigateTo();
});

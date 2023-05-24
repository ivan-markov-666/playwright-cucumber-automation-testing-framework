import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import DoubleClick from '../../pages/doubleClickPage';
let pom: DoubleClick;

defineStep(`Test the doubleClick dsl method`, async function () {
  pom = new DoubleClick(fixture.page, fixture.context);
  fixture.logger.info('Test the doubleClick dsl method');
  await pom.doubleClick();
});

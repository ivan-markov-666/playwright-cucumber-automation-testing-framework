import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import ClickPosition from '../../pages/clickPositionPage';
let pom: ClickPosition;

defineStep(`Test the clickPosition dsl method`, async function () {
  pom = new ClickPosition(fixture.page, fixture.context);
  await pom.clickPosition();
  fixture.logger.info('Test the clickPosition dsl method');
});

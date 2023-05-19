import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import RightClick from '../../pages/rightClickPage';
let pom: RightClick;

defineStep(`Test the rightClick dsl method`, async function () {
  pom = new RightClick(fixture.page, fixture.context);
  pom.rightClick();
  fixture.logger.info('Test the rightClick dsl method');
});

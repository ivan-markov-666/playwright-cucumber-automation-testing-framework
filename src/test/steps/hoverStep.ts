import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Hover from '../../pages/hoverPage';
let pom: Hover;

defineStep(`Test the hover dsl method`, async function () {
  pom = new Hover(fixture.page, fixture.context);
  await pom.hover();
  fixture.logger.info('Test the hover dsl method');
});

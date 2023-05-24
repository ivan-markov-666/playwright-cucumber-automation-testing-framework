import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Hover from '../../pages/hoverPage';
let pom: Hover;

defineStep(`Test the hover dsl method`, async function () {
  pom = new Hover(fixture.page, fixture.context);
  fixture.logger.info('Test the hover dsl method');
  await pom.hover();
});

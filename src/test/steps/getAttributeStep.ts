import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import GetAttribute from '../../pages/getAttributePage';
let pom: GetAttribute;

defineStep(`Test the getAttribute dsl method`, async function () {
  pom = new GetAttribute(fixture.page, fixture.context);
  await pom.getAttribute();
  fixture.logger.info('Test the getAttribute dsl method');
});

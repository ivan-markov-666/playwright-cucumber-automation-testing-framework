import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Pom from '../../pages/realExampleFEPage';
let pom: Pom;

defineStep(`Test the realExampleFE`, async function () {
  pom = new Pom(fixture.page, fixture.context);
  await pom.realExampleFE();
  fixture.logger.info('Test the realExampleFE');
});

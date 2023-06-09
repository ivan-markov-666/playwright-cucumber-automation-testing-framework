import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import GetAllTexts from '../../pages/getAllTextsPage';
let pom: GetAllTexts;

defineStep(`Test the getAllTexts dsl method`, async function () {
  pom = new GetAllTexts(fixture.page, fixture.context);
  fixture.logger.info('Test the getAllTexts dsl method');
  await pom.getAllTexts();
});

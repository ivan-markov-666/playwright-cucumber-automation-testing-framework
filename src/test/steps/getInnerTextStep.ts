import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import GetInnerText from '../../pages/getInnerTextPage';
let pom: GetInnerText;

defineStep(`Test the getInnerText dsl method`, async function () {
  pom = new GetInnerText(fixture.page, fixture.context);
  pom.getInnerText();
  fixture.logger.info('Test the getInnerText dsl method');
});

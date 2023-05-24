import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Element from '../../pages/elementPage';
let pom: Element;

defineStep(`Test the element dsl method`, async function () {
  pom = new Element(fixture.page, fixture.context);
  fixture.logger.info('Test the element dsl method');
  await pom.element();
});

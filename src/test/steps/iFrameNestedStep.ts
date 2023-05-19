import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import IFrameNested from '../../pages/iFrameNestedPage';
let pom: IFrameNested;

defineStep(`Test the iFrameNested dsl method`, async function () {
  pom = new IFrameNested(fixture.page, fixture.context);
  pom.iFrameNested();
  fixture.logger.info('Test the iFrameNested dsl method');
});

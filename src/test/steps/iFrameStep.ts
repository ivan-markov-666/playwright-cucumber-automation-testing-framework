import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import IFrame from '../../pages/iFramePage';
let pom: IFrame;

defineStep(`Test the iFrame dsl method`, async function () {
  pom = new IFrame(fixture.page, fixture.context);
  fixture.logger.info('Test the iFrame dsl method');
  await pom.iFrame();
});

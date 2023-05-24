import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import StaticWait from '../../pages/staticWaitPage';
let pom: StaticWait;

defineStep(`The user waits {int} seconds`, async function (seconds: number) {
  pom = new StaticWait(fixture.page, fixture.context);
  const ms: number = seconds * 1000;
  fixture.logger.info(`The user waits ${seconds} seconds`);
  await pom.staticWait(ms);
});

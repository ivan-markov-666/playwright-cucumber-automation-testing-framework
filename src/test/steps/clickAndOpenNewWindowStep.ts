import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import ClickAndOpenNewWindow from '../../pages/clickAndOpenNewWindowPage';
let pom: ClickAndOpenNewWindow;

defineStep(`Test the clickAndOpenNewWindow dsl method`, async function () {
  pom = new ClickAndOpenNewWindow(fixture.page, fixture.context);
  fixture.logger.info('Test the clickAndOpenNewWindow dsl method');
  await pom.clickAndOpenNewWindow();
});

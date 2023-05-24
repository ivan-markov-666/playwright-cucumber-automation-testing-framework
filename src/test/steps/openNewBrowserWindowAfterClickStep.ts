import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import OpenNewBrowserWindowAfterClick from '../../pages/openNewBrowserWindowAfterClickPage';
let pom: OpenNewBrowserWindowAfterClick;

defineStep(
  `Test the openNewBrowserWindowAfterClick dsl method`,
  async function () {
    pom = new OpenNewBrowserWindowAfterClick(fixture.page, fixture.context);
    fixture.logger.info('Test the openNewBrowserWindowAfterClick dsl method');
    await pom.openNewBrowserWindowAfterClick();
  },
);

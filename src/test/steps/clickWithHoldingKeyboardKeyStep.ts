import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import ClickWithHoldingKeyboardKey from '../../pages/clickWithHoldingKeyboardKeyPage';
let pom: ClickWithHoldingKeyboardKey;

defineStep(
  `Test the clickWithHoldingKeyboardKey dsl method`,
  async function () {
    pom = new ClickWithHoldingKeyboardKey(fixture.page, fixture.context);
    pom.clickWithHoldingKeyboardKey();
    fixture.logger.info('Test the clickWithHoldingKeyboardKey dsl method');
  },
);

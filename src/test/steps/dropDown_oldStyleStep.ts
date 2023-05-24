import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import DropDown_oldStyle from '../../pages/dropDown_oldStylePage';
let pom: DropDown_oldStyle;

defineStep(`Test the dropDown_oldStyle dsl method`, async function () {
  pom = new DropDown_oldStyle(fixture.page, fixture.context);
  fixture.logger.info('Test the dropDown_oldStyle dsl method');
  await pom.dropDown_oldStyle();
});

import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import DropDown_ByDoubleClick from '../../pages/dropDown_ByDoubleClickPage';
let pom: DropDown_ByDoubleClick;

defineStep(`Test the dropDown_ByDoubleClick dsl method`, async function () {
  pom = new DropDown_ByDoubleClick(fixture.page, fixture.context);
  fixture.logger.info('Test the dropDown_ByDoubleClick dsl method');
  await pom.dropDown_ByDoubleClick();
});

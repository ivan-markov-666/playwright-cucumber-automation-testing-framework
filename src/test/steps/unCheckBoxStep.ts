import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import UnCheckBox from '../../pages/unCheckBoxPage';
let pom: UnCheckBox;

defineStep(`Test the unCheckBox dsl method`, async function () {
  pom = new UnCheckBox(fixture.page, fixture.context);
  await pom.unCheckBox();
  fixture.logger.info('Test the unCheckBox dsl method');
});

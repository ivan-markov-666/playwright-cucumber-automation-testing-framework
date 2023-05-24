import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import UnCheckBox from '../../pages/unCheckBoxPage';
let pom: UnCheckBox;

defineStep(`Test the unCheckBox dsl method`, async function () {
  pom = new UnCheckBox(fixture.page, fixture.context);
  fixture.logger.info('Test the unCheckBox dsl method');
  await pom.unCheckBox();
});

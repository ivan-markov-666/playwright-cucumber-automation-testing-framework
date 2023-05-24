import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import CheckRadioButtonCheckBox from '../../pages/checkRadioButtonCheckBoxPage';
let pom: CheckRadioButtonCheckBox;

defineStep(`Test the checkRadioButtonCheckBox dsl method`, async function () {
  pom = new CheckRadioButtonCheckBox(fixture.page, fixture.context);
  fixture.logger.info('Test the checkRadioButtonCheckBox dsl method');
  await pom.checkRadioButtonCheckBox();
});

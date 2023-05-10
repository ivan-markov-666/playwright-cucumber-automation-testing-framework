import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import TextBoxPage from '../../pages/textBoxPage';
let pom: TextBoxPage;

const fullName = 'John Doe';
const email = 'testing@test.com';
const currentAddress = 'Test';
const permanentAddress = 'Test';

Given('Navigate to text-box page', async function () {
  pom = new TextBoxPage(fixture.page, fixture.context);
  await pom.navigateToForm();
  fixture.logger.info('EDIT IT! Message from the logger.');
});

When('Set the viewport to Full HD', async function () {
  await pom.fullHD();
  fixture.logger.info('Set the screen size to Full HD.');
});

When('Fill the Full Name field', async function () {
  await pom.fillFullName(fullName);
  fixture.logger.info('EDIT IT! Message from the logger.');
});

When('Fill the Email field', async function () {
  await pom.fillEmail(email);
  fixture.logger.info('EDIT IT! Message from the logger.');
});

When('Fill the Current Address field', async function () {
  await pom.fillCurrentAddress(currentAddress);
  fixture.logger.info('EDIT IT! Message from the logger.');
});

When('Fill the Permanent Address field', async function () {
  await pom.fillPermanentAddress(permanentAddress);
  fixture.logger.info('EDIT IT! Message from the logger.');
});

When('Click the button Submit', async function () {
  await pom.clickSubmitButton();
  fixture.logger.info('EDIT IT! Message from the logger.');
});

Then('Verify that the form was filled correctly', async function () {
  await pom.validateName();
  fixture.logger.info('EDIT IT! Message from the logger.');
});

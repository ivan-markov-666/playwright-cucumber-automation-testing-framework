import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import Pom from '../../pages/exampleFEPage';
let pom: Pom;

defineStep(`Navigate to the {string} page`, async function (endpoint: string) {
  pom = new Pom(fixture.page, fixture.context);
  fixture.logger.info('Navigate to the "Text Box" page');
  await pom.navigateTo(endpoint);
});

defineStep(
  `Fill with {string} value into the Full Name input text element`,
  async function (fullName: string) {
    fixture.logger.info('Fill with real data into the "Full Name" field');
    await pom.fillFullName(fullName);
  },
);

defineStep(
  `Fill with {string} value into the Email input text element`,
  async function (email: string) {
    fixture.logger.info('Fill with real data into the "Email" field');
    await pom.fillEmail(email);
  },
);

defineStep(
  `Fill with {string} value into the Current Address input text element`,
  async function (currentAddress: string) {
    fixture.logger.info('Fill with real data into the "Current Address" field');
    await pom.fillCurrentAddress(currentAddress);
  },
);

defineStep(
  `Fill with {string} value into the Permanent Address input text element`,
  async function (permanentAddress: string) {
    fixture.logger.info(
      'Fill with real data into the "Permanent Address" field',
    );
    await pom.fillPermanentAddress(permanentAddress);
  },
);

defineStep(
  `Click on the Submit button from the Text Box form`,
  async function () {
    fixture.logger.info('Press the "Submit" button from the "Text Box" form');
    await pom.clickSubmit();
  },
);

defineStep(`Test the realExampleFE`, async function () {
  fixture.logger.info('Test the realExampleFE');
  pom = new Pom(fixture.page, fixture.context);
  await pom.navigateTo(`text-box`);
  await pom.fillFullName(`John Doe`);
  await pom.fillEmail(`test@test.com`);
  await pom.fillCurrentAddress(`Test Current Address`);
  await pom.fillPermanentAddress(`Test Permanent Address`);
  await pom.clickSubmit();
});

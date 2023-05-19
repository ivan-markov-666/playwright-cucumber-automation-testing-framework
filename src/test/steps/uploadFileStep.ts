import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import UploadFile from '../../pages/uploadFilePage';
let pom: UploadFile;

defineStep(`Test the uploadFile dsl method`, async function () {
  pom = new UploadFile(fixture.page, fixture.context);
  pom.uploadFile();
  fixture.logger.info('Test the uploadFile dsl method');
});

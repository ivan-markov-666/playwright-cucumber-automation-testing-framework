import { defineStep } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import DownloadFile from '../../pages/downloadFilePage';
let pom: DownloadFile;

defineStep(`Test the downloadFile dsl method`, async function () {
  pom = new DownloadFile(fixture.page, fixture.context);
  await pom.downloadFile();
  fixture.logger.info('Test the downloadFile dsl method');
});

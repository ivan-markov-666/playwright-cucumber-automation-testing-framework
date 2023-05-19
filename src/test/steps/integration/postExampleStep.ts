import { defineStep } from '@cucumber/cucumber';
import fetch from 'node-fetch'; // You need to install this package with npm install node-fetch
import { fixture } from '../../../hooks/pageFixture';
import { getUnixTime } from '../../../helper/methods/other';

defineStep(`POST example`, async function () {
  const unixTime = getUnixTime();

  const response = await fetch('https://demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: `testUser${unixTime}`,
      password: 'test123wqeqwA421343w@#@#',
    }),
  });

  const data = await response.json();
  console.log(data);

  fixture.logger.info('Test the alertAccept dsl method');
});

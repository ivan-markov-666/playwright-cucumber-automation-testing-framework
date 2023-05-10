/**
 * @description Create folder for test results if it does not exist.
 */

// Import required packages.
import * as fs from 'fs-extra';

// Create folder for test results if it does not exist.
fs.ensureDir('test-results', (err: Error) => {
  // Check if the folder is created successfully.
  if (err) {
    // Log the error if the folder is not created successfully.
    console.error('Folder not created!', err);
  } else {
    // Log the message if the folder is created successfully.
    console.log('Folder "test-results" created successfully');
  }
});

/**
 * @description: This file is used to declare the types of the environment variables defined in the .env file.
 */

// export {} is used to avoid the error TS2304: Cannot find name 'process'. We need to use this because we are using the global namespace. If we don't use this, we will get the error TS2304: Cannot find name 'process'.
export {};

// Declare global namespace. This is used to declare the types of the environment variables defined in the .env file.
declare global {
  // Define the namespace for the NodeJS.
  namespace NodeJS {
    // Define interface for the environment variables.
    interface ProcessEnv {
      // Define the environment variables.
      BROWSER: 'chrome' | 'firefox' | 'webkit';
      ENV: 'dev' | 'qa' | 'prod';
      BASE_URL: string;
      HEADLESS: 'true' | 'false';
    }
  }
}

/**
 * @description Get env file based on the environment. This file is used to set the environment variables.
 */

// Import required packages.
import * as dotenv from 'dotenv';

// Define the function to get the env file based on the environment.
export const getEnv = () => {
  // Get the environment from the .env file.
  dotenv.config({
    // Override the .env file based on the environment.
    override: true,
    // Get the path of the .env file based on the environment.
    path: `src/helper/env/.env.${process.env.ENV}`,
  });
};

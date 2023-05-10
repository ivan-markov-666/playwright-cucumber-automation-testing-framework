/**
 * @description Winston logger configuration file. This file is used to configure the logger.
 */

// Import required packages.
import { transports, format } from 'winston';

// Define the options for the logger. This function is used to configure the logger.
export function options(scenarioName: string) {
  // Return the options for the logger.
  return {
    // Define the transports for the logger.
    transports: [
      // Define the transport for the console. This transport is used to log the messages in the console.
      new transports.File({
        // Define the filename for the console transport. This filename is used to store the logs in the file.
        filename: `test-results/logs/${scenarioName}/log.log`,
        // Defome the level for the console transport. This level is used to log the messages in the console.
        level: 'info',
        // Define the format for the console transport. This format is used to format the messages in the console.
        format: format.combine(
          // Define the timestamp for the console transport.
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          // Define the align for the console transport.
          format.align(),
          // Define the printf for the console transport.
          format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
          ),
        ),
      }),
    ],
  };
}

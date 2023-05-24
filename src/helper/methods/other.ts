import { toggleMessages } from '../../config/configuration';

/**
 * @description         This method is used to catch the error message.
 * @param methodName    Provide the name of the method.
 * @param className     Provide the name of the class.
 * @param error         Provide the error message.
 * @usage               console.log(catchErrorMessage({string}, {string}, {string}));
 * @example             console.log(catchErrorMessage('goto', 'dsl.ts', error));
 */
export function catchErrorMessage(
  methodName: string,
  className: string,
  error: string,
) {
  console.log(
    `\x1b[31mError!\x1b[0m Happened in the '${methodName}' method from '${className}' class. The received error message is: \n\x1b[31m${error}\x1b[0m\n`,
  );
}

export function errorMessage(text: string) {
  console.log(`\x1b[31mError!\x1b[0m ` + text);
}

/**
 * @description       This method is used to print the alert message.
 * @param text        Provide the text of the alert message.
 * @usage             alertMessage({string});
 * @example           alertMessage('The page is loaded.');
 */
export function alertMessage(text: string) {
  console.log(`\x1b[33mAlert!\x1b[0m ${text}`);
}

/**
 * @description       This method is used to print the info message.
 * @param text        Provide the text of the message.
 * @usage             infoMessage({string});
 * @example           infoMessage('The page is loaded.');
 */
export function infoMessage(text: string) {
  console.log(`\x1b[92mMessage:\x1b[0m ${text}`);
}

/**
 * @description       This method is used to print the message. The message will be printed only if the toggleMessages.messages is set to true.
 * @param text        Provide the text of the message.
 * @usage             messages({string});
 * @example           messages('The page is loaded.');
 */
export function messages(text: string) {
  if (toggleMessages.messages) {
    infoMessage(text);
  }
}

/**
 * @description      This method is used to get the current unix time.
 * @returns          Return the current unix time.
 */
export function getUnixTime() {
  return Math.floor(Date.now() / 1000);
}

// src\config\configuration.ts
export const browserConfig = {
  headless: false, //  A boolean value that specifies whether the browser should be launched in headless mode or not. If set to true, the browser will be launched in headless mode. Headless mode means that the browser will run in the background without a graphical user interface. This is useful for automated testing as it reduces the resources needed to run tests and speeds up the testing process.
  slowMo: 100, // A number value that specifies how long to wait, in milliseconds, between each action performed by the test. This is useful for debugging tests as it allows you to see each action being performed in slow motion.
  timeout: 10000, // A number value that specifies the maximum amount of time, in milliseconds, that a test can run before timing out. If a test takes longer than this amount of time, it will be considered a failure.
  args: ['--start-maximized'], // An array of string values that specifies additional arguments to be passed to the browser when it is launched. In this case, the args array contains only one string argument --start-maximized, which tells the browser to start in a maximized window.
  // Add any other browser-related configurations here
};

export const toggleMessages = {
  messages: true, // A boolean value that specifies whether to print the alert messages or not.
};

export const elementTimeOut = {
  timeout: 10000, // A number value that specifies the maximum amount of time, in milliseconds, that a test can run before timing out. If a test takes longer than this amount of time, it will be considered a failure.
};

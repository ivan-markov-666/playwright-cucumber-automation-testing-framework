# Playwright-Cucumber-TypeScript Automation Framework
This repository contains an automation framework that uses Playwright, Cucumber, and TypeScript to perform end-to-end testing on web applications. The framework supports parallel test execution and generates detailed HTML reports. 

## Getting Started

### Prerequisites
Ensure that you have the following installed on your machine:  
- Node.js LTS version
- npm package manager

### Installation
1. Clone the repository to your local machine.
2. Navigate to the project folder using the terminal.
3. Install the required dependencies:
> npm install

### Running Tests
1. To run the tests, execute the following command:
> npm test

2. To rerun failed tests, use the following command:
> npm run test:failed


### Test Reports
After executing the tests, an HTML report will be generated in the `test-results/reports` directory. You can view the report by opening the `index.html` file in a web browser.

## Framework Structure
The framework is organized as follows:
- `src/test/features`: Contains the feature files that describe the test scenarios using Gherkin syntax.
- `src/test/steps`: Contains the step definition files that implement the test steps for the corresponding feature files.
- `src/pages`: Contains the Page Object Model (POM) files that represent the different pages of the web application.
- `src/helper`: Contains utility classes and functions for handling environment variables, generating reports, logging, and more.

## Customization
You can customize the framework by modifying the following files:
- `cucumber.json`: Configure Cucumber settings, such as tags, test execution, and report generation.
- `src/helper/env/env.ts`: Configure environment-specific settings, such as base URL and browser options.
- `tsconfig.json`: Configure TypeScript compiler options.

## Contributing
To contribute to the project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit and push your changes to the new branch.
5. Create a pull request to merge your changes into the main branch.

## License
This project is licensed under the MIT License.







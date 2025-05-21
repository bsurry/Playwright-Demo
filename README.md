## About this Repo

This repository demonstrates my approach to writing Playwright tests, highlighting techniques I use, tricks I find helpful, and new concepts I'm exploring. It is designed to demonstrate my ability to automate with Playwright but also to illustrate my understanding of building a complete testing framework, including reporting, continuous integration, and more.

## About the Author

[Beth Surry](https://www.linkedin.com/in/elizabeth-surry/) - I am a quality engineer with a passion for automation and testing. I enjoy writing impactful tests that fail when they are supposed to and provide quality information always.


## Tools and Packages

- [Playwright](https://playwright.dev): A framework for end-to-end testing.
- [Node.js](https://nodejs.org): JavaScript runtime environment.
- [npm](https://www.npmjs.com): Package manager for JavaScript.
- [allure-playwright](https://www.npmjs.com/package/allure-playwright): Allure Reporting integration for Playwright

## Sites to Test

- [Awesome Sites to Test on](https://github.com/BMayhew/awesome-sites-to-test-on) A list of testing sites
- [Coffee Cart](https://coffee-cart.app/) A site that allows me to build realistic E2E scenarios
- [Evil Tester Test Page](https://testpages.eviltester.com/styled/index.html) Test Page For Testing Specifc UI functions

## Here's What to Check Out

- **`tests/` Directory**: Contains example test scripts.
- **`playwright.config.js`**: Configuration file for Playwright.
- **`test-helpers` Directory**: contains helper functions with shared functions for using in tests

## Links to References I used for learning and inspiration

- [Using Functional Helpers](https://dev.to/muratkeremozcan/page-objects-vs-functional-helpers-2akj) - I did use traditional Page Objects in my last job but I do like the simpicity discussed here so started using this
- [Using POM with Playwright Fixtures](https://kailash-pathak.medium.com/playwright-fixtures-vs-pom-which-one-should-you-choose-d2ff01ec4f58) but then I found that I really liked the POM + fixture model here. I had used fixtures at my previous job but I think this specific method unlocks the full power of them

## Running Tests

To run the tests, use one of the following commands:

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium
```

## Generating Allure Reports

1. Run tests with Allure reporter:
```bash
npx playwright test --reporter=allure-playwright
```

2. Generate the Allure HTML report:
```bash
allure generate ./allure-results -o ./allure-report --clean
```

3. Open the Allure report in your default browser:
```bash
allure open ./allure-report
```

Note: Make sure you have Allure command-line tool installed. If not, install it using:
```bash
npm install -g allure-commandline
```

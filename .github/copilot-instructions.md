# Copilot Instructions for Playwright-Demo

## Project Overview
This repository demonstrates a comprehensive testing framework built with Playwright. It includes page objects, fixtures, reporting, and continuous integration. The tests are designed to be robust, readable, and provide actionable insights.

## Architecture
- **Page Objects**: Located in `page-objects/`, these encapsulate interactions with specific pages.
- **Fixtures**: Custom fixtures in `fixtures/` simplify test setup by instantiating page objects and mocking data.
- **Tests**: Organized in `tests/`:
  - `ui/`: Functional and UI tests.
  - `performance/`: Performance tests using tools like k6.
- **Helpers**: Shared functions in `test-helpers/`.
- **Reporting**: Allure reports are configured for detailed insights into test behaviors.

## Key Patterns and Conventions
### Page Objects
- Encapsulate page-specific interactions.
- Example:
  ```typescript
  class CoffeeShoppingPage {
      async addCoffeeToCart(testId: string) {
          await this.page.getByTestId(testId).click();
      }
  }
  ```

### Fixtures
- Use Playwright's fixture capability to instantiate page objects and mock data.
- Example:
  ```typescript
  coffeeShoppingPage: async ({ page }, use) => {
      const coffeeShoppingPage = new CoffeeShoppingPage(page);
      await use(coffeeShoppingPage);
  },
  ```

### Reporting
- Use `myAllure.ts` to tag tests and page object functions with features for Allure reports.
- Example:
  ```typescript
  export async function feature(prefix: string, feature: string) {
      await allure.feature(`${prefix}-${feature}`);
  }
  ```

## Developer Workflows
### Running Tests
- Run all tests:
  ```bash
  npx playwright test
  ```
- Run specific tests:
  ```bash
  npx playwright test tests/ui/coffee-cart.spec.ts
  ```

### Debugging
- Use Playwright's debug mode:
  ```bash
  npx playwright test --debug
  ```

### Reporting
- Generate Allure reports:
  ```bash
  allure generate allure-results --clean -o allure-report
  ```
- Serve reports locally:
  ```bash
  allure serve allure-report
  ```

## External Dependencies
- **Allure**: For reporting.
- **k6**: For performance testing.

## Examples
### Test Structure
```typescript
import { test, expect } from '@playwright/test';

test('should add a coffee to the cart', async ({ coffeeShoppingPage }) => {
    const item = coffeeItems[0];
    await coffeeShoppingPage.addCoffeeToCart(item.testid);
    await coffeeShoppingPage.checkCartTotal(item.price.toString());
    await coffeeShoppingPage.checkCartCount(1);
});
```

### Mocking Data
```typescript
await page.route('**/list.json', async route => {
    await route.fulfill({ json: coffeeItems });
});
```

## Additional Notes
- Follow naming conventions for test files: `<feature-or-page>.spec.ts`.
- Use `test.step` for better readability and reporting.
- Check the hosted Allure report for behavior mapping: [Playwright Demo Test Report](https://bsurry.github.io/Playwright-Demo/).

Let me know if any sections need clarification or updates!

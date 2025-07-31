# playwright-typescript.instructions.md

## Test Writing Guidelines

### Code Quality Standards

- Locators: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- Assertions: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- Timeouts: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- Clarity: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.

### Test Structure

- Imports: Start with `import { test, expect } from '@playwright/test';` unless we are testing the coffee cart application, which uses the custom versions of test and expect from the `my-coffee-fixtures.ts` file.
- Organization: Group related tests for a feature under a `test.describe()` block.
- Hooks: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- Titles: Follow a clear naming convention, such as `Feature - Specific action or scenario`.
- Fixtures: Use Playwright's fixture system to create reusable page objects or setup conditions. This allows for cleaner test code and better separation of concerns.

### File Organization

- Location: Store all test files in the `tests/` directory. All playwright tests should then be in the `tests/ui/` directory.
- Naming: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- Scope: Aim for one test file per major application feature or page.

### Assertion Best Practices

- UI Structure: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- Element Counts: Use `toHaveCount` to assert the number of elements found by a locator.
- Text Content: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- Navigation: Use `toHaveURL` to verify the page URL after an action.

## Example Test Structure

```typescript
import { test, expect } from '../../fixtures/my-coffee-fixtures';
import { tag, myTags, feature, myFeaturePrefixes } from '../../test-helpers/myAllure';
import coffeeItems from '../../constants/coffeeDrinks';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await tag(myTags.coffee);
});

test.describe('Coffee Cart Main Page', () => {
    test('should load the coffee cart shopping page', async ({ page, coffeeShoppingPage }) => {
        await test.step('Check title and URL', async () => {
            await expect(page).toHaveTitle(/Coffee cart/i);
            await expect(page).toHaveURL(/coffee-cart/);
        });
        await test.step('Check for coffee items and prices', async () => {
            await coffeeShoppingPage.verifyNumberOfItemsOnShoppingPage(9); //should only have 1 item
            for (const item of coffeeItems) {
                await expect.soft(page.getByRole('listitem').getByTestId(item.testid), `${item.name} cup should be displayed`).toBeVisible();
                await expect.soft(page.getByRole('listitem').filter({has: page.getByTestId(item.testid)}), `${item.name} text should be displayed with cup`).toHaveText(new RegExp(item.name));
                await expect.soft(page.getByRole('listitem').filter({has: page.getByTestId(item.testid)}), `${item.name} should show price $${item.price}`).toHaveText(new RegExp(`${item.price}.00`));
            };
        });
    });
});
```

## Test Execution Strategy

1. Initial Run: Execute tests with `npx playwright test --project=chromium`
2. Debug Failures: Analyze test failures and identify root causes
3. Iterate: Refine locators, assertions, or test logic as needed
4. Validate: Ensure tests pass consistently and cover the intended functionality
5. Report: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:

- All locators are accessible and specific and avoid strict mode violations
- Tests are grouped logically and follow a clear structure
- Assertions are meaningful and reflect user expectations
- Tests follow consistent naming conventions
- Code is properly formatted and commented

## Additional Links

- [Code](https://github.com/github/awesome-copilot)
- [Issues](https://github.com/github/awesome-copilot/issues)
- [Pull requests](https://github.com/github/awesome-copilot/pulls)
- [Discussions](https://github.com/github/awesome-copilot/discussions)
- [Actions](https://github.com/github/awesome-copilot/actions)
- [Models](https://github.com/github/awesome-copilot/models)
- [awesome-copilot](https://github.com/github/awesome-copilot/tree/main)
- [instructions](https://github.com/github/awesome-copilot/tree/main/instructions)

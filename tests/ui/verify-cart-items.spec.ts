import { test, expect } from '@playwright/test';
import { CoffeeCartPage } from '../../page-objects/coffee-cart-page';
import coffeeItems from '../../constants/coffeeDrinks';

test.describe('Verify Cart Items', () => {
    test('should verify no items in the cart', async ({ page }) => {
        const coffeeCartPage = new CoffeeCartPage(page);
        await page.goto('/cart');
        await coffeeCartPage.verifyNumberOfItemsInCart(0);
    });

    test('should verify one item in the cart', async ({ page }) => {
        const coffeeCartPage = new CoffeeCartPage(page);
        await page.route('**/list.json', async route => {
            await route.fulfill({
                json: [coffeeItems[0]],
            });
        });
        await page.goto('/');
        await page.getByTestId(coffeeItems[0].testid).click();
        await page.goto('/cart');
        await coffeeCartPage.verifyNumberOfItemsInCart(1);
    });

    test('should verify multiple items in the cart', async ({ page }) => {
        const coffeeCartPage = new CoffeeCartPage(page);
        await page.route('**/list.json', async route => {
            await route.fulfill({
                json: coffeeItems,
            });
        });
        await page.goto('/');
        for (const item of coffeeItems) {
            await page.getByTestId(item.testid).click();
        }
        await page.goto('/cart');
        await coffeeCartPage.verifyNumberOfItemsInCart(coffeeItems.length);
    });
});

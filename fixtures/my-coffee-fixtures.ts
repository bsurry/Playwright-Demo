import { test as base, Page } from '@playwright/test';
import { CoffeeShoppingPage } from '../page-objects/coffee-main-shopping-page';
import { CoffeeCartPage } from '../page-objects/coffee-cart-page';
import coffeeItems from '../constants/coffeeDrinks';

// Define custom fixtures
type MyFixtures = {
    coffeeShoppingPage: CoffeeShoppingPage;
    coffeeCartPage: CoffeeCartPage; //empty cart page
    cartWithOneCoffee: CoffeeCartPage; //cart with one item
    coffeeShoppingPageWithMockCoffee: CoffeeShoppingPage; //main shopping page with coffee items
    coffeeShoppingPageWithMockError: CoffeeShoppingPage; //main shopping page with mocked error
    page: Page;
};

// Extend the base test with custom fixtures
export const test = base.extend<MyFixtures>({
    coffeeShoppingPage: async ({ page }, use) => {
        const coffeeShoppingPage = new CoffeeShoppingPage(page);
        await use(coffeeShoppingPage);
    },
    coffeeShoppingPageWithMockCoffee: async ({ page }, use) => { //this is the main shopping page with mocked coffee items
        const coffeeItems = [
            {
                "name": "Espresso",
                "price": 10,
                "recipe": [
                    { "name": "espresso", "quantity": 30 }
                ]
            }
        ]; //just a single coffee item for testing

        const coffeeShoppingPage = new CoffeeShoppingPage(page);

        await page.route('**/list.json', async route => {
            await route.fulfill({
                json: coffeeItems, // Use the mocked coffee items
            });
        });
        await page.goto('/'); // Navigate to the main shopping page
        await page.waitForURL(/\/$/);
        await use(coffeeShoppingPage); //this page will only have one coffee item
    },
    coffeeShoppingPageWithMockError: async ({ page }, use) => { //this is the main shopping page with mocked coffee items

        const coffeeShoppingPage = new CoffeeShoppingPage(page);

        await page.route('**/list.json', async route => {
            await route.fulfill({
                status: 500, // Mock a server error
            });
        });
        await page.goto('/'); // Navigate to the main shopping page
        await page.waitForURL(/\/$/);
        await use(coffeeShoppingPage); //this page will only have one coffee item
    },
    coffeeCartPage: async ({ page }, use) => { //this is the cart page
        const coffeeCartPage = new CoffeeCartPage(page);
        await page.getByRole('link', { name: 'cart' }).click();
        await page.waitForURL(/cart/);
        await use(coffeeCartPage);
    },
    cartWithOneCoffee: async ({ page }, use) => { //same as above except it adds a coffee to the cart and goes to cart
        const coffeeShoppingPage = new CoffeeShoppingPage(page);
        await coffeeShoppingPage.addCoffeeToCart(coffeeItems[0].testid);
        const cartWithOneCoffee = new CoffeeCartPage(page);
        await page.getByRole('link', { name: 'cart' }).click();
        await page.waitForURL(/cart/);
        await use(cartWithOneCoffee);
    },
});

export const expect = test.expect;

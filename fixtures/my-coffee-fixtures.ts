import { test as base, Page } from '@playwright/test';
import { CoffeeShoppingPage } from '../page-objects/coffee-main-shopping-page';
import { CoffeeCartPage } from '../page-objects/coffee-cart-page';
import coffeeItems from '../constants/coffeeDrinks';

// Define custom fixtures
type MyFixtures = {
    coffeeShoppingPage: CoffeeShoppingPage;
    coffeeCartPage: CoffeeCartPage; //empty cart page
    cartWithOneCoffee: CoffeeCartPage; //cart with one item
    page: Page;
};

// Extend the base test with custom fixtures
export const test = base.extend<MyFixtures>({
    coffeeShoppingPage: async ({ page }, use) => {
        const coffeeShoppingPage = new CoffeeShoppingPage(page);
        await use(coffeeShoppingPage);
    },
    coffeeCartPage: async ({ page }, use) => { //this is the cart page
        const coffeeCartPage = new CoffeeCartPage(page);
        await page.getByRole('link', { name: 'cart' }).click();
        await page.waitForURL(/cart/);
        await use(coffeeCartPage);
    },
    cartWithOneCoffee: async ({ page }, use) => { //same as above except it adds a coffee to the cart and goes to cart
        const coffeeShoppingPage = new CoffeeShoppingPage(page);
        await coffeeShoppingPage.addCoffeeToCart(page, coffeeItems[0].testid);
        const cartWithOneCoffee = new CoffeeCartPage(page);
        await page.getByRole('link', { name: 'cart' }).click();
        await page.waitForURL(/cart/);
        await use(cartWithOneCoffee);
    },
});

export const expect = test.expect;

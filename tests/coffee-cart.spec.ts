import { test, expect } from '@playwright/test';
import { addCoffeeToCart, checkCartTotal, checkCartCount } from '../test-helpers/coffee';
import { tag, myTags, feature, myFeaturePrefixes } from '../test-helpers/myAllure';


const coffeeItems = [
    { testid: 'Espresso', name: 'Espresso', price: 10 },
    { testid: 'Espresso_Macchiato', name: 'Espresso Macchiato', price: 12 },
    { testid: 'Cappuccino', name: 'Cappuccino',  price: 19 }, 
    { testid: 'Mocha', name: 'Mocha',  price: 8 },
    { testid: 'Flat_White', name: 'Flat White',  price: 18 },
    { testid: 'Americano', name: 'Americano',  price: 7 },
    { testid: 'Cafe_Latte', name: 'Cafe Latte',  price: 16 },
    { testid: 'Espresso_Con Panna', name: 'Espresso Con Panna',  price: 14 },
    { testid: 'Cafe_Breve', name: 'Cafe Breve', price: 15 }
];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await tag(myTags.coffee);
});

test.describe('Coffee Cart Main Page', () => {
    test('should load the coffee cart page', async ({ page }) => {
        await test.step('Check title and URL', async () => {
            await expect(page).toHaveTitle(/Coffee cart/i);
            await expect(page).toHaveURL(/coffee-cart/);
        });
        await test.step('Check for coffee items and prices', async () => {
            for (const item of coffeeItems) {
                await expect.soft(page.getByRole('listitem').getByTestId(item.testid), `${item.name} cup should be displayed`).toBeVisible();
                await expect.soft(page.getByRole('listitem').filter({has: page.getByTestId(item.testid)}), `${item.name} text should be displayed with cup`).toHaveText(new RegExp(item.name));
                await expect.soft(page.getByRole('listitem').filter({has: page.getByTestId(item.testid)}), `${item.name} should show price $${item.price}`).toHaveText(new RegExp(`${item.price}.00`));
            };
        });
    });
});

test.describe('Coffee Cart - Add to Cart', () => {
    test('should add a coffee to the cart', async ({ page }) => {
        const item = coffeeItems[0];
        await addCoffeeToCart(page, item.testid);
        await checkCartTotal(page, item.price.toString());
        await checkCartCount(page, 1);
    });

    test('should add multiple coffees to the cart (all 9)', async ({ page }) => {
        let total = 0;
        for (const item of coffeeItems) {
            await addCoffeeToCart(page, item.testid);
            total += item.price;
            await checkCartTotal(page, total.toString());
        };
        await checkCartCount(page, 9);
    });

    test('should be presented an offer after 3 in cart', async ({ page }) => {
        await feature(myFeaturePrefixes.deals, 'Offer-3-in-cart');
        const dealText = `It's your lucky day! Get an extra cup of Mocha for $4.`;
        let total = 0;
        await test.step('Add 3 coffees to the cart', async () => {
            for (let i = 0; i < 3; i++) {
                await expect(page.getByText(dealText), 'Deal should NOT be visible').toBeHidden();
                await addCoffeeToCart(page, coffeeItems[i].testid);
                total += coffeeItems[i].price;
                await checkCartTotal(page, total.toString());
            };
        });
        await expect(page.getByText(dealText), 'Deal should be visible').toBeVisible();
    });
})
import { Page, expect, test } from '@playwright/test';
import { feature, myFeaturePrefixes } from './myAllure';

export async function addCoffeeToCart(page: Page, coffeeTestId: string) {
    await feature(myFeaturePrefixes.addToCart, `Add-${coffeeTestId}-to-Cart`);
    await test.step(`Add ${coffeeTestId} to cart`, async () => {
        await page.getByRole('listitem').filter({has: page.getByTestId(coffeeTestId)}).click();
    });
}

export async function checkCartTotal(page: Page, coffeePrice: string) {
    await feature(myFeaturePrefixes.addToCart, `Main-Page-Checkout-Price`);
    await expect(page.getByTestId('checkout'), `the checkout price should be ${coffeePrice}.00`).toHaveText(new RegExp(`${coffeePrice}.00`));
}

export async function checkCartCount(page: Page, count: number) {
    await expect(page.getByRole('link', { name: 'cart' }), `Cart Count should be ${count}`).toHaveText(new RegExp(count.toString()));

}
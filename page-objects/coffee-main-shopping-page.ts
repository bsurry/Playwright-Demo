import { Page, expect, test } from '@playwright/test';
import { feature, myFeaturePrefixes } from '../test-helpers/myAllure';


export class CoffeeShoppingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        
    }


async addCoffeeToCart(page: Page, coffeeTestId: string) {
    await feature(myFeaturePrefixes.addToCart, `Add-${coffeeTestId}-to-Cart`);
    await test.step(`Add ${coffeeTestId} to cart`, async () => {
        await page.getByRole('listitem').filter({has: page.getByTestId(coffeeTestId)}).click();
    });
}

async checkCartTotal(page: Page, coffeePrice: string) {
    await feature(myFeaturePrefixes.addToCart, `Main-Page-Checkout-Price`);
    await expect(page.getByTestId('checkout'), `the checkout price should be ${coffeePrice}.00`).toHaveText(new RegExp(`${coffeePrice}.00`));
}

async checkCartCount(page: Page, count: number) {
    await expect(page.getByRole('link', { name: 'cart' }), `Cart Count should be ${count}`).toHaveText(new RegExp(count.toString()));

}

}
import { Page, expect, test } from '@playwright/test';
import { feature, myFeaturePrefixes } from '../test-helpers/myAllure';


export class CoffeeShoppingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        
    }


    async addCoffeeToCart(page: Page, coffeeTestId: string) {
        await feature(myFeaturePrefixes.shoppingPage, `Add-${coffeeTestId}-to-Cart`);
        await test.step(`Add ${coffeeTestId} to cart`, async () => {
            await page.getByRole('listitem').filter({has: page.getByTestId(coffeeTestId)}).click();
        });
    }

    async checkCartTotal(page: Page, coffeePrice: string) {
        await feature(myFeaturePrefixes.shoppingPage, `Checkout-Price`);
        await expect(page.getByTestId('checkout'), `the checkout price should be ${coffeePrice}.00`).toHaveText(new RegExp(`${coffeePrice}.00`));
    }

    async checkCartCount(page: Page, count: number) {
        await feature(myFeaturePrefixes.shoppingPage, `Cart-Count`);
        await expect(page.getByRole('link', { name: 'cart' }), `Cart Count should be ${count}`).toHaveText(new RegExp(count.toString()));
    }

    async verifyNumberOfItemsOnShoppingPage(count: number) {
        await feature(myFeaturePrefixes.shoppingPage, `Itens-On-Shopping-Page`);
        await test.step(`Verify number of coffee items on shopping page is ${count}`, async () => {
            const items = this.page.getByRole('list').nth(1).getByRole('listitem');//this is fragile but best I think I can do for now
            await expect(items).toHaveCount(count);
        });
    }
}
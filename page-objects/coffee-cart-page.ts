import { Page, Locator, expect } from '@playwright/test';
import { feature, myFeaturePrefixes } from '../test-helpers/myAllure';

export class CoffeeCartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout').describe('Checkout Button'); // trying out new feature in version 1.53
    }

    async verifyNumberOfItemsInCart(count: number) {
        //TODO
    }

    async verifyTotalCartCost(cost: number) {
        await feature(myFeaturePrefixes.cart, `Cart-Cost`);
        await expect(this.checkoutButton, 'Verify one item in cart').toHaveText(`Total: $${cost.toString()}.00`);
    }

    async removeAllEspressos() {
        //TODO make more generic versions of this
        await feature(myFeaturePrefixes.cart, `Remove-All-Espressos`);
        await this.page.getByLabel('Remove all Espresso').click();
        await expect(this.page.getByText('No coffee, go add some.')).toBeVisible();
    }
}
import { Page, Locator, expect } from '@playwright/test';

export class CoffeeCartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout'); //also contains the total price
    }

    async verifyNumberOfItemsInCart(count: number) {
        //TODO
    }

    async verifyTotalCartCost(cost: number) {
        await expect(this.checkoutButton).toHaveText(`Total: $${cost.toString()}.00`);
    }

    async removeAllEspressos() {
        await this.page.getByLabel('Remove all Espresso').click();
        await expect(this.page.getByText('No coffee, go add some.')).toBeVisible();
    }
}
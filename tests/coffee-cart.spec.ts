import { test, expect } from '../fixtures/my-coffee-fixtures';
import { tag, myTags, feature, myFeaturePrefixes } from '../test-helpers/myAllure';
import { CoffeeCartPage } from '../page-objects/coffee-cart-page';
import coffeeItems from '../constants/coffeeDrinks';

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
    test('should add a coffee to the cart', async ({ page, coffeeShoppingPage }) => {
        const item = coffeeItems[0];
        await coffeeShoppingPage.addCoffeeToCart(page, item.testid);
        await coffeeShoppingPage.checkCartTotal(page, item.price.toString());
        await coffeeShoppingPage.checkCartCount(page, 1);
    });

    test('should add multiple coffees to the cart (all 9)', async ({ page, coffeeShoppingPage }) => {
        //The add to cart process will be slowing down (intentionally) when the cart has more than 7 items. (per documentation)
        let total = 0;
        for (const item of coffeeItems) {
            await coffeeShoppingPage.addCoffeeToCart(page, item.testid);
            total += item.price;
            await coffeeShoppingPage.checkCartTotal(page, total.toString());
        };
        await coffeeShoppingPage.checkCartCount(page, 9);
    });

    test('should be presented an offer after 3 in cart', async ({ page, coffeeShoppingPage }) => {
        await feature(myFeaturePrefixes.deals, 'Offer-3-in-cart');
        const dealText = `It's your lucky day! Get an extra cup of Mocha for $4.`;
        let total = 0;
        await test.step('Add 3 coffees to the cart', async () => {
            for (let i = 0; i < 3; i++) {
                await expect(page.getByText(dealText), 'Deal should NOT be visible').toBeHidden();
                await coffeeShoppingPage.addCoffeeToCart(page, coffeeItems[i].testid);
                total += coffeeItems[i].price;
                await coffeeShoppingPage.checkCartTotal(page, total.toString());
            };
        });
        await expect(page.getByText(dealText), 'Deal should be visible').toBeVisible();
    });
})


test.describe('Coffee Cart - Items in cart', () => {
    //use this to demonstrate the use of fixtures to populate the cart
    test('should have 1 item in the cart', async ({ page, cartWithOneCoffee }) => {
        await cartWithOneCoffee.verifyTotalCartCost(coffeeItems[0].price); //TODO need to get the number in a smarter way
    });
    test('should be able to remove an item from the cart', async ({ page, cartWithOneCoffee }) => {
        await test.step('Remove item from cart', async () => {
            await cartWithOneCoffee.removeAllEspressos();
        });
    }
    );

})
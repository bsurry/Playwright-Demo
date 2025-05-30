import { test, expect } from '../fixtures/my-coffee-fixtures';
import { tag, myTags, feature, myFeaturePrefixes } from '../test-helpers/myAllure';
import coffeeItems from '../constants/coffeeDrinks';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await tag(myTags.coffee);
});

test.describe('Coffee Cart Main Page', () => {
    test('should load the coffee cart shopping page', async ({ page, coffeeShoppingPage }) => {
        await test.step('Check title and URL', async () => {
            await expect(page).toHaveTitle(/Coffee cart/i);
            await expect(page).toHaveURL(/coffee-cart/);
        });
        await test.step('Check for coffee items and prices', async () => {
            await coffeeShoppingPage.verifyNumberOfItemsOnShoppingPage(9); //should only have 1 item
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
        await coffeeShoppingPage.addCoffeeToCart(item.testid);
        await coffeeShoppingPage.checkCartTotal(item.price.toString());
        await coffeeShoppingPage.checkCartCount(1);
    });

    test('should add multiple coffees to the cart (all 9)', async ({ page, coffeeShoppingPage }) => {
        //The add to cart process will be slowing down (intentionally) when the cart has more than 7 items. (per documentation)
        let total = 0;
        for (const item of coffeeItems) {
            await coffeeShoppingPage.addCoffeeToCart(item.testid);
            total += item.price;
            await coffeeShoppingPage.checkCartTotal(total.toString());
        };
        await coffeeShoppingPage.checkCartCount(9);
    });

    test('should be presented an offer after 3 in cart', async ({ page, coffeeShoppingPage }) => {
        await feature(myFeaturePrefixes.deals, 'Offer-3-in-cart');
        const dealText = `It's your lucky day! Get an extra cup of Mocha for $4.`;
        let total = 0;
        await test.step('Add 3 coffees to the cart', async () => {
            for (let i = 0; i < 3; i++) {
                await expect(page.getByText(dealText), 'Deal should NOT be visible').toBeHidden();
                await coffeeShoppingPage.addCoffeeToCart(coffeeItems[i].testid);
                total += coffeeItems[i].price;
                await coffeeShoppingPage.checkCartTotal(total.toString());
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

test.describe('Coffee Cart - Use a Mocked Shopping Page', () => {
    test('Should add a coffee to the cart from a mocked shopping page', async ({ page, coffeeShoppingPageWithMockCoffee }) => {
        await feature(myFeaturePrefixes.addToCart, 'Add-Mocked-Coffee-to-Cart');
        await coffeeShoppingPageWithMockCoffee.verifyNumberOfItemsOnShoppingPage(1); //should only have 1 item
        const item = coffeeItems[0];
        await coffeeShoppingPageWithMockCoffee.addCoffeeToCart(item.testid);
        await coffeeShoppingPageWithMockCoffee.checkCartTotal(item.price.toString());
        await coffeeShoppingPageWithMockCoffee.checkCartCount(1);
    });
    test('Should handle error on mocked shopping page', async ({ page, coffeeShoppingPageWithMockError }) => {
        await test.step('Check for error message', async () => {
            await coffeeShoppingPageWithMockError.verifyNumberOfItemsOnShoppingPage(0); //should have no items
            //unfortunately, there is no visibile error message on the page
        });
    });
});
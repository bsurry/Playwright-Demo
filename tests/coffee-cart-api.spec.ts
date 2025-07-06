import { pwApi, test } from 'pw-api-plugin';
import { expect } from '@playwright/test';
import { tag, myTags, feature, myFeaturePrefixes } from '../test-helpers/myAllure';
import coffeeItems from '../constants/coffeeDrinks';

test.describe('Coffee Cart - GET API', () => {
    test.beforeEach(async () => {
        await tag(myTags.coffee);
    });
    const urlApi = 'https://coffee-cart.app/list.json';
    //this API is quite boring but I just wanted to try out the pw-api-plugin
    test('should return 200 on GET list', async ({ request, page}) => {
        await feature(myFeaturePrefixes.shoppingPage, 'GET-List');
        
        const responseGet = await pwApi.get({ request, page }, urlApi);
        expect(responseGet.status()).toBe(200);
        
        const data = await responseGet.json();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(10);

        for (const item of coffeeItems) {
            const matchingItem = data.find(apiItem => apiItem.name === item.name);
            expect(matchingItem).toBeDefined();
            expect(matchingItem).toMatchObject({
                name: item.name,
                price: item.price
            });

            expect(matchingItem.recipe).toBeInstanceOf(Array);
        }
    });

    //I let copilot suggest the following tests and then I modified them
    test('should verify content type header', async ({ request, page }) => {
        await feature(myFeaturePrefixes.api, 'GET-Headers');
        const response = await pwApi.get({ request, page }, urlApi);
        expect(response.headers()['content-type']).toContain('application/json');
    });

    test('should verify specific coffee details', async ({ request, page }) => {
        await feature(myFeaturePrefixes.api, 'GET-Details');
        
        const response = await pwApi.get({ request, page }, urlApi);
        const data = await response.json();
        const espresso = data.find((item: { name: string; }) => item.name === 'Espresso');

        expect(espresso).toBeDefined();
        expect(espresso.price).toBe(10);
        expect(espresso.recipe).toBeInstanceOf(Array);
        expect(espresso.recipe).toHaveLength(1);
        expect(espresso.recipe[0].name).toBe('espresso');
        expect(espresso.recipe[0].quantity).toBe(30);
    });

    test('should validate schema of each coffee item', async ({ request, page }) => {
        const response = await pwApi.get({ request, page }, urlApi);
        const data = await response.json();
        for (const item of data) {
            expect(item).toHaveProperty('name');
            expect(typeof item.name).toBe('string');
            expect(item).toHaveProperty('price');
            expect(typeof item.price).toBe('number');
            expect(item).toHaveProperty('recipe');
            expect(Array.isArray(item.recipe)).toBe(true);
        }
    });

    test('should validate recipe ingredients', async ({ request, page }) => {
        const response = await pwApi.get({ request, page }, urlApi);
        const data = await response.json();
        for (const item of data) {
            for (const ingredient of item.recipe) {
                expect(ingredient).toHaveProperty('name');
                expect(typeof ingredient.name).toBe('string');
                expect(ingredient).toHaveProperty('quantity');
                expect(typeof ingredient.quantity).toBe('number');
            }
        }
    });
});
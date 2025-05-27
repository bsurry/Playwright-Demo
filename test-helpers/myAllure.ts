
import * as allure from "allure-js-commons";

export enum myTags {
    coffee = 'coffee',
    eviltester = 'eviltester',
}

export enum myFeaturePrefixes {
    addToCart = 'ADDTOCART',
    cart = 'CART',
    checkout = 'CHECKOUT',
    deals = 'DEALS',
    hover = 'HOVER',
    dragDrop = 'DRAGDROP',
    shoppingPage = 'SHOPPINGPAGE',
}

export async function tag(tag: myTags) {
    await allure.tag(tag);
}

export async function feature(prefix: myFeaturePrefixes, feature: string) {
    await allure.feature(`${prefix}-${feature}`);
}
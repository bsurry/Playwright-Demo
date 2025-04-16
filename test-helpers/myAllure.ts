
import * as allure from "allure-js-commons";

export enum myTags {
    smoke = 'smoke',
    regression = 'regression',
    sanity = 'sanity',
}

export async function tag(tag: string) {
    await allure.tag(tag);
}
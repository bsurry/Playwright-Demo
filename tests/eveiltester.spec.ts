import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Hover Page', () => {
  test('Should be able to observe hover behavior', async ({ page }) => {
    const topHoverText = page.getByText('paragraph');
    const bottomHoverText = page.getByText('child div content');
    await page.getByText('Hover Test Page').click();
    await page.waitForURL(/hover/);
    await expect(page.getByText('CSS Pseudo Class - hover'), 'Should be on the Hover Page').toBeVisible();
    await page.getByText('CSS Pseudo Class - hover').hover(); //hover away from the buttons below
    await expect(topHoverText).not.toBeVisible();
    await expect(bottomHoverText).not.toBeVisible();
    await page.getByText('Hover Para').hover();
    await expect(topHoverText).toBeVisible();
    await expect(bottomHoverText).not.toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByText('Hover Div').hover();
    await expect(topHoverText).not.toBeVisible();
    await expect(bottomHoverText).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('Should be able to drag and drop', async ({ page }) => {
    await page.getByText('Drag And Drop Test Page (JavaScript)').click();
    await page.waitForURL(/drag-drop-javascript/);
    await page.getByText('Drag Me').first().dragTo(page.getByText('Drop here', { exact: true }));
    await expect(page.getByText('Dropped!')).toBeVisible();
  });

  test('TBD', async ({ page }) => {
    //TODO
  });
});

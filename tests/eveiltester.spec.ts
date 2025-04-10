import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Evil Tester Test Page', () => {
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
  });

  test('Should be able to drag and drop', async ({ page }) => {
    await test.step('Navigate to Drag and Drop', async () => {
      await page.getByText('Drag And Drop Test Page (JavaScript)').click();
      await page.waitForURL(/drag-drop-javascript/);
    });
    await test.step('Drag and Drop to first box', async () => {
      await page.getByText('Drag Me').first().dragTo(page.getByText('Drop here', { exact: true }).nth(0));
      await expect(page.getByText('Dropped!'), 'First Box should change text when dropped on').toBeVisible(); //I Really like to use the custom error text on expects
    });
    await test.step('Drag and Drop to second box', async () => {
      await page.getByText('Drag Me').nth(1).dragTo(page.getByText('No Drop here', { exact: true }));
      await expect(page.getByText('Dropped!'), 'Both boxes should have changed text when dropped on').toHaveCount(2);
    });
  });
});

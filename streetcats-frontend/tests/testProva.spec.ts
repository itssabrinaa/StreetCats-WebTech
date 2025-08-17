import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await expect(page).toHaveTitle(/StreetCats/i);
});
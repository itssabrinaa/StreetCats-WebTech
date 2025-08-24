import { test, expect } from '@playwright/test';

test('cat - redirect da cat a map', async ({ page }) => {
  await page.goto('http://localhost:4200/cats/wrong');

  await expect(page).toHaveURL(/\/map\?nonexistent=1/);
  await expect(page.locator('.toast-warning')).toContainText('Ops... Hai cercato un gatto che non esiste, riprova.');
});


test('cat - mostra i dettagli del gatto', async ({ page }) => {
  await page.goto('http://localhost:4200/cats/1');

  await expect(page.locator('.cat-title')).toBeVisible();

  const img = page.locator('.cat-img');
  await expect(img).toBeVisible();

  const src = await img.getAttribute('src');
  expect(src).not.toBeNull();
});


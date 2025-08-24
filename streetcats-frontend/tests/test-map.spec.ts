import { test, expect } from '@playwright/test';

test('map - mostra i marker e naviga ai dettagli', async ({ page }) => {
  await page.goto('http://localhost:4200/map');

  const marker = page.locator('.leaflet-marker-icon').first();
  await expect(marker).toBeVisible();
  await marker.click({ force: true });

  const dettagliBtn = page.getByRole('button', { name: 'Dettagli' });
  await expect(dettagliBtn).toBeVisible();

  await dettagliBtn.click();
  await expect(page).toHaveURL(/\/cats\/\d+/);
});

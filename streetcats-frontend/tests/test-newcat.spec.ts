import { test, expect } from '@playwright/test';

test('new cat - impossibile accedere senza autorizzazione', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByRole('button', { name: 'Nuovo gatto' }).click();
  await expect(page.locator('.toast-warning')).toContainText('Non autorizzato');
});
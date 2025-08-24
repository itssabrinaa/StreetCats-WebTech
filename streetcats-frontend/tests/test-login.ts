import { test, expect } from '@playwright/test';

test('login - compila tutti i campi', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await expect(page.locator('.alert')).toContainText('Compila tutti i campi per continuare.');
});


import { test, expect } from '@playwright/test';

test('signup - compila tutti i campi', async ({ page }) => {
  await page.goto('http://localhost:4200/signup');

  await page.locator('#name').click();
  await page.locator('#email').click();
  await page.locator('#pwd').click();
  await page.locator('#pwd2').click();

  await expect(page.locator('.alert')).toContainText('Compila tutti i campi per continuare.');
});


test('signup - password non valida', async ({ page }) => {
  await page.goto('http://localhost:4200/signup');

  await page.locator('#pwd').fill('abc');

  await expect(page.getByText('La password inserita non è valida.')).toBeVisible();
});


test('signup - conferma password non corrisponde', async ({ page }) => {
  await page.goto('http://localhost:4200/signup');

  await page.locator('#pwd').fill('Password1!');
  await page.locator('#pwd2').fill('Diversa123!');

  await expect(page.getByText('La conferma della password deve coincidere con la password inserita sopra.')).toBeVisible();
});



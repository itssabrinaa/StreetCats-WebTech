import { test, expect } from '@playwright/test';

test('login - compila tutti i campi', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.locator('#email').click();
  await page.locator('#pwd').click();

  await expect(page.locator('.alert')).toContainText('Compila tutti i campi per continuare.');
  await expect(page.locator('#login-btn')).toBeDisabled();
});


test('login - email non valida', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.locator('#email').fill('abc');
  await page.locator('#pwd').fill('MyP4ssword!');

  await expect(page.locator('.alert')).toContainText('Compila tutti i campi per continuare.');
  await expect(page.locator('#login-btn')).toBeDisabled();
});


test('login - password non valida', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.locator('#email').fill('email@provider.it');
  await page.locator('#pwd').fill('abc');

  await expect(page.locator('.alert')).toContainText('Compila tutti i campi per continuare.');
  await expect(page.locator('#login-btn')).toBeDisabled();
});


test('login - credenziali errate', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.locator('#email').fill('email@provider.it');
  await page.locator('#pwd').fill('abcd'); //Attenzione: queste credenziali non devono esistere nel db

  const loginBtn = page.locator('#login-btn');
  await expect(loginBtn).toBeEnabled();
  await loginBtn.click();

  await expect(page.locator('.toast-error')).toContainText('Credenziali errate');
});
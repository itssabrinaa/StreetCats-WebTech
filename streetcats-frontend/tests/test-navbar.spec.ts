import { test, expect } from '@playwright/test';

test('navbar - mostra i link giusti prima e dopo il Log In', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toHaveCount(0);
  await expect(page.locator('.user-avatar')).toHaveCount(0);

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#email').fill('email@provider.it'); //Attenzione: queste credenziali devono esistere nel db
  await page.locator('#pwd').fill('MyP4ssword!');

  await page.locator('#login-btn').click();

  await expect(page.locator('.user-avatar')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log in' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Sign up' })).toHaveCount(0);
});

test('navbar - mostra i link giusti dopo il Log Out', async ({ page }) => {
  await page.goto('http://localhost:4200/home');

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#email').fill('email@provider.it'); //Attenzione: queste credenziali devono esistere nel db
  await page.locator('#pwd').fill('MyP4ssword!');

  await page.locator('#login-btn').click();

  const logout = page.getByRole('link', { name: 'Log out' });
  await expect(logout).toBeVisible();
  await logout.click();

  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toHaveCount(0);
  await expect(page.locator('.user-avatar')).toHaveCount(0);

  await expect(page.locator('.toast-success', { hasText: 'A presto!' })).toBeVisible();
});

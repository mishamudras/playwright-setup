import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Misha');
  await page.getByPlaceholder('Last Name').fill('Testovaci');
  await page.getByPlaceholder('Zip/Postal Code').fill('30100');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('locked out user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});
test('sort products by price low to high', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const sortDropdown = page.locator('[data-test="product-sort-container"]');
await sortDropdown.selectOption({ value: 'lohi' });
const firstPrice = await page.locator('.inventory_item_price').first().textContent();
const lastPrice = await page.locator('.inventory_item_price').last().textContent();
const firstPriceNum = parseFloat(firstPrice!.replace('$', ''));
const lastPriceNum = parseFloat(lastPrice!.replace('$', '')); 
expect(firstPriceNum).toBeLessThan(lastPriceNum);
});

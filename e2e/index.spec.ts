import { test, expect } from '@playwright/test';

import { openCloseCart, openCloseAuth } from './utils/navbar';

const mobile_size = { width: 390, height: 650 }
const url = 'http://localhost:3000/';

test('Home: Elements are visible', async ({ page }) => {
  await page.goto(url);

  await expect(page.getByLabel('navbar')).toBeVisible();
  await expect(page.getByLabel('annoucement-bar')).toBeVisible();
  await expect(page.getByLabel('carousel')).toBeVisible();
  await expect(page.getByLabel('new-arrival-section')).toBeVisible();
  await expect(page.getByLabel('footer')).toBeVisible();

  await page.setViewportSize(mobile_size);
  await expect(page.getByLabel('navbar')).toBeVisible();
  await expect(page.getByLabel('annoucement-bar')).toBeVisible();
  await expect(page.getByLabel('carousel')).toBeVisible();
  await expect(page.getByLabel('new-arrival-section')).toBeVisible();
  await expect(page.getByLabel('footer')).toBeVisible();
})

test('Home: Cart modal is working properly', async ({ page }) => {
  await page.goto(url);

  await openCloseCart(page);
  // Mobile test
  await page.setViewportSize(mobile_size);
  await openCloseCart(page, true);
})


test('Home: Auth modal is working properly', async ({ page }) => {
  await page.goto(url);

  await openCloseAuth(page);
    // Mobile test
  await page.setViewportSize(mobile_size);
  await openCloseAuth(page, true);
})

test('Home: Quick View and Quick Add To Cart modal are working properly', async ({ page }) => {
  await page.goto(url);

  const product_number: number = await page.getByLabel("product-cart").count();
  if (product_number < 0) {
    throw Error ("Expect at least 1 product to show in Home page.")
  }

  const products = await page.$$('div[aria-label="product-cart"]');
  for (let i=0; i<products.length; i++) {
    await products[i].hover();
    await expect(page.getByTestId('quick-view-button-'+i)).toBeVisible();
    await page.getByTestId('quick-view-button-'+i).click();

    await expect(page.getByLabel('quick-view-modal')).toBeVisible();
    await page.locator('button[name="close-quick-view-modal"]').click();
    await expect(page.getByLabel('quick-view-modal')).toBeHidden();

    await page.getByTestId('add-to-cart-button-'+i).click();

    await expect(page.getByLabel('quick-view-modal')).toBeVisible();
    await page.locator('button[name="close-quick-view-modal"]').click();
    await expect(page.getByLabel('quick-view-modal')).toBeHidden();
  }

})

test('Home: Shop all button is working properly', async ({ page }) => {
  await page.goto(url);

  await page.locator('button[name="shop-all"]').click();
  await expect(page).toHaveURL('http://localhost:3000/shop-collection')
})
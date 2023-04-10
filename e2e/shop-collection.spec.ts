import { test, expect } from '@playwright/test';

import { openCloseCart, openCloseAuth } from './utils/navbar';

const mobile_size = { width: 390, height: 650 };
const url = 'http://localhost:3000/shop-collection';

test('Shop collection: Elements are visible', async ({ page }) => {
  await page.goto(url);
  let productCount;

  await expect(page.getByLabel('filter-container')).toBeVisible();
  await expect(page.getByLabel('product-container')).toBeVisible();
  productCount = await page.getByLabel('product-cart').count();
  expect(productCount).toBeGreaterThan(0);

  await page.setViewportSize(mobile_size);
  await expect(page.getByLabel('filter-container')).toBeVisible();
  await expect(page.getByLabel('product-container')).toBeVisible();
  productCount = await page.getByLabel('product-cart').count();
  expect(productCount).toBeGreaterThan(0);
});

test('Shop Collection: Cart modal is working properly', async ({ page }) => {
  await page.goto(url);

  await openCloseCart(page);
  // Mobile test
  await page.setViewportSize(mobile_size);
  await openCloseCart(page, true);
});

test('Shop Collection: Auth modal is working properly', async ({ page }) => {
  await page.goto(url);

  await openCloseAuth(page);
  // Mobile test
  await page.setViewportSize(mobile_size);
  await openCloseAuth(page, true);
});

test('Shop Collection: Quick View and Quick Add To Cart modal are working properly', async ({
  page,
}) => {
  await page.goto(url);

  const product_number: number = await page.getByLabel('product-cart').count();
  if (product_number < 0) {
    throw Error('Expect at least 1 product to show in Home page.');
  }

  const products = await page.$$('div[aria-label="product-cart"]');
  for (let i = 0; i < products.length; i++) {
    const name = await products[i].$('div[id="product-name"]');
    if (!name) throw Error('Product name not found.');

    // test quick view button
    await products[i].hover();
    await expect(page.getByTestId('quick-view-button-' + i)).toBeVisible();
    await page.getByTestId('quick-view-button-' + i).click();
    await expect(page.getByLabel('quick-view-modal')).toBeVisible();
    await page.getByTestId('quick-view-product-name').waitFor(); // wait while fetching
    expect(
      page.getByTestId('quick-view-product-name').innerText(),
    ).toStrictEqual(name.innerText());
    await page.locator('button[name="close-quick-view-modal"]').click();
    await expect(page.getByLabel('quick-view-modal')).toBeHidden();

    // test add to cart button
    await page.getByTestId('add-to-cart-button-' + i).click();
    await expect(page.getByLabel('quick-view-modal')).toBeVisible();
    await page.getByTestId('quick-view-product-name').waitFor(); // wait while fetching
    expect(
      page.getByTestId('quick-view-product-name').innerText(),
    ).toStrictEqual(name.innerText());
    await page.locator('button[name="close-quick-view-modal"]').click();
    await expect(page.getByLabel('quick-view-modal')).toBeHidden();
  }
});

test('Shop Collection: Add to cart mechanism is working properly', async ({
  page,
}) => {
  await page.goto(url);

  const product_number: number = await page.getByLabel('product-cart').count();
  if (product_number < 0) {
    throw Error('Expect at least 1 product to show in Home page.');
  }

  let badgeEle = await page.$('span[aria-label="cart-number-badge"]');
  let cartNumber = await badgeEle?.innerText();

  await page.getByTestId('add-to-cart-button-' + 0).click();
  await expect(page.getByLabel('quick-view-modal')).toBeVisible();
  await page.getByTestId('quick-view-product-name').waitFor(); // wait while fetching

  await page.getByTestId('color-select-1').click();
  await page.getByLabel('size-select').selectOption({ index: 1 });
  await page.locator('button[name="add-to-my-cart"]').click();
  await expect(page.getByLabel('quick-view-modal')).toBeHidden();

  let newCartNumber = await badgeEle?.innerText();
  expect(cartNumber).not.toStrictEqual(newCartNumber);
});

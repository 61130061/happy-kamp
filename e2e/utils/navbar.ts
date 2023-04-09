import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const openCloseCart = async (page: Page, isMobile?: boolean) => {
  await expect(page.getByLabel('cart-modal')).not.toBeInViewport();

  if (!isMobile) {
    await page.locator('button[name="cart-button"]').click();
  } else {
    await page.locator('button[name="cart-button-mobile"]').click();
  }

  await expect(page.getByLabel('cart-modal')).toBeInViewport();
  await page.locator('button[name="close-cart-modal"]').click();
  await expect(page.getByLabel('cart-modal')).not.toBeInViewport();
};

export const openCloseAuth = async (page: Page, isMobile?: boolean) => {
  await expect(page.getByLabel('autho-modal')).not.toBeInViewport();

  if (!isMobile) {
    await page.locator('button[name="login-button"]').click();
  } else {
    await page.locator('button[name="burger-button"]').click();
    await page.locator('button[name="login-button-mobile"]').click();
  }

  await expect(page.getByLabel('auth-modal')).toBeInViewport();
  await page.locator('button[name="close-auth-modal"]').click();
  await expect(page.getByLabel('autho-modal')).not.toBeInViewport();
};

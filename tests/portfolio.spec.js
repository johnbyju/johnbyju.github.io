const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('John Byju Developer Portfolio - macOS Cards Slider Tests', () => {
  let fileUrl;

  test.beforeAll(() => {
    // Target local Vite dev server
    fileUrl = process.env.BASE_URL || 'http://localhost:5173';
  });

  test('Page loads and preloader fades out successfully', async ({ page }) => {
    await page.goto(fileUrl);

    // Verify preloader is initially visible
    const preloader = page.locator('#preloader');
    await expect(preloader).toBeVisible();

    // Wait for the preloader to disappear (timeout 5s)
    await expect(preloader).toBeHidden({ timeout: 5000 });
    
    // Check that title is correct
    await expect(page).toHaveTitle(/John Byju/);
  });

  test('Work Experience section renders 3 cards in horizontal slider', async ({ page }) => {
    await page.goto(fileUrl);
    // Wait for preloader to fade
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    // Locate the track
    const track = page.locator('.experience-track');
    await expect(track).toBeVisible();

    // Verify there are exactly 3 cards
    const cards = page.locator('.experience-track .ide-card');
    await expect(cards).toHaveCount(3);

    // Verify individual cards are visible
    const marmaCard = page.locator('.ide-card[data-card="marma"]');
    const throughbitCard = page.locator('.ide-card[data-card="throughbit"]');
    const xzectCard = page.locator('.ide-card[data-card="xzect"]');

    await expect(marmaCard).toBeVisible();
    await expect(throughbitCard).toBeVisible();
    await expect(xzectCard).toBeVisible();
  });

  test('macOS close dot collapses card and Restore button resets it', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const marmaCard = page.locator('.ide-card[data-card="marma"]');
    const closeBtn = marmaCard.locator('.ctrl-dot.close');
    const restoreContainer = page.locator('#restore-container');
    const restoreBtn = page.locator('#restore-btn');

    // Verify card is not collapsed initially and restore bar is hidden
    await expect(marmaCard).not.toHaveClass(/collapsed/);
    await expect(restoreContainer).not.toHaveClass(/show/);

    // Click close dot on Marma Fintech card
    await closeBtn.click();

    // Verify card collapses and restore bar shows
    await expect(marmaCard).toHaveClass(/collapsed/);
    await expect(restoreContainer).toHaveClass(/show/);

    // Click Restore button
    await restoreBtn.click();

    // Verify card is restored and restore bar is hidden
    await expect(marmaCard).not.toHaveClass(/collapsed/);
    await expect(restoreContainer).not.toHaveClass(/show/);
  });

  test('Theme toggle switcher updates page colors successfully', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const themeToggle = page.locator('.theme-toggle');
    const body = page.locator('body');

    // Dark mode by default
    await expect(body).not.toHaveClass(/light-mode/);

    // Toggle theme to light mode
    await themeToggle.click();
    await expect(body).toHaveClass(/light-mode/);

    // Toggle back to dark mode
    await themeToggle.click();
    await expect(body).not.toHaveClass(/light-mode/);
  });
});

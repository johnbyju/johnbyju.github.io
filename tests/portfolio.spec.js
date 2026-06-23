import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('John Byju Developer Portfolio - macOS Cards Slider Tests & General Features', () => {
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
    const throughbitCard = page.locator('.ide-card[data-card="throughbit"]');
    const xzectCard = page.locator('.ide-card[data-card="xzect"]');
    
    const marmaClose = marmaCard.locator('.ctrl-dot.close');
    const throughbitClose = throughbitCard.locator('.ctrl-dot.close');
    const xzectClose = xzectCard.locator('.ctrl-dot.close');
    
    const restoreContainer = page.locator('#restore-container');
    const restoreBtn = page.locator('#restore-btn');

    // Verify cards are not collapsed initially and restore bar is hidden
    await expect(marmaCard).not.toHaveClass(/collapsed/);
    await expect(throughbitCard).not.toHaveClass(/collapsed/);
    await expect(xzectCard).not.toHaveClass(/collapsed/);
    await expect(restoreContainer).not.toHaveClass(/show/);

    // Click close dot on Marma Fintech card
    await marmaClose.click();
    await expect(marmaCard).toHaveClass(/collapsed/);
    await expect(restoreContainer).toHaveClass(/show/);

    // Click close dot on ThroughBit card
    await throughbitClose.click();
    await expect(throughbitCard).toHaveClass(/collapsed/);

    // Click close dot on Xzect Labs card
    await xzectClose.click();
    await expect(xzectCard).toHaveClass(/collapsed/);

    // Click Restore button
    await restoreBtn.click();

    // Verify all cards are restored and restore bar is hidden
    await expect(marmaCard).not.toHaveClass(/collapsed/);
    await expect(throughbitCard).not.toHaveClass(/collapsed/);
    await expect(xzectCard).not.toHaveClass(/collapsed/);
    await expect(restoreContainer).not.toHaveClass(/show/);
  });

  test('Theme toggle switcher updates page colors and persists in localStorage', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const themeToggle = page.locator('.theme-toggle');
    const body = page.locator('body');

    // Dark mode by default
    await expect(body).not.toHaveClass(/light-mode/);

    // Toggle theme to light mode
    await themeToggle.click();
    await expect(body).toHaveClass(/light-mode/);

    // Reload page to check persistence
    await page.reload();
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });
    await expect(body).toHaveClass(/light-mode/);

    // Toggle back to dark mode
    await themeToggle.click();
    await expect(body).not.toHaveClass(/light-mode/);

    // Reload page to check persistence
    await page.reload();
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });
    await expect(body).not.toHaveClass(/light-mode/);
  });

  test('Certificates modal opens with correct content and closes properly', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const certCard = page.locator('.cert-card').first();
    await expect(certCard).toBeVisible();

    // Click certificate card to open modal
    await certCard.click();

    const modal = page.locator('#cert-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/open/);

    // Verify modal contents
    const modalTitle = modal.locator('#modal-title');
    const modalIssuer = modal.locator('#modal-issuer');
    await expect(modalTitle).toHaveText('Python Certification');
    await expect(modalIssuer).toContainText('GUVI Geek Networks');

    // Close via close button
    const closeBtn = modal.locator('#modal-close');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();

    // Reopen and close via overlay click
    await certCard.click();
    await expect(modal).toBeVisible();
    const overlay = modal.locator('#modal-overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    await expect(modal).not.toBeVisible();

    // Reopen and close via Escape key
    await certCard.click();
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Projects section displays all 4 project cards successfully', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const allCards = page.locator('.project-card');
    await expect(allCards).toHaveCount(4);

    // Verify some specific project cards are visible
    const zentroCard = allCards.filter({ hasText: 'Zentro' });
    const citizenCard = allCards.filter({ hasText: 'Whistling Citizen' });
    await expect(zentroCard).toBeVisible();
    await expect(citizenCard).toBeVisible();
  });

  test('Contact Form handles validation and submits mockup mode successfully', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const nameInput = page.locator('#form-name');
    const emailInput = page.locator('#form-email');
    const subjectInput = page.locator('#form-subject');
    const messageInput = page.locator('#form-message');
    const submitBtn = page.locator('#form-submit-btn');
    const statusBox = page.locator('#form-status');

    // 1. Submit empty form
    await submitBtn.click();
    await expect(statusBox).toBeVisible();
    await expect(statusBox).toHaveClass(/error/);
    await expect(statusBox).toHaveText('Please fill in all required fields.');

    // 2. Submit with invalid email
    await nameInput.fill('John Doe');
    await emailInput.fill('invalid-email');
    await subjectInput.fill('Collaboration Opportunity');
    await messageInput.fill('Let us work together.');
    await submitBtn.click();
    await expect(statusBox).toBeVisible();
    await expect(statusBox).toHaveClass(/error/);
    await expect(statusBox).toHaveText('Please enter a valid email address.');

    // 3. Submit with valid data (mockup mode)
    await emailInput.fill('johndoe@example.com');
    await submitBtn.click();
    
    // Status box should show sending state or success message
    await expect(statusBox).toBeVisible({ timeout: 5000 });
    await expect(statusBox).toHaveClass(/success/);
    await expect(statusBox).toContainText('Message sent successfully (mockup mode)');

    // Verify form fields are cleared
    await expect(nameInput).toHaveValue('');
    await expect(emailInput).toHaveValue('');
    await expect(subjectInput).toHaveValue('');
    await expect(messageInput).toHaveValue('');
  });

  test('Mobile responsive menu drawer toggles and closes on navigation click', async ({ page }) => {
    // Set viewport to mobile size (iPhone XR / 11)
    await page.setViewportSize({ width: 414, height: 896 });
    
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const menuBtn = page.locator('#menu-btn');
    const nav = page.locator('#nav');

    // Initial state: menu drawer should not be open
    await expect(menuBtn).toBeVisible();
    await expect(nav).not.toHaveClass(/open/);

    // Open menu
    await menuBtn.click();
    await expect(nav).toHaveClass(/open/);

    // Close menu by clicking a nav link
    const aboutLink = nav.locator('a[href="#about"]');
    await aboutLink.click();
    await expect(nav).not.toHaveClass(/open/);

    // Open again and close using menu button toggle
    await menuBtn.click();
    await expect(nav).toHaveClass(/open/);
    await menuBtn.click();
    await expect(nav).not.toHaveClass(/open/);
  });

  test('Live Clock element displays current Kolkata time and date', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForSelector('#preloader', { state: 'hidden', timeout: 5000 });

    const clockTime = page.locator('.live-clock .clock-time');
    const clockAmPm = page.locator('.live-clock .clock-ampm');
    const clockDate = page.locator('.live-clock .clock-date');

    await expect(clockTime).toBeVisible();
    await expect(clockAmPm).toBeVisible();
    await expect(clockDate).toBeVisible();

    // Verify content formats using regex
    await expect(clockTime).toHaveText(/^\d{2}:\d{2}$/);
    await expect(clockAmPm).toHaveText(/^(am|pm)$/);
    await expect(clockDate).not.toBeEmpty();
  });
});

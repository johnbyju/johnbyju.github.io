import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://itsvg.in/');
  await page.waitForTimeout(3000); // Wait 3s for clock to render
  const clockHtml = await page.locator('.hidden.md\\:flex.justify-center.items-center.gap-2').innerHTML();
  console.log('CLOCK HTML:', clockHtml);
  await browser.close();
})().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});

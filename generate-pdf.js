import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const filePath = path.join(__dirname, 'resume.html');
  const fileUrl = `file://${filePath}`;
  
  console.log(`Navigating to ${fileUrl}...`);
  await page.goto(fileUrl);
  await page.waitForLoadState('networkidle');

  const pdfPath = path.join(__dirname, 'public', "John's Resume.pdf");
  console.log(`Printing PDF to ${pdfPath}...`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  console.log('PDF generated successfully!');
  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

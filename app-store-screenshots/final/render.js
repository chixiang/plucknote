// render.js — Render 5 final App Store screenshots with iPhone frame
// Output: ../output-final/ (5 PNGs at 1290×2796)

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS = [
  { name: '01-hero', suffix: '' },
  { name: '02-stats', suffix: '' },
  { name: '03-someday', suffix: '' },
  { name: '04-sound', suffix: '' },
  { name: '05-cross-platform', suffix: '' },
  { name: '01-hero', suffix: '-en' },
  { name: '02-stats', suffix: '-en' },
  { name: '03-someday', suffix: '-en' },
  { name: '04-sound', suffix: '-en' },
  { name: '05-cross-platform', suffix: '-en' },
];

const WIDTH = 1290;
const HEIGHT = 2796;
const DEVICE_SCALE = 1;

const outputDir = path.join(__dirname, '..', 'output-final');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  console.log('Launching Puppeteer for final screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { name, suffix } of SCREENSHOTS) {
    const htmlName = `${name}${suffix}`;
    const htmlPath = path.resolve(__dirname, `${htmlName}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`  Skip ${htmlName}: HTML file not found`);
      continue;
    }
    console.log(`Rendering ${htmlName}...`);

    const page = await browser.newPage();
    await page.setViewport({
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: DEVICE_SCALE,
    });
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 300));

    const outPath = path.join(outputDir, `${htmlName}-final.png`);
    await page.screenshot({
      path: outPath,
      type: 'png',
      omitBackground: false,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    console.log(`  ✓ ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log(`\nAll final screenshots written to: ${outputDir}`);
})();

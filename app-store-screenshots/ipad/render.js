// render.js — Render 5 iPad App Store screenshots (zh + en)
// Output: 10 PNGs at 2048×2732

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS = [
  { name: '01-hero', suffix: '' },
  { name: '01-hero', suffix: '-en' },
  { name: '02-someday', suffix: '' },
  { name: '02-someday', suffix: '-en' },
  { name: '03-detail', suffix: '' },
  { name: '03-detail', suffix: '-en' },
  { name: '04-stats', suffix: '' },
  { name: '04-stats', suffix: '-en' },
  { name: '05-cross-platform', suffix: '' },
  { name: '05-cross-platform', suffix: '-en' },
];

const WIDTH = 2048;
const HEIGHT = 2732;

const outputDir = path.join(__dirname, '..', 'output-ipad');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  console.log('Launching Puppeteer for iPad screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  for (const { name, suffix } of SCREENSHOTS) {
    const htmlName = `${name}${suffix}`;
    const htmlPath = path.resolve(__dirname, `${htmlName}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`  Skip ${htmlName}: file not found`);
      continue;
    }
    console.log(`Rendering ${htmlName}...`);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluateHandle('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 300));

    const outPath = path.join(outputDir, `${htmlName}-ipad.png`);
    await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    console.log(`  ✓ ${outPath}`);
  }

  await browser.close();
  console.log(`\nAll iPad screenshots → ${outputDir}`);
})();
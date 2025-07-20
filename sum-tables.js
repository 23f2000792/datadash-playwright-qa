const { chromium } = require('playwright');

(async () => {
  const urls = [
    "http://<your-url>/Seed25",
    "http://<your-url>/Seed26",
    "...",
    "http://<your-url>/Seed34"
  ];
  let total = 0;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent)).filter(x => !isNaN(x))
    );
    total += numbers.reduce((a, b) => a + b, 0);
  }
  await browser.close();
  console.log(`TOTAL_SUM=${total}`);
})();

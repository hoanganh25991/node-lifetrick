const puppeteer = require('puppeteer');
// const lifeTrickPage = "http://lifetricks.com/";
const lifeTrickPage = "https://tinker.press/tinypos/";

(async () => {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(lifeTrickPage);
    await page.screenshot({path: 'example.png'});
    await browser.close();
  }catch(err){
    console.log(err)
  }
})();
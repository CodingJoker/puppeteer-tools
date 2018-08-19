const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://github.com/CodingJoker');
    await page.screenshot({path: 'CodingJoker.png'});
    await browser.close();
})();

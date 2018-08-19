const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const env = require('../env');

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: {
          width: 1920,
          height: 1240
        },
        args: [
            '--disable-search-geolocation-disclosure'
        ],
        headless: false
    });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    page.on('framenavigated', async frame => {
        console.log(frame._navigationURL);
        if (frame._navigationURL === `https://user.qzone.qq.com/${env.qzone.user}`) {
            await navigationPromise;
            console.log('page navigation');
            await page.screenshot({path: 'login.png'});
        }
    });
    await page.goto('https://i.qq.com/');
    const loginFrame = page.frames()[1];
    await loginFrame.click('#switcher_plogin');
    await loginFrame.type('#uinArea #u', env.qzone.user);
    await loginFrame.type('#pwdArea #pwd_tips', env.qzone.pass);
    await loginFrame.click('#loginform #login_button');
})();

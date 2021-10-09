const puppeteer = require('puppeteer');               // puppeteer

const browser = await puppeteer.launch();             // run browser
const page1 = await browser.newPage();                // open new tab

await page1.goto('tayara.tn');               // go to google.com       

await page1.waitForSelector('#aw0'); // wait load object
const link = await page1.$('#aw0');  // declare object

const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));  // declare promise
await link.click({button: 'middle'});                 // click middle button, link open in a new tab
const page2 = await newPagePromise;                   // declare new tab, now you can work with it
await page2.bringToFront();                           // make the tab active
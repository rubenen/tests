const puppeteer = require("puppeteer");
const assert = require("assert");

let browser;
let page;

before(async () => {
    browser = await puppeteer.launch(); // debug options: { headless: false, slowMo: 50 }
    page = await browser.newPage();
});

describe("Puppeteer test", () => {
    it("Expects header to be equal to typed text", async () => {
        await page.goto("http://devexpress.github.io/testcafe/example");
        await page.type("#developer-name", "John Smith", { delay: 50 });
        await page.click("#submit-button");
        await page.waitForSelector("#article-header");

        const header = await page.evaluate(() => document.querySelector("#article-header").innerText);
        assert(header, "Thank you, John Smith!");
    }).timeout(20000);
});

after(async () => {
    await browser.close();
});
import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL = process.env.FACEBOOK_EMAIL;
const PASSWORD = process.env.FACEBOOK_PASSWORD;

(async () => {
  // Launch browser and navigate to Messenger
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.messenger.com/", { waitUntil: "networkidle0" });

  // Log in to Messenger
  await page.type("#email", EMAIL); // Replace with your email
  await page.type("#pass", PASSWORD); // Replace with your password
  await page.click('button[name="login"]');

  // Navigate to the chat window and type the message
  await page.waitForNavigation();
  // Your Fucking Messenger Receipient URL
  const MESSENGER_URL = "https://www.messenger.com/t/100003385424920";

  await page.goto(MESSENGER_URL, { waitUntil: "networkidle2" });

  /*********************************************************************
   *                          SPAM MESSAGE                             *
   *********************************************************************/
  // ...
  const interval = setInterval(async () => {
    try {
      await page.waitForSelector('div[contenteditable="true"]');
      await page.type('div[contenteditable="true"]', "thik moto kaj kortesena");
      await page.keyboard.press("Enter");
    } catch (error) {
      console.log("Error occurred:", error);
    }
  }, 3000);

  // Wait for some time before closing the browser
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  // Clear the interval and close the browser
  //  clearInterval(interval);
  //  await browser.close();
})();

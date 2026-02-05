// @ts-check
import { test, expect } from "@playwright/test";

test("Add/Remove_Elements", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");
  let addElement = page.locator("//button[text()='Add Element']");
  let elements = page.locator("//button[text()='Delete']");
  for (; (await elements.count()) < 5; ) {
    await addElement.click();
  }
  expect(await elements.count()).toEqual(5);

  //await addElement.click();
  //while loop is also possible but not recommended as its infinite and may break or memory  issues
  // while (await elements.first().isVisible()) {
  //   await addElement.click();
  //   if ((await elements.count()) === 5) {
  //     expect(await elements.count()).toEqual(5);
  //     break;
  //   }
  // }

  for (; (await elements.count()) > 0; ) {
    await elements.first().click();
  }
});

test(`Challenging_DOM`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/challenging_dom");
  //button locators
  let blue_btn = await page.locator('//a[@class="button"]');
  let red_btn = await page.locator('//a[@class="button alert"]');
  let green_btn = await page.locator('//a[@class="button success"]');

  //table locators
  let table;
});

test(``, async ({ page }) => {
  let checkbox = (checkboxNo) =>
    page.locator(
      `//text()[contains(., '${checkboxNo}')]/preceding-sibling::input[1]`,
    );
});

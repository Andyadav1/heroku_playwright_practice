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

test(`Basic_Auth`, async ({ page }) => {
  await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
  await expect(
    page.locator("//p[contains(text(),'Congratulations!')]"),
  ).toBeVisible();
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

test(`Checkboxes`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");
  let checkbox = (box_text) =>
    page.locator(
      `//text()[contains(., '${box_text}')]/preceding-sibling::input[1]`,
    );
  if ((await checkbox("1").isChecked()) === false) {
    await checkbox("1").click();
  }
  await expect(checkbox("2")).toBeChecked();
  await checkbox("2").click();
});

test(`Disappearing_Elements`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
  let disappearing_element = page.locator("//a[text()='Gallery']");
  for (; (await disappearing_element.isVisible()) == false; ) {
    await page.reload();
    await page.waitForLoadState("networkidle");
  }
});

test(`Dropdown_List`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dropdown");
  let dropdown = page.locator(`//select[@id="dropdown"]`);
  await dropdown.selectOption("2");
  await expect(dropdown).toHaveValue("2");
});

test(`Dynamic_Controls`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
  let;
});

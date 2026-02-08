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
  let button = (btn_text) => page.locator(`//button[text()='${btn_text}']`);
  let checkbox = page.locator(`//input[@id="checkbox"]`);
  let textbox = page.locator('//input[@type="text"]');
  await button("Remove").click();
  await button("Add").waitFor({ state: "visible" });
  await button("Add").click();
  await checkbox.click();

  await button("Enable").click();
  await button("Disable").waitFor({ state: "visible" });
  await expect(textbox).toBeEnabled();
  await textbox.fill("Lmao");
  await button("Disable").click();
  await expect(textbox).toHaveValue("Lmao");
});

test(`Dynamically_Loaded_Page_Elements`, async ({ page }) => {
  let element = page.locator(`//div//div/h4[text()='Hello World!']`);
  let start = page.locator(`//button`);

  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
  await expect(element).toBeHidden();
  await start.click();
  await expect(element).toBeVisible();

  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
  await expect(element).not.toBeAttached();
  await start.click();
  await expect(element).toBeVisible();
});

test(`JavaScript_Alerts`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  let button = (btn_text) => page.locator(`//button[text()='${btn_text}']`);
  page.on("dialog", (dialog) => {
    console.log(dialog.message);
    dialog.accept("Lmao");
  });
  await button("Click for JS Prompt").click();
  expect(page.locator(`//p[@id="result"]`)).toContainText("Lmao");
});

test(`Frame`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  let framecheck = page
    .frameLocator('xpath=//iframe[@id="mce_0_ifr"]')
    .locator("//p");
  await page.locator('//div[@class="tox-icon"]').click();
  await expect(framecheck).toContainText("content");
});

test.only(`Key_Presses`, async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/key_presses");
  await page.locator('//input[@type="text"]').click();
  await page.keyboard.press('Control');
  await expect(page.locator('//p[@id="result"]')).toContainText("CONTROL")
});

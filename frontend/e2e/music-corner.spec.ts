import { expect, test } from '@playwright/test';

test('visitor explores the sample storefront and enters an email without submitting', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeVisible();
  await expect(page.getByText('A small collection of records for the songs that stay with you.')).toBeVisible();

  await page.getByRole('link', { name: /explore cds/i }).click();
  await expect(page).toHaveURL(/#collection$/);
  const collection = page.getByRole('region', { name: 'Three to start with.' });
  await expect(collection.getByRole('article')).toHaveCount(3);
  await expect(collection.getByText('Blue Hour')).toBeVisible();
  await expect(collection.getByText('Mira Vale')).toBeVisible();
  await expect(collection.getByText('$18.00')).toBeVisible();
  await expect(collection.getByText('Soft Signals')).toBeVisible();
  await expect(collection.getByText('The Paper Satellites')).toBeVisible();
  await expect(collection.getByText('$21.00')).toBeVisible();
  await expect(collection.getByText('Night Bloom')).toBeVisible();
  await expect(collection.getByText('June Arcade')).toBeVisible();
  await expect(collection.getByText('$16.00')).toBeVisible();
  await expect(collection.getByText(/fictional examples/i)).toBeVisible();

  await page.getByRole('link', { name: /music corner home/i }).click();
  await expect(page).toHaveURL(/#top$/);
  await page.getByRole('link', { name: 'The collection' }).click();
  await expect(page).toHaveURL(/#collection$/);
  await expect(collection).toBeVisible();
  await expect(collection.getByRole('article')).toHaveCount(3);

  await page.getByRole('link', { name: 'Find us' }).click();
  await expect(page.getByRole('contentinfo').getByText(/Fictional demo store details/)).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'hello@musiccorner.example' })).toBeVisible();

  await page.getByRole('link', { name: 'A note from us' }).click();
  const email = page.getByRole('textbox', { name: 'Your email address' });
  await email.fill('listener@example.com');
  await expect(email).toHaveValue('listener@example.com');
  await expect(page.getByText(/does not subscribe or send anything/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /subscribe|sign up|send/i })).toHaveCount(0);
  await page.getByRole('link', { name: 'The collection' }).click();
  await expect(collection).toBeVisible();
  await page.screenshot({ path: 'test-results/music-corner-collection.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('storefront has a usable small-screen layout and descriptive accessibility structure', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeVisible();
  const desktopAccessibility = await page.locator('body').ariaSnapshot();
  expect(desktopAccessibility).toContain('Welcome to Music Corner');
  const desktopStyles = await page.evaluate(() => ({
    fontFamily: getComputedStyle(document.body).fontFamily,
    pageBackground: getComputedStyle(document.body).backgroundColor,
    themePreference: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  }));
  expect(desktopStyles.fontFamily).toContain('DM Sans');
  expect(desktopStyles.pageBackground).toBe(desktopStyles.themePreference === 'dark' ? 'rgb(32, 31, 29)' : 'rgb(247, 243, 235)');
  await page.screenshot({ path: 'test-results/music-corner-desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeVisible();
  const mobileAccessibility = await page.locator('body').ariaSnapshot();
  expect(mobileAccessibility).toContain('Your email address');
  await page.screenshot({ path: 'test-results/music-corner-mobile.png', fullPage: true });
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyFont: getComputedStyle(document.body).fontFamily,
  }));
  const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).map((element) => {
    const rect = element.getBoundingClientRect();
    return { tag: element.tagName, className: typeof element.className === 'string' ? element.className : '', left: Math.round(rect.left), right: Math.round(rect.right) };
  }).filter((element) => element.right > document.documentElement.clientWidth + 1 || element.left < -1));
  expect(overflow).toEqual([]);
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  expect(dimensions.bodyFont).toContain('DM Sans');
  const structure = await page.content();
  expect(structure).toContain('Fictional demo store details');
  expect(errors).toEqual([]);
});

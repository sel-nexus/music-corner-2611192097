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

  await page.getByRole('link', { name: 'Find us' }).click();
  await expect(page.getByRole('contentinfo').getByText(/Fictional demo store details/)).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'hello@musiccorner.example' })).toBeVisible();

  await page.getByRole('link', { name: 'A note from us' }).click();
  const email = page.getByRole('textbox', { name: 'Your email address' });
  await email.fill('listener@example.com');
  await expect(email).toHaveValue('listener@example.com');
  await expect(page.getByText(/does not subscribe or send anything/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /subscribe|sign up|send/i })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('storefront has a usable small-screen layout and descriptive accessibility structure', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyFont: getComputedStyle(document.body).fontFamily,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  expect(dimensions.bodyFont).toContain('DM Sans');
  const structure = await page.content();
  expect(structure).toContain('Fictional demo store details');
  expect(errors).toEqual([]);
});

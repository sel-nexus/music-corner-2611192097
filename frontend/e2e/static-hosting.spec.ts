import { expect, test } from '@playwright/test';

test('nginx serves the storefront and its liveness endpoint', async ({ page, request, baseURL }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  const health = await request.get(`${baseURL}/healthz`);
  expect(health.status()).toBe(200);
  expect(await health.text()).toBe('ok');

  const home = await page.goto('/');
  expect(home?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Welcome to Music Corner.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Three to start with.' })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(3);
  await expect(page.getByText(/Fictional demo store details/)).toBeVisible();
  expect(errors).toEqual([]);
});

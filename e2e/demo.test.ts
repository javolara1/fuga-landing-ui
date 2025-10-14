import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	const mainHeading = page.getByRole('main').getByRole('heading', { level: 1 });
	await expect(mainHeading).toBeVisible();
});

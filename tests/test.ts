import { expect, test } from '@playwright/test';

test('Six unit links appear', async ({ page }) => {
	await page.goto('/units', { waitUntil: 'domcontentloaded' });
	expect(await page.textContent('.unit-links')).toHaveLength(6);
});

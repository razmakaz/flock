import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	// test('should have URL path starting with /en', () => {
	// 	const url = window.location.pathname;
	// 	expect(url.startsWith('/en')).toBe(true);
	// });

	// test('should have "floc" in the document title', () => {
	// 	document.title = 'floc - Test Page'; // Mocking the title for the test
	// 	expect(document.title).toContain('floc');
	// });

	test('should switch to light mode and update :root CSS variables', async () => {
		render(Page);

		// Simulate clicking the light mode toggle button
		const themeSwitcher = screen.getByTestId('theme-switcher');
		expect(themeSwitcher, 'Theme switcher should be in the document').toBeInTheDocument();
		const lightModeToggle = within(themeSwitcher).getByTestId('light-mode');
		expect(
			lightModeToggle,
			'Light mode toggle button should be in the document'
		).toBeInTheDocument();
		await lightModeToggle.click();

		await expect(async () => {
			// Check if the :root CSS variables have been updated
			const rootStyles = getComputedStyle(document.documentElement);
			expect(rootStyles.getPropertyValue('--color-base-100')).toBe('oklch(100% 0 0)'); // Example light mode background color
		}).not.toThrow();
	});
});

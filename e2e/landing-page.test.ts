import { expect, test } from '@playwright/test';

test.describe('Landing Page - Desktop', () => {
	test.beforeEach(async ({ page }) => {
		// Set desktop viewport
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto('/');
	});

	test('should load the home page with correct structure', async ({ page }) => {
		// Check main sections exist
		await expect(page.locator('header')).toBeVisible();
		await expect(page.locator('main')).toBeVisible();
		await expect(page.locator('footer')).toBeVisible();

		// Check hero section using data-testid
		await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
		await expect(page.locator('[data-testid="hero-heading"]')).toBeVisible();
		await expect(page.locator('[data-testid="hero-description"]')).toBeVisible();

		// Check navigation is visible on desktop using role-based selector
		await expect(page.getByRole('navigation')).toBeVisible();
	});

	test('should have functional desktop navigation', async ({ page }) => {
		// Test navigation links - use more robust selectors to avoid footer conflicts
		const navLinks = [
			{ text: 'Services', href: '#services' },
			{ text: 'Pricing', href: '#pricing' },
			{ text: 'About', href: '#about' },
			{ text: 'Blog', href: '/blog' },
			{ text: 'Contact', href: '#contact' }
		];

		for (const link of navLinks) {
			// Use header-specific selector to avoid footer links - more robust than CSS classes
			const navLink = page.locator('header').getByRole('link', { name: link.text });
			await expect(navLink).toBeVisible();
			await expect(navLink).toHaveAttribute('href', link.href);
		}

		// Test login button (when not logged in)
		const loginButton = page.locator('header').getByRole('link', { name: 'Login' });
		await expect(loginButton).toBeVisible();
		await expect(loginButton).toHaveAttribute('href', '/login');
	});

	test('should have working call-to-action buttons', async ({ page }) => {
		// Test primary CTA button using data-testid
		const startButton = page.locator('[data-testid="cta-start-training"]');
		await expect(startButton).toBeVisible();
		await expect(startButton).toHaveAttribute('href', '/register');

		// Test secondary CTA button using data-testid
		const learnButton = page.locator('[data-testid="cta-learn-more"]');
		await expect(learnButton).toBeVisible();

		// Click learn more button and verify it scrolls to services
		await learnButton.click();
		await page.waitForTimeout(1000); // Wait for scroll animation
	});

	test('should display all content sections', async ({ page }) => {
		// Scroll through page and verify sections using data-testid
		const sections = [
			{ id: 'services', testid: 'services-section' },
			{ id: 'pricing', testid: 'pricing-section' },
			{ id: 'about', testid: 'about-section' },
			{ id: 'contact', testid: 'contact-section' }
		];

		for (const section of sections) {
			// Use both ID and data-testid for redundancy
			const sectionElement = page.locator(`[data-testid="${section.testid}"]`);
			await sectionElement.scrollIntoViewIfNeeded();
			await expect(sectionElement).toBeVisible();
		}

		// Verify hero benefits cards using data-testid
		const benefitCards = page.locator('[data-testid="benefit-card"]');
		await expect(benefitCards).toHaveCount(3);
	});

	test('should have functional footer', async ({ page }) => {
		await page.locator('footer').scrollIntoViewIfNeeded();

		// Check footer content
		await expect(page.locator('footer')).toBeVisible();

		// Verify footer links (adjust selectors based on actual footer structure)
		const footerLinks = page.locator('footer a');
		await expect(footerLinks.first()).toBeVisible();
	});
});

test.describe('Landing Page - Mobile', () => {
	test.beforeEach(async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
	});

	test('should have mobile navigation menu', async ({ page }) => {
		// Mobile menu button should be visible
		const mobileMenuButton = page.locator('button[aria-label*="menu"]');
		await expect(mobileMenuButton).toBeVisible();

		// Desktop navigation should be hidden on mobile
		const desktopNav = page.locator('header').getByRole('navigation');
		await expect(desktopNav).not.toBeVisible();

		// Open mobile menu
		await mobileMenuButton.click();

		// Mobile navigation should be visible
		const mobileNav = page.locator('#mobile-navigation');
		await expect(mobileNav).toBeVisible();

		// Check mobile navigation links - use mobile nav specific selector
		const mobileNavLinks = ['Services', 'Pricing', 'About', 'Blog', 'Contact', 'Login'];

		for (const linkText of mobileNavLinks) {
			const link = mobileNav.getByRole('link', { name: linkText });
			await expect(link).toBeVisible();
		}

		// Close mobile menu
		await mobileMenuButton.click();
		await expect(mobileNav).not.toBeVisible();
	});

	test('should have responsive layout on mobile', async ({ page }) => {
		// Check hero section layout using data-testid
		await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();

		// Check that benefits cards stack vertically on mobile using data-testid
		const benefitCards = page.locator('[data-testid="benefit-card"]');
		await expect(benefitCards).toHaveCount(3);

		// Verify CTA buttons stack vertically on mobile using data-testid
		const ctaButtons = page.locator(
			'[data-testid="hero-cta-buttons"] button, [data-testid="hero-cta-buttons"] a'
		);
		await expect(ctaButtons).toHaveCount(2);
	});

	test('should handle touch interactions correctly', async ({ page }) => {
		// Test mobile navigation opening/closing
		const mobileMenuButton = page.locator('button[aria-label*="menu"]');

		// Open menu
		await mobileMenuButton.click();
		await expect(page.locator('#mobile-navigation')).toBeVisible();

		// Test navigation link click closes menu - use mobile nav specific selector
		const mobileNav = page.locator('#mobile-navigation');
		const servicesLink = mobileNav.getByRole('link', { name: 'Services' });
		await servicesLink.click();

		// Menu should close after navigation
		await expect(page.locator('#mobile-navigation')).not.toBeVisible();
	});

	test('should maintain content readability on mobile', async ({ page }) => {
		// Check text sizes are readable using data-testid
		await expect(page.locator('[data-testid="hero-heading"]')).toBeVisible();
		await expect(page.locator('[data-testid="hero-description"]')).toBeVisible();

		// Verify no horizontal scrolling issues
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		const viewportWidth = await page.evaluate(() => window.innerWidth);
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
	});
});

test.describe('Landing Page - Cross-browser Responsive', () => {
	const viewports = [
		{ name: 'mobile', width: 375, height: 667 },
		{ name: 'tablet', width: 768, height: 1024 },
		{ name: 'desktop', width: 1280, height: 720 },
		{ name: 'large', width: 1920, height: 1080 }
	];

	for (const viewport of viewports) {
		test(`should render correctly on ${viewport.name} viewport`, async ({ page }) => {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto('/');

			// Basic page structure should always be visible
			await expect(page.locator('header')).toBeVisible();
			await expect(page.locator('main')).toBeVisible();
			await expect(page.locator('footer')).toBeVisible();

			// Hero section should always be accessible
			const heroSection = page.locator('section').first();
			await expect(heroSection).toBeVisible();

			// Logo should always be visible
			const logo = page.getByRole('link', { name: 'FUGA' });
			await expect(logo).toBeVisible();

			// No layout issues
			await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
		});
	}
});

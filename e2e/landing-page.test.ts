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
	});

	test('should have hero content in Spanish', async ({ page }) => {
		// Verify Spanish content
		const heading = page.locator('[data-testid="hero-heading"]');
		await expect(heading).toContainText('Comunidad Deportiva Multidisciplinaria');

		const description = page.locator('[data-testid="hero-description"]');
		await expect(description).toContainText('FUGA es una comunidad');

		// CTA button text
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await expect(ctaButton).toContainText('Comienza a Entrenar Hoy');
	});

	test('should have working call-to-action button', async ({ page }) => {
		// Test primary CTA button using data-testid
		const startButton = page.locator('[data-testid="cta-start-training"]');
		await expect(startButton).toBeVisible();

		// Button should be clickable (opens contact modal)
		await startButton.click();

		// Modal should appear
		const modal = page.locator('[data-testid="contact-modal"]');
		await expect(modal).toBeVisible();
	});

	test('should display all content sections', async ({ page }) => {
		// Scroll through page and verify sections using data-testid
		const sections = [
			{ testid: 'services-section', heading: 'Entrenamiento' },
			{ testid: 'about-section', heading: 'Acerca de FUGA' },
			{ testid: 'contact-section', heading: 'Ponte en Contacto' }
		];

		for (const section of sections) {
			const sectionElement = page.locator(`[data-testid="${section.testid}"]`);
			await sectionElement.scrollIntoViewIfNeeded();
			await expect(sectionElement).toBeVisible();
			await expect(sectionElement).toContainText(section.heading);
		}
	});

	test('should have functional footer', async ({ page }) => {
		await page.locator('footer').scrollIntoViewIfNeeded();

		// Check footer content
		await expect(page.locator('footer')).toBeVisible();

		// Footer should have FUGA branding
		await expect(page.locator('footer')).toContainText('FUGA');

		// Footer should have contact info
		await expect(page.locator('footer')).toContainText('Luz Saviñon 603bis');
		await expect(page.locator('footer')).toContainText('hola@fuga.mx');

		// Footer should have Instagram link
		const instagramLink = page.locator('footer a[href*="instagram"]');
		await expect(instagramLink).toBeVisible();
	});

	test('should show header CTA when scrolling past hero', async ({ page }) => {
		// Initially, header CTA should not be visible
		const headerCta = page.locator('[data-testid="header-cta"]');

		// Scroll past the hero section
		await page.locator('[data-testid="services-section"]').scrollIntoViewIfNeeded();

		// Wait for the header CTA to appear
		await expect(headerCta).toBeVisible({ timeout: 2000 });
	});
});

test.describe('Landing Page - Mobile', () => {
	test.beforeEach(async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
	});

	test('should have responsive layout on mobile', async ({ page }) => {
		// Check hero section layout using data-testid
		await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();

		// Hero heading and description should be visible
		await expect(page.locator('[data-testid="hero-heading"]')).toBeVisible();
		await expect(page.locator('[data-testid="hero-description"]')).toBeVisible();

		// CTA button should be visible
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await expect(ctaButton).toBeVisible();
	});

	test('should maintain content readability on mobile', async ({ page }) => {
		// Check text is visible
		await expect(page.locator('[data-testid="hero-heading"]')).toBeVisible();
		await expect(page.locator('[data-testid="hero-description"]')).toBeVisible();

		// Verify no horizontal scrolling issues
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		const viewportWidth = await page.evaluate(() => window.innerWidth);
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
	});

	test('should display services section correctly on mobile', async ({ page }) => {
		const servicesSection = page.locator('[data-testid="services-section"]');
		await servicesSection.scrollIntoViewIfNeeded();
		await expect(servicesSection).toBeVisible();

		// Should have service cards
		await expect(servicesSection).toContainText('Entrenamiento Presencial');
		await expect(servicesSection).toContainText('Entrenamiento Virtual');
	});

	test('should open contact modal on CTA click', async ({ page }) => {
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await ctaButton.click();

		// Modal should appear
		const modal = page.locator('[data-testid="contact-modal"]');
		await expect(modal).toBeVisible();

		// Modal should have form elements
		await expect(modal.locator('input[name="firstName"]')).toBeVisible();
		await expect(modal.locator('input[name="email"]')).toBeVisible();
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
			await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();

			// Logo/brand should always be visible in header
			await expect(page.locator('header h1')).toContainText('FUGA');

			// No horizontal overflow
			const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
			const viewportWidth = await page.evaluate(() => window.innerWidth);
			expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
		});
	}
});

test.describe('Contact Form Modal', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto('/');
	});

	test('should open and close contact modal', async ({ page }) => {
		// Open modal
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await ctaButton.click();

		const modal = page.locator('[data-testid="contact-modal"]');
		await expect(modal).toBeVisible();

		// Close modal with close button
		const closeButton = modal.locator('button[aria-label="Cerrar"]');
		await closeButton.click();

		await expect(modal).not.toBeVisible();
	});

	test('should have form validation', async ({ page }) => {
		// Open modal
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await ctaButton.click();

		const modal = page.locator('[data-testid="contact-modal"]');
		await expect(modal).toBeVisible();

		// Try to submit empty form
		const submitButton = modal.locator('button[type="submit"]');
		await submitButton.click();

		// Form should show validation (required fields)
		const nameInput = modal.locator('input[name="firstName"]');
		const isInvalid = await nameInput.evaluate(
			(el: HTMLInputElement) => !el.validity.valid && el.validity.valueMissing
		);
		expect(isInvalid).toBe(true);
	});

	test('should submit contact form successfully', async ({ page }) => {
		// Open modal
		const ctaButton = page.locator('[data-testid="cta-start-training"]');
		await ctaButton.click();

		const modal = page.locator('[data-testid="contact-modal"]');
		await expect(modal).toBeVisible();

		// Fill form
		await modal.locator('input[name="firstName"]').fill('Test');
		await modal.locator('input[name="lastName"]').fill('User');
		await modal.locator('input[name="email"]').fill('test@example.com');
		await modal.locator('input[name="phone"]').fill('5512345678');

		// Submit form
		const submitButton = modal.locator('button[type="submit"]');
		await submitButton.click();

		// Modal should close after successful submission
		await expect(modal).not.toBeVisible();
	});
});

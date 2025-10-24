import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render hero section with main heading', () => {
		render(Page);
		const heroSection = screen.getByTestId('hero-section');
		const mainHeading = screen.getByTestId('hero-heading');

		expect(heroSection).toBeInTheDocument();
		expect(mainHeading).toBeInTheDocument();
		expect(mainHeading).toHaveTextContent('FUGA');
	});

	test('should render all main sections', () => {
		render(Page);

		// Check that all main sections are present
		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('should render header navigation', () => {
		render(Page);

		// Check that header navigation elements are present
		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByTestId('nav-services')).toHaveTextContent('Services');
		expect(screen.getByTestId('nav-pricing')).toHaveTextContent('Pricing');
		expect(screen.getByTestId('nav-about')).toHaveTextContent('About');
		expect(screen.getByTestId('nav-contact')).toHaveTextContent('Contact');
	});

	test('should render call-to-action buttons', () => {
		render(Page);

		// Check that CTA buttons are present
		const startTrainingButton = screen.getByTestId('cta-start-training');
		const learnMoreButton = screen.getByTestId('cta-learn-more');

		expect(startTrainingButton).toBeInTheDocument();
		expect(learnMoreButton).toBeInTheDocument();
		expect(startTrainingButton).toHaveTextContent('Start Training Today');
		expect(learnMoreButton).toHaveTextContent('Learn More');
	});

	test('should render footer', () => {
		render(Page);

		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
		expect(screen.getByText(/© 2025 FUGA Sports Team/)).toBeInTheDocument();
	});

	test('should have correct page structure and styling', () => {
		render(Page);

		const pageContainer = screen.getByRole('main').parentElement;
		expect(pageContainer).toHaveClass('min-h-screen', 'bg-black', 'text-white');
	});

	test('should render benefit cards in hero section', () => {
		render(Page);

		const benefitCards = screen.getAllByTestId('benefit-card');
		expect(benefitCards).toHaveLength(3);

		// Check that each benefit card has expected content within the hero section
		const heroSection = screen.getByTestId('hero-section');
		expect(heroSection).toHaveTextContent('Strength Training');
		expect(heroSection).toHaveTextContent('Custom Programs');
		expect(heroSection).toHaveTextContent('Expert Coaching');
	});
});

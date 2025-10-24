import { render, screen } from '@testing-library/svelte';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Hero from './Hero.svelte';

// Mock the i18n store
vi.mock('$lib/i18n', () => {
	const mockTranslations = {
		'hero.title': 'FUGA',
		'hero.subtitle': 'Multidisciplinary Sports Team',
		'hero.description':
			'Professional strength training and customized sport-specific programs for cycling, running, and swimming athletes.',
		'hero.benefits.strength.title': 'Strength Training',
		'hero.benefits.strength.description': 'Professional equipment and personalized coaching',
		'hero.benefits.custom.title': 'Custom Programs',
		'hero.benefits.custom.description': 'Tailored training for your sport and goals',
		'hero.benefits.expert.title': 'Expert Coaching',
		'hero.benefits.expert.description': 'Professional guidance for optimal performance',
		'hero.cta.start': 'Start Training Today',
		'hero.cta.learn': 'Learn More',
		'hero.footer':
			"Join athletes who have transformed their performance with FUGA's professional training programs"
	};

	return {
		t: {
			subscribe: vi.fn((callback) => {
				callback((key: string) => mockTranslations[key as keyof typeof mockTranslations] || key);
				return () => {};
			})
		}
	};
});

describe('Hero.svelte', () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();
	});

	test('should render hero section with correct data-testid', () => {
		render(Hero);

		const heroSection = screen.getByTestId('hero-section');
		expect(heroSection).toBeInTheDocument();
		expect(heroSection).toHaveClass('bg-black', 'pt-12', 'text-white');
	});

	test('should render main heading with title and subtitle', () => {
		render(Hero);

		const mainHeading = screen.getByTestId('hero-heading');
		expect(mainHeading).toBeInTheDocument();
		expect(mainHeading).toHaveTextContent('FUGA');
		expect(mainHeading).toHaveTextContent('Multidisciplinary Sports Team');
		expect(mainHeading).toHaveClass('text-3xl', 'font-bold', 'tracking-tight');
	});

	test('should render hero description with translated text', () => {
		render(Hero);

		const description = screen.getByTestId('hero-description');
		expect(description).toBeInTheDocument();
		expect(description).toHaveTextContent(
			'Professional strength training and customized sport-specific programs for cycling, running, and swimming athletes.'
		);
		expect(description).toHaveClass('text-gray-300', 'text-base', 'leading-relaxed');
	});

	test('should render all three benefit cards with correct content', () => {
		render(Hero);

		const benefitCards = screen.getAllByTestId('benefit-card');
		expect(benefitCards).toHaveLength(3);

		// Check first benefit card (Strength Training)
		expect(benefitCards[0]).toHaveTextContent('💪');
		expect(benefitCards[0]).toHaveTextContent('Strength Training');
		expect(benefitCards[0]).toHaveTextContent('Professional equipment and personalized coaching');

		// Check second benefit card (Custom Programs)
		expect(benefitCards[1]).toHaveTextContent('🚴‍♂️');
		expect(benefitCards[1]).toHaveTextContent('Custom Programs');
		expect(benefitCards[1]).toHaveTextContent('Tailored training for your sport and goals');

		// Check third benefit card (Expert Coaching)
		expect(benefitCards[2]).toHaveTextContent('🏆');
		expect(benefitCards[2]).toHaveTextContent('Expert Coaching');
		expect(benefitCards[2]).toHaveTextContent('Professional guidance for optimal performance');
	});

	test('should render benefit cards with correct styling', () => {
		render(Hero);

		const benefitCards = screen.getAllByTestId('benefit-card');
		benefitCards.forEach((card) => {
			expect(card).toHaveClass('rounded-2xl', 'border', 'border-gray-800', 'bg-gray-900', 'p-6');
		});
	});

	test('should render CTA buttons container with correct layout', () => {
		render(Hero);

		const ctaButtonsContainer = screen.getByTestId('hero-cta-buttons');
		expect(ctaButtonsContainer).toBeInTheDocument();
		expect(ctaButtonsContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row');
		expect(ctaButtonsContainer).toHaveClass('items-center', 'justify-center', 'gap-4');
	});

	test('should render hero footer with translated text', () => {
		render(Hero);

		const footer = screen.getByTestId('hero-footer');
		expect(footer).toBeInTheDocument();
		expect(footer).toHaveTextContent(
			"Join athletes who have transformed their performance with FUGA's professional training programs"
		);
		expect(footer).toHaveClass('text-sm', 'text-gray-400');
	});

	test('should have correct responsive classes', () => {
		render(Hero);

		const heroSection = screen.getByTestId('hero-section');
		expect(heroSection).toHaveClass('sm:pt-16', 'lg:pt-20');

		const container = heroSection.querySelector('.mx-auto');
		expect(container).toHaveClass('max-w-6xl', 'px-4', 'sm:px-6', 'lg:px-8');

		const benefitsGrid = screen.getByTestId('hero-benefits');
		expect(benefitsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
	});

	test('should render benefits section with correct grid layout', () => {
		render(Hero);

		const benefitsSection = screen.getByTestId('hero-benefits');
		expect(benefitsSection).toBeInTheDocument();
		expect(benefitsSection).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6');
		expect(benefitsSection).toHaveClass('max-w-4xl', 'mx-auto');
	});

	test('should have proper semantic HTML structure', () => {
		render(Hero);

		// Check for proper heading hierarchy
		const h1Element = screen.getByRole('heading', { level: 1 });
		expect(h1Element).toBeInTheDocument();
		expect(h1Element).toHaveTextContent('FUGA');

		// Check for h3 elements in benefit cards
		const h3Elements = screen.getAllByRole('heading', { level: 3 });
		expect(h3Elements).toHaveLength(3);
		expect(h3Elements[0]).toHaveTextContent('Strength Training');
		expect(h3Elements[1]).toHaveTextContent('Custom Programs');
		expect(h3Elements[2]).toHaveTextContent('Expert Coaching');
	});
});

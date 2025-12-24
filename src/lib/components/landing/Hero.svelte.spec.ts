import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Hero from './Hero.svelte';

const defaultProps = {
	title: 'Comunidad Deportiva Multidisciplinaria',
	description:
		'FUGA es una comunidad para los amantes y apasionados del deporte, combinamos ciencia, experiencia y herramientas de desarrollo humano para crear tu mejor versión.',
	ctaLabel: 'Comienza a Entrenar Hoy'
};

describe('Hero.svelte', () => {
	test('should render hero section with correct data-testid', () => {
		render(Hero, { props: defaultProps });

		const heroSection = screen.getByTestId('hero-section');
		expect(heroSection).toBeInTheDocument();
		expect(heroSection).toHaveClass('bg-black', 'text-white');
	});

	test('should render main heading', () => {
		render(Hero, { props: defaultProps });

		const mainHeading = screen.getByTestId('hero-heading');
		expect(mainHeading).toBeInTheDocument();
		expect(mainHeading).toHaveTextContent('Comunidad Deportiva Multidisciplinaria');
	});

	test('should render hero description', () => {
		render(Hero, { props: defaultProps });

		const description = screen.getByTestId('hero-description');
		expect(description).toBeInTheDocument();
		expect(description).toHaveTextContent('FUGA es una comunidad');
		expect(description).toHaveTextContent('desarrollo humano');
	});

	test('should render CTA button', () => {
		render(Hero, { props: defaultProps });

		const ctaButton = screen.getByTestId('cta-start-training');
		expect(ctaButton).toBeInTheDocument();
		expect(ctaButton).toHaveTextContent('Comienza a Entrenar Hoy');
	});

	test('should render background container', () => {
		render(Hero, { props: defaultProps });

		const background = screen.getByTestId('hero-background');
		expect(background).toBeInTheDocument();
	});
});

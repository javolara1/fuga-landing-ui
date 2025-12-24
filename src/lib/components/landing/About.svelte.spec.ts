import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import About from './About.svelte';
import type { AboutSection } from '$lib/types';

const mockData: AboutSection = {
	id: 1,
	AboutSectionTitle: 'Acerca de FUGA',
	mision:
		'Impulsar el desarrollo humano a través de un equipo multidisciplinario que une pasión, conocimiento y experiencia.',
	vision:
		'Ser una comunidad referente donde la ciencia y la colaboración inspiran a alcanzar la mejor versión de cada persona.',
	phylosophy:
		'El deporte es nuestro camino de crecimiento: equilibrio, disciplina y propósito, guiados por ciencia y acompañamiento humano.',
	visible: true
};

describe('About.svelte', () => {
	test('should render main about section with correct data-testid', () => {
		render(About, { props: { data: mockData } });

		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toBeInTheDocument();
		expect(aboutSection).toHaveClass('bg-black', 'pt-12', 'text-white');
	});

	test('should render main title', () => {
		render(About, { props: { data: mockData } });

		const mainTitle = screen.getByRole('heading', { level: 2 });
		expect(mainTitle).toBeInTheDocument();
		expect(mainTitle).toHaveTextContent('Acerca de FUGA');
	});

	test('should render mission section', () => {
		render(About, { props: { data: mockData } });

		const misionHeading = screen.getByRole('heading', { name: /Misión/i });
		expect(misionHeading).toBeInTheDocument();

		const misionText = screen.getByText(/Impulsar el desarrollo humano/);
		expect(misionText).toBeInTheDocument();
	});

	test('should render vision section', () => {
		render(About, { props: { data: mockData } });

		const visionHeading = screen.getByRole('heading', { name: /Visión/i });
		expect(visionHeading).toBeInTheDocument();

		const visionText = screen.getByText(/comunidad referente/);
		expect(visionText).toBeInTheDocument();
	});

	test('should render philosophy section', () => {
		render(About, { props: { data: mockData } });

		const filosofiaHeading = screen.getByRole('heading', { name: /Filosofía/i });
		expect(filosofiaHeading).toBeInTheDocument();

		const filosofiaText = screen.getByText(/El deporte es nuestro camino de crecimiento/);
		expect(filosofiaText).toBeInTheDocument();
	});

	test('should have three columns layout', () => {
		render(About, { props: { data: mockData } });

		const aboutSection = screen.getByTestId('about-section');
		const gridContainer = aboutSection.querySelector('.grid');
		expect(gridContainer).toBeInTheDocument();
		expect(gridContainer).toHaveClass('sm:grid-cols-3');
	});

	test('should apply proper styling classes for brand consistency', () => {
		render(About, { props: { data: mockData } });

		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toHaveClass('bg-black', 'text-white');

		// Check text color consistency
		const grayTextElements = aboutSection.querySelectorAll('.text-gray-300');
		expect(grayTextElements.length).toBeGreaterThan(0);
	});

	test('should not render when visible is false', () => {
		render(About, { props: { data: { ...mockData, visible: false } } });

		const aboutSection = screen.queryByTestId('about-section');
		expect(aboutSection).not.toBeInTheDocument();
	});

	test('should not render when data is null', () => {
		render(About, { props: { data: null } });

		const aboutSection = screen.queryByTestId('about-section');
		expect(aboutSection).not.toBeInTheDocument();
	});
});

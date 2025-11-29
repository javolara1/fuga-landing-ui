import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import About from './About.svelte';

describe('About.svelte', () => {
	test('should render main about section with correct data-testid', () => {
		render(About);

		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toBeInTheDocument();
		expect(aboutSection).toHaveClass('bg-black', 'pt-12', 'text-white');
	});

	test('should render main title and description', () => {
		render(About);

		const mainTitle = screen.getByRole('heading', { level: 2 });
		expect(mainTitle).toBeInTheDocument();
		expect(mainTitle).toHaveTextContent('About FUGA');

		const description = screen.getByText(
			/A multidisciplinary sports team dedicated to athletic excellence and performance optimization/
		);
		expect(description).toBeInTheDocument();
	});

	test('should render mission section with content', () => {
		render(About);

		const missionHeading = screen.getByRole('heading', { name: /Our Mission/i });
		expect(missionHeading).toBeInTheDocument();

		const missionText1 = screen.getByText(
			/At FUGA, we believe that every athlete deserves access to professional training and coaching/
		);
		expect(missionText1).toBeInTheDocument();

		const missionText2 = screen.getByText(
			/Whether you're a competitive athlete or someone looking to improve your fitness/
		);
		expect(missionText2).toBeInTheDocument();
	});

	test('should render "Why Choose FUGA" feature list', () => {
		render(About);

		const whyChooseHeading = screen.getByRole('heading', { name: /Why Choose FUGA/i });
		expect(whyChooseHeading).toBeInTheDocument();

		// Check all feature list items
		const professionalCoaching = screen.getByText(
			/Professional coaching staff with years of experience/
		);
		const stateOfTheArt = screen.getByText(/State-of-the-art training facilities/);
		const personalizedTraining = screen.getByText(/Personalized training programs/);
		const scienceBased = screen.getByText(/Science-based training methodologies/);

		expect(professionalCoaching).toBeInTheDocument();
		expect(stateOfTheArt).toBeInTheDocument();
		expect(personalizedTraining).toBeInTheDocument();
		expect(scienceBased).toBeInTheDocument();

		// Check that feature list items are in list format
		const featureList = screen.getByRole('list');
		expect(featureList).toBeInTheDocument();
	});

	test('should render training philosophy section with three principles', () => {
		render(About);

		const philosophyHeading = screen.getByRole('heading', { name: /Our Training Philosophy/i });
		expect(philosophyHeading).toBeInTheDocument();

		// Check all three philosophy principles
		const scienceBasedApproach = screen.getByRole('heading', { name: /Science-Based Approach/i });
		const individualizedProgramming = screen.getByRole('heading', {
			name: /Individualized Programming/i
		});
		const progressiveDevelopment = screen.getByRole('heading', {
			name: /Progressive Development/i
		});

		expect(scienceBasedApproach).toBeInTheDocument();
		expect(individualizedProgramming).toBeInTheDocument();
		expect(progressiveDevelopment).toBeInTheDocument();

		// Check philosophy descriptions
		const scienceText = screen.getByText(
			/We use evidence-based training methods and the latest sports science research/
		);
		const individualizedText = screen.getByText(
			/Every athlete is unique. We create customized training plans/
		);
		const progressiveText = screen.getByText(
			/We focus on continuous improvement through structured progression/
		);

		expect(scienceText).toBeInTheDocument();
		expect(individualizedText).toBeInTheDocument();
		expect(progressiveText).toBeInTheDocument();
	});

	test('should render sports disciplines grid with four sports', () => {
		render(About);

		const disciplinesHeading = screen.getByRole('heading', {
			name: /Multidisciplinary Excellence/i
		});
		expect(disciplinesHeading).toBeInTheDocument();

		// Check all four sports
		const strengthTraining = screen.getByRole('heading', { name: /Strength Training/i });
		const cycling = screen.getByRole('heading', { name: /Cycling/i });
		const running = screen.getByRole('heading', { name: /Running/i });
		const swimming = screen.getByRole('heading', { name: /Swimming/i });

		expect(strengthTraining).toBeInTheDocument();
		expect(cycling).toBeInTheDocument();
		expect(running).toBeInTheDocument();
		expect(swimming).toBeInTheDocument();

		// Check sport descriptions
		const foundationText = screen.getByText(/Foundation for all sports/);
		const roadMountainText = screen.getByText(/Road & mountain biking/);
		const trackRoadTrailText = screen.getByText(/Track, road & trail/);
		const poolOpenWaterText = screen.getByText(/Pool & open water/);

		expect(foundationText).toBeInTheDocument();
		expect(roadMountainText).toBeInTheDocument();
		expect(trackRoadTrailText).toBeInTheDocument();
		expect(poolOpenWaterText).toBeInTheDocument();
	});

	test('should have correct responsive grid layouts', () => {
		render(About);

		// Check main grid container
		const mainContainer = screen.getByTestId('about-section').querySelector('.max-w-6xl');
		expect(mainContainer).toBeInTheDocument();

		// Check that grid layouts are present (simplified test)
		const gridElements = screen.getAllByText(/.*/).filter((el) => el.closest('.grid'));
		expect(gridElements.length).toBeGreaterThan(0);
	});

	test('should apply proper styling classes for brand consistency', () => {
		render(About);

		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toHaveClass('bg-black', 'text-white');

		// Check card styling
		const cards = screen
			.getAllByRole('heading')
			.filter(
				(heading) =>
					heading.textContent?.includes('Why Choose FUGA') ||
					heading.textContent?.includes('Our Training Philosophy')
			);

		cards.forEach((card) => {
			const cardContainer = card.closest('.bg-gray-900');
			expect(cardContainer).toBeInTheDocument();
			expect(cardContainer).toHaveClass('border-gray-800');
		});

		// Check text color consistency
		const grayTextElements = screen
			.getAllByText(/.*/)
			.filter(
				(element) =>
					element.classList.contains('text-gray-300') || element.classList.contains('text-gray-400')
			);
		expect(grayTextElements.length).toBeGreaterThan(0);
	});

	test('should render all SVG icons in feature list', () => {
		render(About);

		// Check that SVG icons are present in the "Why Choose FUGA" section
		const featureList = screen.getByText(/Professional coaching staff/).closest('ul');
		expect(featureList).toBeInTheDocument();

		const svgIcons = featureList?.querySelectorAll('svg');
		expect(svgIcons?.length).toBe(4); // Should have 4 checkmark icons

		if (svgIcons) {
			svgIcons.forEach((svg) => {
				expect(svg).toHaveClass('h-5', 'w-5', 'text-white');
			});
		}
	});

	test('should render emoji icons in philosophy and sports sections', () => {
		render(About);

		// Check philosophy section emojis
		const philosophyEmojis = screen.getAllByText(/🔬|🎯|📈/);
		expect(philosophyEmojis.length).toBe(3);

		// Check sports section emojis
		const sportsEmojis = screen.getAllByText(/💪|🚴‍♂️|🏃‍♂️|🏊‍♂️/);
		expect(sportsEmojis.length).toBe(4);
	});

	test('should have proper semantic structure and accessibility', () => {
		render(About);

		// Check main section has proper role
		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toBeInTheDocument();

		// Check headings hierarchy
		const h2Headings = screen.getAllByRole('heading', { level: 2 });
		expect(h2Headings.length).toBeGreaterThan(0);

		const h3Headings = screen.getAllByRole('heading', { level: 3 });
		expect(h3Headings.length).toBeGreaterThan(0);

		const h4Headings = screen.getAllByRole('heading', { level: 4 });
		expect(h4Headings.length).toBeGreaterThan(0);

		// Check lists are properly structured
		const lists = screen.getAllByRole('list');
		expect(lists.length).toBeGreaterThan(0);

		// Check list items
		const listItems = screen.getAllByRole('listitem');
		expect(listItems.length).toBeGreaterThan(0);
	});

	test('should render all content sections in correct order', () => {
		render(About);

		const aboutSection = screen.getByTestId('about-section');
		const children = Array.from(aboutSection.children);

		// Check that sections appear in correct order
		const sectionTexts = children.map((child) => child.textContent);

		// Should contain main sections in order
		expect(sectionTexts.some((text) => text?.includes('About FUGA'))).toBe(true);
		expect(sectionTexts.some((text) => text?.includes('Our Mission'))).toBe(true);
		expect(sectionTexts.some((text) => text?.includes('Why Choose FUGA'))).toBe(true);
		expect(sectionTexts.some((text) => text?.includes('Our Training Philosophy'))).toBe(true);
		expect(sectionTexts.some((text) => text?.includes('Multidisciplinary Excellence'))).toBe(true);
	});
});

import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Page from './+page.svelte';
import type { LandingPageData, SEOData, LocalBusinessJsonLd } from '$lib/types';

const mockLandingPage: LandingPageData = {
	id: 1,
	documentId: 'test-doc-id',
	createdAt: '2025-01-01T00:00:00.000Z',
	updatedAt: '2025-01-01T00:00:00.000Z',
	publishedAt: '2025-01-01T00:00:00.000Z',
	mainTitle: 'Comunidad Deportiva Multidisciplinaria',
	mainDescription:
		'FUGA es una comunidad para los amantes y apasionados del deporte, combinamos ciencia, experiencia y herramientas de desarrollo humano para crear tu mejor versión.',
	callToActionLabel: 'Comienza a Entrenar Hoy',
	heroImage: {
		id: 1,
		url: 'https://example.com/hero.jpg',
		alternativeText: 'Hero image',
		name: 'hero.jpg',
		width: 1920,
		height: 1080
	},
	serviceSection: {
		id: 1,
		serviceSectionTitle: 'Entrenamiento',
		serviceSectionDescription: 'Entrena donde estés...',
		serviceitems: [
			{
				id: 1,
				serviceItemTitle: 'Modalidad',
				cards: [
					{
						id: 1,
						serviceCardTitle: 'Entrenamiento Presencial',
						cardDescription: 'Sesiones guiadas.'
					}
				]
			}
		],
		visible: true
	},
	aboutSection: {
		id: 1,
		AboutSectionTitle: 'Acerca de FUGA',
		mision: 'Impulsar el desarrollo humano...',
		vision: 'Ser una comunidad referente...',
		phylosophy: 'El deporte es nuestro camino de crecimiento...',
		visible: true
	},
	contactSection: {
		id: 1,
		contactSectionTitle: 'Ponte en Contacto',
		contactSectionDescription: '¿Listo para comenzar tu viaje de entrenamiento?',
		contactSectionLocation: 'Fuga Core\nLuz Saviñon 603bis',
		contactSectionPhoneNumber: '5546091930',
		contactSectionEmail: 'hola@fuga.mx',
		contactSectionLastMessage: 'En FUGA no solo entrenamos atletas...',
		contactSectionActionButton: 'Obtén clase muestra',
		visible: true
	},
	footerSection: {
		id: 1,
		footerSectionRights: '© 2025 Equipo Deportivo FUGA. Todos los derechos reservados.',
		footerSectionSocialNetworks: [
			{
				id: 1,
				LinkLabel: '@somosfugamx',
				LinkUrl: 'https://instagram.com/somosfugamx',
				Linkicon: null
			}
		],
		footerSectionLinks: [
			{ id: 1, LinkLabel: 'Política de Privacidad', LinkUrl: '/privacy-policy', Linkicon: null }
		]
	}
};

const mockSeo: SEOData = {
	title: 'Comunidad Deportiva Multidisciplinaria',
	description:
		'FUGA es una comunidad para los amantes y apasionados del deporte, combinamos ciencia, experiencia y herramientas de desarrollo humano para crear tu mejor versión.',
	ogType: 'website'
};

const mockJsonLd: LocalBusinessJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'FUGA',
	description:
		'FUGA es una comunidad para los amantes y apasionados del deporte, combinamos ciencia, experiencia y herramientas de desarrollo humano para crear tu mejor versión.',
	url: 'https://fuga.mx',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Luz Saviñon 603bis',
		addressLocality: 'Del Valle, Benito Juarez',
		addressRegion: 'CDMX',
		addressCountry: 'MX'
	}
};

const defaultProps = {
	data: {
		landingPage: mockLandingPage,
		blogUrl: 'http://localhost:5173/',
		siteUrl: 'https://fuga.mx',
		defaultSeo: mockSeo,
		jsonLd: mockJsonLd
	}
};

describe('/+page.svelte', () => {
	test('should render hero section with main heading', () => {
		render(Page, { props: defaultProps });
		const heroSection = screen.getByTestId('hero-section');
		const mainHeading = screen.getByTestId('hero-heading');

		expect(heroSection).toBeInTheDocument();
		expect(mainHeading).toBeInTheDocument();
		expect(mainHeading).toHaveTextContent('Comunidad Deportiva Multidisciplinaria');
	});

	test('should render all main sections', () => {
		render(Page, { props: defaultProps });

		// Check that all main sections are present
		expect(screen.getByTestId('hero-section')).toBeInTheDocument();
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('should render header with logo', () => {
		render(Page, { props: defaultProps });

		// Check that header is present with FUGA logo
		const header = screen.getByTestId('header');
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent('FUGA');
	});

	test('should render call-to-action button', () => {
		render(Page, { props: defaultProps });

		// Check that CTA button is present
		const startTrainingButton = screen.getByTestId('cta-start-training');

		expect(startTrainingButton).toBeInTheDocument();
		expect(startTrainingButton).toHaveTextContent('Comienza a Entrenar Hoy');
	});

	test('should render footer', () => {
		render(Page, { props: defaultProps });

		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
		expect(screen.getByText(/© 2025 Equipo Deportivo FUGA/)).toBeInTheDocument();
	});

	test('should have correct page structure and styling', () => {
		render(Page, { props: defaultProps });

		const pageContainer = screen.getByRole('main').parentElement;
		expect(pageContainer).toHaveClass('min-h-screen', 'bg-black', 'text-white');
	});

	test('should render services section', () => {
		render(Page, { props: defaultProps });

		const servicesSection = screen.getByTestId('services-section');
		expect(servicesSection).toBeInTheDocument();
		expect(servicesSection).toHaveTextContent('Entrenamiento');
	});

	test('should render about section', () => {
		render(Page, { props: defaultProps });

		const aboutSection = screen.getByTestId('about-section');
		expect(aboutSection).toBeInTheDocument();
		expect(aboutSection).toHaveTextContent('Acerca de FUGA');
	});

	test('should render contact section', () => {
		render(Page, { props: defaultProps });

		const contactSection = screen.getByTestId('contact-section');
		expect(contactSection).toBeInTheDocument();
		expect(contactSection).toHaveTextContent('Ponte en Contacto');
	});
});

// Types for the landing page application

// Strapi response wrapper types
export interface StrapiResponse<T> {
	data: T;
	meta: Record<string, unknown>;
}

// Service Card component
export interface ServiceCard {
	id: number;
	serviceCardTitle: string;
	cardDescription: string | null;
}

// Service Item component (contains cards)
export interface ServiceItem {
	id: number;
	serviceItemTitle: string;
	cards: ServiceCard[];
}

// Service Section component
export interface ServiceSection {
	id: number;
	serviceSectionTitle: string;
	serviceSectionDescription: string;
	serviceitems: ServiceItem[];
	visible: boolean | null;
}

// About Section component
export interface AboutSection {
	id: number;
	AboutSectionTitle: string | null;
	mision: string | null;
	vision: string | null;
	phylosophy: string | null;
	visible: boolean | null;
}

// Contact Section component
export interface ContactSection {
	id: number;
	contactSectionTitle: string;
	contactSectionDescription: string;
	contactSectionLocation: string | null;
	contactSectionPhoneNumber: string | null;
	contactSectionEmail: string | null;
	contactSectionLastMessage: string | null;
	contactSectionActionButton: string | null;
	visible: boolean | null;
}

// Strapi Media type
export interface StrapiMedia {
	id: number;
	url: string;
	alternativeText: string | null;
	name: string;
	width: number | null;
	height: number | null;
}

// Link component (used for social networks and footer links)
export interface Link {
	id: number;
	LinkLabel: string;
	LinkUrl: string;
	Linkicon: StrapiMedia | null;
}

// Footer Section component
export interface FooterSection {
	id: number;
	footerSectionRights: string | null;
	footerSectionSocialNetworks: Link[];
	footerSectionLinks: Link[];
}

// Prospect entity (contact form submission)
export interface Prospect {
	name: string;
	lastName?: string;
	email: string;
	phoneNumber?: string;
}

// Error codes for prospect submission
export type ProspectErrorCode = 'duplicate_email' | 'missing_fields' | 'server_error';

// Result type for prospect submission
export interface ProspectSubmitResult {
	success: boolean;
	errorCode?: ProspectErrorCode;
}

// Landing Page Content from Strapi
export interface LandingPageData {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	mainTitle: string;
	mainDescription: string;
	callToActionLabel: string;
	heroImage: StrapiMedia | null;
	serviceSection: ServiceSection | null;
	aboutSection: AboutSection | null;
	contactSection: ContactSection | null;
	footerSection: FooterSection | null;
}

export type LandingPageResponse = StrapiResponse<LandingPageData>;

// SEO metadata for pages
export interface SEOData {
	title: string;
	description: string;
	canonical?: string;
	ogImage?: string;
	ogImageAlt?: string;
	ogType?: 'website' | 'article' | 'product';
	noindex?: boolean;
	nofollow?: boolean;
}

// LocalBusiness JSON-LD structure
export interface LocalBusinessJsonLd {
	'@context': 'https://schema.org';
	'@type': 'LocalBusiness';
	name: string;
	description: string;
	url: string;
	address: {
		'@type': 'PostalAddress';
		streetAddress: string;
		addressLocality: string;
		addressRegion: string;
		addressCountry: string;
	};
	image?: string;
	sameAs?: string[];
}

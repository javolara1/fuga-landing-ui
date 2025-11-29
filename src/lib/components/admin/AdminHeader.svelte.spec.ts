import { render, screen } from '@testing-library/svelte';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import AdminHeader from './AdminHeader.svelte';

// Mock the i18n store
vi.mock('$lib/i18n', () => {
	const mockTranslations = {
		'admin.navigation.profile': 'Profile',
		'admin.navigation.blog': 'Blog',
		'user.logout': 'Logout',
		'header.openMenu': 'Open menu',
		'header.closeMenu': 'Close menu'
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

// Mock $app/forms enhance function
vi.mock('$app/forms', () => ({
	enhance: vi.fn(() => ({}))
}));

describe('AdminHeader.svelte', () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks();
	});

	test('should render admin header with correct structure', () => {
		render(AdminHeader);

		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass(
			'sticky',
			'top-0',
			'z-50',
			'border-b',
			'border-gray-800',
			'bg-black'
		);
	});

	test('should render logo with FUGA text', () => {
		render(AdminHeader);

		const logo = screen.getByRole('heading', { level: 1, name: 'FUGA' });
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveTextContent('FUGA');
	});

	test('should render desktop navigation links with correct props', () => {
		render(AdminHeader, { props: { currentPage: 'profile' } });

		const profileLink = screen.getByRole('link', { name: 'Profile' });
		const blogLink = screen.getByRole('link', { name: 'Blog' });

		expect(profileLink).toBeInTheDocument();
		expect(blogLink).toBeInTheDocument();
		expect(profileLink).toHaveAttribute('href', '/admin');
		expect(blogLink).toHaveAttribute('href', '/admin/blog');
	});

	test('should highlight active page in desktop navigation', () => {
		render(AdminHeader, { props: { currentPage: 'blog' } });

		const profileLink = screen.getByRole('link', { name: 'Profile' });
		const blogLink = screen.getByRole('link', { name: 'Blog' });

		// Blog link should have bold font when selected
		expect(blogLink).toHaveClass('font-bold');
		expect(profileLink).toHaveClass('font-normal');
	});

	test('should render desktop logout form', () => {
		render(AdminHeader);

		// Forms don't have implicit roles, so we query by tag name
		const logoutForm = document.querySelector('form');
		expect(logoutForm).toBeInTheDocument();
		expect(logoutForm).toHaveAttribute('method', 'POST');
		expect(logoutForm).toHaveAttribute('action', '?/logout');

		const logoutButton = screen.getByRole('button', { name: 'Logout' });
		expect(logoutButton).toBeInTheDocument();
		expect(logoutButton).toHaveAttribute('type', 'submit');
	});

	test('should render mobile menu button with correct aria attributes', () => {
		render(AdminHeader);

		const mobileMenuButton = screen.getByRole('button', { name: 'Open menu' });
		expect(mobileMenuButton).toBeInTheDocument();
		expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-navigation');
		expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
		expect(mobileMenuButton).toHaveClass('md:hidden');
	});

	test('should have correct responsive classes for desktop and mobile elements', () => {
		render(AdminHeader);

		// Desktop navigation should be hidden on mobile
		const desktopNav = screen.getByRole('navigation');
		expect(desktopNav).toHaveClass('hidden', 'md:flex');

		// Desktop logout should be hidden on mobile
		const desktopLogoutContainer = document.querySelector('div.hidden.md\\:block');
		expect(desktopLogoutContainer).toBeInTheDocument();

		// Mobile menu button should be hidden on desktop
		const mobileMenuButton = screen.getByRole('button', { name: 'Open menu' });
		expect(mobileMenuButton).toHaveClass('md:hidden');
	});

	test('should have proper container styling and layout', () => {
		render(AdminHeader);

		const container = screen.getByRole('banner').querySelector('.max-w-6xl');
		expect(container).toBeInTheDocument();
		expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');

		const innerContainer = container?.querySelector('.flex');
		expect(innerContainer).toBeInTheDocument();
		expect(innerContainer).toHaveClass('items-center', 'justify-between', 'py-4');
	});

	test('should use default currentPage prop when not provided', () => {
		render(AdminHeader);

		const profileLink = screen.getByRole('link', { name: 'Profile' });
		expect(profileLink).toHaveClass('font-bold');
	});

	test('should render SVG icons for mobile menu button', () => {
		render(AdminHeader);

		const mobileMenuButton = screen.getByRole('button', { name: 'Open menu' });
		const hamburgerIcon = mobileMenuButton.querySelector('svg');
		expect(hamburgerIcon).toBeInTheDocument();
		expect(hamburgerIcon).toHaveClass('h-6', 'w-6');
	});
});

import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Breadcrumb from './Breadcrumb.svelte';
import type { BreadcrumbItem } from '$lib/types';

describe('Breadcrumb.svelte', () => {
	test('should render breadcrumb navigation with correct structure', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		expect(nav).toHaveClass('mb-8');
	});

	test('should render single item as current page (non-clickable)', () => {
		const items: BreadcrumbItem[] = [{ label: 'Current Page' }];

		render(Breadcrumb, { props: { items } });

		// Should render only the current page span
		const currentPageSpan = screen.getByText('Current Page');
		expect(currentPageSpan).toBeInTheDocument();
		expect(currentPageSpan).toHaveClass('text-white');
		expect(currentPageSpan.tagName).toBe('SPAN');

		// Should not render any links or separators
		const links = screen.queryAllByRole('link');
		expect(links).toHaveLength(0);
		const separators = screen.queryAllByText('-');
		expect(separators).toHaveLength(0);
	});

	test('should render multiple items with proper link/span structure', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		// Should render two links and one span
		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveTextContent('Home');
		expect(links[1]).toHaveTextContent('Blog');

		const currentPageSpan = screen.getByText('Current Page');
		expect(currentPageSpan).toBeInTheDocument();
		expect(currentPageSpan.tagName).toBe('SPAN');
	});

	test('should apply correct styling to clickable breadcrumb items', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		const links = screen.getAllByRole('link');
		links.forEach((link) => {
			expect(link).toHaveClass('text-gray-400', 'transition-colors', 'hover:text-white');
		});
	});

	test('should apply correct styling to current page item', () => {
		const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current Page' }];

		render(Breadcrumb, { props: { items } });

		const currentPageSpan = screen.getByText('Current Page');
		expect(currentPageSpan).toHaveClass('text-white');
		expect(currentPageSpan).not.toHaveClass(
			'text-gray-400',
			'transition-colors',
			'hover:text-white'
		);
	});

	test('should render separators between clickable items', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Article', href: '/blog/article' },
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		// Should render 3 separators (between 4 items)
		const separators = screen.getAllByText('-');
		expect(separators).toHaveLength(3);

		separators.forEach((separator) => {
			expect(separator).toHaveClass('mx-2', 'text-gray-400');
		});
	});

	test('should handle empty items array gracefully', () => {
		render(Breadcrumb, { props: { items: [] } });

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		expect(nav).toHaveClass('mb-8');

		// Should not render any content inside nav
		expect(nav.children).toHaveLength(0);
	});

	test('should render items with correct href attributes', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		const links = screen.getAllByRole('link');
		expect(links[0]).toHaveAttribute('href', '/');
		expect(links[1]).toHaveAttribute('href', '/blog');
	});

	test('should have proper container margin and layout', () => {
		const items: BreadcrumbItem[] = [{ label: 'Current Page' }];

		render(Breadcrumb, { props: { items } });

		const nav = screen.getByRole('navigation');
		expect(nav).toHaveClass('mb-8');
	});

	test('should handle items without href gracefully', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home' }, // No href, but still renders as link due to position
			{ label: 'Current Page' }
		];

		render(Breadcrumb, { props: { items } });

		// First item renders as link (due to position), second as span (last item)
		const homeLink = screen.getByText('Home');
		const currentPageSpan = screen.getByText('Current Page');

		expect(homeLink).toBeInTheDocument();
		expect(homeLink.tagName).toBe('A');
		expect(homeLink).toHaveClass('text-gray-400', 'transition-colors', 'hover:text-white');
		expect(homeLink).not.toHaveAttribute('href'); // No href attribute when not provided

		expect(currentPageSpan).toBeInTheDocument();
		expect(currentPageSpan.tagName).toBe('SPAN');
		expect(currentPageSpan).toHaveClass('text-white');
	});

	test('should maintain proper visual hierarchy', () => {
		const items: BreadcrumbItem[] = [
			{ label: 'Dashboard', href: '/admin' },
			{ label: 'Blog Management', href: '/admin/blog' },
			{ label: 'Create Article' }
		];

		render(Breadcrumb, { props: { items } });

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();

		// Should have proper spacing and visual separation
		const links = screen.getAllByRole('link');
		const separators = screen.getAllByText('-');
		const currentPage = screen.getByText('Create Article');

		expect(links).toHaveLength(2);
		expect(separators).toHaveLength(2);
		expect(currentPage).toBeInTheDocument();

		// Verify all elements have correct styling
		links.forEach((link) => {
			expect(link).toHaveClass('text-gray-400');
		});
		separators.forEach((separator) => {
			expect(separator).toHaveClass('text-gray-400');
		});
		expect(currentPage).toHaveClass('text-white');
	});

	test('should use correct semantic HTML structure', () => {
		const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current Page' }];

		render(Breadcrumb, { props: { items } });

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();

		// Should use proper semantic elements
		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/');

		const span = screen.getByText('Current Page');
		expect(span.tagName).toBe('SPAN');
	});
});

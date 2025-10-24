import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteTesting()],
	test: {
		expect: { requireAssertions: true },
		environment: 'jsdom',

		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./vitest-setup-client.ts']
	}
});

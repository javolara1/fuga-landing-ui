/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />

import { beforeAll } from 'vitest';
import { loadTranslations, locale } from './src/lib/i18n';

beforeAll(async () => {
	await loadTranslations('en');
	locale.set('en');
});

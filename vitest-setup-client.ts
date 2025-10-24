import { beforeAll, expect } from 'vitest';
import { loadTranslations, locale } from './src/lib/i18n';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(async () => {
	await loadTranslations('en');
	locale.set('en');
});

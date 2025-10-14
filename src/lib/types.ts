import type { User } from '@supabase/supabase-js';
import type { Tables } from './database.types';

export type Profile = Tables<'profiles'>;

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface AppLocals {
	locale: string;
	t: (key: string) => string;
	getTranslation: () => { t: (key: string) => string };
	user?: User;
	profile?: Profile | null;
}

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';
import { logoutUser } from '$lib/utils/authUtils';

const ARTICLES_PER_PAGE = 10;

export const load: PageServerLoad = async ({ url, locals }) => {
	// Redirect to login if user is not authenticated
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Redirect to user page if user is not admin
	if (locals.profile?.role !== 'admin') {
		throw redirect(303, '/user');
	}

	const page = parseInt(url.searchParams.get('page') || '1');
	const offset = (page - 1) * ARTICLES_PER_PAGE;

	// Get total count of all articles (published and draft)
	const { count: totalCount, error: countError } = await supabase
		.from('articles')
		.select('*', { count: 'exact', head: true });

	if (countError) {
		console.error('Error fetching article count:', countError);
		throw new Error('Failed to load articles');
	}

	// Get paginated articles (both published and draft)
	const { data: articles, error: articlesError } = await supabase
		.from('articles')
		.select('id, title, slug, status, published_at, created_at')
		.order('created_at', { ascending: false })
		.range(offset, offset + ARTICLES_PER_PAGE - 1);

	if (articlesError) {
		console.error('Error fetching articles:', articlesError);
		throw new Error('Failed to load articles');
	}

	const totalPages = Math.ceil((totalCount || 0) / ARTICLES_PER_PAGE);

	return {
		articles: articles || [],
		currentPage: page,
		totalPages,
		totalCount: totalCount || 0
	};
};

export const actions: Actions = {
	logout: async (event) => {
		await logoutUser(event);
	}
};

import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

const ARTICLES_PER_PAGE = 10;

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const offset = (page - 1) * ARTICLES_PER_PAGE;

	// Get total count of published articles
	const { count: totalCount, error: countError } = await supabase
		.from('articles')
		.select('*', { count: 'exact', head: true })
		.eq('status', 'published');

	if (countError) {
		console.error('Error fetching article count:', countError);
		throw new Error('Failed to load articles');
	}

	// Get paginated articles
	const { data: articles, error: articlesError } = await supabase
		.from('articles')
		.select('id, title, excerpt, slug, published_at, created_at')
		.eq('status', 'published')
		.order('published_at', { ascending: false })
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

import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// Get the article by slug
	const { data: article, error: articleError } = await supabase
		.from('articles')
		.select('*')
		.eq('slug', slug)
		.eq('status', 'published')
		.single();

	if (articleError) {
		console.error('Error fetching article:', articleError);
		throw error(404, {
			message: 'Article not found'
		});
	}

	if (!article) {
		throw error(404, {
			message: 'Article not found'
		});
	}

	return {
		article
	};
};

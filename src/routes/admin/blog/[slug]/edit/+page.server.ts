import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ params, locals }) => {
	// Redirect to login if user is not authenticated
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Redirect to user page if user is not admin
	if (locals.profile?.role !== 'admin') {
		throw redirect(303, '/user');
	}

	const { slug } = params;

	// Get the article by slug
	const { data: article, error: articleError } = await supabase
		.from('articles')
		.select('*')
		.eq('slug', slug)
		.single();

	if (articleError || !article) {
		throw redirect(303, '/admin/blog');
	}

	return {
		user: locals.user,
		profile: locals.profile,
		article
	};
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		if (!locals.user || locals.profile?.role !== 'admin') {
			// Get translation function from locals
			const { t } = locals.getTranslation();
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.unauthorized')
			};
		}

		// Get translation function from locals
		const { t } = locals.getTranslation();

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const excerpt = formData.get('excerpt') as string;
		const content = formData.get('content') as string;
		const status = formData.get('status') as string;

		// Validation
		if (!title?.trim()) {
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.titleRequired'),
				title,
				slug,
				excerpt,
				content,
				status
			};
		}

		if (!content?.trim()) {
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.contentRequired'),
				title,
				slug,
				excerpt,
				content,
				status
			};
		}

		if (!slug?.trim()) {
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.slugRequired'),
				title,
				slug,
				excerpt,
				content,
				status
			};
		}

		// Check if slug already exists (excluding current article)
		const { data: existingArticle } = await supabase
			.from('articles')
			.select('id')
			.eq('slug', slug)
			.neq('slug', params.slug)
			.single();

		if (existingArticle) {
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.slugExists')
			};
		}

		try {
			const articleData = {
				title: title.trim(),
				slug: slug.trim(),
				excerpt: excerpt?.trim() || null,
				content: content.trim(),
				status: status || 'draft',
				updated_at: new Date().toISOString(),
				published_at: status === 'published' ? new Date().toISOString() : null
			};

			const { error } = await supabase.from('articles').update(articleData).eq('slug', params.slug);

			if (error) {
				console.error('Error updating article:', error);
				return {
					success: false,
					error: t('admin.blogManagement.edit.errors.updateFailed')
				};
			}

			// Redirect to blog management page on success
			throw redirect(303, '/admin/blog');
		} catch (error) {
			// If it's a redirect, re-throw it
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				const redirectError = error as { status: number; location: string };
				if (redirectError.status >= 300 && redirectError.status < 400) {
					throw error;
				}
			}
			console.error('Unexpected error:', error);
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.unexpectedError')
			};
		}
	},

	delete: async ({ locals, params }) => {
		if (!locals.user || locals.profile?.role !== 'admin') {
			// Get translation function from locals
			const { t } = locals.getTranslation();
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.unauthorized')
			};
		}

		// Get translation function from locals
		const { t } = locals.getTranslation();

		try {
			const { error } = await supabase.from('articles').delete().eq('slug', params.slug);

			if (error) {
				console.error('Error deleting article:', error);
				return {
					success: false,
					error: t('admin.blogManagement.edit.errors.deleteFailed')
				};
			}

			// Redirect to blog management page on success
			throw redirect(303, '/admin/blog');
		} catch (error) {
			// If it's a redirect, re-throw it
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				const redirectError = error as { status: number; location: string };
				if (redirectError.status >= 300 && redirectError.status < 400) {
					throw error;
				}
			}
			console.error('Unexpected error:', error);
			return {
				success: false,
				error: t('admin.blogManagement.edit.errors.unexpectedError')
			};
		}
	}
};

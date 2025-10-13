import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to login if user is not authenticated
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Redirect to user page if user is not admin
	if (locals.profile?.role !== 'admin') {
		throw redirect(303, '/user');
	}

	return {
		user: locals.user,
		profile: locals.profile
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.profile?.role !== 'admin') {
			// Get translation function from locals
			const { t } = locals.getTranslation();
			return {
				success: false,
				error: t('admin.blogManagement.create.errors.unauthorized')
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
				error: t('admin.blogManagement.create.errors.titleRequired'),
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
				error: t('admin.blogManagement.create.errors.contentRequired'),
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
				error: t('admin.blogManagement.create.errors.slugRequired'),
				title,
				slug,
				excerpt,
				content,
				status
			};
		}

		// Check if slug already exists
		const { data: existingArticle } = await supabase
			.from('articles')
			.select('id')
			.eq('slug', slug)
			.single();

		if (existingArticle) {
			return {
				success: false,
				error: t('admin.blogManagement.create.errors.slugExists')
			};
		}

		try {
			const articleData = {
				title: title.trim(),
				slug: slug.trim(),
				excerpt: excerpt?.trim() || null,
				content: content.trim(),
				status: status || 'draft',
				author_id: locals.user.id,
				published_at: status === 'published' ? new Date().toISOString() : null
			};

			const { error } = await supabase.from('articles').insert(articleData);

			if (error) {
				console.error('Error creating article:', error);
				return {
					success: false,
					error: t('admin.blogManagement.create.errors.createFailed')
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
				error: t('admin.blogManagement.create.errors.unexpectedError')
			};
		}
	}
};

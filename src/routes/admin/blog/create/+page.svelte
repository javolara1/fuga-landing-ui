<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import { Carta, MarkdownEditor } from 'carta-md';

	import DOMPurify from 'isomorphic-dompurify';

	let { data, form } = $props();

	let titleInput: HTMLInputElement | undefined;
	let slugInput: HTMLInputElement | undefined;
	let content = $state(form?.content || '');

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	function generateSlug(title: string): string {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	}

	function updateSlug() {
		if (titleInput && slugInput) {
			const slug = generateSlug(titleInput.value);
			slugInput.value = slug;
		}
	}
</script>

<svelte:head>
	<title>{$t('admin.blogManagement.create.title')} - FUGA Admin</title>
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<AdminHeader {data} currentPage="blog" />

	<!-- Main Content -->
	<main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-lg">
			<!-- Breadcrumb and Title -->
			<div class="mb-8">
				<nav class="mb-4 flex space-x-2 text-sm text-gray-400">
					<a href="/admin" class="transition-colors hover:text-white">
						{$t('admin.dashboard')}
					</a>
					<span>→</span>
					<a href="/admin/blog" class="transition-colors hover:text-white">
						{$t('admin.blogManagement.title')}
					</a>
					<span>→</span>
					<span class="text-white">{$t('admin.blogManagement.create.title')}</span>
				</nav>
				<h1 class="text-3xl font-bold">{$t('admin.blogManagement.create.title')}</h1>
				<p class="mt-2 text-gray-400">{$t('admin.blogManagement.create.description')}</p>
			</div>

			<!-- Form -->
			<form method="POST" action="?/create" use:enhance class="space-y-6">
				<!-- Title -->
				<div>
					<label for="title" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.title')} *
					</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						bind:this={titleInput}
						oninput={updateSlug}
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:ring-2 focus:ring-white focus:outline-none"
						placeholder={$t('admin.blogManagement.create.form.titlePlaceholder')}
						value={form?.title || ''}
					/>
				</div>

				<!-- Slug -->
				<div>
					<label for="slug" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.slug')} *
					</label>
					<input
						type="text"
						id="slug"
						name="slug"
						required
						bind:this={slugInput}
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:ring-2 focus:ring-white focus:outline-none"
						placeholder={$t('admin.blogManagement.create.form.slugPlaceholder')}
						value={form?.slug || ''}
					/>
					<p class="mt-1 text-xs text-gray-400">
						{$t('admin.blogManagement.create.form.slugHelp')}
					</p>
				</div>

				<!-- Excerpt -->
				<div>
					<label for="excerpt" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.excerpt')}
					</label>
					<textarea
						id="excerpt"
						name="excerpt"
						rows={3}
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:ring-2 focus:ring-white focus:outline-none"
						placeholder={$t('admin.blogManagement.create.form.excerptPlaceholder')}
						>{form?.excerpt || ''}</textarea
					>
				</div>

				<!-- Content -->
				<div>
					<label for="content" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.content')} *
					</label>
					<textarea id="content" name="content" required class="hidden" bind:value={content}
					></textarea>
					<div class="carta-container">
						<MarkdownEditor mode={'tabs'} bind:value={content} {carta} />
					</div>
				</div>

				<!-- Status -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.status')}
					</label>
					<div class="flex space-x-4">
						<label class="flex items-center">
							<input
								type="radio"
								name="status"
								value="draft"
								checked
								class="mr-2 text-white focus:ring-white"
							/>
							<span class="text-gray-300">{$t('admin.blogManagement.status.draft')}</span>
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								name="status"
								value="published"
								class="mr-2 text-white focus:ring-white"
							/>
							<span class="text-gray-300">{$t('admin.blogManagement.status.published')}</span>
						</label>
					</div>
				</div>

				<!-- Error Message -->
				{#if form?.error}
					<div class="rounded-lg bg-red-900/50 p-4 text-red-200">
						{form.error}
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="flex space-x-4">
					<button
						type="submit"
						class="rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-100"
					>
						{$t('admin.blogManagement.createArticle')}
					</button>
					<a
						href="/admin/blog"
						class="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
					>
						{$t('common.cancel')}
					</a>
				</div>
			</form>
		</div>
	</main>
</div>

<style>
	/* Set monospace font for Carta editor */
	:global(.carta-font-code) {
		font-size: 1.1rem;
		line-height: 1.1rem;
		letter-spacing: normal;
		color: white;
	}

	/* Custom dark theme for Carta MD */
	:global(.carta-theme__default) {
		--border-color: #374151;
		--selection-color: #60a5fa3d;
		--focus-outline: #60a5fa;
		--hover-color: #374151;
		--caret-color: #ffffff;
		--text-color: #ffffff;

		--border-color-dark: #4b5563;
		--selection-color-dark: #60a5fa3d;
		--focus-outline-dark: #60a5fa;
		--hover-color-dark: #4b5563;
		--caret-color-dark: #ffffff;
		--text-color-dark: #f1f1f1;
	}

	:global(.carta-theme__default.carta-editor) {
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
		background-color: #1f2937;
		color: white;
	}

	:global(.carta-theme__default .carta-editor ::selection) {
		background: var(--selection-color);
	}

	/* Box sizings */
	:global(.carta-theme__default .carta-toolbar) {
		border-bottom: 1px solid var(--border-color);
		background-color: #111827;
		padding: 0.5rem 0.75rem;
	}

	:global(.carta-theme__default .carta-wrapper) {
		padding: 0 1rem 0 1rem;
		background-color: #1f2937;
	}

	:global(.carta-theme__default .carta-container > *) {
		margin: 1rem 0 1rem 0;
	}

	/* Text settings */
	:global(.carta-theme__default .carta-input) {
		caret-color: var(--caret-color);
		font-size: 0.95rem;
		background-color: #111827;
		color: white;
	}

	:global(.carta-theme__default .carta-input ::placeholder) {
		color: #9ca3af;
	}

	/* Splitter */
	:global(.carta-theme__default .mode-split.carta-container::after) {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		background: var(--border-color);
	}

	:global(.carta-theme__default .mode-split .carta-input) {
		padding-right: 1rem;
	}

	:global(.carta-theme__default .mode-split .carta-renderer) {
		padding-left: 1rem;
	}

	/* Toolbar */
	:global(.carta-theme__default .carta-toolbar-left) {
		display: flex;
		align-items: flex-end;
	}

	:global(.carta-theme__default button) {
		color: var(--text-color);
	}

	/* Markdown input and renderer */
	:global(.carta-theme__default .carta-input),
	:global(.carta-theme__default .carta-renderer) {
		height: 600px;
		overflow-y: scroll;
		background-color: #1f2937;
		color: white;
	}

	:global(.carta-theme__default .carta-renderer) {
		background-color: #1f2937;
		color: white;
	}

	:global(.carta-theme__default .carta-renderer h1),
	:global(.carta-theme__default .carta-renderer h2),
	:global(.carta-theme__default .carta-renderer h3),
	:global(.carta-theme__default .carta-renderer h4),
	:global(.carta-theme__default .carta-renderer h5),
	:global(.carta-theme__default .carta-renderer h6) {
		color: white;
	}

	:global(.carta-theme__default .carta-renderer p) {
		color: #d1d5db;
	}

	:global(.carta-theme__default .carta-renderer code) {
		background-color: #374151;
		color: #f3f4f6;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
	}

	:global(.carta-theme__default .carta-renderer pre) {
		background-color: #111827;
		color: #f3f4f6;
		border: 1px solid #374151;
		border-radius: 0.375rem;
		padding: 1rem;
	}

	:global(.carta-theme__default .carta-renderer blockquote) {
		border-left: 4px solid #4b5563;
		color: #9ca3af;
		padding-left: 1rem;
		margin-left: 0;
	}

	:global(.carta-theme__default .carta-renderer a) {
		color: #60a5fa;
	}

	:global(.carta-theme__default .carta-renderer a:hover) {
		color: #93c5fd;
	}

	:global(.carta-theme__default .carta-renderer table) {
		border: 1px solid #374151;
		border-collapse: collapse;
	}

	:global(.carta-theme__default .carta-renderer th),
	:global(.carta-theme__default .carta-renderer td) {
		border: 1px solid #374151;
		padding: 0.5rem;
		background-color: #1f2937;
		color: white;
	}

	:global(.carta-theme__default .carta-renderer th) {
		background-color: #111827;
		font-weight: 600;
	}

	/* Icons */
	:global(.carta-theme__default .carta-icon),
	:global(.carta-theme__default .carta-icon-full) {
		border: 0;
		background: transparent;
		color: #d1d5db;
	}

	:global(.carta-theme__default .carta-icon-full) {
		padding: 6px 4px;
	}

	:global(.carta-theme__default .carta-icon-full span) {
		margin-left: 6px;
	}

	:global(.carta-theme__default .carta-icon:hover),
	:global(.carta-theme__default .carta-icon-full:hover) {
		background: var(--hover-color);
		color: white;
	}

	:global(.carta-input > pre) {
		background: inherit;
	}

	:global(.carta-theme__default .carta-icons-menu) {
		padding: 6px;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		min-width: 180px;
		background-color: #111827;
	}

	:global(.carta-theme__default .carta-icons-menu .carta-icon-full) {
		margin-top: 2px;
	}

	:global(.carta-theme__default .carta-icons-menu .carta-icon-full:first-child) {
		margin-top: 0;
	}

	/* Buttons */
	:global(.carta-theme__default .carta-toolbar-left button) {
		background: none;
		border: none;
		font-size: 0.9rem;
		padding-bottom: 4px;
		border-bottom: 2px solid transparent;
		margin-right: 12px;
		cursor: pointer;
		color: #d1d5db;
	}

	:global(.carta-theme__default .carta-toolbar-left button:last-child) {
		margin-right: 0;
	}

	:global(.carta-theme__default .carta-toolbar-left button.carta-active) {
		font-weight: 600;
		border-bottom: 2px solid #60a5fa;
		color: white;
	}

	:global(.carta-theme__default .carta-toolbar-left button:hover) {
		color: white;
	}
</style>

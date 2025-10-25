<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Carta, MarkdownEditor } from 'carta-md';
	import type { BreadcrumbItem } from '$lib/types';
	import '$lib/styles/md-styles.css';

	import DOMPurify from 'isomorphic-dompurify';

	let { data, form } = $props();

	let titleInput: HTMLInputElement | undefined;
	let slugInput: HTMLInputElement | undefined;
	let content = $state(form?.content || '');

	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: $t('admin.blogManagement.title'), href: '/admin/blog' },
		{ label: $t('admin.blogManagement.create.title') }
	];

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
	<AdminHeader currentPage="blog" />

	<!-- Main Content -->
	<main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-lg">
			<!-- Breadcrumb and Title -->
			<div class="mb-8">
				<Breadcrumb items={breadcrumbItems} />
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
						<MarkdownEditor mode={'tabs'} theme="default" bind:value={content} {carta} />
					</div>
				</div>

				<!-- Status -->
				<fieldset class="space-y-2">
					<legend class="text-sm font-medium text-gray-300">
						{$t('admin.blogManagement.create.form.status')}
					</legend>
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
				</fieldset>

				<!-- Error Message -->
				{#if form?.error}
					<div class="rounded-lg bg-red-900/50 p-4 text-red-200">
						{form.error}
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="flex space-x-4">
					<Button type="submit" variant="primary" size="md">
						{$t('admin.blogManagement.createArticle')}
					</Button>
					<Button href="/admin/blog" variant="secondary" size="md">
						{$t('common.cancel')}
					</Button>
				</div>
			</form>
		</div>
	</main>
</div>

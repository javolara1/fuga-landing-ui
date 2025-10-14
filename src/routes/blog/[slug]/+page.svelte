<script lang="ts">
	import ReducedHeader from '$lib/components/ReducedHeader.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { formatDate } from '$lib/utils/dateUtils';
	import { t } from '$lib/i18n';
	import type { BreadcrumbItem } from '$lib/types';

	let { data } = $props();

	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: $t('admin.blogManagement.title'), href: '/blog' },
		{ label: $t('admin.blogManagement.create.title') }
	];

	// Calculate reading time based on content length
	const calculateReadingTime = (content: string) => {
		const wordsPerMinute = 200;
		const words = content.trim().split(/\s+/).length;
		const minutes = Math.ceil(words / wordsPerMinute);
		return minutes;
	};
</script>

<svelte:head>
	<title>{data.article.title} - {$t('blog.title')}</title>
	<meta name="description" content={data.article.excerpt || data.article.title} />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<ReducedHeader />

	<!-- Article Header -->
	<div class="container mx-auto max-w-4xl px-4 py-16">
		<!-- Breadcrumb -->
		<Breadcrumb items={breadcrumbItems} />

		<!-- Article Title -->
		<h1 class="mb-6 text-4xl leading-tight font-bold md:text-5xl">
			{data.article.title}
		</h1>

		<!-- Article Meta -->
		<div class="mb-8 flex gap-x-4">
			{#if data.article.published_at}
				<time class="block text-sm text-gray-400">
					{formatDate(data.article.published_at)}
				</time>
			{/if}
			<div class="text-sm text-gray-400">
				{$t('blog.detail.by')}
				{$t('blog.detail.fugaTeam')}
			</div>
			<div class="text-sm text-gray-400">
				{calculateReadingTime(data.article.content)}
				{$t('blog.detail.minRead')}
			</div>
		</div>

		<!-- Article Excerpt -->
		{#if data.article.excerpt}
			<p class="mb-8 text-xl leading-relaxed text-gray-300">
				{data.article.excerpt}
			</p>
		{/if}

		<!-- Article Content -->
		<div class="prose prose-lg max-w-none prose-invert">
			{#each data.article.content.split('\n\n') as paragraph}
				{#if paragraph.startsWith('## ')}
					<h2 class="mt-8 mb-4 text-2xl font-bold">
						{paragraph.replace('## ', '')}
					</h2>
				{:else if paragraph.startsWith('### ')}
					<h3 class="mt-6 mb-3 text-xl font-bold">
						{paragraph.replace('### ', '')}
					</h3>
				{:else if paragraph.startsWith('1. ') || paragraph.startsWith('- ')}
					<ul class="mb-4 list-inside list-disc space-y-2">
						{#each paragraph.split('\n') as listItem}
							{#if listItem.trim()}
								<li class="text-gray-300">
									{listItem.replace(/^[1-9]\.\s+/, '').replace(/^-\s+/, '')}
								</li>
							{/if}
						{/each}
					</ul>
				{:else if paragraph.trim()}
					<p class="mb-4 leading-relaxed text-gray-300">
						{paragraph}
					</p>
				{/if}
			{/each}
		</div>

		<!-- Back to Blog -->
		<div class="mt-12 border-t border-gray-800 pt-8">
			<a
				href="/blog"
				class="inline-flex items-center text-white transition-colors hover:text-gray-300"
			>
				← {$t('blog.pageTitle')}
			</a>
		</div>
	</div>
</div>

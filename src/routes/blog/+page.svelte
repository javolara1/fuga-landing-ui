<script lang="ts">
	import ReducedHeader from '$lib/components/ReducedHeader.svelte';
	import { formatDate } from '$lib/utils/dateUtils';
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();

	const getPageUrl = (page: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		return url.toString();
	};
</script>

<svelte:head>
	<title>{$t('blog.title')}</title>
	<meta name="description" content={$t('blog.description')} />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<ReducedHeader />

	<!-- Header Section -->
	<div class="container mx-auto max-w-6xl px-4 py-16">
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">{$t('blog.pageTitle')}</h1>
			<p class="mx-auto max-w-2xl text-xl text-gray-300">
				{$t('blog.pageSubtitle')}
			</p>
		</div>

		<!-- Articles List -->
		{#if data.articles.length > 0}
			<div class="mb-12 space-y-8">
				{#each data.articles as article, index}
					<article
						class="pb-8 {index < data.articles.length - 1 ? 'border-b border-gray-800' : ''}"
					>
						{#if article.published_at}
							<time class="mb-2 block text-sm text-gray-400">
								{formatDate(article.published_at)}
							</time>
						{/if}
						<h2 class="mb-3 text-2xl font-bold">
							{article.title}
						</h2>
						{#if article.excerpt}
							<p class="mb-4 text-lg text-gray-300">
								{article.excerpt}
							</p>
						{/if}
						<Button href={`/blog/${article.slug}`} variant="text" size="md">
							{$t('blog.readMore')}
						</Button>
					</article>
				{/each}
			</div>
		{:else}
			<div class="py-12 text-center">
				<p class="text-xl text-gray-300">{$t('blog.noArticles')}</p>
			</div>
		{/if}

		<!-- Pagination -->
		{#if data.totalPages > 1}
			<div class="flex items-center justify-center space-x-2">
				<!-- Previous Button -->
				{#if data.currentPage > 1}
					<Button href={getPageUrl(data.currentPage - 1)} variant="secondary" size="sm">
						{$t('blog.pagination.previous')}
					</Button>
				{/if}

				<!-- Page Numbers -->
				<div class="flex space-x-1">
					{#each Array.from({ length: data.totalPages }, (_, i) => i + 1) as pageNumber}
						{#if pageNumber === data.currentPage}
							<span class="rounded bg-white px-4 py-2 font-bold text-black">
								{pageNumber}
							</span>
						{:else}
							<Button href={getPageUrl(pageNumber)} variant="secondary" size="sm">
								{pageNumber}
							</Button>
						{/if}
					{/each}
				</div>

				<!-- Next Button -->
				{#if data.currentPage < data.totalPages}
					<Button href={getPageUrl(data.currentPage + 1)} variant="secondary" size="sm">
						{$t('blog.pagination.next')}
					</Button>
				{/if}
			</div>

			<!-- Page Info -->
			<div class="mt-4 text-center text-gray-400">
				{$t('blog.pagination.pageInfo')
					.replace('{currentPage}', data.currentPage)
					.replace('{totalPages}', data.totalPages)} • {$t('blog.pagination.articlesTotal').replace(
					'{totalCount}',
					data.totalCount
				)}
			</div>
		{/if}
	</div>
</div>

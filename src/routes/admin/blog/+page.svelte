<script lang="ts">
	import { formatDate } from '$lib/utils/dateUtils';
	import { t } from '$lib/i18n';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();

	const getPageUrl = (page: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		return url.toString();
	};
</script>

<svelte:head>
	<title>{$t('admin.blogManagement.title')} - FUGA Admin</title>
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<AdminHeader {data} currentPage="blog" />

	<!-- Main Content -->
	<main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-lg">
			<!-- Breadcrumb and Title -->
			<div class="mb-8 flex items-start justify-between">
				<div>
					<nav class="mb-4">
						<Button href="/admin" variant="text" size="sm">
							← {$t('admin.dashboard')}
						</Button>
					</nav>
					<h1 class="text-3xl font-bold">{$t('admin.blogManagement.title')}</h1>
					<p class="mt-2 text-gray-400">{$t('admin.blogManagement.description')}</p>
				</div>
				<Button href="/admin/blog/create" variant="secondary" size="md">
					{$t('admin.blogManagement.createArticle')}
				</Button>
			</div>

			<!-- Articles List -->
			{#if data.articles.length > 0}
				<div class="overflow-hidden rounded-lg border border-gray-800">
					<table class="min-w-full divide-y divide-gray-800">
						<thead class="bg-gray-800">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
								>
									{$t('admin.blogManagement.table.title')}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
								>
									{$t('admin.blogManagement.table.status')}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
								>
									{$t('admin.blogManagement.table.published')}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-300 uppercase"
								>
									{$t('admin.blogManagement.table.created')}
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-800 bg-gray-900">
							{#each data.articles as article}
								<tr class="transition-colors hover:bg-gray-800">
									<td class="px-6 py-4 whitespace-nowrap">
										<Button href={`/admin/blog/${article.slug}/edit`} variant="text" size="sm">
											{article.title}
										</Button>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										{#if article.status === 'published'}
											<span
												class="inline-flex rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white"
											>
												{$t('admin.blogManagement.status.published')}
											</span>
										{:else}
											<span
												class="inline-flex rounded-full bg-gray-600 px-2 py-1 text-xs font-semibold text-white"
											>
												{$t('admin.blogManagement.status.draft')}
											</span>
										{/if}
									</td>
									<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-300">
										{#if article.published_at}
											{formatDate(article.published_at)}
										{:else}
											-
										{/if}
									</td>
									<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-300">
										{formatDate(article.created_at)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
					<p class="text-xl text-gray-300">{$t('admin.blogManagement.noArticles')}</p>
					<p class="mt-2 text-gray-400">{$t('admin.blogManagement.noArticlesDescription')}</p>
				</div>
			{/if}

			<!-- Pagination -->
			{#if data.totalPages > 1}
				<div class="mt-8 flex items-center justify-between">
					<!-- Page Info -->
					<div class="text-sm text-gray-400">
						{$t('admin.blogManagement.pagination.pageInfo')
							.replace('{currentPage}', data.currentPage)
							.replace('{totalPages}', data.totalPages)} • {$t(
							'admin.blogManagement.pagination.articlesTotal'
						).replace('{totalCount}', data.totalCount)}
					</div>

					<!-- Pagination Controls -->
					<div class="flex items-center space-x-2">
						<!-- Previous Button -->
						{#if data.currentPage > 1}
							<Button href={getPageUrl(data.currentPage - 1)} variant="secondary" size="sm">
								{$t('admin.blogManagement.pagination.previous')}
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
								{$t('admin.blogManagement.pagination.next')}
							</Button>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</main>
</div>

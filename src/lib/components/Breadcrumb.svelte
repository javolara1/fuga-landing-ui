<script lang="ts">
	import type { BreadcrumbItem } from '$lib/types';

	let { items = [] as BreadcrumbItem[] } = $props();
</script>

<nav class="mb-8">
	{#each items as item, index}
		{#if index < items.length - 1}
			<!-- Clickable breadcrumb item -->
			<a href={item.href} class="text-gray-400 transition-colors hover:text-white">
				{item.label}
			</a>
			<span class="mx-2 text-gray-400">→</span>
		{:else}
			<!-- Last item (current page) - non-clickable -->
			<span class="text-white">{item.label}</span>
		{/if}
	{/each}
</nav>

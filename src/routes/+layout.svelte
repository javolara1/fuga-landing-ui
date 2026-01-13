<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import SEO from '$lib/components/common/SEO.svelte';
	import { page } from '$app/stores';
	import { createAlternateLocales } from '$lib/seo';

	let { children, data } = $props();

	// Use page-specific SEO if available, otherwise use default
	const seo = $derived($page.data.seo || data.defaultSeo);
	const alternateLocales = $derived(createAlternateLocales(data.siteUrl, $page.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if seo}
	<SEO
		{seo}
		siteUrl={data.siteUrl}
		currentPath={$page.url.pathname}
		locale="es"
		{alternateLocales}
		jsonLd={data.jsonLd}
	/>
{/if}

{@render children?.()}

<script lang="ts">
	import type { SEOData, LocalBusinessJsonLd } from '$lib/types';

	interface Props {
		seo: SEOData;
		siteUrl: string;
		currentPath: string;
		locale?: string;
		alternateLocales?: Array<{ lang: string; href: string }>;
		jsonLd?: LocalBusinessJsonLd;
	}

	let {
		seo,
		siteUrl,
		currentPath,
		locale = 'es',
		alternateLocales = [],
		jsonLd
	}: Props = $props();

	const fullTitle = $derived(seo.title ? `${seo.title} | FUGA` : 'FUGA');
	const canonicalUrl = $derived(seo.canonical || `${siteUrl}${currentPath}`);
	const robotsContent = $derived(
		[seo.noindex && 'noindex', seo.nofollow && 'nofollow'].filter(Boolean).join(', ') ||
			'index, follow'
	);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="description" content={seo.description} />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seo.ogType || 'website'} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={seo.description} />
	{#if seo.ogImage}
		<meta property="og:image" content={seo.ogImage} />
	{/if}
	{#if seo.ogImageAlt}
		<meta property="og:image:alt" content={seo.ogImageAlt} />
	{/if}
	<meta property="og:locale" content={locale === 'es' ? 'es_MX' : 'en_US'} />
	<meta property="og:site_name" content="FUGA" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={seo.description} />
	{#if seo.ogImage}
		<meta name="twitter:image" content={seo.ogImage} />
	{/if}

	<!-- Language Alternates (hreflang) -->
	{#each alternateLocales as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />

	<!-- JSON-LD Structured Data -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>

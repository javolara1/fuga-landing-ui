<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/Services.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	const { data } = $props();
</script>

<div class="min-h-screen bg-black text-white">
	<Header user={data?.user} profile={data?.profile} />
	<main>
		<Hero />
		<Services />
		<Pricing />
		<About />
		<Contact />
	</main>
	<Footer />
</div>

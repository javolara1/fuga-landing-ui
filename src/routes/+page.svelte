<script lang="ts">
	import Header from '$lib/components/landing/Header.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Services from '$lib/components/landing/Services.svelte';
	import About from '$lib/components/landing/About.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import ContactFormModal from '$lib/components/common/ContactFormModal.svelte';
	import StatusChip from '$lib/components/common/StatusChip.svelte';

	const { data } = $props();

	let heroCtaVisible = $state(true);
	let modalOpen = $state(false);
	let successVisible = $state(false);

	function openModal() {
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function handleSuccess() {
		successVisible = true;
	}

	function closeSuccess() {
		successVisible = false;
	}
</script>

<div class="min-h-screen bg-black text-white">
	<Header showCta={!heroCtaVisible} onCtaClick={openModal} />
	<main>
		<Hero
			bind:ctaVisible={heroCtaVisible}
			onCtaClick={openModal}
			title={data.landingPage?.mainTitle}
			description={data.landingPage?.mainDescription}
			ctaLabel={data.landingPage?.callToActionLabel}
			heroImage={data.landingPage?.heroImage}
		/>
		<Services data={data.landingPage?.serviceSection} />
		<About data={data.landingPage?.aboutSection} />
		<Contact data={data.landingPage?.contactSection} onCtaClick={openModal} />
	</main>
	<Footer data={data.landingPage?.FooterSection} />
</div>

<ContactFormModal open={modalOpen} onClose={closeModal} onSuccess={handleSuccess} />
<StatusChip visible={successVisible} variant="success" onClose={closeSuccess} />

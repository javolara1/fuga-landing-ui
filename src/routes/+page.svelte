<script lang="ts">
	import { t } from '$lib/i18n';
	import Header from '$lib/components/landing/Header.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Services from '$lib/components/landing/Services.svelte';
	import About from '$lib/components/landing/About.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import ContactFormModal from '$lib/components/common/ContactFormModal.svelte';
	import Toast from '$lib/components/common/Toast.svelte';

	let heroCtaVisible = $state(true);
	let modalOpen = $state(false);
	let toastVisible = $state(false);

	function openModal() {
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function handleSuccess() {
		toastVisible = true;
	}

	function closeToast() {
		toastVisible = false;
	}
</script>

<div class="min-h-screen bg-black text-white">
	<Header showCta={!heroCtaVisible} onCtaClick={openModal} />
	<main>
		<Hero bind:ctaVisible={heroCtaVisible} onCtaClick={openModal} />
		<Services />
		<About />
		<Contact onCtaClick={openModal} />
	</main>
	<Footer />
</div>

<ContactFormModal open={modalOpen} onClose={closeModal} onSuccess={handleSuccess} />
<Toast message={$t('contact.successMessage')} visible={toastVisible} onClose={closeToast} />

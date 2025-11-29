<script lang="ts">
	import { t } from '$lib/i18n';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Button from '$lib/components/common/Button.svelte';

	let {
		open = false,
		onClose = () => {},
		onSuccess = () => {}
	} = $props<{
		open?: boolean;
		onClose?: () => void;
		onSuccess?: () => void;
	}>();

	function handleClose() {
		onClose();
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		// TODO: Add form submission logic (e.g., send to Strapi/Formspree)
		onSuccess();
		onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	$effect(() => {
		if (open) {
			window.addEventListener('keydown', handleKeydown);
			document.body.style.overflow = 'hidden';

			return () => {
				window.removeEventListener('keydown', handleKeydown);
				document.body.style.overflow = '';
			};
		}
	});
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
		role="button"
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		transition:fade={{ duration: 200 }}
	>
		<!-- Dialog -->
		<div
			class="relative mx-4 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl sm:max-w-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="contact-form-title"
			transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
		>
			<!-- Close button -->
			<button
				type="button"
				class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
				onclick={handleClose}
				aria-label={$t('contact.closeButton')}
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>

			<!-- Title -->
			<h2 id="contact-form-title" class="mb-6 text-xl font-bold text-white">
				{$t('contact.formTitle')}
			</h2>

			<!-- Form -->
			<form class="space-y-4 sm:space-y-6" onsubmit={handleSubmit}>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="modal-firstName" class="mb-2 block text-sm font-medium text-gray-300">
							{$t('contact.firstName')}
						</label>
						<input
							type="text"
							id="modal-firstName"
							name="firstName"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
							required
						/>
					</div>
					<div>
						<label for="modal-lastName" class="mb-2 block text-sm font-medium text-gray-300">
							{$t('contact.lastName')}
						</label>
						<input
							type="text"
							id="modal-lastName"
							name="lastName"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
							required
						/>
					</div>
				</div>

				<div>
					<label for="modal-email" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('contact.emailAddress')}
					</label>
					<input
						type="email"
						id="modal-email"
						name="email"
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
						required
					/>
				</div>

				<div>
					<label for="modal-phone" class="mb-2 block text-sm font-medium text-gray-300">
						{$t('contact.phoneLabel')}
					</label>
					<input
						type="tel"
						id="modal-phone"
						name="phone"
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
					/>
				</div>

				<Button type="submit" variant="primary" size="md" fullWidth>
					{$t('contact.sendMessageButton')}
				</Button>
			</form>
		</div>
	</div>
{/if}

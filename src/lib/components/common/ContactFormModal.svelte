<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { submitProspect, getErrorMessage } from '$lib/strapi.client';
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

	let isSubmitting = $state(false);
	let errorMessage = $state('');

	function handleClose() {
		errorMessage = '';
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

	function clearError() {
		errorMessage = '';
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get('firstName')?.toString() || '';
		const lastName = formData.get('lastName')?.toString() || undefined;
		const email = formData.get('email')?.toString() || '';
		const phoneNumber = formData.get('phone')?.toString() || undefined;

		if (!name || !email) {
			errorMessage = getErrorMessage('missing_fields');
			return;
		}

		isSubmitting = true;

		try {
			const result = await submitProspect({ name, lastName, email, phoneNumber });

			if (result.success) {
				form.reset();
				errorMessage = '';
				onSuccess();
				onClose();
			} else {
				errorMessage = result.errorCode
					? getErrorMessage(result.errorCode)
					: 'Ha ocurrido un error. Por favor, intenta de nuevo.';
			}
		} finally {
			isSubmitting = false;
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
			data-testid="contact-modal"
			transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
		>
			<!-- Close button -->
			<button
				type="button"
				class="absolute top-4 right-4 text-gray-400 transition-colors hover:text-white"
				onclick={handleClose}
				aria-label="Cerrar"
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
				Deja tus datos y obtén tu primera clase muestra
			</h2>

			<!-- Error message -->
			{#if errorMessage}
				<div
					class="mb-4 flex items-center gap-3 rounded-lg border border-red-700 bg-red-900/30 p-3"
					role="alert"
					transition:fade={{ duration: 150 }}
				>
					<svg
						class="h-5 w-5 shrink-0 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<p class="text-sm text-red-200">{errorMessage}</p>
					<button
						type="button"
						class="ml-auto text-red-400 transition-colors hover:text-red-200"
						onclick={clearError}
						aria-label="Cerrar mensaje de error"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
			{/if}

			<!-- Form -->
			<form class="space-y-4 sm:space-y-6" onsubmit={handleSubmit}>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="modal-firstName" class="mb-2 block text-sm font-medium text-gray-300">
							Nombre
						</label>
						<input
							type="text"
							id="modal-firstName"
							name="firstName"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
							required
							oninput={clearError}
						/>
					</div>
					<div>
						<label for="modal-lastName" class="mb-2 block text-sm font-medium text-gray-300">
							Apellido
						</label>
						<input
							type="text"
							id="modal-lastName"
							name="lastName"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
						/>
					</div>
				</div>

				<div>
					<label for="modal-email" class="mb-2 block text-sm font-medium text-gray-300">
						Correo Electrónico
					</label>
					<input
						type="email"
						id="modal-email"
						name="email"
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
						required
						oninput={clearError}
					/>
				</div>

				<div>
					<label for="modal-phone" class="mb-2 block text-sm font-medium text-gray-300">
						Número de Teléfono
					</label>
					<input
						type="tel"
						id="modal-phone"
						name="phone"
						class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
					/>
				</div>

				<Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
					{isSubmitting ? 'Enviando...' : 'Estoy listo'}
				</Button>
			</form>
		</div>
	</div>
{/if}

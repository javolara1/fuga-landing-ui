<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type StatusVariant = 'success' | 'error';

	let {
		message = '',
		visible = false,
		variant = 'success' as StatusVariant,
		onClose = () => {}
	} = $props<{
		message?: string;
		visible?: boolean;
		variant?: StatusVariant;
		onClose?: () => void;
	}>();

	const defaultMessages: Record<StatusVariant, string> = {
		success: 'Gracias por registrarte, te contactaremos pronto.',
		error: 'Ha ocurrido un error. Por favor, intenta de nuevo.'
	};

	const displayMessage = $derived(message || defaultMessages[variant as StatusVariant]);

	function handleClose() {
		onClose();
	}
</script>

{#if visible}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
		role="button"
		tabindex="-1"
		onclick={handleClose}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="relative mx-4 flex flex-col items-center gap-4 rounded-2xl border bg-gray-900 p-8 shadow-xl {variant ===
			'success'
				? 'border-green-700'
				: 'border-red-700'}"
			role="dialog"
			aria-modal="true"
			aria-labelledby="status-message"
			tabindex="0"
			data-testid="status-chip"
			transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Icon -->
			{#if variant === 'success'}
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
					<svg
						class="h-8 w-8 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
				</div>
			{:else}
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
					<svg
						class="h-8 w-8 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</div>
			{/if}

			<!-- Message -->
			<p id="status-message" class="text-center text-lg font-medium text-white">
				{displayMessage}
			</p>

			<!-- Close button -->
			<button
				type="button"
				class="mt-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
				onclick={handleClose}
			>
				Cerrar
			</button>
		</div>
	</div>
{/if}

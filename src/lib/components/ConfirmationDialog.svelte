<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';

	let {
		open = false,
		title = $t('common.confirmation.title'),
		message = $t('common.confirmation.message'),
		confirmText = $t('common.confirmation.confirm'),
		cancelText = $t('common.confirmation.cancel'),
		confirm,
		cancel
	} = $props<{
		open?: boolean;
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'primary' | 'danger';
		confirm?: () => void;
		cancel?: () => void;
	}>();

	function handleConfirm() {
		confirm?.();
	}

	function handleCancel() {
		cancel?.();
	}

	// Handle keyboard events
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleCancel();
		} else if (event.key === 'Enter') {
			handleConfirm();
		}
	}

	$effect(() => {
		if (open) {
			// Add keyboard listener when dialog opens
			window.addEventListener('keydown', handleKeydown);

			// Focus management when dialog opens
			const focusableElements = document.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstFocusable = focusableElements[0] as HTMLElement;
			if (firstFocusable) {
				firstFocusable.focus();
			}

			// Clean up function
			return () => {
				window.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
		role="button"
		tabindex="0"
	>
		<!-- Dialog -->
		<div
			class="relative mx-4 w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirmation-title"
			aria-describedby="confirmation-message"
		>
			<!-- Title -->
			<h2 id="confirmation-title" class="mb-2 text-lg font-semibold text-white">
				{title}
			</h2>

			<!-- Message -->
			<p id="confirmation-message" class="mb-6 text-gray-300">
				{message}
			</p>

			<!-- Actions -->
			<div class="flex justify-end space-x-3">
				<Button tabindex="0" variant="secondary" size="md" type="button" onclick={handleCancel}>
					{cancelText}
				</Button>
				<Button variant="primary" size="md" type="button" onclick={handleConfirm}>
					{confirmText}
				</Button>
			</div>
		</div>
	</div>
{/if}

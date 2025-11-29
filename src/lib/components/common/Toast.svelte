<script lang="ts">
	import { fade } from 'svelte/transition';

	let { message = '', visible = false, duration = 3000, onClose = () => {} } = $props();

	$effect(() => {
		if (visible && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	});
</script>

{#if visible}
	<div
		class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-white shadow-lg"
		>
			<p class="text-sm font-medium">{message}</p>
		</div>
	</div>
{/if}

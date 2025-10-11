<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<button
					type="button"
					class="cursor-pointer text-2xl font-bold text-white"
					onclick={() => goto('/')}
				>
					<h1>FUGA</h1>
				</button>
			</div>
		</div>
	</div>
</header>

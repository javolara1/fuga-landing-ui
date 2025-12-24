<script lang="ts">
	import type { AboutSection } from '$lib/types';

	let { data }: { data?: AboutSection | null } = $props();
</script>

{#if data?.visible}
	<section
		id="about"
		class="bg-black pt-12 text-white sm:pt-16 lg:pt-20"
		data-testid="about-section"
	>
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			{#if data.AboutSectionTitle}
				<div class="mb-12 text-center">
					<h2 class="mb-8 text-3xl font-bold sm:text-3xl md:text-4xl">{data.AboutSectionTitle}</h2>
				</div>
			{/if}

			<div class="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
				{#if data.mision}
					<div class="text-center">
						<h3 class="mb-4 text-xl font-bold sm:text-2xl">Misión</h3>
						<p class="text-base text-gray-300 sm:text-lg">
							{data.mision}
						</p>
					</div>
				{/if}

				{#if data.vision}
					<div class="text-center">
						<h3 class="mb-4 text-xl font-bold sm:text-2xl">Visión</h3>
						<p class="text-base text-gray-300 sm:text-lg">
							{data.vision}
						</p>
					</div>
				{/if}

				{#if data.phylosophy}
					<div class="text-center">
						<h3 class="mb-4 text-xl font-bold sm:text-2xl">Filosofía</h3>
						<p class="text-base text-gray-300 sm:text-lg">
							{data.phylosophy}
						</p>
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

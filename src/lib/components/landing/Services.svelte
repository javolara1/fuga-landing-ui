<script lang="ts">
	import type { ServiceSection } from '$lib/types';
	import { getGridClass } from '$lib/utils/gridUtils';

	let { data }: { data?: ServiceSection | null } = $props();
</script>

{#if data?.visible}
	<section
		id="services"
		class="bg-black pt-12 text-white sm:pt-16 lg:pt-20"
		data-testid="services-section"
	>
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="mb-8 text-3xl font-bold sm:text-3xl md:text-4xl">{data.serviceSectionTitle}</h2>
				<p class="mx-auto text-base text-gray-300 sm:text-lg">
					{data.serviceSectionDescription}
				</p>
			</div>

			{#each data.serviceitems as serviceItem, index (serviceItem.id)}
				<div class="mb-8 text-center {index > 0 ? 'mt-12' : ''}">
					<h3 class="mb-8 text-2xl font-bold">{serviceItem.serviceItemTitle}</h3>
				</div>

				<div class="grid {getGridClass(serviceItem.cards.length)} gap-4 md:gap-6">
					{#each serviceItem.cards as card (card.id)}
						<div
							class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
						>
							<h4 class="text-center text-base font-bold sm:text-lg">{card.serviceCardTitle}</h4>
							{#if card.cardDescription}
								<p class="mt-2 text-center text-xs text-gray-300 sm:text-sm">
									{card.cardDescription}
								</p>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</section>
{/if}

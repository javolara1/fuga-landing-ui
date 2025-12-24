<script lang="ts">
	import type { FooterSection } from '$lib/types';

	let { data }: { data?: FooterSection | null } = $props();
</script>

{#if data}
	<footer class="border-t border-gray-800 bg-black text-white">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Social Networks -->
			{#if data.footerSectionSocialNetworks?.length}
				<div class="flex justify-center gap-6 py-8">
					{#each data.footerSectionSocialNetworks as social (social.id)}
						<a
							href={social.LinkUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
							aria-label={social.LinkLabel}
						>
							{#if social.Linkicon}
								<img
									src={social.Linkicon.url}
									alt={social.Linkicon.alternativeText ?? social.LinkLabel}
									class="h-6 w-6"
								/>
							{/if}
							<span>{social.LinkLabel}</span>
						</a>
					{/each}
				</div>
			{/if}

			<!-- Bottom Footer -->
			<div class="border-t border-gray-800 py-6">
				<div class="flex flex-col items-center justify-between md:flex-row">
					{#if data.footerSectionRights}
						<p class="text-sm text-gray-400">
							{data.footerSectionRights}
						</p>
					{/if}
					{#if data.footerSectionLinks?.length}
						<div class="mt-4 flex space-x-6 md:mt-0">
							{#each data.footerSectionLinks as link (link.id)}
								<a
									href={link.LinkUrl}
									class="text-sm text-gray-400 transition-colors hover:text-white"
								>
									{link.LinkLabel}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</footer>
{/if}

<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section id="about" class="bg-black pt-12 text-white sm:pt-16 lg:pt-20" data-testid="about-section">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-8 text-3xl font-bold sm:text-3xl md:text-4xl">{$t('about.title')}</h2>
		</div>

		<div class="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
			<!-- Misión -->
			<div class="text-center">
				<h3 class="mb-4 text-xl font-bold sm:text-2xl">{$t('about.mision.title')}</h3>
				<p class="text-base text-gray-300 sm:text-lg">
					{$t('about.mision.description')}
				</p>
			</div>

			<!-- Visión -->
			<div class="text-center">
				<h3 class="mb-4 text-xl font-bold sm:text-2xl">{$t('about.vision.title')}</h3>
				<p class="text-base text-gray-300 sm:text-lg">
					{$t('about.vision.description')}
				</p>
			</div>

			<!-- Filosofía -->
			<div class="text-center">
				<h3 class="mb-4 text-xl font-bold sm:text-2xl">{$t('about.filosofia.title')}</h3>
				<p class="text-base text-gray-300 sm:text-lg">
					{$t('about.filosofia.description')}
				</p>
			</div>
		</div>
	</div>
</section>

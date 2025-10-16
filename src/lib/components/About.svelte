<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section id="about" class="bg-black py-12 text-white sm:py-16 lg:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">{$t('about.title')}</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
				{$t('about.description')}
			</p>
		</div>

		<div class="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
			<div>
				<h3 class="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">{$t('about.ourMission')}</h3>
				<p class="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
					{$t('about.missionText1')}
				</p>
				<p class="text-base leading-relaxed text-gray-300 sm:text-lg">
					{$t('about.missionText2')}
				</p>
			</div>
			<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6">
				<div class="mb-6 text-center text-5xl">🏆</div>
				<h4 class="mb-4 text-center text-lg font-bold">{$t('about.whyChooseFuga')}</h4>
				<ul class="space-y-4 text-gray-300">
					<li class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{$t('about.professionalCoaching')}
					</li>
					<li class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{$t('about.stateOfTheArt')}
					</li>
					<li class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{$t('about.personalizedTraining')}
					</li>
					<li class="flex items-center">
						<svg
							class="mr-3 h-5 w-5 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
						{$t('about.scienceBased')}
					</li>
				</ul>
			</div>
		</div>

		<!-- Training Philosophy -->
		<div class="mb-12 rounded-2xl border border-gray-800 bg-gray-900 p-6">
			<h3 class="mb-8 text-center text-xl font-bold sm:text-2xl md:text-3xl">
				{$t('about.trainingPhilosophy')}
			</h3>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				<div class="text-center">
					<div class="mb-4 text-4xl">🔬</div>
					<h4 class="mb-4 text-lg font-bold">{$t('about.scienceBasedApproach')}</h4>
					<p class="text-sm text-gray-300">
						{$t('about.scienceBasedText')}
					</p>
				</div>
				<div class="text-center">
					<div class="mb-4 text-4xl">🎯</div>
					<h4 class="mb-4 text-lg font-bold">{$t('about.individualizedProgramming')}</h4>
					<p class="text-sm text-gray-300">
						{$t('about.individualizedText')}
					</p>
				</div>
				<div class="text-center">
					<div class="mb-4 text-4xl">📈</div>
					<h4 class="mb-4 text-lg font-bold">{$t('about.progressiveDevelopment')}</h4>
					<p class="text-sm text-gray-300">
						{$t('about.progressiveText')}
					</p>
				</div>
			</div>
		</div>

		<!-- Sports Disciplines -->
		<div class="text-center">
			<h3 class="mb-8 text-xl font-bold sm:text-2xl md:text-3xl">
				{$t('about.multidisciplinaryExcellence')}
			</h3>
			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				<div class="rounded-xl border border-gray-800 bg-gray-900 p-4">
					<div class="mb-3 text-3xl">💪</div>
					<h4 class="font-bold text-white">{$t('about.strengthTraining')}</h4>
					<p class="mt-2 text-sm text-gray-400">{$t('about.foundationForSports')}</p>
				</div>
				<div class="rounded-xl border border-gray-800 bg-gray-900 p-4">
					<div class="mb-3 text-3xl">🚴‍♂️</div>
					<h4 class="font-bold text-white">{$t('about.cycling')}</h4>
					<p class="mt-2 text-sm text-gray-400">{$t('about.roadMountainBiking')}</p>
				</div>
				<div class="rounded-xl border border-gray-800 bg-gray-900 p-4">
					<div class="mb-3 text-3xl">🏃‍♂️</div>
					<h4 class="font-bold text-white">{$t('about.running')}</h4>
					<p class="mt-2 text-sm text-gray-400">{$t('about.trackRoadTrail')}</p>
				</div>
				<div class="rounded-xl border border-gray-800 bg-gray-900 p-4">
					<div class="mb-3 text-3xl">🏊‍♂️</div>
					<h4 class="font-bold text-white">{$t('about.swimming')}</h4>
					<p class="mt-2 text-sm text-gray-400">{$t('about.poolOpenWater')}</p>
				</div>
			</div>
		</div>
	</div>
</section>

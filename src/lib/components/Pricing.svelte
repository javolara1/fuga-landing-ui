<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';
</script>

<section id="pricing" class="bg-black pt-12 text-white sm:pt-16 lg:pt-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mt-8 mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">{$t('pricing.title')}</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
				{$t('pricing.description')}
			</p>
		</div>

		<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
			<!-- Strength Training Package -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-6 text-center">
					<div
						class="mb-4 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white"
					>
						{$t('pricing.mostPopular')}
					</div>
					<h3 class="mb-4 text-xl font-bold">{$t('pricing.strengthTraining')}</h3>
					<div class="mb-4 text-3xl font-bold">
						$120<span class="text-lg text-gray-400">/month</span>
					</div>
					<p class="text-sm text-gray-400">{$t('pricing.perfectForStrength')}</p>
				</div>

				<ul class="mb-8 space-y-4">
					<li class="flex items-center text-gray-300">
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
						8 {$t('pricing.sessionsPerMonth')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.personalizedWorkout')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.professionalEquipment')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.progressTracking')}
					</li>
				</ul>

				<Button href="/register?plan=strength" variant="primary" fullWidth>
					{$t('pricing.getStarted')}
				</Button>
			</div>

			<!-- Sport-Specific Training -->
			<div
				class="rounded-2xl border-2 border-gray-700 bg-gray-900 p-4 transition-all duration-300 hover:border-white sm:p-8"
			>
				<div class="mb-6 text-center">
					<h3 class="mb-2 text-xl font-bold sm:text-2xl">{$t('pricing.sportSpecific')}</h3>
					<div class="mb-2 text-3xl font-bold">
						$180<span class="text-lg text-gray-400">/month</span>
					</div>
					<p class="text-sm text-gray-400">{$t('pricing.tailoredToSport')}</p>
				</div>

				<ul class="mb-8 space-y-3">
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.chooseProgram')}
					</li>
					<li class="flex items-center text-gray-300">
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
						12 {$t('pricing.sessionsPerMonth')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.customTraining')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.techniqueAnalysis')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.performanceMetrics')}
					</li>
				</ul>

				<Button href="/register?plan=sport-specific" variant="primary" fullWidth>
					{$t('pricing.chooseProgramButton')}
				</Button>
			</div>

			<!-- Premium Package -->
			<div
				class="rounded-2xl border-2 border-gray-700 bg-gray-900 p-4 transition-all duration-300 hover:border-white sm:p-8"
			>
				<div class="mb-6 text-center">
					<div
						class="mb-4 inline-flex items-center rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-black"
					>
						{$t('pricing.premium')}
					</div>
					<h3 class="mb-2 text-xl font-bold sm:text-2xl">{$t('pricing.completeAthlete')}</h3>
					<div class="mb-2 text-3xl font-bold">
						$250<span class="text-lg text-gray-400">/month</span>
					</div>
					<p class="text-sm text-gray-400">{$t('pricing.fullAccess')}</p>
				</div>

				<ul class="mb-8 space-y-3">
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.strengthPlusSport')}
					</li>
					<li class="flex items-center text-gray-300">
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
						20 {$t('pricing.sessionsPerMonth')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.oneOnOneCoaching')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.nutritionGuidance')}
					</li>
					<li class="flex items-center text-gray-300">
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
						{$t('pricing.priorityScheduling')}
					</li>
				</ul>

				<Button href="/register?plan=premium" variant="primary" fullWidth>
					{$t('pricing.goPremium')}
				</Button>
			</div>
		</div>

		<!-- Additional Information -->
		<div class="mt-10 text-center sm:mt-12">
			<p class="mb-4 text-gray-400">{$t('pricing.allPlansInclude')}</p>
			<div
				class="flex flex-col items-center gap-4 text-sm text-gray-300 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
			>
				<div class="flex items-center">
					<svg
						class="mr-2 h-4 w-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					{$t('pricing.flexibleScheduling')}
				</div>
				<div class="flex items-center">
					<svg
						class="mr-2 h-4 w-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					{$t('pricing.progressAssessments')}
				</div>
				<div class="flex items-center">
					<svg
						class="mr-2 h-4 w-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					{$t('pricing.equipmentAccess')}
				</div>
				<div class="flex items-center">
					<svg
						class="mr-2 h-4 w-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					{$t('pricing.professionalCoaching')}
				</div>
			</div>
		</div>

		<!-- Contact for Custom Plans -->
		<div class="mt-6 text-center sm:mt-8">
			<p class="text-gray-400">
				{$t('pricing.needCustomPlan')}
				<Button href="#contact" variant="text">
					{$t('pricing.contactUs')}
				</Button>
				{$t('pricing.forPersonalizedPricing')}
			</p>
		</div>
	</div>
</section>

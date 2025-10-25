<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';
</script>

<section
	id="contact"
	class="bg-black py-12 text-white sm:py-16 lg:py-20"
	data-testid="contact-section"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mt-8 mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">{$t('contact.title')}</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
				{$t('contact.description')}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
			<!-- Contact Information -->
			<div>
				<h3 class="mb-6 text-xl font-bold">{$t('contact.contactInformation')}</h3>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div class="rounded-lg bg-gray-800 p-3">
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								></path>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
						</div>
						<div>
							<h4 class="mb-1 text-lg font-bold">{$t('contact.location')}</h4>
							<p class="text-gray-300">{$t('contact.sportsTrainingCenter')}</p>
							<p class="text-gray-400">{$t('contact.athleticAvenue')}</p>
							<p class="text-gray-400">{$t('contact.sportsCity')}</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="rounded-lg bg-gray-800 p-3">
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								></path>
							</svg>
						</div>
						<div>
							<h4 class="mb-1 text-lg font-bold">{$t('contact.phone')}</h4>
							<p class="text-gray-300">{$t('contact.phoneNumber')}</p>
							<p class="text-gray-400">{$t('contact.monFriHours')}</p>
							<p class="text-gray-400">{$t('contact.satSunHours')}</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="rounded-lg bg-gray-800 p-3">
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<div>
							<h4 class="mb-1 text-lg font-bold">{$t('contact.email')}</h4>
							<p class="text-gray-300">{$t('contact.infoEmail')}</p>
							<p class="text-gray-400">{$t('contact.generalInquiries')}</p>
							<p class="text-gray-400">{$t('contact.coachingEmail')}</p>
						</div>
					</div>
				</div>

				<!-- Training Hours -->
				<div class="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
					<h4 class="mb-4 text-lg font-bold">{$t('contact.trainingHours')}</h4>
					<div class="space-y-3 text-sm">
						<div class="flex justify-between">
							<span class="text-gray-300">{$t('contact.mondayFriday')}</span>
							<span class="text-white">6:00 AM - 9:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-300">{$t('contact.saturday')}</span>
							<span class="text-white">7:00 AM - 7:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-300">{$t('contact.sunday')}</span>
							<span class="text-white">7:00 AM - 5:00 PM</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6">
				<h3 class="mb-6 text-xl font-bold">{$t('contact.sendMessage')}</h3>
				<form class="space-y-6">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label for="firstName" class="mb-2 block text-sm font-medium text-gray-300"
								>{$t('contact.firstName')}</label
							>
							<input
								type="text"
								id="firstName"
								class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
								placeholder={$t('contact.firstNamePlaceholder')}
							/>
						</div>
						<div>
							<label for="lastName" class="mb-2 block text-sm font-medium text-gray-300"
								>{$t('contact.lastName')}</label
							>
							<input
								type="text"
								id="lastName"
								class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
								placeholder={$t('contact.lastNamePlaceholder')}
							/>
						</div>
					</div>

					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-300"
							>{$t('contact.emailAddress')}</label
						>
						<input
							type="email"
							id="email"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
							placeholder={$t('contact.emailPlaceholder')}
						/>
					</div>

					<div>
						<label for="interest" class="mb-2 block text-sm font-medium text-gray-300"
							>{$t('contact.trainingInterest')}</label
						>
						<select
							id="interest"
							class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
						>
							<option value="">{$t('contact.selectInterest')}</option>
							<option value="strength">{$t('contact.strengthTraining')}</option>
							<option value="cycling">{$t('contact.cyclingProgram')}</option>
							<option value="running">{$t('contact.runningProgram')}</option>
							<option value="swimming">{$t('contact.swimmingProgram')}</option>
							<option value="premium">{$t('contact.completeAthlete')}</option>
							<option value="custom">{$t('contact.customProgram')}</option>
						</select>
					</div>

					<div>
						<label for="message" class="mb-2 block text-sm font-medium text-gray-300"
							>{$t('contact.message')}</label
						>
						<textarea
							id="message"
							rows="4"
							class="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white focus:outline-none"
							placeholder={$t('contact.messagePlaceholder')}
						></textarea>
					</div>

					<Button type="submit" variant="primary" size="md" fullWidth>
						{$t('contact.sendMessageButton')}
					</Button>

					<p class="text-center text-sm text-gray-400">
						{$t('contact.responseTime')}
					</p>
				</form>
			</div>
		</div>
	</div>
</section>

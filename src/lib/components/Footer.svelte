<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<footer class="border-t border-gray-800 bg-black text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
			<!-- Brand Section -->
			<div class="md:col-span-1">
				<h3 class="mb-4 text-2xl font-bold">FUGA</h3>
				<p class="mb-4 text-gray-400">
					{$t('footer.brandDescription')}
				</p>
				<div class="flex space-x-4">
					<!-- Social Media Icons (placeholder) -->
					<a
						href="https://twitter.com"
						class="text-gray-400 transition-colors hover:text-white"
						aria-label="Follow us on Twitter"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
							/>
						</svg>
					</a>
					<a
						href="https://facebook.com"
						class="text-gray-400 transition-colors hover:text-white"
						aria-label="Follow us on Facebook"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
							/>
						</svg>
					</a>
					<a
						href="https://pinterest.com"
						class="text-gray-400 transition-colors hover:text-white"
						aria-label="Follow us on Pinterest"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="mb-4 text-lg font-semibold">{$t('footer.quickLinks')}</h4>
				<ul class="space-y-2">
					<li>
						<a href="#services" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.services')}</a
						>
					</li>
					<li>
						<a href="#pricing" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.pricing')}</a
						>
					</li>
					<li>
						<a href="#about" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.about')}</a
						>
					</li>
					<li>
						<a href="#contact" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.contact')}</a
						>
					</li>
				</ul>
			</div>

			<!-- Training Programs -->
			<div>
				<h4 class="mb-4 text-lg font-semibold">{$t('footer.trainingPrograms')}</h4>
				<ul class="space-y-2">
					<li>
						<a href="#strength-training" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.strengthTraining')}</a
						>
					</li>
					<li>
						<a href="#cycling-programs" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.cyclingPrograms')}</a
						>
					</li>
					<li>
						<a href="#running-programs" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.runningPrograms')}</a
						>
					</li>
					<li>
						<a href="#swimming-programs" class="text-gray-400 transition-colors hover:text-white"
							>{$t('footer.swimmingPrograms')}</a
						>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h4 class="mb-4 text-lg font-semibold">{$t('footer.contactInfo')}</h4>
				<ul class="space-y-2 text-gray-400">
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-4 w-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
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
						<span>{$t('contact.athleticAvenue')}<br />{$t('contact.sportsCity')}</span>
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							></path>
						</svg>
						<span>{$t('contact.phoneNumber')}</span>
					</li>
					<li class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							></path>
						</svg>
						<span>{$t('contact.infoEmail')}</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Footer -->
		<div class="border-t border-gray-800 py-6">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<p class="text-sm text-gray-400">
					{$t('footer.copyright')}
				</p>
				<div class="mt-4 flex space-x-6 md:mt-0">
					<a href="/privacy-policy" class="text-sm text-gray-400 transition-colors hover:text-white"
						>{$t('footer.privacyPolicy')}</a
					>
					<a
						href="/terms-of-service"
						class="text-sm text-gray-400 transition-colors hover:text-white"
						>{$t('footer.termsOfService')}</a
					>
					<a href="/cookie-policy" class="text-sm text-gray-400 transition-colors hover:text-white"
						>{$t('footer.cookiePolicy')}</a
					>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	a {
		scroll-behavior: smooth;
	}
</style>

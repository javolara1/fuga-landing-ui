<script lang="ts">
	import { t } from '$lib/i18n';
	import { enhance } from '$app/forms';
	import ReducedHeader from '$lib/components/admin/ReducedHeader.svelte';
	import Button from '$lib/components/common/Button.svelte';
	const { form } = $props();

	let isSubmitting = $state(false);
</script>

<div class=" flex min-h-screen flex-col bg-black text-white">
	<ReducedHeader />

	<div class="flex flex-1 items-center justify-center px-4 py-8">
		<div class="w-full max-w-md space-y-8">
			<div class="text-center">
				<h1 class="mb-2 text-4xl font-bold">{$t('auth.welcomeBack')}</h1>
				<p class="text-lg text-gray-300">{$t('auth.signInToAccount')}</p>
			</div>

			<!-- Error Message -->
			{#if form?.error}
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-400">{$t('auth.error')}</h3>
							<div class="mt-1 text-sm text-red-300">
								<p>{form.error}</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<form
				class="mt-8 space-y-6"
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result, update }) => {
						await update();
						isSubmitting = false;
					};
				}}
			>
				<div class="space-y-4">
					<div>
						<label for="email" class="sr-only">{$t('auth.emailAddress')}</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							value={form?.email || ''}
							disabled={isSubmitting}
							class="relative block w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-base text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							placeholder={$t('auth.emailAddress')}
						/>
					</div>
					<div>
						<label for="password" class="sr-only">{$t('auth.password')}</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							value={form?.password || ''}
							disabled={isSubmitting}
							class="relative block w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-base text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							placeholder={$t('auth.password')}
						/>
					</div>
				</div>

				<div>
					<Button
						type="submit"
						variant="secondary"
						size="lg"
						fullWidth
						loading={isSubmitting}
						disabled={isSubmitting}
					>
						{$t('auth.signIn')}
					</Button>
				</div>

				<div class="text-center">
					<p class="text-gray-400">
						{$t('auth.dontHaveAccount')}{' '}
						<Button href="/register" variant="text" size="md">
							{$t('auth.signUp')}
						</Button>
					</p>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #000000;
	}
</style>

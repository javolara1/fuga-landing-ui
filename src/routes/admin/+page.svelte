<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils/dateUtils';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';

	let { data } = $props();
</script>

<div class="min-h-screen bg-black text-white">
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between py-4">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<button
						type="button"
						class="focus:ring-opacity-50 cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-white focus:outline-none"
						onclick={() => goto('/')}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								goto('/');
							}
						}}
					>
						<h1 class="text-2xl font-bold text-white">FUGA</h1>
					</button>
				</div>

				<!-- User Info and Logout -->
				<div class="flex items-center space-x-4">
					<span class="text-white">
						{data.profile?.full_name || data.profile?.username || data.user?.email}
					</span>
					<form method="POST" action="?/logout" use:enhance>
						<button
							type="submit"
							class="rounded-lg bg-white px-4 py-2 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
						>
							{$t('user.logout')}
						</button>
					</form>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-lg bg-gray-900 p-8">
			<h1 class="mb-8 text-3xl font-bold">{$t('admin.dashboard')}</h1>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<!-- User Information -->
				<div class="space-y-4">
					<h2 class="mb-4 text-xl font-semibold">{$t('user.personalInfo')}</h2>

					<div>
						<div class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.email')}
						</div>
						<p class="text-white">{data.user?.email}</p>
					</div>

					{#if data.profile?.full_name}
						<div>
							<div class="mb-1 block text-sm font-medium text-gray-400">
								{$t('user.fullName')}
							</div>
							<p class="text-white">{data.profile.full_name}</p>
						</div>
					{/if}

					{#if data.profile?.username}
						<div>
							<div class="mb-1 block text-sm font-medium text-gray-400">
								{$t('user.username')}
							</div>
							<p class="text-white">{data.profile.username}</p>
						</div>
					{/if}

					<div>
						<div class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.role')}
						</div>
						<p class="text-white capitalize">{data.profile?.role || 'user'}</p>
					</div>
				</div>

				<!-- Account Information -->
				<div class="space-y-4">
					<h2 class="mb-4 text-xl font-semibold">{$t('user.accountInfo')}</h2>

					<div>
						<div class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.memberSince')}
						</div>
						<p class="text-white">
							{#if data.profile?.created_at}
								{formatDate(data.profile.created_at)}
							{:else}
								{$t('user.notAvailable')}
							{/if}
						</p>
					</div>

					<div>
						<div class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.lastUpdated')}
						</div>
						<p class="text-white">
							{#if data.profile?.updated_at}
								{formatDate(data.profile.updated_at)}
							{:else}
								{$t('user.notAvailable')}
							{/if}
						</p>
					</div>
				</div>
			</div>

			<!-- Admin Features Section -->
			<div class="mt-12 border-t border-gray-700 pt-8">
				<h2 class="mb-4 text-2xl font-bold">{$t('admin.adminFeatures')}</h2>
				<p class="mb-6 text-gray-400">{$t('admin.adminFeaturesDescription')}</p>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('admin.userManagement')}</h3>
						<p class="text-sm text-gray-400">{$t('admin.userManagementDescription')}</p>
					</div>
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('admin.contentManagement')}</h3>
						<p class="text-sm text-gray-400">{$t('admin.contentManagementDescription')}</p>
					</div>
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('admin.systemSettings')}</h3>
						<p class="text-sm text-gray-400">{$t('admin.systemSettingsDescription')}</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

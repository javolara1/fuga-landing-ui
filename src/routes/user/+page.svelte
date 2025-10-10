<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';

	let { data } = $props();

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST'
			});

			if (response.ok) {
				// Redirect to home page after successful logout
				await goto('/');
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Logout error:', error);
		}
	};
</script>

<div class="min-h-screen bg-black text-white">
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between py-4">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<h1 class="cursor-pointer text-2xl font-bold text-white" onclick={() => goto('/')}>
						Fuga
					</h1>
				</div>

				<!-- User Info and Logout -->
				<div class="flex items-center space-x-4">
					<span class="text-white">
						{data.profile?.full_name || data.profile?.username || data.user?.email}
					</span>
					<button
						onclick={handleLogout}
						class="rounded-lg bg-white px-4 py-2 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
					>
						{$t('user.logout')}
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-lg bg-gray-900 p-8">
			<h1 class="mb-8 text-3xl font-bold">{$t('user.profile')}</h1>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<!-- User Information -->
				<div class="space-y-4">
					<h2 class="mb-4 text-xl font-semibold">{$t('user.personalInfo')}</h2>

					<div>
						<label class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.email')}
						</label>
						<p class="text-white">{data.user?.email}</p>
					</div>

					{#if data.profile?.full_name}
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-400">
								{$t('user.fullName')}
							</label>
							<p class="text-white">{data.profile.full_name}</p>
						</div>
					{/if}

					{#if data.profile?.username}
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-400">
								{$t('user.username')}
							</label>
							<p class="text-white">{data.profile.username}</p>
						</div>
					{/if}

					<div>
						<label class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.role')}
						</label>
						<p class="text-white capitalize">{data.profile?.role || 'user'}</p>
					</div>
				</div>

				<!-- Account Information -->
				<div class="space-y-4">
					<h2 class="mb-4 text-xl font-semibold">{$t('user.accountInfo')}</h2>

					<div>
						<label class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.memberSince')}
						</label>
						<p class="text-white">
							{#if data.profile?.created_at}
								{new Date(data.profile.created_at).toLocaleDateString()}
							{:else}
								{$t('user.notAvailable')}
							{/if}
						</p>
					</div>

					<div>
						<label class="mb-1 block text-sm font-medium text-gray-400">
							{$t('user.lastUpdated')}
						</label>
						<p class="text-white">
							{#if data.profile?.updated_at}
								{new Date(data.profile.updated_at).toLocaleDateString()}
							{:else}
								{$t('user.notAvailable')}
							{/if}
						</p>
					</div>
				</div>
			</div>

			<!-- Coming Soon Section -->
			<div class="mt-12 border-t border-gray-700 pt-8">
				<h2 class="mb-4 text-2xl font-bold">{$t('user.comingSoon')}</h2>
				<p class="mb-6 text-gray-400">{$t('user.comingSoonDescription')}</p>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('user.schedule')}</h3>
						<p class="text-sm text-gray-400">{$t('user.scheduleDescription')}</p>
					</div>
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('user.progress')}</h3>
						<p class="text-sm text-gray-400">{$t('user.progressDescription')}</p>
					</div>
					<div class="rounded-lg bg-gray-800 p-4">
						<h3 class="mb-2 font-semibold">{$t('user.settings')}</h3>
						<p class="text-sm text-gray-400">{$t('user.settingsDescription')}</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

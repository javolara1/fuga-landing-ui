<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';

	let { data, currentPage = 'profile' } = $props();
</script>

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

			<!-- Navigation -->
			<nav class="flex space-x-6">
				<a
					href="/admin"
					class="transition-colors hover:text-gray-300 {currentPage === 'profile'
						? 'font-medium text-white'
						: 'text-gray-300'}"
				>
					{$t('admin.navigation.profile')}
				</a>
				<a
					href="/admin/blog"
					class="transition-colors hover:text-gray-300 {currentPage === 'blog'
						? 'font-medium text-white'
						: 'text-gray-300'}"
				>
					{$t('admin.navigation.blog')}
				</a>
			</nav>

			<!-- User Info and Logout -->
			<div class="flex items-center space-x-4">
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

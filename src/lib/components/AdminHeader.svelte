<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import Button from './Button.svelte';

	let { data, currentPage = 'profile' } = $props();
</script>

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<Button href="/" variant="text" size="xl">
					<h1 class=" font-bold text-white">FUGA</h1>
				</Button>
			</div>

			<!-- Navigation -->
			<nav class="flex space-x-6">
				<Button
					href="/admin"
					variant="text"
					size="md"
					class={currentPage === 'profile' ? 'font-medium text-white' : 'text-gray-300'}
				>
					{$t('admin.navigation.profile')}
				</Button>
				<Button
					href="/admin/blog"
					variant="text"
					size="md"
					class={currentPage === 'blog' ? 'font-medium text-white' : 'text-gray-300'}
				>
					{$t('admin.navigation.blog')}
				</Button>
			</nav>

			<!-- User Info and Logout -->
			<div class="flex items-center space-x-4">
				<form method="POST" action="?/logout" use:enhance>
					<Button type="submit" variant="secondary" size="md">
						{$t('user.logout')}
					</Button>
				</form>
			</div>
		</div>
	</div>
</header>

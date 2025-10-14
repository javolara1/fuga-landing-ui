<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import Button from './Button.svelte';

	let { data } = $props();
</script>

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<Button href="/" variant="text" size="xl">
					<h1>FUGA</h1>
				</Button>
			</div>

			<!-- User Info and Logout -->
			<div class="flex items-center space-x-4">
				<form method="POST" action="?/logout" use:enhance>
					<Button type="submit" variant="primary" size="md">
						{$t('user.logout')}
					</Button>
				</form>
			</div>
		</div>
	</div>
</header>

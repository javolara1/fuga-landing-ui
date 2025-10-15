<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'text' | 'ghost';
	type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
	type ButtonType = 'button' | 'submit' | 'reset';

	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	let {
		variant = 'primary' as ButtonVariant,
		size = 'md' as ButtonSize,
		href = undefined,
		loading = false,
		disabled = false,
		type = 'button' as ButtonType,
		fullWidth = false,
		children,
		...rest
	} = $props();

	const baseClasses =
		'inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50';

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-lg',
		secondary: 'border-2 border-white text-white hover:bg-white hover:text-black',
		text: 'text-white hover:text-gray-300 bg-transparent',
		ghost: 'bg-transparent text-white hover:bg-white/10'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'px-3 py-2 text-sm rounded-md',
		md: 'px-4 py-2 text-base rounded-lg',
		lg: 'px-6 py-2 text-lg rounded-lg',
		xl: 'px-6 py-2 text-3xl rounded-lg'
	};

	const widthClass = fullWidth ? 'w-full' : '';

	const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`;

	function handleClick(event: MouseEvent) {
		dispatch('click', event);
		if (href && !disabled && !loading) {
			event.preventDefault();
			goto(href);
		}
	}
</script>

{#if href}
	<a
		{href}
		class={combinedClasses}
		onclick={handleClick}
		{...rest}
		aria-disabled={disabled || loading}
	>
		{#if loading}
			<svg
				class="mr-2 h-4 w-4 animate-spin text-current"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children()}
	</a>
{:else}
	<button
		{type}
		class={combinedClasses}
		disabled={disabled || loading}
		onclick={(event) => dispatch('click', event)}
		{...rest}
	>
		{#if loading}
			<svg
				class="mr-2 h-4 w-4 animate-spin text-current"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children()}
	</button>
{/if}

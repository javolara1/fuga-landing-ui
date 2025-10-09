<script lang="ts">
  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n';
  
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let loading = $state(false);
  let error = $state('');
  let success = $state('');

  async function handleRegister(event: Event) {
    event.preventDefault();
    loading = true;
    error = '';
    success = '';

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        success = result.message || 'Registration successful! Please check your email for verification.';
        // Optionally redirect to login page after a delay
        setTimeout(() => {
          goto('/login');
        }, 3000);
      } else {
        error = result.error || 'An error occurred during registration';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred during registration';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-black text-white flex items-center justify-center px-4">
  <div class="max-w-md w-full space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">{$t('auth.createAccount')}</h1>
      <p class="text-gray-300 text-lg">{$t('auth.signUpForAccount')}</p>
    </div>

    <!-- Error and Success Messages -->
    {#if error}
      <div class="rounded-lg bg-gray-900 border border-gray-800 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-400">{$t('auth.error')}</h3>
            <div class="mt-1 text-sm text-red-300">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if success}
      <div class="rounded-lg bg-gray-900 border border-gray-800 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L6.53 10.47a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.154-.114l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-400">{$t('auth.success')}</h3>
            <div class="mt-1 text-sm text-green-300">
              <p>{success}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <form class="mt-8 space-y-6" onsubmit={handleRegister}>
      <div class="space-y-4">
        <div>
          <label for="email" class="sr-only">{$t('auth.emailAddress')}</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            bind:value={email}
            disabled={loading}
            class="relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-base"
            placeholder="{$t('auth.emailAddress')}"
          />
        </div>
        <div>
          <label for="password" class="sr-only">{$t('auth.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            bind:value={password}
            disabled={loading}
            class="relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-base"
            placeholder="{$t('auth.password')}"
          />
        </div>
        <div>
          <label for="confirmPassword" class="sr-only">{$t('auth.confirmPassword')}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            bind:value={confirmPassword}
            disabled={loading}
            class="relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-base"
            placeholder="{$t('auth.confirmPassword')}"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          class="group relative w-full flex justify-center py-4 px-4 border-2 border-white text-white bg-black hover:bg-white hover:text-black transition-all duration-200 font-bold text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {$t('auth.creatingAccount')}
          {:else}
            {$t('auth.createAccount')}
          {/if}
        </button>
      </div>

      <div class="text-center">
        <p class="text-gray-400">
          {$t('auth.alreadyHaveAccount')}{' '}
          <a
            href="/login"
            class="font-medium text-white hover:text-gray-300 transition-colors duration-200 underline"
          >
            {$t('auth.signInLink')}
          </a>
        </p>
      </div>
    </form>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #000000;
  }
</style>

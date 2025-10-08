<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
  let loading = $state(false);

  async function handleLogout() {
    loading = true;
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the page to get fresh server-side data
      goto('/');
      } else {
        console.error('Logout failed');
        // Still reload to clear any cached state
        goto('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still reload to clear any cached state
      goto('/');
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-white text-center">Fuga Scheduling</h1>
      <p class="mt-2 text-gray-300 text-center">Manage your weekly schedules with ease</p>
    </div>

    {#if loading}
      <div class="flex justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {:else if data.user}
      <!-- Authenticated User View -->
      <div class="rounded-lg bg-gray-800 border border-gray-700 p-6 space-y-6">
        <div class="text-center">
          <div class="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span class="text-white text-xl font-bold">
              {data.user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 class="text-xl font-semibold text-white">Welcome back!</h2>
          <p class="text-gray-300 mt-2">You are signed in as:</p>
          <p class="text-blue-400 font-medium mt-1">{data.user.email}</p>
        </div>

        <div class="space-y-4">
          <button
            onclick={() => goto('/dashboard')}
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Go to Dashboard
          </button>
          
          <button
            onclick={handleLogout}
            class="w-full flex justify-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    {:else}
      <!-- Unauthenticated User View -->
      <div class="rounded-lg bg-gray-800 border border-gray-700 p-6 space-y-6">
        <div class="text-center">
          <h2 class="text-xl font-semibold text-white">Get Started</h2>
          <p class="text-gray-300 mt-2">Sign in to access your scheduling dashboard</p>
        </div>

        <div class="space-y-4">
          <button
            onclick={() => goto('/login')}
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Sign In
          </button>
          
          <button
            onclick={() => goto('/register')}
            class="w-full flex justify-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Create Account
          </button>
        </div>
      </div>
    {/if}

    <!-- Additional Information -->
    <div class="text-center">
      <p class="text-gray-400 text-sm">
        Fuga helps you manage weekly schedules, time slots, and resources efficiently.
      </p>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #111827; /* bg-gray-900 */
  }
</style>

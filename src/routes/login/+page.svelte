<script lang="ts">
  let email = '';
  let password = '';

  function handleLogin(event: Event) {
    event.preventDefault();
    // For now, just log the credentials (backend will be handled later)
    console.log('Login attempt:', { email, password });
    // In a real app, you would call your authentication service here
  }
</script>

<div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-white text-center">Welcome Back</h1>
      <p class="mt-2 text-gray-300 text-center">Sign in to your account</p>
    </div>

    <form class="mt-8 space-y-6" on:submit={handleLogin}>
      <div class="space-y-4">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            bind:value={email}
            class="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            bind:value={password}
            class="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Sign in
        </button>
      </div>

      <div class="text-center">
        <p class="text-gray-400">
          Don't have an account?{' '}
          <a
            href="/register"
            class="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Sign up
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
    background-color: #111827; /* bg-gray-900 */
  }
</style>

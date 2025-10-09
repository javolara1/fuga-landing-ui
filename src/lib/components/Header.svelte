<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<header class="bg-black border-b border-gray-800 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <h1 class="text-2xl font-bold text-white cursor-pointer" onclick={() => goto('/')}>
          FUGA
        </h1>
      </div>

      <!-- Navigation Links - Desktop -->
      <nav class="hidden md:flex space-x-8">
        <a href="#services" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Services
        </a>
        <a href="#pricing" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Pricing
        </a>
        <a href="#about" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          About
        </a>
        <a href="#contact" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Contact
        </a>
      </nav>

      <!-- Login Button -->
      <div class="flex items-center space-x-4">
        <button
          onclick={() => goto('/login')}
          class="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Login
        </button>
        
        <!-- Mobile menu button -->
        <button class="md:hidden text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="md:hidden border-t border-gray-800 pt-4 pb-4">
      <nav class="flex flex-col space-y-4">
        <a href="#services" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Services
        </a>
        <a href="#pricing" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Pricing
        </a>
        <a href="#about" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          About
        </a>
        <a href="#contact" class="text-white hover:text-gray-300 transition-colors duration-200 font-medium">
          Contact
        </a>
      </nav>
    </div>
  </div>
</header>

<style>
  a {
    scroll-behavior: smooth;
  }
</style>

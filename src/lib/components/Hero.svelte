<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="bg-black text-white py-20 lg:py-32">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <!-- Main Heading -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
        FUGA
        <span class="block text-2xl md:text-4xl lg:text-5xl font-light mt-2">
          Multidisciplinary Sports Team
        </span>
      </h1>

      <!-- Subheading -->
      <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Professional strength training and customized sport-specific programs for cycling, running, and swimming athletes.
      </p>

      <!-- Key Benefits -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div class="text-2xl mb-2">💪</div>
          <h3 class="text-lg font-semibold mb-2">Strength Training</h3>
          <p class="text-gray-400 text-sm">Professional equipment and personalized coaching</p>
        </div>
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div class="text-2xl mb-2">🚴‍♂️</div>
          <h3 class="text-lg font-semibold mb-2">Custom Programs</h3>
          <p class="text-gray-400 text-sm">Tailored training for your sport and goals</p>
        </div>
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div class="text-2xl mb-2">🏆</div>
          <h3 class="text-lg font-semibold mb-2">Expert Coaching</h3>
          <p class="text-gray-400 text-sm">Professional guidance for optimal performance</p>
        </div>
      </div>

      <!-- Call to Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onclick={() => goto('/register')}
          class="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Start Training Today
        </button>
        <button
          onclick={() => {
            const servicesSection = document.getElementById('services');
            servicesSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-200"
        >
          Learn More
        </button>
      </div>

      <!-- Additional Info -->
      <p class="text-gray-400 mt-8 text-sm">
        Join athletes who have transformed their performance with FUGA's professional training programs
      </p>
    </div>
  </div>
</section>

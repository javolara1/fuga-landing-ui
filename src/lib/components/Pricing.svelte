<section id="pricing" class="bg-black text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Training Programs & Pricing</h2>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        Choose the training program that fits your goals and schedule
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Strength Training Package -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-white text-xs font-medium mb-4">
            Most Popular
          </div>
          <h3 class="text-2xl font-bold mb-2">Strength Training</h3>
          <div class="text-3xl font-bold mb-2">$120<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">Perfect for building foundational strength</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            8 sessions per month
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Personalized workout plans
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Professional equipment access
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Progress tracking
          </li>
        </ul>

        <button
          onclick={() => {
            // This would typically open a registration modal or redirect
            window.location.href = '/register?plan=strength';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          Get Started
        </button>
      </div>

      <!-- Sport-Specific Training -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold mb-2">Sport-Specific</h3>
          <div class="text-3xl font-bold mb-2">$180<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">Tailored to your sport and goals</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Choose: Cycling, Running, or Swimming
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            12 sessions per month
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Custom training plans
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Technique analysis
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Performance metrics
          </li>
        </ul>

        <button
          onclick={() => {
            window.location.href = '/register?plan=sport-specific';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          Choose Program
        </button>
      </div>

      <!-- Premium Package -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-medium mb-4">
            Premium
          </div>
          <h3 class="text-2xl font-bold mb-2">Complete Athlete</h3>
          <div class="text-3xl font-bold mb-2">$250<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">Full access to all training programs</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Strength + Sport-Specific training
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            20 sessions per month
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            One-on-one coaching
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Nutrition guidance
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Priority scheduling
          </li>
        </ul>

        <button
          onclick={() => {
            window.location.href = '/register?plan=premium';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          Go Premium
        </button>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="text-center mt-12">
      <p class="text-gray-400 mb-4">All plans include:</p>
      <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Flexible scheduling
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Progress assessments
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Equipment access
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Professional coaching
        </div>
      </div>
    </div>

    <!-- Contact for Custom Plans -->
    <div class="text-center mt-8">
      <p class="text-gray-400">
        Need a custom plan? <a href="#contact" class="text-white underline hover:text-gray-300">Contact us</a> for personalized pricing.
      </p>
    </div>
  </div>
</section>

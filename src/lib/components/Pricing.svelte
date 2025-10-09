<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<section id="pricing" class="bg-black text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{$t('pricing.title')}</h2>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        {$t('pricing.description')}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Strength Training Package -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-white text-xs font-medium mb-4">
            {$t('pricing.mostPopular')}
          </div>
          <h3 class="text-2xl font-bold mb-2">{$t('pricing.strengthTraining')}</h3>
          <div class="text-3xl font-bold mb-2">$120<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">{$t('pricing.perfectForStrength')}</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            8 {$t('pricing.sessionsPerMonth')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.personalizedWorkout')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.professionalEquipment')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.progressTracking')}
          </li>
        </ul>

        <button
          onclick={() => {
            // This would typically open a registration modal or redirect
            window.location.href = '/register?plan=strength';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          {$t('pricing.getStarted')}
        </button>
      </div>

      <!-- Sport-Specific Training -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold mb-2">{$t('pricing.sportSpecific')}</h3>
          <div class="text-3xl font-bold mb-2">$180<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">{$t('pricing.tailoredToSport')}</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.chooseProgram')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            12 {$t('pricing.sessionsPerMonth')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.customTraining')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.techniqueAnalysis')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.performanceMetrics')}
          </li>
        </ul>

        <button
          onclick={() => {
            window.location.href = '/register?plan=sport-specific';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          {$t('pricing.chooseProgramButton')}
        </button>
      </div>

      <!-- Premium Package -->
      <div class="bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-white transition-all duration-300">
        <div class="text-center mb-6">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-medium mb-4">
            {$t('pricing.premium')}
          </div>
          <h3 class="text-2xl font-bold mb-2">{$t('pricing.completeAthlete')}</h3>
          <div class="text-3xl font-bold mb-2">$250<span class="text-lg text-gray-400">/month</span></div>
          <p class="text-gray-400 text-sm">{$t('pricing.fullAccess')}</p>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.strengthPlusSport')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            20 {$t('pricing.sessionsPerMonth')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.oneOnOneCoaching')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.nutritionGuidance')}
          </li>
          <li class="flex items-center text-gray-300">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('pricing.priorityScheduling')}
          </li>
        </ul>

        <button
          onclick={() => {
            window.location.href = '/register?plan=premium';
          }}
          class="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
        >
          {$t('pricing.goPremium')}
        </button>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="text-center mt-12">
      <p class="text-gray-400 mb-4">{$t('pricing.allPlansInclude')}</p>
      <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {$t('pricing.flexibleScheduling')}
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {$t('pricing.progressAssessments')}
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {$t('pricing.equipmentAccess')}
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {$t('pricing.professionalCoaching')}
        </div>
      </div>
    </div>

    <!-- Contact for Custom Plans -->
    <div class="text-center mt-8">
      <p class="text-gray-400">
        {$t('pricing.needCustomPlan')} <a href="#contact" class="text-white underline hover:text-gray-300">{$t('pricing.contactUs')}</a> {$t('pricing.forPersonalizedPricing')}
      </p>
    </div>
  </div>
</section>

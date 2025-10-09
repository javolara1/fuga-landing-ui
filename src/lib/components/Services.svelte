<script lang="ts">
  import { t } from '$lib/i18n';
  
  // Create arrays from individual feature translations
  const primaryFeatures = $derived([
    $t('services.primary.features.feat1'),
    $t('services.primary.features.feat2'),
    $t('services.primary.features.feat3'),
    $t('services.primary.features.feat4')
  ]);
  
  const cyclingFeatures = $derived([
    $t('services.secondary.cycling.features.feat1'),
    $t('services.secondary.cycling.features.feat2'),
    $t('services.secondary.cycling.features.feat3'),
    $t('services.secondary.cycling.features.feat4')
  ]);
  
  const runningFeatures = $derived([
    $t('services.secondary.running.features.feat1'),
    $t('services.secondary.running.features.feat2'),
    $t('services.secondary.running.features.feat3'),
    $t('services.secondary.running.features.feat4')
  ]);
  
  const swimmingFeatures = $derived([
    $t('services.secondary.swimming.features.feat1'),
    $t('services.secondary.swimming.features.feat2'),
    $t('services.secondary.swimming.features.feat3'),
    $t('services.secondary.swimming.features.feat4')
  ]);
  
</script>

<section id="services" class="bg-black text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{$t('services.title')}</h2>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        {$t('services.description')}
      </p>
    </div>

    <!-- Primary Service - Strength Training -->
    <div class="mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium mb-4">
            <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
            {$t('services.primary.badge')}
          </div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">{$t('services.primary.title')}</h3>
          <p class="text-gray-300 text-lg mb-6 leading-relaxed">
            {$t('services.primary.description')}
          </p>
          <ul class="space-y-3 mb-8">
            {#each primaryFeatures as feature}
              <li class="flex items-center text-gray-300">
                <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            {/each}
          </ul>
        </div>
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div class="text-6xl mb-4 text-center">💪</div>
          <h4 class="text-xl font-bold text-center mb-4">{$t('services.primary.focus.title')}</h4>
          <p class="text-gray-300 text-center">
            {$t('services.primary.focus.description')}
          </p>
        </div>
      </div>
    </div>

    <!-- Secondary Services - Sport Specific Training -->
    <div>
      <div class="text-center mb-12">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium mb-4">
          <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
          {$t('services.secondary.badge')}
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-4">{$t('services.secondary.title')}</h3>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          {$t('services.secondary.description')}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Cycling -->
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">🚴‍♂️</div>
          <h4 class="text-xl font-bold text-center mb-4">{$t('services.secondary.cycling.title')}</h4>
          <p class="text-gray-300 text-center mb-6">
            {$t('services.secondary.cycling.description')}
          </p>
          <ul class="space-y-2 text-sm text-gray-400">
            {#each cyclingFeatures as feature}
              <li>• {feature}</li>
            {/each}
          </ul>
        </div>

        <!-- Running -->
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">🏃‍♂️</div>
          <h4 class="text-xl font-bold text-center mb-4">{$t('services.secondary.running.title')}</h4>
          <p class="text-gray-300 text-center mb-6">
            {$t('services.secondary.running.description')}
          </p>
          <ul class="space-y-2 text-sm text-gray-400">
            {#each runningFeatures as feature}
              <li>• {feature}</li>
            {/each}
          </ul>
        </div>

        <!-- Swimming -->
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300">
          <div class="text-4xl mb-4 text-center">🏊‍♂️</div>
          <h4 class="text-xl font-bold text-center mb-4">{$t('services.secondary.swimming.title')}</h4>
          <p class="text-gray-300 text-center mb-6">
            {$t('services.secondary.swimming.description')}
          </p>
          <ul class="space-y-2 text-sm text-gray-400">
            {#each swimmingFeatures as feature}
              <li>• {feature}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

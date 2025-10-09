<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<section id="about" class="bg-black text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{$t('about.title')}</h2>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">
        {$t('about.description')}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h3 class="text-2xl md:text-3xl font-bold mb-6">{$t('about.ourMission')}</h3>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">
          {$t('about.missionText1')}
        </p>
        <p class="text-gray-300 text-lg leading-relaxed">
          {$t('about.missionText2')}
        </p>
      </div>
      <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <div class="text-6xl mb-4 text-center">🏆</div>
        <h4 class="text-xl font-bold text-center mb-4">{$t('about.whyChooseFuga')}</h4>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('about.professionalCoaching')}
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('about.stateOfTheArt')}
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('about.personalizedTraining')}
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {$t('about.scienceBased')}
          </li>
        </ul>
      </div>
    </div>

    <!-- Training Philosophy -->
    <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-16">
      <h3 class="text-2xl md:text-3xl font-bold mb-6 text-center">{$t('about.trainingPhilosophy')}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-4xl mb-4">🔬</div>
          <h4 class="text-xl font-bold mb-3">{$t('about.scienceBasedApproach')}</h4>
          <p class="text-gray-300">
            {$t('about.scienceBasedText')}
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-4">🎯</div>
          <h4 class="text-xl font-bold mb-3">{$t('about.individualizedProgramming')}</h4>
          <p class="text-gray-300">
            {$t('about.individualizedText')}
          </p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-4">📈</div>
          <h4 class="text-xl font-bold mb-3">{$t('about.progressiveDevelopment')}</h4>
          <p class="text-gray-300">
            {$t('about.progressiveText')}
          </p>
        </div>
      </div>
    </div>

    <!-- Sports Disciplines -->
    <div class="text-center">
      <h3 class="text-2xl md:text-3xl font-bold mb-8">{$t('about.multidisciplinaryExcellence')}</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div class="text-3xl mb-3">💪</div>
          <h4 class="font-bold text-white">{$t('about.strengthTraining')}</h4>
          <p class="text-gray-400 text-sm mt-2">{$t('about.foundationForSports')}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div class="text-3xl mb-3">🚴‍♂️</div>
          <h4 class="font-bold text-white">{$t('about.cycling')}</h4>
          <p class="text-gray-400 text-sm mt-2">{$t('about.roadMountainBiking')}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div class="text-3xl mb-3">🏃‍♂️</div>
          <h4 class="font-bold text-white">{$t('about.running')}</h4>
          <p class="text-gray-400 text-sm mt-2">{$t('about.trackRoadTrail')}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div class="text-3xl mb-3">🏊‍♂️</div>
          <h4 class="font-bold text-white">{$t('about.swimming')}</h4>
          <p class="text-gray-400 text-sm mt-2">{$t('about.poolOpenWater')}</p>
        </div>
      </div>
    </div>
  </div>
</section>

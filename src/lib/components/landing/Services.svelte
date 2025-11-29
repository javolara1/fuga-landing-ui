<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section
	id="services"
	class="bg-black pt-12 text-white sm:pt-16 lg:pt-20"
	data-testid="services-section"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-8 text-3xl font-bold sm:text-3xl md:text-4xl">{$t('services.title')}</h2>
			<p class="mx-auto text-base text-gray-300 sm:text-lg">
				{$t('services.description')}
			</p>
		</div>

		<!-- Modalidad subtitle -->
		<div class="mb-8 text-center">
			<h3 class="text-2xl font-bold sm:text-2xl">{$t('services.modalidad')}</h3>
		</div>

		<!-- Services Grid: 2 cols on default/sm, 4 cols on md+ -->
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
			<!-- Service 1: Presencial -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">🏋️</div>
				<h3 class="mb-2 text-center text-base font-bold sm:text-lg">
					{$t('services.presencial.title')}
				</h3>
				<p class="text-center text-xs text-gray-300 sm:text-sm">
					{$t('services.presencial.description')}
				</p>
			</div>

			<!-- Service 2: Virtual -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">💻</div>
				<h3 class="mb-2 text-center text-base font-bold sm:text-lg">
					{$t('services.virtual.title')}
				</h3>
				<p class="text-center text-xs text-gray-300 sm:text-sm">
					{$t('services.virtual.description')}
				</p>
			</div>

			<!-- Service 3: A Distancia -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">📊</div>
				<h3 class="mb-2 text-center text-base font-bold sm:text-lg">
					{$t('services.distancia.title')}
				</h3>
				<p class="text-center text-xs text-gray-300 sm:text-sm">
					{$t('services.distancia.description')}
				</p>
			</div>

			<!-- Service 4: Nutrición -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">🥗</div>
				<h3 class="mb-2 text-center text-base font-bold sm:text-lg">
					{$t('services.nutricion.title')}
				</h3>
				<p class="text-center text-xs text-gray-300 sm:text-sm">
					{$t('services.nutricion.description')}
				</p>
			</div>
		</div>

		<!-- Disciplinas -->
		<div class="mt-12 text-center">
			<h3 class="mb-8 text-2xl font-bold">{$t('services.disciplinas.title')}</h3>
		</div>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-7">
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🚴</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.ciclismo')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🏃</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.carrera')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🏅</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.triatlon')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🏊</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.natacion')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🧘</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.wellness')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">💪</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.fitness')}
				</h5>
			</div>

			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600"
			>
				<div class="mb-2 text-center text-3xl">🏋️</div>
				<h5 class="text-center text-base font-bold sm:text-lg">
					{$t('services.disciplinas.fuerza')}
				</h5>
			</div>
		</div>

		<!-- Programas de Entrenamiento -->
		<div class="mt-12 text-center">
			<h3 class="mb-8 text-2xl font-bold">{$t('services.programas.title')}</h3>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
			<!-- Programa BASE -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">🌱</div>
				<h4 class="text-center text-base font-bold sm:text-lg">
					{$t('services.programas.base.title')}
				</h4>
			</div>

			<!-- Programa AVANZADO -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">🚀</div>
				<h4 class="text-center text-base font-bold sm:text-lg">
					{$t('services.programas.avanzado.title')}
				</h4>
			</div>

			<!-- Programa ÉLITE/PRO -->
			<div
				class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-6"
			>
				<div class="mb-4 text-center text-4xl">🏆</div>
				<h4 class="text-center text-base font-bold sm:text-lg">
					{$t('services.programas.elite.title')}
				</h4>
			</div>
		</div>
	</div>
</section>

<script>
	import { t } from '$lib/translations.svelte';
	import { onMount } from 'svelte';

	const getFeatures = () => {
		return [
			{
				title: $t('landing.features.timeEntry'),
				body: $t('services.')
			},
			{
				title: $t('landing.features.invoicing'),
				body: $t('services.')
			},
			{
				title: $t('landing.features.crossFeatureTools'),
				body: $t('services.')
			},
			{
				title: $t('landing.features.integrations'),
				body: $t('services.')
			}
		];
	};

	let features = $state(getFeatures());

	let selectedFeature = $state({
		title: '',
		body: ''
	});

	onMount(() => {
		t.subscribe(() => {
			features = getFeatures();
		});
	});
</script>

{#snippet FeatureCards(section)}
	<div class="relative grid min-h-[450px] cursor-pointer grid-cols-1 gap-4 md:grid-cols-2">
		{#each section as feature}
			<button
				class="bg-base-100 relative h-full w-full cursor-pointer transition-all duration-300 *:rounded-sm"
				onclick={() => {
					selectedFeature.title = feature.title;
					selectedFeature.body = feature.body;
				}}
			>
				<div
					class="absolute inset-[1px] z-0 bg-gradient-to-br from-violet-300 to-indigo-500 transition-all duration-300 hover:-inset-1"
				></div>
				<div
					class="bg-base-200 pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center p-6"
				>
					<h3 class="mb-2 text-lg font-semibold break-normal text-white sm:text-xl">
						{feature.title}
					</h3>
					<p class="text-sm text-gray-400">{feature.body}</p>
				</div>
			</button>
		{/each}
	</div>
{/snippet}

<section class="bg-primary h-fit px-4 py-32">
	<div
		class="bg-base-100 mx-auto flex h-fit w-full max-w-7xl flex-col justify-between gap-8 p-16 sm:flex-row"
	>
		<div class="flex w-1/2 flex-col justify-between">
			<div class="flex flex-col gap-2">
				<p class="text-primary">{$t('landing.features.sectionTitle').toUpperCase()}</p>
				<h2 class="mb-4 text-4xl font-bold">
					{selectedFeature.title ? selectedFeature?.title : 'Placeholder'}
				</h2>
				<p class="mb-8 max-w-lg">
					{selectedFeature.body ? selectedFeature?.body : 'Placeholder'}
				</p>
			</div>

			<button class="btn btn-primary w-fit cursor-pointer">Placeholder</button>
		</div>

		{@render FeatureCards(features)}
	</div>
</section>

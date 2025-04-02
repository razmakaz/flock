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
	<div class="relative grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2">
		{#each section as feature}
			<div
				class="bg-base-200 cursor-pointer bg-gradient-to-br from-violet-500 to-violet-600 p-0 shadow-2xl duration-200 hover:scale-105 hover:p-4"
			>
				<button
					class=" bg-base-200 flex h-full w-full flex-none cursor-pointer flex-col items-start p-4
				 "
					onclick={() => {
						selectedFeature.title = feature.title;
						selectedFeature.body = feature.body;
					}}
				>
					<div class="mb-4 text-blue-400" aria-hidden="true"></div>
					<h3 class="mb-2 text-lg font-semibold break-normal text-white sm:text-xl">
						{feature.title}
					</h3>
					<p class="text-sm text-gray-400">{feature.body}</p>
				</button>
			</div>
		{/each}
	</div>
{/snippet}

<section class="bg-primary h-fit px-4 py-32">
	<div
		class="bg-base-100 mx-auto flex min-h-[500px] w-full max-w-6xl flex-col justify-between gap-8 p-16 sm:flex-row"
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

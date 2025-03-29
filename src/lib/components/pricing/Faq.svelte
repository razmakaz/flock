<script lang="ts">
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let state = $state({
		openQuestions: [] as number[]
	});

	const getQuestions = () => {
		return [
			{
				id: 1,
				question:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?',
				answer:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?'
			},
			{
				id: 2,
				question:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?',
				answer:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?'
			},
			{
				id: 3,
				question:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?',
				answer:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?'
			},
			{
				id: 4,
				question:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?',
				answer:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?'
			},
			{
				id: 5,
				question:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?',
				answer:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam quos explicabo corrupti consequatur quod consequuntur?'
			}
		];
	};

	let faq = $state(getQuestions());

	const handleToggleQuestions = (id: number) => {
		if (state.openQuestions.includes(id)) {
			state.openQuestions = state.openQuestions.filter((c) => c !== id);
		} else {
			state.openQuestions = [...state.openQuestions, id];
		}
	};

	onMount(() => {
		t.subscribe(() => {
			faq = getQuestions();
		});
	});
</script>

{#snippet Questions(section)}
	<div class="flex flex-col gap-8 rounded py-8">
		{#each section as item}
			<button
				type="button"
				class="bg-base-200 flex cursor-pointer justify-between p-4"
				onclick={() => handleToggleQuestions(item.id)}
			>
				<p>{item.question}</p>
				<div
					class="transition-all duration-75 {state.openQuestions.includes(item.id)
						? 'rotate-90'
						: ''}"
				>
					<Icon icon="material-symbols:chevron-right" width="24" height="24" />
				</div>
			</button>

			{#if state.openQuestions.includes(item.id)}
				<div class="px-4 transition duration-200">
					<p>{item.answer}</p>
				</div>
			{/if}
		{/each}
	</div>
{/snippet}

<section>
	<h2 class="text-4xl">FAQ</h2>

	{@render Questions(faq)}
</section>

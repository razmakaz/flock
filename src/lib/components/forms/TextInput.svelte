<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';

	let {
		label,
		value = $bindable(),
		validation,
		required = false,
		isValid = $bindable(),
		validationError = 'Invalid input',
		type = 'text'
	}: {
		label?: string;
		value: string;
		required?: boolean;
		isValid?: boolean;
		validation?: (input: string) => boolean;
		validationError?: string;
		type?: string;
	} = $props();

	const state = $state({
		hasBlurred: false,
		error: ''
	});

	const onfocus = () => {
		state.error = '';
		state.hasBlurred = false;
	};

	const onblur = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = target.value;
		console.log('Changing', validation, state.hasBlurred);
		state.hasBlurred = true;

		isValid = true;
		state.error = '';

		// Validate the input
		if (validation && state.hasBlurred) {
			console.log('Is validating');
			if (!validation(value)) {
				isValid = false;
				state.error = validationError;
			}
		}
		console.log('Is valid', state.error);
	};
</script>

<label class="flex flex-col">
	{#if label}
		<div class="flex items-center gap-1">
			<span>{label}</span>
			{#if required}
				<Icon icon="ic:round-star" class="text-error" width={18} height={18} />
			{/if}
		</div>
	{/if}
	<input
		{type}
		class="input w-full transition-colors duration-200 {state.error
			? 'input-error'
			: ''} {state.hasBlurred && isValid ? 'input-success' : ''}"
		bind:value
		{onblur}
		{onfocus}
	/>
	{#if state.error}
		<span transition:slide={{ axis: 'y' }} class="text-red-500">{state.error}</span>
	{/if}
</label>

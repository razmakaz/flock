<script lang="ts">
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { onMount } from 'svelte';

	let input: HTMLInputElement;
	let pickr: Instance;

	onMount(() => {
		pickr = flatpickr(input, {
			enableTime: true,
			dateFormat: 'Y-m-d H:i',
			defaultDate: new Date()
		}) as Instance;
	});
</script>

<div class="">
	<input type="text" placeholder="Select Date" data-input bind:this={input} />
</div>

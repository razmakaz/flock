<script lang="ts">
	import { onMount } from 'svelte';
	import { Chrono } from 'chrono-node';
	import * as luxon from 'luxon';

	let { result = $bindable() } = $props();

	let input = $state('');

	const c = new Chrono();

	$effect(() => {
		const _result = c.parse(input);
		const text = _result.pop()?.start?.date().toISOString() || '';
		const humanText = luxon.DateTime.fromISO(text).toFormat('MMM d, yyyy, h:mm a');
		input = humanText;
	});

	onMount(() => {
		input = result;
	});
</script>

<div class="grid grid-cols-1 items-center gap-2 lg:grid-cols-[auto_auto]">
	<input
		class="input col-span-2 w-full"
		type="text"
		bind:value={input}
		placeholder="e.g. '3pm' or 'yesterday 5pm'"
	/>
	<input type="hidden" value={result} />
</div>

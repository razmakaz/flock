<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import CRAPI from '$lib/CRAPI';
	import { goto } from '$app/navigation';
	let { children } = $props();

	let isAuthed = CRAPI.db.authStore.isValid;
	let ready = $state(false);

	onMount(() => {
		if (isAuthed) {
			goto('/app');
		}
		ready = true;
	});
</script>

<div class="grid min-h-screen w-full grid-rows-[auto_1fr]">
	{#if !isAuthed && ready}
		<div class="bg-neutral sticky top-0 grid w-full grid-cols-[auto_1fr_auto] p-4">Nav</div>
	{/if}
	<div>
		{@render children()}
	</div>
</div>

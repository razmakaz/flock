<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	let { data, children } = $props();

	const { session } = data;

	let ready = $state(false);

	onMount(() => {
		if (session) {
			goto('/app');
			return;
		}
		ready = true;
	});
</script>

<div class="grid min-h-screen w-full grid-rows-[auto_1fr]">
	{#if ready}
		<Navbar />
	{/if}
	<div>
		{@render children()}
	</div>
</div>

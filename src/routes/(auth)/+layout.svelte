<script lang="ts">
	import { goto } from '$app/navigation';
	import CRAPI from '$lib/CRAPI';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (CRAPI.db.authStore.isValid) {
			goto('/');
		}
	});
</script>

<div class="flex h-full flex-col items-center justify-center">
	{@render children()}
</div>

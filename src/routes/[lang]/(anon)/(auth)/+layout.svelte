<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {});
</script>

<div class="flex h-full flex-col items-center justify-center">
	{@render children()}
</div>

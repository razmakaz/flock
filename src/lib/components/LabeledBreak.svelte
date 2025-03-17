<script lang="ts">
	const { label = 'OR' } = $props();
</script>

<div class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
	<hr class="neutral-content w-full" />
	<div>{label}</div>
	<hr class="neutral-content w-full" />
</div>

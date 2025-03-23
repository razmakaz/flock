<script lang="ts">
	import App from '$lib/stores/App';
	import Icon from '@iconify/svelte';
</script>

<div class="relative flex h-8 w-8 items-center justify-center">
	<button
		onclick={() => ($App.theme = 'dark')}
		class="btn btn-ghost absolute {$App.theme === 'light' ? 'theme-on' : 'theme-off'} "
	>
		<Icon icon="akar-icons:moon-fill" width={24} height={24} class="cursor-pointer" />
	</button>
	<button
		onclick={() => ($App.theme = 'light')}
		class="btn btn-ghost absolute {$App.theme === 'dark' ? 'theme-on' : 'theme-off'}"
	>
		<Icon icon="stash:sun-solid" width={24} height={24} class="cursor-pointer" />
	</button>
</div>

<style>
	.theme-on {
		@apply pointer-events-auto rotate-0 opacity-100;
	}

	.theme-off {
		@apply pointer-events-none rotate-90 opacity-0;
	}
</style>

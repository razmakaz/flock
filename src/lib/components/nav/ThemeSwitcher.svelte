<script lang="ts">
	import App from '$lib/stores/App';
	import Icon from '@iconify/svelte';
</script>

<div
	data-testid="theme-switcher"
	class="relative flex h-8 w-full min-w-10 items-center justify-center lg:w-8"
>
	<button
		onclick={() => ($App.theme = 'dark')}
		data-testid="dark-mode"
		class="btn lg:btn-ghost absolute w-full {$App.theme === 'light' ? 'theme-on' : 'theme-off'} "
	>
		<Icon icon="akar-icons:moon-fill" width={24} height={24} class="cursor-pointer lg:absolute" />
		<div class="block lg:hidden">Dark Mode</div>
	</button>
	<button
		onclick={() => ($App.theme = 'light')}
		data-testid="light-mode"
		class="btn lg:btn-ghost absolute w-full {$App.theme === 'dark' ? 'theme-on' : 'theme-off'}"
	>
		<Icon icon="stash:sun-solid" width={24} height={24} class="cursor-pointer lg:absolute" />
		<div class="block lg:hidden">Light Mode</div>
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

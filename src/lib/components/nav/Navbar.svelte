<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import LangSelect from './LangSelect.svelte';
	import { t } from '$lib/translations.svelte';

	const state = $state({
		atTop: false
	});

	const handleScroll = () => {
		state.atTop = window.scrollY > 5;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onDestroy(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>

{#snippet navButton({ label, link }: { label: string; link: string })}
	<div class="nav-button-wrapper text-base-content">
		<button class="nav-button font-bold capitalize" onclick={() => goto(link)}>
			<div class="text-lg">{label}</div>
		</button>
		<div class="nav-button-border"></div>
	</div>
{/snippet}

<div
	class="bg-base-100 sticky top-0 flex w-full items-center justify-center p-4 transition-all duration-100"
	style="height: 84px; z-index: 100"
>
	<div class=" grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center">
		<button class="flex cursor-pointer items-center gap-2" onclick={() => goto('/')}>
			<img class="h-12 w-12" src="/img/floc-alt.svg" alt="floc logo" />
			<div class="floc" style="font-size: 48px;">{$t('common.app')}</div>
		</button>
		<div class=" bg-base-200 flex items-center gap-4 rounded-full px-8">
			{@render navButton({ label: $t('landing.nav.product'), link: '/product' })}
			{@render navButton({ label: $t('landing.nav.pricing'), link: '/pricing' })}
			{@render navButton({ label: $t('landing.nav.about'), link: '/about' })}
		</div>
		<div class="flex items-center justify-end gap-4">
			<LangSelect />
			{@render navButton({ label: $t('common.login'), link: '/login' })}
		</div>
	</div>
</div>

<style>
	.nav-button-wrapper {
		position: relative;
	}

	.nav-button {
		background: none;
		border: none;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: color 0.111s ease-in-out;
	}

	.nav-button:hover {
		color: var(--color-primary); /* Change to your desired hover color */
	}

	.nav-button:hover + .nav-button-border {
		transform: scaleX(1);
		transform-origin: left;
	}

	.nav-button-border {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background-color: var(--color-primary); /* Change to your desired border color */
		transform-origin: right;
		transform: scaleX(0);
		transition: transform 0.222s ease-in-out;
	}
</style>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import LangSelect from './LangSelect.svelte';
	import { t } from '$lib/translations.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Icon from '@iconify/svelte';
	import App from '$lib/stores/App';

	const state = $state({
		atTop: false,
		sidebarOpen: false
	});

	const mobileItems = [
		{
			icon: 'mdi:close',
			view: 'mobile',
			label: $t('nav.closeSidebar'),
			action: () => (state.sidebarOpen = false)
		},
		{
			icon: 'ant-design:product-filled',
			view: 'all',
			label: $t('landing.nav.product'),
			action: () => handleNavigate('/product')
		},
		{
			icon: 'ri:money-dollar-circle-fill',
			view: 'all',
			label: $t('landing.nav.pricing'),
			action: () => handleNavigate('/pricing')
		},
		{
			icon: 'mdi:about',
			view: 'all',
			label: $t('landing.nav.about'),
			action: () => handleNavigate('/about')
		},
		{
			icon: 'material-symbols:lock',
			view: 'desktop-bottom',
			label: $t('common.login'),
			action: () => handleNavigate('/login')
		}
	];

	$effect(() => {
		console.log(state.sidebarOpen);
	});

	const handleNavigate = (path: string) => {
		state.sidebarOpen = false;
		goto(path);
	};

	const handleScroll = () => {
		state.atTop = window.scrollY > 5;
	};

	const handleToggle = (e: Event) => {
		e.stopPropagation();
		state.sidebarOpen = !state.sidebarOpen;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onDestroy(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>

{#snippet navButton({ label, action, icon }: { label: string; icon: string; action: () => void })}
	<div class="nav-button-wrapper text-base-content">
		<button class="nav-button flex items-center gap-2 font-bold capitalize" onclick={action}>
			<div class="block lg:hidden">
				<Icon {icon} class="h-6 w-6" />
			</div>
			<div class="text-lg">{label}</div>
		</button>
		<div class="nav-button-border"></div>
	</div>
{/snippet}

<button
	onclick={handleToggle}
	class="
	absolute inset-0 bg-black/20
	{state.sidebarOpen
		? 'pointer-events-auto opacity-100 backdrop-blur-xs'
		: 'pointer-events-none opacity-0 backdrop-blur-none'}
	transition-all duration-150
"
	style="z-index: 998;"
></button>
<div
	class="absolute h-screen transition-all duration-150 {state.sidebarOpen
		? 'pointer-events-auto translate-x-0'
		: 'pointer-events-none -translate-x-full'}"
	style="width: 220px; z-index: 999;"
>
	<div
		class="
			bg-base-200 grid h-full w-full
			grid-rows-[1fr_auto] transition-all duration-150
			
		"
	>
		<div class="flex flex-col gap-4 p-4">
			{#each mobileItems as item}
				{@render navButton(item)}
			{/each}
		</div>
		<div class="p-4">
			<LangSelect />
			<ThemeSwitcher />
		</div>
	</div>
</div>

<div
	class="
		bg-base-100 sticky top-0
		flex h-18 w-full max-w-svw items-center justify-center
		p-4 transition-all
		duration-200 lg:h-20
		{state.atTop ? 'shadow-md' : ' bg-transparent'}
	"
	style="z-index: 100;"
>
	<div
		class=" grid w-full max-w-7xl grid-cols-[auto_1fr] items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-2"
	>
		<button class="lg:hidden" onclick={() => (state.sidebarOpen = !state.sidebarOpen)}>
			<Icon icon="mdi:menu" class="h-8 w-8" />
		</button>
		<button class="flex cursor-pointer items-center gap-4 lg:gap-2" onclick={() => goto('/')}>
			<img
				class="h-8 w-8 lg:h-12 lg:w-12 {$App.theme === 'light' ? 'invert' : ''}"
				src="/img/floc-alt.svg"
				alt="floc logo"
			/>
			<div class="floc text-3xl lg:text-5xl">{$t('common.app')}</div>
		</button>
		<div
			class=" {state.atTop
				? ''
				: ' bg-transparent'} bg-base-200 hidden items-center gap-4 rounded-full px-8 lg:flex"
		>
			{#each mobileItems.filter((a) => a.view === 'all') as item}
				{@render navButton(item)}
			{/each}
		</div>
		<div class="hidden items-center justify-end gap-4 lg:flex">
			<LangSelect />
			<ThemeSwitcher />
			{#each mobileItems.filter((a) => a.view === 'desktop-bottom') as item}
				{@render navButton(item)}
			{/each}
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

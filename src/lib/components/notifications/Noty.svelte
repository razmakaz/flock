<script lang="ts">
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import CRAPI, { type TNotyStyle } from '$lib/CRAPI';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	const store = CRAPI.notify.store;

	let { toasts, snacks, banners } = $state({
		toasts: [] as any,
		snacks: [] as any,
		banners: [] as any
	});

	store.subscribe((value) => {
		toasts = value.filter((note) => note.type === 'toast');
		snacks = value.filter((note) => note.type === 'snack');
		banners = value.filter((note) => note.type === 'banner');
	});

	const getStyle = (style: TNotyStyle) => {
		switch (style) {
			case 'success':
				return 'bg-success text-success-content';
			case 'info':
				return 'bg-info text-info-content';
			case 'warning':
				return 'bg-warning text-warning-content';
			case 'error':
				return 'bg-error text-error-content';
			default:
				return 'bg-primary text-primary-content';
		}
	};

	onMount(() => {
		if (PUBLIC_ENVIRONMENT == 'dev') {
			CRAPI.notify.trigger('Toast Test', { type: 'toast', style: 'error', duration: 1000 });
			CRAPI.notify.trigger('Snack Test', { type: 'snack', style: 'info', duration: 4000 });
			CRAPI.notify.trigger('Banner Test', { type: 'banner' });
			CRAPI.notify.trigger('Toast Test', { type: 'toast', style: 'success', duration: 2000 });
			CRAPI.notify.trigger('Snack Test', { type: 'snack', style: 'warning', duration: 5000 });
			CRAPI.notify.trigger('Banner Test', { type: 'banner' });
		}
	});
</script>

<div class="pointer-events-none absolute inset-0" style="z-index: 100;">
	<!-- Toast View -->
	<div
		class="absolute top-0 right-0 flex flex-col items-start justify-start gap-2 overflow-hidden p-4"
	>
		{#each toasts as toast (toast.id)}
			<div
				animate:flip={{ duration: 333 }}
				transition:fly={{ x: 400, duration: 333 }}
				class="card {getStyle(
					toast.style
				)} pointer-events-auto relative grid w-full max-w-sm grid-cols-[1fr_auto] items-center justify-center gap-4 overflow-hidden p-2 shadow-sm"
			>
				<span>{toast.message}</span>
				<button onclick={() => CRAPI.notify.dismiss(toast.id)} class="btn btn-ghost !p-0">
					<Icon icon="f7:clear-fill" width="32" height="32" class="inline-block" />
				</button>
				<div
					class="bg-neutral noty-shrink absolute bottom-0 col-span-2 h-1 transition-all"
					style="animation-duration: {toast.duration}ms;"
				></div>
			</div>
		{/each}
	</div>

	<!-- Snack View -->
	<div
		class=" absolute bottom-0 left-0 flex w-full flex-col items-center justify-center gap-4 overflow-hidden p-4"
	>
		{#each snacks as snack (snack.id)}
			<div
				animate:flip={{ duration: 333 }}
				transition:fly={{ y: 100, duration: 333 }}
				class="card {getStyle(
					snack.style
				)}  pointer-events-auto relative grid w-full max-w-md grid-cols-[1fr_auto] items-center p-4 text-white shadow-sm"
			>
				<span>{snack.message}</span>
				<button onclick={() => CRAPI.notify.dismiss(snack.id)} class="btn btn-ghost !p-0">
					<Icon icon="f7:clear-fill" width="32" height="32" class="inline-block" />
				</button>
				<div
					class="bg-neutral noty-shrink absolute bottom-0 col-span-2 h-1 transition-all"
					style="animation-duration: {snack.duration}ms;"
				></div>
			</div>
		{/each}
	</div>

	<div
		class="absolute inset-x-0 top-0 flex w-full flex-col items-center justify-center gap-4 overflow-hidden p-4"
	>
		{#each banners as banner (banner.id)}
			<div
				animate:flip={{ duration: 333 }}
				transition:fly={{ y: -100, duration: 333 }}
				class="card {getStyle(
					banner.style
				)}  pointer-events-auto relative grid w-full max-w-lg grid-cols-[1fr_auto] items-center p-2 text-white shadow-sm"
			>
				<span>{banner.message}</span>
				<button onclick={() => CRAPI.notify.dismiss(banner.id)} class="btn btn-ghost !p-0">
					<Icon icon="f7:clear-fill" width="32" height="32" class="inline-block" />
				</button>
				<div
					class="bg-neutral noty-shrink absolute bottom-0 col-span-2 h-1 transition-all"
					style="animation-duration: {banner.duration}ms;"
				></div>
			</div>
		{/each}
	</div>
</div>

<style>
	@keyframes toast-shrink {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}

	.noty-shrink {
		animation-name: toast-shrink;
		animation-timing-function: linear;
	}
</style>

<!-- This route is used for inbound webhooks -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/nav/Sidebar.svelte';
	import Icon from '@iconify/svelte';
	import Noty from '$lib/components/notifications/Noty.svelte';
	import App from '$lib/stores/App';
	import { nav } from '$lib/client/navigation';

	let { children } = $props();

	let isAuthed = !!$App.session;

	const state = $state({
		sidebarOpen: false
	});

	onMount(() => {
		console.log('Is Authed', isAuthed);
		if (!isAuthed) {
			nav('/login');
		}
	});
</script>

{#if isAuthed}
	<Noty />
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		onclick={(e) => {
			e.stopPropagation();
			state.sidebarOpen = !state.sidebarOpen;
		}}
		class="bg-neutral-content/5 absolute inset-0 z-10 transition-all duration-75 {state.sidebarOpen
			? 'pointer-events-auto opacity-100 backdrop-blur-xs'
			: 'pointer-events-none opacity-0'}"
	></button>
	<div
		class="bg-base-200 absolute z-20 max-h-screen min-h-screen transition-all duration-75 {state.sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<Sidebar
			forceOpen
			onclose={() => {
				state.sidebarOpen = false;
				console.log('Closing');
			}}
		/>
	</div>
	<div class="grid max-h-screen min-h-screen grid-rows-[auto_1fr] lg:grid-cols-1">
		<div class="bg-base-200 block lg:hidden">
			<button
				class="flex items-center gap-4 p-4"
				onclick={() => {
					state.sidebarOpen = !state.sidebarOpen;
					console.log(state.sidebarOpen);
				}}
			>
				<Icon icon="gg:sidebar-open" width="32" height="32" class="inline-block" />
				<span class="ml-2">Menu</span>
			</button>
		</div>
		<div
			class="grid grid-cols-1 grid-rows-[auto_1fr] overflow-auto lg:grid-cols-[auto_1fr] lg:grid-rows-1"
		>
			<div class="hidden lg:block">
				<Sidebar />
			</div>
			<div class="bg-base-100 overflow-y-auto">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

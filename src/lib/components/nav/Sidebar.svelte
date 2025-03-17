<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	const {
		classes = '',
		forceOpen = false,
		onclose
	}: {
		classes?: string;
		forceOpen?: boolean;
		onclose?: () => void;
	} = $props();

	const state = $state({
		open: forceOpen
	});

	const items = [
		{
			icon: 'gg:sidebar-open',
			label: 'Close Sidebar',
			visible: !forceOpen,
			onclick: () => (state.open = !state.open)
		},
		{
			icon: 'gg:sidebar-open',
			label: 'Close Sidebar',
			visible: forceOpen,
			onclick: () => onclose?.()
		},
		{
			icon: 'iconamoon:home-fill',
			label: 'Home',
			visible: true,
			onclick: () => goto('/app')
		}
	];
</script>

{#snippet navItem({ icon, label, onclick }: { icon: string; label: string; onclick?: () => void })}
	<button
		class="{state.open ? 'gap-4 pl-4' : 'gap-8 pl-3'} 
            hover:bg-primary grid w-full
            grid-cols-[auto_1fr_auto]
            items-center p-3
            text-left transition-all duration-150
            
        "
		{onclick}
	>
		<Icon {icon} width={32} height={32} />
		<span class=" whitespace-pre">{label}</span>
	</button>
{/snippet}

<div
	class="bg-base-200 {classes} grid h-full max-h-screen min-h-screen grid-rows-[1fr_auto] overflow-x-hidden overflow-y-auto transition-all duration-150"
	style="width: {state.open ? '220px' : '56px'};"
>
	<div>
		{#each items.filter((i) => i.visible) as item, i}
			{@render navItem(item)}
		{/each}
	</div>
	<div>
		{@render navItem({
			icon: 'ri:user-5-fill',
			label: 'Profile',
			onclick: () => goto('/app/profile')
		})}
	</div>
</div>

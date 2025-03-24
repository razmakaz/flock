<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';

	const items = [
		{
			visible: 'unauthed',
			icon: 'iconamoon:home-fill',
			label: $t('landing.nav.home'),
			onclick: () => {
				goto('/');
			}
		},
		{
			visible: 'unauthed',
			icon: 'ant-design:product-filled',
			label: $t('landing.nav.product'),
			onclick: () => {
				goto('/product');
			}
		},
		{
			visible: 'unauthed',
			icon: 'carbon:pricing-traditional',
			label: $t('landing.nav.pricing'),
			onclick: () => {
				goto('/pricing');
			}
		},
		{
			visible: 'unauthed',
			icon: 'mdi:about',
			label: $t('landing.nav.about'),
			onclick: () => {
				goto('/about');
			}
		}
	];
</script>

<div class="dock">
	{#each items as { visible, icon, label, onclick }}
		{#if visible === 'unauthed'}
			<button class="btn btn-ghost flex flex-col items-center gap-2" on:click={onclick}>
				<div class="h-8 w-8">
					<Icon {icon} width={24} height={24} />
				</div>
				<div>{label}</div>
			</button>
		{/if}
	{/each}
</div>

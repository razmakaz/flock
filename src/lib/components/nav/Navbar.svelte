<script lang="ts">
	import { goto } from '$app/navigation';
</script>

{#snippet navButton({ label, link }: { label: string; link: string })}
	<div class="nav-button-wrapper">
		<button class="nav-button font-bold capitalize" onclick={() => goto(link)}>
			<div class="text-lg">{label}</div>
		</button>
		<div class="nav-button-border"></div>
	</div>
{/snippet}

<div
	class="bg-neutral sticky top-0 grid w-full grid-cols-[auto_1fr_auto] items-center px-4"
	style="height: 84px;"
>
	<button class="flex cursor-pointer items-center gap-4 text-white" onclick={() => goto('/')}>
		<img class="h-12 w-12" src="/img/Floc.svg" alt="floc logo" />
		<div class="inter" style="font-size: 40px;">Floc</div>
	</button>
	<div class=" flex items-center gap-4 px-4">
		{@render navButton({ label: 'Product', link: '/product' })}
		{@render navButton({ label: 'Pricing', link: '/pricing' })}
		{@render navButton({ label: 'About', link: '/about' })}
	</div>
	<div class="flex items-center gap-4">
		<button class="btn btn-primary" onclick={() => goto('/login')}>Login</button>
	</div>
</div>

<style>
	.nav-button-wrapper {
		position: relative;
	}

	.nav-button {
		background: none;
		border: none;
		color: white;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: color 0.222s ease-in-out;
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

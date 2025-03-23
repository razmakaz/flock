<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	onMount(() => {
		console.log('Page mounted');
	});

	const features = [
		{
			title: 'Time Entry',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
		},
		{
			title: 'Invoicing',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
		},
		{
			title: 'Cross-Feature Tools',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
		},
		{
			title: 'Integrations',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
		}
	];
</script>

<div class="flex h-fit flex-col gap-4">
	<div class="mx-auto flex w-full max-w-7xl items-center px-4">
		<div class="flex w-full flex-col justify-center gap-4" style="min-height: 70vh;">
			<div class="flex max-w-xl flex-col gap-2">
				<h1 class="inter-bold text-7xl font-bold">Flockers</h1>
				<p class="poppins-light text-lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
			</div>

			<div class="join">
				<div>
					<label class="input validator join-item z-0">
						<Icon icon="ic:baseline-email" width={18} height={18} />
						<input type="email" placeholder="mail@site.com" required />
					</label>
					<div class="validator-hint hidden">Enter valid email address</div>
				</div>
				<button class="poppins-regular btn btn-primary join-item">Sign Up Now</button>
			</div>
		</div>

		<div>Placeholder</div>
	</div>

	<section class="bg-base-300 w-full py-24">
		<div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4">
			<div class="flex flex-col gap-2 text-center">
				<h2 class="inter-bold text-5xl">Features</h2>
				<p class="poppins-light text-lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
			</div>

			<ul class="list-style-none poppins-light flex gap-6">
				{#each features as feature}
					<li>
						<h3 class="inter-bold text-lg">{feature.title}</h3>
						<p class="poppins-light">{feature.body}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

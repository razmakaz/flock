<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	onMount(() => {
		console.log('Page mounted');
	});
</script>

<div class="flex flex-col">
	<div class="flex w-full flex-col items-center justify-center gap-4 p-4" style="min-height: 70vh;">
		<div class="text-center">
			<h1 class="text-3xl font-bold">Page</h1>
			<p class="text-lg">This is a page</p>
		</div>

		<div class="join">
			<div>
				<label class="input validator join-item">
					<Icon icon="ic:baseline-email" width={18} height={18} />
					<input type="email" placeholder="mail@site.com" required />
				</label>
				<div class="validator-hint hidden">Enter valid email address</div>
			</div>
			<button class="btn btn-primary join-item">Join</button>
		</div>
	</div>

	<div class="conatiner mx-auto w-full" style="max-width: 1000px;">
		<div class="mockup-browser border-base-300 bg-base-200 w-full border">
			<div class="mockup-browser-toolbar">
				<div class="input">https://yourapp.com</div>
			</div>
			<div class="border-base-300 grid h-80 place-content-center border-t">Hello!</div>
		</div>
	</div>
</div>

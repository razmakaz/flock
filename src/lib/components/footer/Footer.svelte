<script>
	import Icon from '@iconify/svelte';

	// TODO @izyk: Try to make the links dynamically generated.

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="bg-base-200 text-base-content flex h-fit w-full items-center justify-center px-4 py-16"
>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-12">
		<div class="flex items-center justify-between">
			<div>
				<h4 class="inter-bold text-3xl">Floc</h4>
			</div>

			<div class="join">
				<div>
					<label class="input validator join-item z-0">
						<Icon icon="ic:baseline-email" width={18} height={18} />
						<input type="email" placeholder="mail@site.com" required />
					</label>
					<div class="validator-hint hidden">Enter valid email address</div>
				</div>
				<button class="poppins-regular btn btn-base-100 join-item">Sign Up Now</button>
			</div>
		</div>

		<div class="border-1"></div>

		<div class="flex justify-between">
			<div class="flex flex-col gap-4">
				<h5 class="inter-bold text-lg">Placeholder</h5>
				<ul class="poppins-light flex flex-col gap-2">
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
				</ul>
			</div>
			<div class="flex flex-col gap-4">
				<h5 class="inter-bold text-lg">Placeholder</h5>
				<ul class="poppins-light flex flex-col gap-2">
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
				</ul>
			</div>
			<div class="flex flex-col gap-4">
				<h5 class="inter-bold text-lg">Placeholder</h5>
				<ul class="poppins-light flex flex-col gap-2">
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
				</ul>
			</div>
			<div class="flex flex-col gap-4">
				<h5 class="inter-bold text-lg">Placeholder</h5>
				<ul class="poppins-light flex flex-col gap-2">
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
					<li>
						<button type="button" class="cursor-pointer">Placeholder</button>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-1"></div>

		<div class="flex items-center justify-between">
			<p class="text-md">
				Floc &#169; {currentYear}. All rights reserved
			</p>

			<ul class="poppins-light flex w-fit gap-2">
				<li>
					<button type="button">Placeholder</button>
				</li>
				<li>
					<button type="button">Placeholder</button>
				</li>
				<li>
					<button type="button">Placeholder</button>
				</li>
			</ul>
		</div>
	</div>
</footer>

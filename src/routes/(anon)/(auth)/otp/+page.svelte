<script lang="ts">
	import Icon from '@iconify/svelte';
	import { on } from 'svelte/events';
	import { scale } from 'svelte/transition';

	const state = $state({
		otp: '',
		valid: false
	});

	const oninput = (e: Event, index: number) => {
		const input = e.target as HTMLInputElement;
		input.value = input.value.replace(/\D/g, ''); // Only allow numbers

		if (input.value.length > 1) {
			input.value = input.value.slice(0, 1);
		}
		const nextInput = document.querySelectorAll('input')[index + 1] as HTMLInputElement;
		if (nextInput && input.value) {
			nextInput.focus();
		}
		if (!input.value) {
			const previousInput = document.querySelectorAll('input')[index - 1] as HTMLInputElement;
			if (previousInput) {
				previousInput.focus();
			}
		}
		buildOTP();
	};

	const onpaste = async (e: ClipboardEvent) => {
		const pastedData =
			e?.clipboardData?.getData('text') || (await navigator.clipboard.readText()) || '';
		for (let i = 0; i < pastedData.length; i++) {
			if (i < 6) {
				document.querySelectorAll('input')[i].value = pastedData[i];
			}
		}
		const lastInput = document.querySelectorAll('input')[5] as HTMLInputElement;
		lastInput.focus();
		// Prevent the default paste behavior
		e.preventDefault();

		buildOTP();
	};

	const buildOTP = () => {
		let otp = '';
		document.querySelectorAll('input').forEach((input) => {
			otp += (input as HTMLInputElement).value;
		});
		state.otp = otp;
		state.valid = otp.length === 6 && /^\d+$/.test(otp);
	};
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="card bg-base-200 flex max-w-lg flex-col gap-4 p-4">
		<h1 class="text-2xl font-bold">One Time Password</h1>
		<div>
			An email has been sent to your email address with a one time password. Please enter it below
			to continue.
		</div>
		<div class="flex items-center justify-center gap-2">
			<Icon icon="material-symbols:lock" width={32} height={32} />
			{#each Array(6) as _, i}
				<input
					type="text "
					maxlength="1"
					oninput={(e) => oninput(e, i)}
					{onpaste}
					class="input h-12 w-12 text-center text-xl font-bold {state.otp[i]
						? ' input-success'
						: ''}"
				/>
			{/each}
			<div class="relative flex w-12 items-center justify-center">
				<div
					class="absolute z-10 {state.valid
						? 'rotate-0 opacity-100'
						: 'rotate-90 opacity-0'} transition-all duration-300"
				>
					<Icon
						icon="material-symbols:check-circle"
						width={32}
						height={32}
						color="var(--color-success)"
					/>
				</div>
				<Icon class="absolute" icon="material-symbols:circle-outline" width={32} height={32} />
			</div>
		</div>
	</div>
</div>

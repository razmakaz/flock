<script lang="ts">
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	const state = $state({
		email: '',
		emailValid: false,
		password: '',
		passwordValid: false
	});

	let isValid = $derived(state.emailValid && state.passwordValid);

	let form: HTMLFormElement;

	onMount(() => {
		if (PUBLIC_ENVIRONMENT === 'dev') {
			state.email = 'asdf@asdf.com';
			state.emailValid = true;
			state.password = 'TestPassword123!';
			state.passwordValid = true;
		}

		enhance(form, (data) => {
			console.log(data);
			// Handle form submission here
			return false; // Prevent default form submission
		});
	});
</script>

<div class="relative">
	<div class="absolute -top-10 -left-5 flex items-center justify-center">
		<div class="min-h-20 min-w-20 rounded-full bg-black"></div>
	</div>
	<div class="absolute -right-5 -bottom-10 flex items-center justify-center">
		<div class="min-h-20 min-w-20 rounded-full bg-black"></div>
	</div>
	<div class="card bg-base-200 flex w-md flex-col gap-4 p-4">
		<div>
			<h1 class="text-2xl font-bold">Login</h1>
			<h4 class="text-lg">Get started</h4>
		</div>
		<form method="POST" bind:this={form}>
			<TextInput
				bind:value={state.email}
				name="email"
				label={'Email'}
				required={true}
				bind:isValid={state.emailValid}
				validation={(input: string) => {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
				}}
				validationError={'Invalid email address'}
			/>

			<TextInput
				bind:value={state.password}
				name="password"
				label={'Password'}
				type="password"
				bind:isValid={state.passwordValid}
				required={true}
				validation={(input: string) => {
					return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/.test(input);
				}}
				validationError={'Invalid password'}
			/>

			<button class="btn btn-ghost text-left text-sm"> Forgot Password? </button>

			<button disabled={!isValid} class="btn btn-primary" onclick={onsubmit}>Login</button>
		</form>

		<button class="btn btn-secondary" onclick={() => goto('/register')}>Create Account</button>
		<div class="divider my-0">OR</div>
		<div class="text-center">Log In With Another Account</div>
	</div>
</div>

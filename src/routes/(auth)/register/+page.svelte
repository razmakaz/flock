<script lang="ts">
	import { slide } from 'svelte/transition';
	import PocketBase, { ClientResponseError } from 'pocketbase';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_ENVIRONMENT, PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import CRAPI from '$lib/CRAPI';

	const state = $state({
		username: '',
		usernameValid: false,
		email: '',
		emailValid: false,
		password: '',
		passwordValid: false,
		passwordConfirm: '',
		passwordConfirmValid: false,
		errors: [] as string[]
	});

	let isValid = $derived(state.emailValid && state.passwordValid && state.passwordConfirmValid);

	const onsubmit = (e: Event) => {
		e.preventDefault();
		state.errors = [];
		if (!isValid) {
			CRAPI.notify.trigger('Form not valid.', { type: 'toast', style: 'error' });
			return;
		}

		console.log(state.email, state.password);
		CRAPI.api
			.post(
				'',
				JSON.stringify({
					email: state.email,
					password: state.password,
					passwordConfirm: state.passwordConfirm
				})
			)
			.then((res) => {
				console.log(res);
				if (res.errors) {
					state.errors.push(...res.errors);
					return null;
				}
				// Handle successful registration here
				goto('/login');
				CRAPI.notify.trigger('Registration successful! Please login.', {
					type: 'toast',
					style: 'success'
				});
			})
			.catch((err: ClientResponseError) => {
				console.error(err);
				CRAPI.notify.trigger('Registration failed. Please try again.', {
					type: 'toast',
					style: 'error'
				});
			});
		return false;
	};

	onMount(() => {
		if (PUBLIC_ENVIRONMENT === 'dev') {
			// Generate random string
			const randomString = Math.random().toString(36).substring(2, 7);

			// state.email = randomString + '@test.me';
			state.email = '1234@asdf.com';
			state.emailValid = true;
			state.password = 'TestPassword123!';
			state.passwordValid = true;
			state.passwordConfirm = 'TestPassword123!';
			state.passwordConfirmValid = true;
		}
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

		<TextInput
			bind:value={state.email}
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
			label={'Password'}
			type="password"
			bind:isValid={state.passwordValid}
			required={true}
			validation={(input: string) => {
				return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/.test(input);
			}}
			validationError={'Invalid password'}
		/>

		<TextInput
			bind:value={state.passwordConfirm}
			label={'Confirm Password'}
			type="password"
			bind:isValid={state.passwordConfirmValid}
			required={true}
			validation={() => {
				return state.password === state.passwordConfirm;
			}}
			validationError={'Passwords do not match'}
		/>

		{#if state.errors.length > 0}
			<div transition:slide={{ axis: 'y' }} class="alert alert-error">
				<ul>
					{#each state.errors as error}
						<li>{error}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<button disabled={!isValid} class="btn btn-primary" onclick={onsubmit}>Register</button>
		<div class="divider my-0">Already have an account?</div>
		<button class="btn btn-secondary" onclick={() => goto('/login')}>Login</button>
		<div class="divider my-0">OR</div>
		<div class="text-center">Sign Up With Another Account</div>
	</div>
</div>

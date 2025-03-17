<script lang="ts">
	import PocketBase from 'pocketbase';
	import TextInput from './TextInput.svelte';

	const state = $state({
		email: '',
		password: ''
	});

	const onsubmit = (e: Event) => {
		e.preventDefault();
		const pb = new PocketBase();
		pb.collection('users')
			.authWithPassword(state.email, state.password)
			.then((res) => {
				console.log('Logged in', res);
			})
			.catch((err) => {
				console.error('Error logging in', err);
			});
	};
</script>

<form class="flex flex-col gap-4" {onsubmit}>
	<TextInput
		bind:value={state.email}
		label={'Email'}
		required={true}
		validation={(input: string) => {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
		}}
		validationError={'Invalid email address'}
	/>

	<TextInput
		bind:value={state.password}
		label={'Password'}
		type="password"
		required={true}
		validation={(input: string) => {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
		}}
		validationError={'Invalid email address'}
	/>

	<button class="btn btn-primary" type="submit">Login</button>
</form>

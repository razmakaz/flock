<script lang="ts">
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { emailRegex } from '$lib/regex';
	import { page } from '$app/state';
	import { t } from '$lib/translations.svelte';

	const state = $state({
		email: page.url.searchParams.get('email') || '',
		emailValid: false
	});

	let isValid = $derived(state.emailValid);

	const providers = [
		{
			id: 'google',
			label: 'Google',
			icon: 'logos:google-icon',
			color: '#4285F4',
			enabled: false
		},
		{
			id: 'github',
			label: 'GitHub',
			icon: 'logos:github-icon',
			color: '#333',
			enabled: false
		},
		{
			id: 'discord',
			label: 'Discord',
			icon: 'logos:discord-icon',
			color: '#7289DA',
			enabled: true
		},
		{
			id: 'microsoft',
			label: 'Microsoft',
			icon: 'logos:microsoft-icon',
			color: '#F25022',
			enabled: false
		}
	];

	const avaiableProviders = providers.filter((provider) => provider.enabled);

	const handleSubmit = async (provider = 'email') => {
		if (!isValid) return;

		// Perform login logic here
		const payload = {
			email: state.email,
			provider: provider
		};

		const res = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}).then((res) => res.json());

		console.log(res);

		const isProvider = providers.find((p) => p.id === provider);
		if (isProvider) {
			// Handle opening the provider's login page
			window.open(res.data.url);
		}

		if (!res.success) {
			// Handle login error
			console.error('Login failed');
			return;
		}
		// Redirect to app or dashboard after successful login
	};

	onMount(() => {
		if (PUBLIC_ENVIRONMENT === 'dev') {
			if (!state.email) {
				const idempotency = Math.random().toString(36).substring(2, 8);
				state.email = `thejessekoch+${idempotency}@gmail.com`;
				state.emailValid = true;
			} else {
				state.emailValid = emailRegex.test(state.email);
			}
		}
	});
</script>

<svelte:head>
	<title>{$t('auth.login.title')}</title>
	<meta name="description" content="Login to your account" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#snippet oauthButton({
	id,
	label,
	icon,
	color
}: {
	id: string;
	label: string;
	icon: string;
	color: string;
})}
	<div class="flex items-center gap-2">
		<button
			class="btn btn-outline w-full"
			style="border: 2px solid {color};"
			disabled={!state.emailValid}
			onclick={() => handleSubmit(id)}
		>
			<Icon {icon} width={18} height={18} />
			<span>{label}</span>
		</button>
	</div>
{/snippet}

<div class="relative">
	<div class="card bg-base-200 flex w-md flex-col gap-4 p-4">
		<div>
			<h1 class="text-2xl font-bold">{@html $t('auth.login.title')}</h1>
			<p class="text-sm">{@html $t('auth.login.subtitle')}</p>
		</div>
		<TextInput
			bind:value={state.email}
			name="email"
			label={$t('auth.login.email')}
			required={true}
			bind:isValid={state.emailValid}
			validation={(input: string) => {
				return emailRegex.test(input);
			}}
			validationError={$t('auth.login.emailInvalid')}
		/>

		<button disabled={!isValid} class="btn btn-primary" onclick={() => handleSubmit()}>
			{$t('auth.login.action')}
		</button>

		<div class="divider my-0">{$t('common.separatorOr')}</div>
		<div class="flex flex-col gap-4">
			{#each avaiableProviders as provider}
				{@render oauthButton(provider)}
			{/each}
		</div>
	</div>
</div>

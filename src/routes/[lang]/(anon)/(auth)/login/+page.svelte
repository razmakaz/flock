<script lang="ts">
	import PocketBase from 'pocketbase';
	import { slide } from 'svelte/transition';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import { PUBLIC_PB_URL } from '$env/static/public';
	import Icon from '@iconify/svelte';
	import { emailRegex } from '$lib/regex';
	import { page } from '$app/state';
	import { t } from '$lib/translations.svelte';
	import type IReply from '$lib/@types/IReply';

	const state = $state({
		email: page.url.searchParams.get('email') || '',
		emailValid: false,
		loading: false,
		success: false,
		messages: [] as string[],
		errors: [] as string[]
	});

	let isValid = $derived(state.emailValid);
	let isDisabled = $derived(state.loading || state.success);

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

	const availableProviders = providers.filter((provider) => provider.enabled);

	const handleSubmit = async () => {
		const data = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: state.email
			})
		}).then((res) => res.json() as IReply);

		console.log(data);
		state.success = data.success || false;
		state.errors = data.errors || [];
		state.messages = data.messages || [];
	};

	const handleOauth = async (provider: string) => {
		const pb = new PocketBase(PUBLIC_PB_URL);
		const redirectURI = `${window.location.origin}/login/callback`;
		console.log(redirectURI);
		const result = await pb.collection('users').authWithOAuth2({
			provider: provider,
			redirectUrl: redirectURI
		});

		pb.authStore.save(result.token, result.record);
		const payload = {
			token: result.token,
			record: result.record
		};

		const res = await fetch('', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}).then((res) => res.json());

		if (res.success) {
			window.location.href = '/';
		} else {
			state.success = false;
			state.messages = [];
			state.errors = res.errors || [];
		}

		console.log('res', res);
	};
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
			onclick={() => handleOauth(id)}
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
		<!-- <TextInput
			bind:value={state.email}
			name="email"
			label={$t('auth.login.email')}
			required={true}
			disabled={isDisabled}
			bind:isValid={state.emailValid}
			validation={(input: string) => {
				return emailRegex.test(input);
			}}
			validationError={$t('auth.login.emailInvalid')}
		/> -->
		<div class="card bg-primary/50 p-4">
			<h4>Email Login is Currently Disabled</h4>
			<p>Please use one of our providers.</p>
		</div>

		{#if !state.success}
			<button
				transition:slide={{ axis: 'y', duration: 222 }}
				disabled={!isValid}
				class="btn btn-primary"
				onclick={() => handleSubmit()}
			>
				{$t('auth.login.action')}
			</button>
			<div class="divider my-0">{$t('common.separatorOr')}</div>
			<div class="flex flex-col gap-4">
				{#each availableProviders as provider}
					{@render oauthButton(provider)}
				{/each}
			</div>
		{:else}
			{#each state.messages as message}
				<div transition:slide={{ axis: 'y', duration: 222 }} class="alert alert-success">
					{message}
				</div>
			{/each}
			{#each state.errors as error}
				<div transition:slide={{ axis: 'y', duration: 222 }} class="alert alert-error">{error}</div>
			{/each}
			<button class="btn btn-primary" onclick={() => window.location.reload()}> Retry </button>
		{/if}
	</div>
</div>

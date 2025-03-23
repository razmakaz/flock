<script lang="ts">
	import { goto } from '$app/navigation';
	import CRAPI from '$lib/CRAPI';
	import { emailRegex } from '$lib/regex';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';

	let input = $state('');
	const disabled = $derived(!emailRegex.test(input));

	const handleSubmit = () => {
		if (disabled) {
			CRAPI.notify.trigger('Invalid email address', { style: 'error' });
			return;
		}
		const payload = {
			email: input
		};
		const url = new URL(window.location.href);
		url.pathname = '/login';
		url.searchParams.append('email', input);
		goto(url.href);
	};
</script>

<section id="hero" class="hero flex justify-center" style="min-height: 70vh;">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<img src="https://placehold.co/600x400/EEE/31343C" alt="placeholder" />
		<div>
			<h1
				class="floc inline-block bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-6xl font-bold text-transparent"
			>
				{$t('landing.hero.title')}
			</h1>
			<h2 class="py-6 text-3xl">
				{@html $t('landing.hero.subtitle')}
			</h2>
			<div class="flex justify-center">
				<div class="join">
					<div>
						<label class="input validator join-item w-full">
							<Icon icon="ic:baseline-email" width={24} height={24} />
							<input
								bind:value={input}
								name="email"
								class=" ring-transparent"
								type="email"
								placeholder="email@site.com"
								required
							/>
						</label>
						<div class="validator-hint hidden w-full">{$t('landing.hero.validator')}</div>
					</div>
					<button onclick={handleSubmit} {disabled} class="btn btn-neutral join-item"
						>{$t('landing.hero.cta')}</button
					>
				</div>
			</div>
		</div>
	</div>
</section>

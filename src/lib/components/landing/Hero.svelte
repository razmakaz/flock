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

<section class="hero flex max-w-svw justify-center">
	<div class="hero-content relative flex flex-col">
		<div
			class="rounded-b-field absolute
			inset-0
			-translate-y-1/2
			 bg-gradient-to-r
			from-indigo-600 to-violet-600 opacity-20
			blur-[100px] transition-all duration-1000
			ease-out
		"
			style="height: 100vh;"
		></div>

		<div
			class="z-10 flex flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:py-24"
		>
			<h1
				class="floc inline-block bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-5xl font-bold text-transparent"
			>
				{$t('landing.hero.title')}
			</h1>
			<h2 class="py-6 text-center text-2xl tracking-wide">
				{@html $t('landing.hero.subtitle')}
			</h2>
			<div class="flex justify-center">
				<div class="join join-vertical lg:join-horizontal">
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
		<div class="relative w-full">
			<div
				class="absolute w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
				style="height: 2px;"
			></div>
		</div>
		<div class="relative z-10 p-8">
			<div class="mockup-browser border-base-300 bg-base-100 w-full border">
				<div class="mockup-browser-toolbar">
					<div class="input">https://www.flocit.app</div>
				</div>
				<img src="https://placehold.co/1280x720/aaa/31343C" class="" alt="placeholder" />
			</div>
		</div>
	</div>
</section>

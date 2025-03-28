<script lang="ts">
	import { goto } from '$app/navigation';
	import CRAPI from '$lib/CRAPI';
	import { emailRegex } from '$lib/regex';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';
	import TimesheetsDemo from '../demos/TimesheetsDemo.svelte';
	import DemoContainer from '../demos/DemoContainer.svelte';

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

<section class="hero relative flex max-w-svw justify-center">
	<div class="absolute inset-0 flex -translate-y-10 items-center justify-center mix-blend-lighten">
		<iframe
			src="https://my.spline.design/discover-39661a5ea472992df13239fc498c95a2/"
			frameborder="0"
			class="w-full mix-blend-lighten"
			style="height: 140vh; width: 90vw;"
		></iframe>
	</div>
	<div class="hero-content relative z-10 flex flex-col">
		<div
			class="rounded-b-field absolute
			 inset-0
			-translate-y-1/2
			bg-gradient-to-r
			 from-indigo-600
			to-violet-600 opacity-20 blur-2xl
			 transition-all duration-1000
			ease-out
		"
			style="height: 100vh;"
		></div>

		<div
			class="z-10 flex flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:py-24"
		>
			<span class="bg-base-100 relative inline rounded-md p-4">
				<div
					class="absolute -z-10 rounded-md bg-gradient-to-r from-indigo-400 to-violet-500"
					style="inset: 4px -4px;"
				></div>
				<h1
					class="floc inline-block bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-5xl font-bold text-transparent"
				>
					{$t('landing.hero.title')}
				</h1>
			</span>
			<h2 class="py-6 text-center text-2xl leading-12 tracking-wide">
				<span class="bg-base-100 inline rounded-md p-2">
					{@html $t('landing.hero.subtitle')}
				</span>
			</h2>
			<div class="flex justify-center">
				<div class="join join-vertical lg:join-horizontal bg-neutral rounded-sm">
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
					<button onclick={handleSubmit} {disabled} class="btn btn-primary join-item"
						>{$t('landing.hero.cta')}</button
					>
				</div>
			</div>
		</div>

		<div class="relative z-10 p-8">
			<DemoContainer />
		</div>
	</div>
</section>

<script lang="ts">
	import { goto } from '$app/navigation';
	import CRAPI from '$lib/CRAPI';
	import { emailRegex } from '$lib/regex';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';
	import TimesheetsDemo from '../demos/TimesheetsDemo.svelte';
	import DemoContainer from '../demos/DemoContainer.svelte';
	import { onMount } from 'svelte';
	import { Gradient } from '../stripebg/Gradient';
	import App from '$lib/stores/App';

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

	onMount(() => {
		const darkGradient = new Gradient();
		const lightGradient = new Gradient();
		darkGradient.initGradient('#dark-bg-canvas');
		lightGradient.initGradient('#light-bg-canvas');
		console.log($App.theme);
	});
</script>

<section class="hero relative flex max-w-svw justify-center">
	<canvas
		class="absolute inset-0 -translate-y-1/2 {$App.theme === 'dark' ? '' : 'hidden'} "
		id="dark-bg-canvas"
		style="width: 100vw;"
	></canvas>
	<canvas
		class="absolute inset-0 -translate-y-1/2 {$App.theme === 'dark' ? 'hidden' : ''} "
		id="light-bg-canvas"
		style="width: 100vw;"
	></canvas>
	<div class="hero-content relative z-20 flex flex-col">
		<div class="relative z-10">
			<div
				class="z-10 flex flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:py-24"
			>
				<h1 class="floc inline-block text-6xl font-black">
					{$t('landing.hero.title')}
				</h1>
				<h2 class="py-6 text-center text-2xl leading-12 tracking-wide">
					{@html $t('landing.hero.subtitle')}
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
		</div>
		<div class="relative z-10 p-8">
			<DemoContainer />
		</div>
	</div>
</section>

<style>
	#dark-bg-canvas {
		--gradient-color-1: #3b82f6; /* Tailwind CSS blue-500 */
		--gradient-color-2: #5e46a8;
		--gradient-color-3: #5c7abf;
		--gradient-color-4: #000000;

		/* Show only the triangle area */
		mask-image: linear-gradient(165deg, black 85%, transparent 65%);
		mask-size: 100% 100%;
		mask-repeat: no-repeat;

		/* For WebKit-based browsers */
		-webkit-mask-image: linear-gradient(170deg, black 50%, transparent 80%);
		-webkit-mask-size: 100% 100%;
		-webkit-mask-repeat: no-repeat;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
	}

	#light-bg-canvas {
		--gradient-color-1: #3b82f6; /* Tailwind CSS blue-500 */
		--gradient-color-2: #5e46a8;
		--gradient-color-3: #5c7abf;
		--gradient-color-4: #ffffff;

		/* Show only the triangle area */
		mask-image: linear-gradient(165deg, black 85%, transparent 65%);
		mask-size: 100% 100%;
		mask-repeat: no-repeat;

		/* For WebKit-based browsers */
		-webkit-mask-image: linear-gradient(170deg, black 50%, transparent 80%);
		-webkit-mask-size: 100% 100%;
		-webkit-mask-repeat: no-repeat;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>

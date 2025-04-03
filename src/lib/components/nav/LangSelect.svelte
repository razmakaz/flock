<script lang="ts">
	import Icon from '@iconify/svelte';
	import { t, locale } from '$lib/translations.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const languages = [
		{ code: 'en', icon: 'circle-flags:lang-en-us', visible: true },
		{ code: 'es', icon: 'circle-flags:lang-es', visible: true },
		{ code: 'fr', icon: 'circle-flags:lang-fr', visible: false },
		{ code: 'de', icon: 'circle-flags:lang-de', visible: false },
		{ code: 'ja', icon: 'circle-flags:lang-ja', visible: false },
		{ code: 'ko', icon: 'circle-flags:lang-ko', visible: false },
		{ code: 'it', icon: 'circle-flags:lang-it', visible: false },
		{ code: 'ru', icon: 'circle-flags:lang-ru', visible: false },
		{ code: 'pt', icon: 'circle-flags:lang-pt', visible: false },
		{ code: 'zh', icon: 'circle-flags:lang-zh', visible: false }
	];

	$: selectedLang = languages.find((lang) => lang.code === $locale) || languages[0];

	const setLocale = async (lang: string) => {
		console.log('Setting locale to', lang);
		const path = `/${lang}/lang`;
		console.log(path);
		await fetch(path, {
			method: 'POST'
		});
		window.location.reload();
	};
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<label tabindex="0" class="btn btn-ghost btn-sm flex items-center gap-2">
		<Icon icon={selectedLang.icon} width={18} height={18} />
		<span class="text-lg uppercase">{selectedLang.code}</span>
	</label>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box w-52 p-2 shadow">
		{#each languages.filter((item) => item.visible) as item}
			<li>
				<button
					class="btn btn-ghost grid w-full grid-cols-[auto_1fr] items-center gap-2 text-left"
					onclick={() => setLocale(item.code)}
				>
					<span class="mr-2">
						<Icon icon={item.icon} width={18} height={18} />
					</span>
					{$t(`lang.${item.code}`)}
				</button>
			</li>
		{/each}
	</ul>
</div>

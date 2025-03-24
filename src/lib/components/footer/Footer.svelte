<script>
	import Icon from '@iconify/svelte';
	import { t } from '$lib/translations.svelte';

	$: footerLinks = [
		{
			title: $t('landing.footer.resourcesTitle'),
			links: [{ title: $t('landing.footer.helpCenter'), link: '/help' }]
		},
		{
			title: $t('landing.footer.solutionsTitle'),
			// TODO: Add solutions
			links: [{ title: $t('landing.footer'), link: '/' }]
		},
		{
			title: $t('landing.footer.featuresTitle'),
			// TODO: Add links to features
			links: [
				{ title: $t('landing.footer.invoicing'), link: '/' },
				{ title: $t('landing.footer.timeEntry'), link: '/' },
				{ title: $t('landing.footer.crossFeatureTools'), link: '/' },
				{ title: $t('landing.footer.integrations'), link: '/' }
			]
		},
		{
			title: $t('landing.footer.productTitle'),
			// TODO: Add products
			links: [{ title: $t('landing.footer'), link: '/' }]
		}
	];

	const currentYear = new Date().getFullYear();
</script>

{#snippet FooterSection(section)}
	<div class="flex flex-col gap-2">
		<h5 class="text-lg">{section.title}</h5>
		<ul class="flex flex-col gap-2">
			{#each section.links as item}
				{@render SectionItems(item)}
			{/each}
		</ul>
	</div>
{/snippet}

{#snippet SectionItems(item)}
	<li>
		<a href={item.link} class="cursor-pointer">{item.title}</a>
	</li>
{/snippet}

<footer
	class="bg-base-200 text-base-content flex h-fit w-full items-center justify-center px-4 py-16"
>
	<div class="mx-auto flex max-w-7xl flex-col gap-12 md:w-full">
		<div class="flex items-center justify-between">
			<div>
				<h4 class="text-3xl">{$t('common.app')}</h4>
			</div>
		</div>

		<div class="w-full border"></div>

		<div class="flex flex-col justify-between gap-6 md:flex-row">
			{#each footerLinks as section}
				{@render FooterSection(section)}
			{/each}
		</div>

		<div class="w-full border"></div>

		<div class="flex flex-col justify-between gap-4 md:flex-row">
			<p class="">
				{$t('common.app')} &#169; {currentYear}. {$t('landing.footer.rightsReserved')}
			</p>

			<ul class="flex w-fit flex-col gap-4 md:flex-row">
				<li>
					<a href="/">{$t('landing.footer.terms')}</a>
				</li>
				<li>
					<a href="/">{$t('landing.footer.privacy')}</a>
				</li>
				<li>
					<a href="/">{$t('landing.footer.cookies')}</a>
				</li>
			</ul>
		</div>
	</div>
</footer>

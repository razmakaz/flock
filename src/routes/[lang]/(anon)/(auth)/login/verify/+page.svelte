<script>
	import { t } from '$lib/translations.svelte';
</script>

<div class="relative">
	<div class="card bg-base-200 flex w-md flex-col gap-4 p-4">
		<div>
			<h1 class="text-2xl font-bold">{@html $t('auth.login.success.title')}</h1>
			<p class="text-sm">{@html $t('auth.login.success.subtitle')}</p>
		</div>
		<div>{$t('auth.login.success.message')}</div>
		<a class="btn btn-primary" href="/login">
			{$t('auth.login.success.continue')}
		</a>
	</div>
</div>

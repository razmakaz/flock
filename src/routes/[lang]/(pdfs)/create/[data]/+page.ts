import { get } from 'svelte/store';
import { t } from '$lib/translations.svelte';

export const load = async ({ params }) => {
	const data = params.data;
	const invoiceData = JSON.parse(atob(data));

	const translate = (key: string) => {
		return get(t)(key);
	};

	console.log('invoiceData', invoiceData);

	return {
		invoiceData,
		translate,
		t
	};
};

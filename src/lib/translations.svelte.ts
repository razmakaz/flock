import { writable } from 'svelte/store';

export const locale = writable('en');
export const dictionary = writable<Map<string, string>>(new Map());

const flatten = (obj: any, prefix = ''): any => {
	const result: any = {};
	for (const key in obj) {
		const pre = prefix.length ? prefix + '.' : '';
		if (typeof obj[key] === 'object') {
			Object.assign(result, flatten(obj[key], pre + key));
		} else {
			result[pre + key] = obj[key];
		}
	}
	return result;
};

locale.subscribe((value) => {
	import(`./i18n/${value}.json`)
		.then((data) => {
			const flattenedData = flatten(data);
			const dictMap = new Map(Object.entries(flattenedData));
			dictionary.set(dictMap as Map<string, string>);
			t.update(() => translate);
		})
		.catch((error) => {
			console.error('Error loading dictionary:', error);
		});
});

// TODO: Implement a replacer for placeholders in translations
const translate = (key: string) => {
	let translated = '';
	dictionary.subscribe((dict) => {
		translated = dict.get(key) || key;
	});
	return translated;
};

/**
 * Translate a given key using the current locale's dictionary.
 * @param key The key to translate.
 * @returns The translated string or the key if not found.
 * @example
 * ```ts
 * import { t } from '$lib/translations.svelte';
 * const translatedText = t('hello');
 * ```
 * @see `src/lib/i18n` for available translation dictionaries.
 */
export const t = writable(translate);

export const setLocale = (newLocale: string) => {
	locale.set(newLocale);
};

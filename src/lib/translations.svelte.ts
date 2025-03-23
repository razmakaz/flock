import { writable } from 'svelte/store';
import en from './i18n/en.js';
import es from './i18n/es.js';
// import fr from './i18n/fr.js';
// import it from './i18n/it.js';
// import pt from './i18n/pt.js';
// import de from './i18n/de.js';
// import nl from './i18n/nl.js';
// import ru from './i18n/ru.js';
// import sv from './i18n/sv.js';
// import tr from './i18n/tr.js';
// import ja from './i18n/ja.js';
// import zh from './i18n/zh.js';
// import ko from './i18n/ko.js';
// import ar from './i18n/ar.js';

export const locale = writable('en');
export const dictionary = writable<Map<string, string>>(new Map());

const locales: { [key: string]: any } = {
	en,
	es
	// fr,
	// it,
	// pt,
	// de,
	// nl,
	// ru,
	// sv,
	// tr,
	// ja,
	// zh,
	// ko,
	// ar
};

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

const translate = (
	key: string,
	options?: {
		replacers?: {
			[key: string]: string;
		};
	}
) => {
	let translated = '';
	dictionary.subscribe((dict) => {
		translated = dict.get(key) || key;
	});

	// Handle replacers
	if (options?.replacers) {
		// Replace placeholders in the translated string
		Object.keys(options.replacers).forEach((placeholder) => {
			// Create a regex to match the placeholder
			const regex = new RegExp(`{{${placeholder}}}`, 'g');

			// Replace the placeholder with the corresponding value
			translated = translated.replace(regex, options.replacers[placeholder]);
		});
	}
	return translated.trim();
};

/**
 * Translate a given key using the current locale's dictionary.
 * @param key The key to translate.
 * @returns The translated string or the key if not found.
 * @example
 * ```ts
 * import { t } from '$lib/translations.svelte';
import { default } from './i18n/es';
 * const translatedText = t('hello');
 * ```
 * @see `src/lib/i18n` for available translation dictionaries.
 */
export const t = writable(translate);

locale.subscribe((value: string) => {
	const data = locales[value] || locales.en;
	if (data) {
		const flattenedData = flatten(data);
		const dictMap = new Map(Object.entries(flattenedData));
		dictionary.set(dictMap as Map<string, string>);
		t.update(() => translate);
	} else {
		console.error('Error loading dictionary: Locale not found');
	}
});

export const setLocale = (newLocale: string) => {
	locale.set(newLocale);
};

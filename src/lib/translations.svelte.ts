// src/lib/translations.ts
import { type Writable, writable } from "svelte/store";
import type { Dictionary } from "./i18n/i18n";
import { get } from "svelte/store";

// The current language (e.g. 'en', 'es')
export const locale: Writable<string> = writable("en");

// The flat key-value dictionary
export const dictionary: Writable<Map<string, string | (() => string)>> =
	writable(new Map());

// A reactive translation function
const translate = (
	key: string,
	options?: {
		replacers?: Record<string, string>;
	},
): string => {
	let translated = "";
	const dict = get(dictionary);
	const raw = dict.get(key);

	if (!raw) return key;

	translated = typeof raw === "function" ? raw() : raw;

	if (options?.replacers) {
		for (const [placeholder, value] of Object.entries(options.replacers)) {
			translated = translated.replace(
				new RegExp(`{{${placeholder}}}`, "g"),
				value,
			);
		}
	}

	return translated.trim();
};

// A writable wrapper around the `t` function
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

// Flatten nested dictionary objects into dot notation
export const flatten = (
	obj: any,
	prefix = "",
) => {
	const result: any = {};
	for (const key in obj) {
		const pre = prefix ? prefix + "." : "";
		if (
			typeof obj[key] === "object" && !Array.isArray(obj[key]) &&
			obj[key] !== null
		) {
			Object.assign(result, flatten(obj[key], pre + key));
		} else {
			result[pre + key] = obj[key];
		}
	}
	return result;
};

// Set the current dictionary
export const setDictionary = (lang: string, dictObj: Dictionary) => {
	locale.set(lang);
	const flat = flatten(dictObj);
	const map = new Map(Object.entries(flat));
	dictionary.set(map);
	t.set(translate);
};

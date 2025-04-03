import { loadDictionary } from "$lib/i18n/i18n";
import { flatten, locale, setDictionary } from "$lib/translations.svelte.js";

export const load = async ({ params }) => {
    const lang = params.lang || "en";

    const dictionary = await loadDictionary(lang);
    setDictionary(lang, dictionary);

    return {
        lang,
    };
};

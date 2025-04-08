import { loadDictionary } from "$lib/i18n/i18n";
import { setDictionary } from "$lib/translations.svelte.js";

export const load = async ({ data, params }) => {
    const lang = params.lang || "en";

    const dictionary = await loadDictionary(lang);
    setDictionary(lang, dictionary);

    return {
        session: data.session,
        lang,
    };
};

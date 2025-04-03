export type Dictionary = {
    [key: string]: string | Dictionary;
};

export const loadDictionary = async (lang: string): Promise<Dictionary> => {
    try {
        const module = await import(`./${lang}.ts`);
        return module.default;
    } catch (e) {
        console.warn(
            `Missing dictionary for "${lang}", falling back to English.`,
        );
        const fallback = await import("./en.ts");
        return fallback.default;
    }
};

export const changeLanguage = async (lang: string) => {
    const response = await fetch("/api/lang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lang }),
    });

    if (!response.ok) {
        throw new Error("Failed to change language");
    }
}
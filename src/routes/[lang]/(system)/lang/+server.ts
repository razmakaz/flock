import { setLangCookie } from "$lib/server/cookies.js";
import Reply from "$lib/server/Reply.js";

export const POST = async ({ cookies, params }) => {
    const { lang } = params;
    console.log("lang", lang);

    if (!lang) {
        return Reply({
            status: 400,
            errors: ["Missing lang"],
        });
    }

    setLangCookie(cookies, lang);

    return Reply({
        messages: ["Lang set"],
    });
};

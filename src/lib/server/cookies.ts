import type { Cookies } from "@sveltejs/kit";

export const setLangCookie = (cookies: Cookies, lang: string) => {
    cookies.set("lang", lang, {
        sameSite: "lax",
        secure: false,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
        path: "/",
    });
};

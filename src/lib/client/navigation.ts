import { goto } from "$app/navigation";
import { page } from "$app/state";

export const nav = (path: string, opts = {}) => {
	const lang = page.params.lang || "en";

	if (!path.startsWith("/")) path = "/" + path;
	if (!path.startsWith(`/${lang}/`)) {
		path = `/${lang}${path}`;
	}

	return goto(path, opts);
};

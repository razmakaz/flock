export const load = async ({ locals, fetch, url }) => {
	const theme = await fetch("/theme").then((res) => res.text());

	const { lang } = locals;

	return {
		lang,
		theme,
	};
};

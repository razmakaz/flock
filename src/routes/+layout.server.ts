export const load = async (event) => {
	const locals = event.locals || {};
	const session = locals.session || {};

	const theme = await event.fetch('/theme').then((res) => res.text());

	return {
		theme,
		session
	};
};

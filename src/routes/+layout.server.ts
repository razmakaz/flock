export const load = async (event) => {
	const locals = event.locals || {};

	const theme = await event.fetch('/theme').then((res) => res.text());

	const session = locals.session || {};
	return {
		theme,
		session
	};
};

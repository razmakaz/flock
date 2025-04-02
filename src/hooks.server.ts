import { PUBLIC_PB_URL } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(PUBLIC_PB_URL);
	pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	event.locals.pocketbase = pb;

	const response = await resolve(event);
	return response;
};

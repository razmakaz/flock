import god from "$lib/server/god.js";
import login from "$lib/server/login.js";

export const POST = async ({ request, locals, url }) => {
    const data = await request.json();

    const { email } = data;

    return await login({ email });
};

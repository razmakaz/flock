import type { HandleClientError } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";

export const handleError: HandleClientError = async (
    { error, event, status, message },
) => {
    const errorId = crypto.randomUUID();

    Sentry.captureException(error, {
        extra: { event, errorId, status, message },
    });

    console.log(`Error ID: ${errorId}`);
    console.error(error);

    return {
        message: "Whoops!",
        errorId,
    };
};

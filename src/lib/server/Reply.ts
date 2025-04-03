import type IReply from "$lib/@types/IReply";

export default ({
    success = true,
    data = [],
    messages = [],
    errors = [],
    status = 200,
}: IReply) => {
    return new Response(
        JSON.stringify({
            success,
            data,
            messages,
            errors,
        }),
        {
            status,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
};

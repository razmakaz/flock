export default ({
    success = true,
    data = [],
    messages = [],
    errors = [],
    status = 200,
}: {
    success?: boolean;
    data?: any;
    messages?: string[];
    errors?: string[];
    status?: number;
}) => {
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

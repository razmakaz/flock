import { ClientResponseError } from "pocketbase";
import god from "./god";
import Reply from "./Reply";

export default async ({ email }: {
    email: string;
}) => {
    let user = null;
    try {
        user = await god.collection("users").getOne(`email=${email}`);
    } catch (e) {
        if (e instanceof ClientResponseError && e.status === 404) {
            // Do nothing
        } else {
            console.log(e);
            return Reply({
                success: false,
                errors: ["An error occurred."],
            });
        }
    }

    // If the user doesn't exist, create them
    if (!user) {
        const password = Math.random().toString(36).slice(2);
        const createdUser = await god.collection("users").create({
            email,
            verified: false,
            password: password,
            passwordConfirm: password,
        });
        console.log("Created user", createdUser);
    }

    // Send the OTP
    await god.collection("users").requestOTP(email);

    return Reply({
        success: true,
        messages: ["Check your email for a link to log in."],
    });
};

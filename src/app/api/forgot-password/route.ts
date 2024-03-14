import { connectToDB } from "@/lib/mongoClient";
import OTP from "@/models/otp";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import { totp } from "otplib";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/nodemailer";

export const POST = async (req: Request, res: Response) => {
    const { email } = await req.json();

    connectToDB();
    const user = await Student.findOne({ email: email.toLowerCase() });
    if (user) {
        const { resetToken, resetTokenExpiry } = await createResetPasswordToken(
            email
        );
        console.log(resetToken, resetTokenExpiry);
        try {
            const response = await Student.findOneAndUpdate(
                { email: email.toLowerCase() },
                {
                    password_reset_token: resetToken,
                    password_reset_token_expiry: resetTokenExpiry,
                }
            );

            console.log(response);
        } catch (e) {
            console.log(e);
        }
        // await sendEmail({
        //     to: email,
        //     subject: "Reset Password",
        //     text:
        //         "Please click the link to reset your password " +
        //         process.env.BASE_URL +
        //         "/reset-password/" +
        //         resetToken,
        // });

        return NextResponse.json({ message: "Email Sent" }, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
};

const createResetPasswordToken = async (email: string) => {
    const resetToken = await bcrypt.hash(email, 10);
    const resetTokenExpiry = Date.now() + 3600000;

    return { resetToken, resetTokenExpiry };
};

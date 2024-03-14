import { connectToDB } from "@/lib/mongoClient";
import OTP from "@/models/otp";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import { totp } from "otplib";
export const POST = async (req: Request, res: Response) => {
    const { email, otp } = await req.json();

    connectToDB();
    const user = await OTP.findOne({ email: email.toLowerCase() });

    if (user) {
        if (user.valid === true) {
            console.log(user);
            const isValid = Number(otp) === Number(user?.otp) ? true : false;

            if (isValid) {
                await OTP.findOneAndUpdate(
                    { email: email.toLowerCase() },
                    { valid: false }
                );
                await Student.findOneAndUpdate(
                    { email: email.toLowerCase() },
                    { email_verified: true }
                );
                return NextResponse.json(
                    { message: "Email Verified" },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { message: "Invalid OTP" },
                    { status: 400 }
                );
            }
        } else {
            return NextResponse.json(
                { message: "OTP Expired" },
                { status: 400 }
            );
        }
    } else {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }
};

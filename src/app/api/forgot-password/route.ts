import { connectToDB } from '@/lib/mongoClient';
import OTP from '@/models/otp';
import Student from '@/models/student';
import { NextResponse } from 'next/server';
import { totp } from 'otplib';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/lib/nodemailer';

export const POST = async (req: Request, res: Response) => {
  const { email } = await req.json();

  connectToDB();
  const user = await Student.findOne({ email: email.toLowerCase() });
  if (user) {
    const { newResetToken, resetTokenExpiry } = await createResetPasswordToken(
      email
    );
    try {
      const response = await Student.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          password_reset_token: newResetToken,
          password_reset_token_expiry: resetTokenExpiry,
        }
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    }
    await sendEmail({
      to: email,
      subject: 'Reset Password',
      text:
        'Please click the link to reset your password ' +
        process.env.NEXT_PUBLIC_BASE_URL +
        '/reset-password/' +
        newResetToken,
    });

    return NextResponse.json({ message: 'Email Sent' }, { status: 200 });
  }
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
};

const createResetPasswordToken = async (email: string) => {
  const resetToken = await bcrypt.hash(email, 10);
  const newResetToken = resetToken.replace(/\//g, '');
  const resetTokenExpiry = Date.now() + 3600000;

  return { newResetToken, resetTokenExpiry };
};

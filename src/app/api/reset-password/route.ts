import { connectToDB } from '@/lib/mongoClient';
import Student from '@/models/student';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: Request, res: Response) => {
  const { token, new_password, confirm_password } = await req.json();

  connectToDB();

  const reset_token_check = await Student.findOne({
    password_reset_token: token,
    password_reset_token_expiry: { $gt: Date.now() },
  });

  // console.log(reset_token_check);
  if (reset_token_check) {
    if (new_password === confirm_password) {
      const hashedPassword = await bcrypt.hash(new_password, 10);
      try {
        const response = await Student.findOneAndUpdate(
          { password_reset_token: token },
          {
            password: hashedPassword,
            password_reset_token: null,
            password_reset_token_expiry: null,
          }
        );

        return NextResponse.json(
          { message: 'Password Updated' },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: 'Error Updating Password' },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: 'Link Invalid' }, { status: 400 });
};

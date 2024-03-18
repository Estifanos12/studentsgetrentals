import Student from "@/models/student";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    const { email } = await req.json();

    const student = await Student.findOne({ email });
    return NextResponse.json(student, { status: 200 });
};

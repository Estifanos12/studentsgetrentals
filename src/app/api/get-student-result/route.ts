import { connectToDB } from "@/lib/mongoClient";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    await connectToDB();
    const { email } = await req.json();
    try {
        const results = await Student.findOne({ email }).select("results");
        if (results) {
            const NonEmptyResults = results.results.filter(
                (result: any) => result.score > 0
            );

            if (NonEmptyResults.length === 0) {
                return NextResponse.json(
                    { message: "Student has not taken any quiz" },
                    { status: 404 }
                );
            }

            return NextResponse.json(NonEmptyResults, { status: 200 });
        }
        return NextResponse.json(
            { message: "Student not found" },
            { status: 404 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};

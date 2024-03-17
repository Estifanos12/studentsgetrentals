import { connectToDB } from "@/lib/mongoClient";
import Quiz from "@/models/quiz";
import Student from "@/models/student";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: Request,
    { params }: { params: { quiz: string } }
) => {
    await connectToDB();
    const { quiz } = params;
    const { email } = await req.json();

    try {
        const response = await Quiz.find({ category: quiz }).select(
            "-correct_option"
        );
        // const student = await Student.findOne({ email });

        // if (student) {
        //     const updatedStudentResults = student.results.map((result: any) => {
        //         if (result.category === quiz && result.score === 0) {
        //             result.score = 0;
        //         }
        //         return result;
        //     });
        //     console.log(updatedStudentResults);

        //     student.results = updatedStudentResults;

        //     try {
        //         await student.save();
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        if (response.length === 0) {
            return NextResponse.json(
                { message: "No quiz found" },
                { status: 404 }
            );
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
};

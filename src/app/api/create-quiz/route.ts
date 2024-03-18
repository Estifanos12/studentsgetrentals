import { connectToDB } from "@/lib/mongoClient";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    await connectToDB();
    const { question, options, correct_option, category } = await req.json();

    try {
        const response = await Quiz.insertMany({
            question,
            options,
            correct_option,
            category,
        });
        console.log(response);
        return NextResponse.json(
            { message: "Quiz Created", response },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
        // console.log(error);
    }
    return NextResponse.json({ message: "Error" }, { status: 500 });
};

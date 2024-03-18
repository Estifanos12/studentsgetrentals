import { connectToDB } from '@/lib/mongoClient';
import Quiz from '@/models/quiz';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { quiz: string } }
) => {
  await connectToDB();
  const { quiz } = params;

  try {
    const response = await Quiz.find({ category: quiz }).select(
      '-correct_option'
    );

    if (response.length === 0) {
      return NextResponse.json({ message: 'No quiz found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

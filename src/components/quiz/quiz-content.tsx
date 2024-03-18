import { QuizOptions } from './quiz-options';

type QuizContentProps = {
  question: string;
  options: Array<{
    text: string;
    value: string;
  }>;
  currentQuestionIndex: number;

  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
};
export const QuizContent = ({
  question,
  options,
  currentQuestionIndex,
  setAnswers,
}: QuizContentProps) => {
  return (
    <div>
      <p className='text-foreground'>{question}</p>
      <QuizOptions
        options={options}
        currentIndex={currentQuestionIndex}
        setAnswers={setAnswers}
      />
    </div>
  );
};

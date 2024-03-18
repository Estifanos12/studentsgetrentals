'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { getQuiz } from '@/lib/getQuiz';
import { Countdown } from './countdown';
import { QuizContent } from './quiz-content';
import type { Quiz as QuizType } from '@/types';
import { Button } from '../ui/button';
import { handleSubmit } from '@/lib/sendAnswer';
import { toast } from '../ui/use-toast';

export const Quiz = () => {
  const params = useParams<{ category: string }>();
  const [quiz, setQuiz] = useState<QuizType[]>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    assignQuiz();
    // TODO: Fix this
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  const checkSubmission = async () => {
    try {
      const response = await handleSubmit(
        answers,
        session?.user?.email,
        params?.category
      );
      if (response.message === 'Success') {
        toast({
          title: 'Successfully submitted your answers!',
        });

        return router.push('/result');
      }
      if (response.message === 'Error') {
        toast({
          title: 'Error',
          variant: 'destructive',
        });
        return;
      }
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
      });
    }
  };
  const assignQuiz = async () => {
    const response = await getQuiz(params?.category || '');
    setQuiz(response);
  };

  console.log(answers);
  return (
    <div>
      {quiz ? (
        <>
          <QuizContent
            question={quiz[currentQuestionIndex].question}
            options={quiz[currentQuestionIndex].options}
            currentQuestionIndex={currentQuestionIndex}
            setAnswers={setAnswers}
          />
          <Button
            onClick={() => {
              if (currentQuestionIndex !== 0)
                setCurrentQuestionIndex((prev) => prev - 1);
            }}
            disabled={currentQuestionIndex === 0}
            className={'disabled:cursor-not-allowed '}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentQuestionIndex !== quiz.length - 1)
                setCurrentQuestionIndex((prev) => prev + 1);
            }}
            disabled={currentQuestionIndex === quiz.length - 1}
            className={'disabled:cursor-not-allowed '}
          >
            Next
          </Button>
        </>
      ) : null}

      <Button onClick={checkSubmission}>Submit</Button>
    </div>
  );
};

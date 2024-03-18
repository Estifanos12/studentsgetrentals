import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type QuizOptionsProps = {
  options: Array<{
    text: string;
    value: string;
  }>;
  currentIndex: number;
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
};

export const QuizOptions = ({
  options,
  currentIndex,
  setAnswers,
}: QuizOptionsProps) => {
  return (
    <RadioGroup
      onValueChange={(value) => {
        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[currentIndex] = value;
          return newAnswers;
        });
      }}
      onChange={(e) => console.log(e)}
    >
      {options.map((option, index) => (
        <div key={option.text + index} className='flex items-center space-x-2'>
          <RadioGroupItem
            id={option.value}
            value={option.value + ' ' + currentIndex}
          />
          <label htmlFor={option.value} className='text-foreground'>
            {option.text}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};

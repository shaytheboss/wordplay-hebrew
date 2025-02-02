import React from 'react';
import { Button } from '@/components/ui/button';

interface AnswerOptionsProps {
  options: string[];
  onSelect: (answer: string) => void;
  disabled: boolean;
  selectedAnswer?: string;
  correctAnswer: string;
}

const AnswerOptions = ({
  options,
  onSelect,
  disabled,
  selectedAnswer,
  correctAnswer,
}: AnswerOptionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto animate-fadeIn">
      {options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;
        let buttonClass = '';
        
        if (disabled) {
          if (isSelected && isCorrect) buttonClass = 'bg-success hover:bg-success text-white';
          else if (isSelected && !isCorrect) buttonClass = 'bg-error hover:bg-error text-white';
          else if (isCorrect) buttonClass = 'bg-success hover:bg-success text-white';
        }

        return (
          <Button
            key={option}
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={`text-lg p-6 h-auto ${buttonClass}`}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
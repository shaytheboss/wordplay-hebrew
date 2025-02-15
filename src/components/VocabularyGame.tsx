
import React, { useState, useEffect } from 'react';
import WordCard from './WordCard';
import AnswerOptions from './AnswerOptions';
import ScoreDisplay from './ScoreDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { vocabularyData } from '@/data/vocabularyData';

const VocabularyGame = () => {
  const [gameWords, setGameWords] = useState(vocabularyData.slice(0, 30));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const { toast } = useToast();

  // Get random words at the start of each game
  useEffect(() => {
    const getRandomWords = () => {
      const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 30);
    };
    setGameWords(getRandomWords());
  }, []);

  const currentWord = gameWords[currentWordIndex];

  useEffect(() => {
    if (currentWord) {
      generateOptions();
    }
  }, [currentWordIndex, currentWord]);

  const generateOptions = () => {
    if (!currentWord) return;
    
    const correctAnswer = currentWord.hebrew;
    const otherOptions = vocabularyData
      .filter(item => item.hebrew !== correctAnswer)
      .map(item => item.hebrew)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [...otherOptions, correctAnswer]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === currentWord.hebrew;
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Well done! 🎉",
        className: "bg-success text-white",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentWord.hebrew}`,
        className: "bg-error text-white",
      });
    }
  };

  const handleNext = () => {
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setSelectedAnswer(undefined);
      setIsAnswered(false);
    } else {
      toast({
        title: "Game Complete!",
        description: `Final score: ${score}/${gameWords.length}`,
      });
    }
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ScoreDisplay score={score} total={gameWords.length} />
      
      <WordCard 
        word={currentWord.english}
        onSpeak={handleSpeak}
      />
      
      <AnswerOptions
        options={options}
        onSelect={handleAnswer}
        disabled={isAnswered}
        selectedAnswer={selectedAnswer}
        correctAnswer={currentWord.hebrew}
      />
      
      {isAnswered && currentWordIndex < gameWords.length - 1 && (
        <Button
          onClick={handleNext}
          className="mt-8 w-full"
        >
          Next Word
        </Button>
      )}
    </div>
  );
};

export default VocabularyGame;

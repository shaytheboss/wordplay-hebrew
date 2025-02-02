import React from 'react';
import { Speaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WordCardProps {
  word: string;
  onSpeak: () => void;
}

const WordCard = ({ word, onSpeak }: WordCardProps) => {
  return (
    <Card className="p-6 mb-8 animate-slideIn">
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-4xl font-bold text-primary">{word}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSpeak}
          className="hover:text-primary transition-colors"
        >
          <Speaker className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};

export default WordCard;
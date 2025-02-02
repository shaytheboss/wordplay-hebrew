import React from 'react';

interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
  return (
    <div className="text-xl font-semibold mb-6 text-primary">
      Score: {score}/{total}
    </div>
  );
};

export default ScoreDisplay;
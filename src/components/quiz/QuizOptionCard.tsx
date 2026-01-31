import React from 'react';
import { Card } from '@/components/ui/Card';
import { QuizOption } from '@/types';

interface QuizOptionCardProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const QuizOptionCard: React.FC<QuizOptionCardProps> = ({ option, isSelected, onSelect }) => {
  return (
    <Card
      title={option.label}
      isSelected={isSelected}
      onSelect={onSelect}
      className="mb-3"
    />
  );
};
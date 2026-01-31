import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  current: number;
  total: number;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className
}) => {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={twMerge("w-full h-1 bg-gray-200 rounded-full overflow-hidden", className)}>
      <motion.div
        className="h-full bg-secondary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};
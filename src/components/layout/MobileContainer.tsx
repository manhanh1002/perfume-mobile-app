import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge("w-full min-h-screen bg-background relative overflow-x-hidden max-w-full", className)}>
      {children}
    </div>
  );
};
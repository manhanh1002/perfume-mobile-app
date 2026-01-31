import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div className={twMerge("flex flex-col min-h-screen pb-[80px] w-full max-w-full overflow-x-hidden", className)}>
      {children}
    </div>
  );
};
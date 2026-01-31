import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  isSelected,
  onSelect,
  onClick,
  icon,
  image,
  title,
  subtitle,
  badge,
  className,
  children
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      animate={{ 
        scale: isSelected ? 1.02 : 1,
        borderColor: isSelected ? '#C8A86B' : '#E5E7EB',
        backgroundColor: isSelected ? 'rgba(200, 168, 107, 0.1)' : 'transparent'
      }}
      className={twMerge(
        "relative p-2 md:p-4 border-2 rounded-xl cursor-pointer transition-colors duration-200 min-h-[64px] bg-white overflow-hidden w-full",
        className
      )}
      onClick={onClick || onSelect}
    >
      {badge && (
        <span className="absolute top-2 right-2 z-10 px-2 py-0.5 text-xs font-medium bg-secondary text-white rounded-full">
          {badge}
        </span>
      )}
      
      {image && (
        <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-primary line-clamp-2">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          {children}
        </div>
      </div>
    </motion.div>
  );
};
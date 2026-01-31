import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuizOptionCard } from '@/components/quiz/QuizOptionCard';
import { useQuiz } from '@/hooks/useQuiz';
import { QUIZ_STEPS } from '@/data/quiz';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { currentStep, answers, setAnswer, nextStep, previousStep, submitQuiz, resetQuiz, isCompleted } = useQuiz();
  
  const step = QUIZ_STEPS[currentStep];
  const totalSteps = QUIZ_STEPS.length;

  useEffect(() => {
    if (isCompleted) {
       navigate('/quiz-result');
    }
  }, [isCompleted, navigate]);

  const handleOptionSelect = (value: any) => {
    if (step.type === 'multi') {
      const current = (answers[step.id as keyof typeof answers] as string[]) || [];
      const isSelected = current.includes(value);
      let newValues;
      if (isSelected) {
        newValues = current.filter(v => v !== value);
      } else {
        if (current.length >= 3) return; // Max 3
        newValues = [...current, value];
      }
      setAnswer(step.id as any, newValues);
    } else {
      setAnswer(step.id as any, value);
    }
  };

  const isNextDisabled = () => {
    const answer = answers[step.id as keyof typeof answers];
    if (step.type === 'slider') return false; // Always has default
    if (step.type === 'review') return false;
    if (Array.isArray(answer)) return answer.length === 0;
    return !answer;
  };

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      submitQuiz();
    } else {
      nextStep();
    }
  };

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => currentStep > 0 ? previousStep() : navigate('/')}
            className="p-2 -ml-2 text-gray-600 hover:text-primary"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-medium text-sm">BƯỚC {currentStep + 1}/{totalSteps}</span>
          <button className="p-2 -mr-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
        <ProgressBar current={currentStep + 1} total={totalSteps} className="mb-8" />
      </div>

      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif leading-tight">{step.question}</h2>

            <div className="space-y-3">
              {step.type === 'slider' ? (
                <div className="py-8 px-2">
                   <input 
                     type="range" 
                     min={step.minValue} 
                     max={step.maxValue} 
                     value={(answers[step.id as keyof typeof answers] as number) || step.defaultValue}
                     onChange={(e) => setAnswer(step.id as any, Number(e.target.value))}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                   />
                   <div className="flex justify-between mt-4 text-sm text-gray-500">
                     <span>Nhẹ nhàng</span>
                     <span className="font-bold text-primary text-lg">
                       {(answers[step.id as keyof typeof answers] as number) || step.defaultValue}
                     </span>
                     <span>Mãnh liệt</span>
                   </div>
                </div>
              ) : step.type === 'review' ? (
                <div className="space-y-4">
                  {Object.entries(answers).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border border-gray-200">
                      <span className="text-xs uppercase text-gray-500 font-bold">{key}</span>
                      <p className="mt-1 font-medium">
                        {Array.isArray(value) ? value.join(', ') : value?.toString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                step.options?.map((option) => (
                  <QuizOptionCard
                    key={option.value}
                    option={option}
                    isSelected={
                      step.type === 'multi'
                        ? ((answers[step.id as keyof typeof answers] as string[]) || []).includes(option.value as string)
                        : answers[step.id as keyof typeof answers] === option.value
                    }
                    onSelect={() => handleOptionSelect(option.value)}
                  />
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe">
        <div className="max-w-md mx-auto">
            <Button 
                fullWidth 
                size="lg"
                onClick={handleNext}
                disabled={isNextDisabled()}
            >
                {currentStep === totalSteps - 1 ? 'Xem kết quả!' : 'Tiếp theo'}
            </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
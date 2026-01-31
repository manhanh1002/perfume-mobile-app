import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizState, QuizAnswers } from '@/types';
import { matchProduct } from '@/utils/quizMatching';
import { Product } from '@/types';

interface QuizStore extends QuizState {
  nextStep: () => void;
  previousStep: () => void;
  setAnswer: (key: keyof QuizAnswers, value: any) => void;
  submitQuiz: () => Product;
  resetQuiz: () => void;
}

export const useQuiz = create<QuizStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      answers: {},
      isCompleted: false,
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      setAnswer: (key, value) => set((state) => ({ 
        answers: { ...state.answers, [key]: value } 
      })),
      submitQuiz: () => {
        const state = get();
        set({ isCompleted: true });
        return matchProduct(state.answers);
      },
      resetQuiz: () => set({ currentStep: 0, answers: {}, isCompleted: false }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);
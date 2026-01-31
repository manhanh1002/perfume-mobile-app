import { QuizStep } from '@/types';

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "purpose",
    type: "single",
    question: "When will you wear this fragrance?",
    options: [
      { label: "Daily wear", value: "daily" },
      { label: "Date night / Romance", value: "date" },
      { label: "Office / Work", value: "office" },
      { label: "Special events", value: "special" }
    ]
  },
  {
    id: "personality",
    type: "single",
    question: "Which personality resonates with you?",
    options: [
      { label: "Romantic & Dreamy", value: "romantic", icon: "💕" },
      { label: "Bold & Confident", value: "bold", icon: "⚡" },
      { label: "Fresh & Clean", value: "fresh", icon: "🌿" },
      { label: "Mysterious & Dark", value: "mysterious", icon: "🌙" }
    ]
  },
  {
    id: "scentFamilies",
    type: "multi",
    question: "Select the scent families you love (pick 1-3)",
    options: [
      { label: "Floral", value: "floral" },
      { label: "Citrus / Fresh", value: "citrus" },
      { label: "Oriental / Warm", value: "oriental" },
      { label: "Fruity", value: "fruity" },
      { label: "Herbal / Green", value: "herbal" }
    ]
  },
  {
    id: "intensity",
    type: "slider",
    question: "How intense should the fragrance be?",
    minValue: 1,
    maxValue: 10,
    defaultValue: 5,
    unit: "intensity"
  },
  {
    id: "budget",
    type: "single",
    question: "What's your budget for this fragrance?",
    options: [
      { label: "Under 1,500,000 VND", value: "budget_low" },
      { label: "1,500,000 - 3,000,000 VND", value: "budget_mid" },
      { label: "3,000,000 - 5,000,000 VND", value: "budget_high" },
      { label: "Above 5,000,000 VND", value: "budget_luxury" }
    ]
  },
  {
    id: "gender",
    type: "single",
    question: "Who is this fragrance for?",
    options: [
      { label: "For Me - Female", value: "female", icon: "👩" },
      { label: "For Me - Male", value: "male", icon: "👨" },
      { label: "Unisex", value: "unisex", icon: "👥" },
      { label: "As a Gift", value: "gift", icon: "🎁" }
    ]
  },
  {
    id: "review",
    type: "review",
    question: "Review your preferences"
  }
];
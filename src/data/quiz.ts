import { QuizStep } from '@/types';

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "purpose",
    type: "single",
    question: "Bạn sẽ sử dụng nước hoa này vào dịp nào?",
    options: [
      { label: "Hàng ngày", value: "daily" },
      { label: "Hẹn hò / Lãng mạn", value: "date" },
      { label: "Công sở / Đi làm", value: "office" },
      { label: "Sự kiện đặc biệt", value: "special" }
    ]
  },
  {
    id: "personality",
    type: "single",
    question: "Phong cách nào mô tả đúng nhất về bạn?",
    options: [
      { label: "Lãng mạn & Mơ mộng", value: "romantic" },
      { label: "Táo bạo & Tự tin", value: "bold" },
      { label: "Tươi mới & Sạch sẽ", value: "fresh" },
      { label: "Huyền bí & Bí ẩn", value: "mysterious" }
    ]
  },
  {
    id: "scentFamilies",
    type: "multi",
    question: "Chọn nhóm hương bạn yêu thích (chọn 1-3)",
    options: [
      { label: "Hương hoa cỏ", value: "floral" },
      { label: "Cam chanh / Tươi mát", value: "citrus" },
      { label: "Hương phương Đông / Ấm áp", value: "oriental" },
      { label: "Hương trái cây", value: "fruity" },
      { label: "Thảo mộc / Cây cỏ", value: "herbal" }
    ]
  },
  {
    id: "intensity",
    type: "slider",
    question: "Bạn muốn độ tỏa hương như thế nào?",
    minValue: 1,
    maxValue: 10,
    defaultValue: 5,
    unit: "intensity"
  },
  {
    id: "budget",
    type: "single",
    question: "Ngân sách của bạn cho chai nước hoa này là bao nhiêu?",
    options: [
      { label: "Dưới 1.500.000 VND", value: "budget_low" },
      { label: "1.500.000 - 3.000.000 VND", value: "budget_mid" },
      { label: "3.000.000 - 5.000.000 VND", value: "budget_high" },
      { label: "Trên 5.000.000 VND", value: "budget_luxury" }
    ]
  },
  {
    id: "gender",
    type: "single",
    question: "Nước hoa này dành cho ai?",
    options: [
      { label: "Cho tôi - Nữ", value: "female" },
      { label: "Cho tôi - Nam", value: "male" },
      { label: "Unisex", value: "unisex" },
      { label: "Làm quà tặng", value: "gift" }
    ]
  },
  {
    id: "review",
    type: "review",
    question: "Xem lại lựa chọn của bạn"
  }
];

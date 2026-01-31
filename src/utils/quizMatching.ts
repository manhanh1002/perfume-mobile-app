
import { Product, QuizAnswers } from '@/types';
import { products } from '@/data/products';

export const matchProduct = (answers: QuizAnswers): Product => {
  let candidates = [...products];

  // 1. Filter by Gender (Strict)
  if (answers.gender) {
    const targetGender = answers.gender.toLowerCase();
    candidates = candidates.filter(p => {
        const productGender = p.gender.toLowerCase();
        if (targetGender === 'unisex') return true; // Show everything for unisex preference? Or just unisex? Usually specific + unisex.
        // Let's say if user wants Female, we show Female + Unisex.
        if (productGender === 'unisex') return true;
        return productGender === targetGender;
    });
  }
  
  if (candidates.length === 0) candidates = [...products]; // Fallback

  // 2. Filter by Budget (Strict)
  const budgetRanges: Record<string, [number, number]> = {
    budget_low: [0, 1500000],
    budget_mid: [1500000, 3000000],
    budget_high: [3000000, 5000000],
    budget_luxury: [5000000, 100000000]
  };

  if (answers.budget && budgetRanges[answers.budget]) {
    const [min, max] = budgetRanges[answers.budget];
    const budgetCandidates = candidates.filter(p => p.price >= min && p.price <= max);
    // Only apply strict budget filter if we have matches, otherwise relax it
    if (budgetCandidates.length > 0) {
        candidates = budgetCandidates;
    }
  }

  // 3. Score by Scent Family (Weighted)
  // Map English quiz values to Vietnamese product keywords
  const scentFamilyMap: Record<string, string[]> = {
    floral: ['hoa', 'nhài', 'hồng', 'lan', 'huệ', 'floral', 'phấn'],
    citrus: ['cam', 'quýt', 'chanh', 'bưởi', 'citrus', 'tươi'],
    oriental: ['phương đông', 'hổ phách', 'xạ hương', 'gỗ', 'oriental', 'trầm'],
    fruity: ['trái cây', 'lê', 'mận', 'đào', 'dâu', 'fruity'],
    herbal: ['thảo mộc', 'cỏ', 'xanh', 'trà', 'herbal', 'green', 'bạc hà']
  };

  // 4. Score by Personality (Weighted)
  const personalityMap: Record<string, string[]> = {
    romantic: ['ngọt ngào', 'quyến rũ', 'lãng mạn', 'gợi cảm', 'hoa'],
    bold: ['cá tính', 'mạnh mẽ', 'độc đáo', 'ấn tượng', 'nổi bật'],
    fresh: ['tươi mát', 'sảng khoái', 'nhẹ nhàng', 'thanh lịch', 'tự nhiên'],
    mysterious: ['bí ẩn', 'sang trọng', 'đẳng cấp', 'huyền bí', 'gỗ']
  };

  const calculateScore = (p: Product) => {
    let score = 0;

    // Scent Family Score
    if (answers.scentFamilies && answers.scentFamilies.length > 0) {
        answers.scentFamilies.forEach(family => {
            const keywords = scentFamilyMap[family] || [];
            // Check in scentFamilies array and description/notes
            const productText = JSON.stringify([
                ...p.scentFamilies, 
                ...p.topNotes, 
                ...p.heartNotes, 
                ...p.baseNotes,
                p.description
            ]).toLowerCase();

            keywords.forEach(kw => {
                if (productText.includes(kw.toLowerCase())) score += 10;
            });
        });
    }

    // Personality Score
    if (answers.personality) {
        const keywords = personalityMap[answers.personality] || [];
        const productText = JSON.stringify([...p.tags, p.description]).toLowerCase();
        keywords.forEach(kw => {
            if (productText.includes(kw.toLowerCase())) score += 5;
        });
    }

    // Intensity Score (Closer is better)
    // We mocked intensity as "6-8 hours" or similar string, so hard to use numeric comparison.
    // But we have p.sillage "Moderate". 
    // Let's skip precise intensity matching for now as we don't have numeric data in products.

    return score;
  };

  const scoredCandidates = candidates.map(p => ({
    ...p,
    matchScore: calculateScore(p)
  }));
  
  // Sort by score (descending)
  scoredCandidates.sort((a, b) => b.matchScore - a.matchScore);

  return scoredCandidates[0] || products[0];
};

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedPath = path.join(__dirname, '../feed.xml');
const outputPath = path.join(__dirname, '../src/data/products.ts');

try {
  const xmlContent = fs.readFileSync(feedPath, 'utf-8');
  
  // Simple regex-based XML parser for this specific format
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1];
    
    const getValue = (tag) => {
      const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's');
      const m = itemContent.match(regex);
      return m ? m[1].trim() : '';
    };

    const id = getValue('g:id');
    const name = getValue('title');
    const brand = getValue('g:brand');
    const priceStr = getValue('g:price').replace(' VND', '').replace(/\./g, '');
    const price = parseInt(priceStr) || 0;
    const image = getValue('g:image_link');
    const descriptionFull = getValue('description');

    // Parse description for details
    const parseDetail = (key) => {
      const regex = new RegExp(`- ${key}: (.*?)(\\n|$)`);
      const m = descriptionFull.match(regex);
      return m ? m[1].trim() : '';
    };

    const styleStr = parseDetail('Phong cách');
    const style = styleStr ? styleStr.split(',').map(s => s.trim()) : [];

    const scentFamiliesStr = parseDetail('Nhóm hương');
    const scentFamilies = scentFamiliesStr ? scentFamiliesStr.split(',').map(s => s.trim()) : [];

    const releaseYearStr = parseDetail('Năm phát hành');
    const releaseYear = parseInt(releaseYearStr) || undefined;

    // Parse notes
    // Format: Hương đầu: A.Hương giữa: B.Hương cuối: C.
    // Or sometimes just in text?
    // Let's try to extract standard note sections
    const extractNotes = (label) => {
        const regex = new RegExp(`${label}: ([^.]+)`);
        const m = descriptionFull.match(regex);
        return m ? m[1].split(',').map(s => s.trim()) : [];
    };

    const topNotes = extractNotes('Hương đầu');
    const heartNotes = extractNotes('Hương giữa');
    const baseNotes = extractNotes('Hương cuối');

    // Default values for missing fields
    const gender = 'Unisex'; // Default, maybe extract from description if available?
    const longevity = '6-8 hours';
    const sillage = 'Moderate';
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    
    // Calculate rating randomly between 4.0 and 5.0 for demo
    const rating = 4.0 + Math.random();
    const reviewCount = Math.floor(Math.random() * 200) + 10;

    items.push({
      id,
      name,
      brand,
      price,
      images: [image],
      description: descriptionFull.split('Thông tin chi tiết:')[0].trim(), // Keep short description
      topNotes,
      heartNotes,
      baseNotes,
      longevity,
      sillage,
      seasons,
      gender,
      scentFamilies,
      style,
      releaseYear,
      tags: style, // Use style as tags
      rating: Number(rating.toFixed(1)),
      reviewCount,
      inStock: true,
      sizes: [{ size: 'Full Size', price }]
    });
  }

  const fileContent = `import { Product } from '../types';

export const products: Product[] = ${JSON.stringify(items, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Successfully generated ${items.length} products to ${outputPath}`);

} catch (error) {
  console.error('Error processing feed:', error);
}

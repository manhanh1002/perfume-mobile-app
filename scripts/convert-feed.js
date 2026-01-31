
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEED_PATH = path.join(__dirname, '../feed.xml');
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.ts');

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8');
};

const parseXML = (xmlContent) => {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1];
    items.push(itemContent);
  }

  return items.map(item => {
    const getTagValue = (tag) => {
      const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's');
      const match = regex.exec(item);
      return match ? match[1].trim() : '';
    };

    const getGTagValue = (tag) => {
      const regex = new RegExp(`<g:${tag}>(.*?)<\/g:${tag}>`, 's');
      const match = regex.exec(item);
      return match ? match[1].trim() : '';
    };

    return {
      title: getTagValue('title'),
      link: getTagValue('link'),
      description: getTagValue('description'),
      id: getGTagValue('id'),
      condition: getGTagValue('condition'),
      availability: getGTagValue('availability'),
      price: getGTagValue('price'),
      image_link: getGTagValue('image_link'),
      brand: getGTagValue('brand'),
      product_type: getGTagValue('product_type'),
    };
  });
};

const extractNotes = (description) => {
  const topNotesMatch = description.match(/Hương đầu: (.*?)(?:\.|\n|$)/);
  const heartNotesMatch = description.match(/Hương giữa: (.*?)(?:\.|\n|$)/);
  const baseNotesMatch = description.match(/Hương cuối: (.*?)(?:\.|\n|$)/);

  const splitNotes = (str) => str ? str.split(/,/).map(s => s.trim()) : [];

  return {
    topNotes: splitNotes(topNotesMatch ? topNotesMatch[1] : ''),
    heartNotes: splitNotes(heartNotesMatch ? heartNotesMatch[1] : ''),
    baseNotes: splitNotes(baseNotesMatch ? baseNotesMatch[1] : ''),
  };
};

const extractAttributes = (description) => {
  const groupMatch = description.match(/- Nhóm hương: (.*?)(?:\n|$)/);
  const styleMatch = description.match(/- Phong cách: (.*?)(?:\n|$)/);
  
  return {
    scentFamilies: groupMatch ? groupMatch[1].split(',').map(s => s.trim()) : [],
    tags: styleMatch ? styleMatch[1].split(',').map(s => s.trim()) : [],
  };
};

const determineGender = (title, description, tags) => {
  const text = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase();
  if (text.includes('unisex')) return 'Unisex';
  if (text.includes('men') || text.includes('uomo') || text.includes('nam') || text.includes('pour homme')) return 'Male';
  if (text.includes('women') || text.includes('donna') || text.includes('nữ') || text.includes('pour femme')) return 'Female';
  return 'Female'; // Default
};

const processProducts = (rawItems) => {
  return rawItems.map(item => {
    const notes = extractNotes(item.description);
    const attributes = extractAttributes(item.description);
    const gender = determineGender(item.title, item.description, attributes.tags);
    
    // Parse price "4390000 VND" -> 4390000
    const price = parseInt(item.price.replace(/\D/g, '')) || 0;

    // Default values for missing data
    const longevity = "6-8 hours";
    const sillage = "Moderate";
    const seasons = ["Spring", "Summer", "Fall", "Winter"]; // Generic default
    const rating = (4 + Math.random()).toFixed(1); // 4.0 - 5.0
    const reviewCount = Math.floor(Math.random() * 200) + 10;
    
    // Clean description: remove the structured part if possible, or just keep it all
    // Ideally we want just the marketing text.
    // Let's take the part before "Thông tin chi tiết:"
    const cleanDescription = item.description.split('Thông tin chi tiết:')[0].replace(/(Hương đầu|Hương giữa|Hương cuối).*?(\.|\n)/g, '').trim();

    return {
      id: item.id,
      name: item.title,
      brand: item.brand,
      price: price,
      images: [item.image_link],
      description: cleanDescription || item.description.split('Thông tin chi tiết:')[0].trim(),
      topNotes: notes.topNotes,
      heartNotes: notes.heartNotes,
      baseNotes: notes.baseNotes,
      longevity,
      sillage,
      seasons,
      gender,
      scentFamilies: attributes.scentFamilies,
      tags: attributes.tags,
      rating: parseFloat(rating),
      reviewCount,
      inStock: item.availability === 'in_stock',
      sizes: [
        { size: "Full Size", price: price }
      ]
    };
  });
};

const generateFile = (products) => {
  const content = `import { Product } from '../types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;
  fs.writeFileSync(OUTPUT_PATH, content);
  console.log(`Generated ${products.length} products in ${OUTPUT_PATH}`);
};

try {
  const xmlContent = readFile(FEED_PATH);
  const rawItems = parseXML(xmlContent);
  const products = processProducts(rawItems);
  generateFile(products);
} catch (error) {
  console.error('Error processing feed:', error);
}

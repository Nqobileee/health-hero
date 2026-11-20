import { FoodGroup, NutriFact } from './store';

// ── Healthy food items ──
export interface HealthyItemDef {
  id: string;
  name: string;
  foodGroup: FoodGroup;
  points: number;
  color: string;       // primary color for the 3D shape
  glowColor: string;   // particle/glow color
  shape: 'sphere' | 'cylinder' | 'box';
  fact: string;
}

export const HEALTHY_ITEMS: HealthyItemDef[] = [
  // Hydration
  { id: 'HC-001', name: 'Water Bottle', foodGroup: 'hydration', points: 15, color: '#81D4FA', glowColor: '#29B6F6', shape: 'cylinder', fact: 'Water helps your brain work better. Your brain is about 75% water!' },
  { id: 'HC-002', name: 'Coconut Water', foodGroup: 'hydration', points: 15, color: '#A5D6A7', glowColor: '#66BB6A', shape: 'cylinder', fact: 'Coconut water is full of minerals that keep your body refreshed!' },
  { id: 'HC-003', name: 'Herbal Tea', foodGroup: 'hydration', points: 14, color: '#C8E6C9', glowColor: '#81C784', shape: 'cylinder', fact: 'Herbal tea can help you relax and feel calm!' },

  // Fruits
  { id: 'HC-004', name: 'Red Apple', foodGroup: 'fruits', points: 10, color: '#EF5350', glowColor: '#E53935', shape: 'sphere', fact: 'An apple a day keeps the doctor away! Apples are full of fibre!' },
  { id: 'HC-005', name: 'Banana', foodGroup: 'fruits', points: 10, color: '#FFD54F', glowColor: '#FFC107', shape: 'cylinder', fact: 'Bananas give you quick energy with natural sugars and potassium!' },
  { id: 'HC-006', name: 'Orange', foodGroup: 'fruits', points: 10, color: '#FF9800', glowColor: '#FB8C00', shape: 'sphere', fact: 'Oranges are packed with Vitamin C to keep you from getting sick!' },
  { id: 'HC-007', name: 'Strawberry', foodGroup: 'fruits', points: 11, color: '#E91E63', glowColor: '#D81B60', shape: 'sphere', fact: 'Strawberries have more Vitamin C than oranges and taste amazing!' },
  { id: 'HC-008', name: 'Watermelon', foodGroup: 'fruits', points: 10, color: '#66BB6A', glowColor: '#EF5350', shape: 'sphere', fact: 'Watermelon is 92% water - it helps keep you hydrated!' },
  { id: 'HC-009', name: 'Grapes', foodGroup: 'fruits', points: 10, color: '#9C27B0', glowColor: '#AB47BC', shape: 'sphere', fact: 'Grapes are full of antioxidants that protect your body!' },
  { id: 'HC-010', name: 'Mango', foodGroup: 'fruits', points: 11, color: '#FF9800', glowColor: '#FFB74D', shape: 'sphere', fact: 'Mangoes are called the king of fruits and are rich in Vitamin A!' },

  // Vegetables
  { id: 'HC-011', name: 'Carrot', foodGroup: 'vegetables', points: 12, color: '#FF7043', glowColor: '#FF5722', shape: 'cylinder', fact: 'Carrots are packed with beta-carotene, which helps your eyes stay sharp!' },
  { id: 'HC-012', name: 'Broccoli', foodGroup: 'vegetables', points: 12, color: '#4CAF50', glowColor: '#388E3C', shape: 'sphere', fact: 'Broccoli has more Vitamin C than an orange, plus it helps build strong bones!' },
  { id: 'HC-013', name: 'Spinach', foodGroup: 'vegetables', points: 13, color: '#2E7D32', glowColor: '#1B5E20', shape: 'sphere', fact: 'Spinach is loaded with iron that makes your blood strong and healthy!' },
  { id: 'HC-014', name: 'Bell Pepper', foodGroup: 'vegetables', points: 12, color: '#F44336', glowColor: '#FFD54F', shape: 'sphere', fact: 'Bell peppers come in many colours and are full of vitamins!' },
  { id: 'HC-015', name: 'Tomato', foodGroup: 'vegetables', points: 11, color: '#E53935', glowColor: '#C62828', shape: 'sphere', fact: 'Tomatoes have lycopene which is great for your heart!' },
  { id: 'HC-016', name: 'Peas', foodGroup: 'vegetables', points: 12, color: '#66BB6A', glowColor: '#43A047', shape: 'sphere', fact: 'Peas are tiny but mighty - packed with protein and fibre!' },
  { id: 'HC-017', name: 'Sweet Potato', foodGroup: 'vegetables', points: 12, color: '#E65100', glowColor: '#BF360C', shape: 'box', fact: 'Sweet potatoes give you energy and are loaded with Vitamin A!' },
  { id: 'HC-018', name: 'Cucumber', foodGroup: 'vegetables', points: 11, color: '#4CAF50', glowColor: '#81C784', shape: 'cylinder', fact: 'Cucumbers are 95% water and keep you cool and hydrated!' },

  // Proteins
  { id: 'HC-019', name: 'Grilled Chicken', foodGroup: 'proteins', points: 14, color: '#BCAAA4', glowColor: '#8D6E63', shape: 'box', fact: 'Grilled chicken is a lean protein that helps your muscles grow!' },
  { id: 'HC-020', name: 'Boiled Egg', foodGroup: 'proteins', points: 13, color: '#FFF9C4', glowColor: '#FFD54F', shape: 'sphere', fact: 'Eggs are one of the best sources of protein - they help your muscles grow!' },
  { id: 'HC-021', name: 'Fish Fillet', foodGroup: 'proteins', points: 14, color: '#90CAF9', glowColor: '#42A5F5', shape: 'box', fact: 'Fish has omega-3 fatty acids that make your brain super smart!' },
  { id: 'HC-022', name: 'Bean Bowl', foodGroup: 'proteins', points: 13, color: '#8D6E63', glowColor: '#6D4C41', shape: 'box', fact: 'Beans are full of protein and fibre - great for energy!' },
  { id: 'HC-023', name: 'Almonds', foodGroup: 'proteins', points: 14, color: '#D7CCC8', glowColor: '#A1887F', shape: 'sphere', fact: 'Almonds are a great snack full of healthy fats and protein!' },
  { id: 'HC-024', name: 'Lentil Soup', foodGroup: 'proteins', points: 13, color: '#FFB74D', glowColor: '#FF9800', shape: 'cylinder', fact: 'Lentils are tiny powerhouses packed with protein and iron!' },

  // Grains
  { id: 'HC-025', name: 'Brown Bread', foodGroup: 'grains', points: 11, color: '#8D6E63', glowColor: '#6D4C41', shape: 'box', fact: 'Whole grain bread gives you lasting energy to run and play!' },
  { id: 'HC-026', name: 'Oatmeal', foodGroup: 'grains', points: 11, color: '#D7CCC8', glowColor: '#BCAAA4', shape: 'cylinder', fact: 'Oatmeal keeps you feeling full longer because it has lots of fibre!' },
  { id: 'HC-027', name: 'Brown Rice', foodGroup: 'grains', points: 11, color: '#A1887F', glowColor: '#8D6E63', shape: 'sphere', fact: 'Brown rice has more nutrients than white rice - it keeps your energy up!' },
  { id: 'HC-028', name: 'Wheat Pasta', foodGroup: 'grains', points: 11, color: '#FFE082', glowColor: '#FFD54F', shape: 'cylinder', fact: 'Whole wheat pasta gives you energy for running and playing all day!' },

  // Dairy
  { id: 'HC-029', name: 'Milk Carton', foodGroup: 'dairy', points: 10, color: '#FFFFFF', glowColor: '#E0E0E0', shape: 'box', fact: 'Milk has calcium that makes your bones and teeth super strong!' },
  { id: 'HC-030', name: 'Yoghurt Cup', foodGroup: 'dairy', points: 10, color: '#F8BBD0', glowColor: '#F48FB1', shape: 'cylinder', fact: 'Yoghurt has friendly bacteria called probiotics that keep your tummy happy!' },
];

// ── Alcohol obstacles (teaching kids not to drink underage) ──
// Effects mirror what alcohol really does to the body:
//   blur   → blurry vision
//   tilt   → dizziness / poor balance
//   slow   → slower reactions
//   invert → confused thinking and bad decisions
export type AlcoholShape = 'bottle' | 'can' | 'glass' | 'cup';

export interface AlcoholItemDef {
  id: string;
  name: string;
  category: string;
  penalty: number;
  effect: 'blur' | 'slow' | 'tilt' | 'invert';
  effectDuration: number; // ms
  color: string;
  shape: AlcoholShape;
  fact: string;
}

export const ALCOHOL_ITEMS: AlcoholItemDef[] = [
  // Beer & Cider — blurry vision
  { id: 'AL-001', name: 'Beer Bottle', category: 'Beer & Cider', penalty: 10, effect: 'blur', effectDuration: 4000, color: '#A0522D', shape: 'bottle', fact: 'Alcohol makes your eyes blurry. A clear head helps you see your goals!' },
  { id: 'AL-002', name: 'Beer Can', category: 'Beer & Cider', penalty: 10, effect: 'blur', effectDuration: 4000, color: '#D4A017', shape: 'can', fact: 'Your brain keeps growing until about age 25. Skipping alcohol helps it grow strong!' },
  { id: 'AL-003', name: 'Cider', category: 'Beer & Cider', penalty: 10, effect: 'blur', effectDuration: 4000, color: '#C5E1A5', shape: 'bottle', fact: 'Cider can taste like apple juice, but it has alcohol in it. Always check the label!' },

  // Wine — dizziness
  { id: 'AL-004', name: 'Wine Bottle', category: 'Wine', penalty: 12, effect: 'tilt', effectDuration: 5000, color: '#6A1B4D', shape: 'bottle', fact: 'Alcohol messes with your balance. Staying alcohol-free keeps you steady on your feet!' },
  { id: 'AL-005', name: 'Wine Glass', category: 'Wine', penalty: 11, effect: 'tilt', effectDuration: 5000, color: '#8E244D', shape: 'glass', fact: 'Alcohol can make you feel dizzy and sick. Water keeps you feeling great!' },

  // Spirits — slow reactions
  { id: 'AL-006', name: 'Whisky Bottle', category: 'Spirits', penalty: 14, effect: 'slow', effectDuration: 6000, color: '#B5651D', shape: 'bottle', fact: 'Alcohol slows down your reactions. Top athletes stay sharp by saying no!' },
  { id: 'AL-007', name: 'Vodka Bottle', category: 'Spirits', penalty: 14, effect: 'slow', effectDuration: 6000, color: '#B0BEC5', shape: 'bottle', fact: 'Strong drinks like vodka can hurt your liver, the organ that cleans your blood!' },
  { id: 'AL-008', name: 'Shot Glass', category: 'Spirits', penalty: 13, effect: 'slow', effectDuration: 6000, color: '#FFE0B2', shape: 'glass', fact: 'Even a small amount of alcohol is too much for a growing body.' },

  // Party drinks — confused thinking
  { id: 'AL-009', name: 'Alcopop', category: 'Party Drinks', penalty: 15, effect: 'invert', effectDuration: 3000, color: '#EC407A', shape: 'bottle', fact: 'Some alcohol drinks look like soda or juice. If it has alcohol, say "No thanks!"' },
  { id: 'AL-010', name: 'Cocktail', category: 'Party Drinks', penalty: 15, effect: 'invert', effectDuration: 3000, color: '#FF7043', shape: 'glass', fact: 'Alcohol confuses your thinking and makes it hard to make good choices.' },
  { id: 'AL-011', name: 'Party Cup', category: 'Party Drinks', penalty: 15, effect: 'invert', effectDuration: 3000, color: '#E53935', shape: 'cup', fact: 'If someone offers you alcohol, it is okay to say no. Real friends respect that!' },
  { id: 'AL-012', name: 'Mystery Drink', category: 'Party Drinks', penalty: 15, effect: 'invert', effectDuration: 3000, color: '#7E57C2', shape: 'cup', fact: 'The law says alcohol is only for adults, because it can harm growing bodies and brains.' },
];

// Food group color map per SRS
export const FOOD_GROUP_COLORS: Record<FoodGroup, string> = {
  fruits: '#EF5350',
  vegetables: '#4CAF50',
  proteins: '#FF9800',
  grains: '#8D6E63',
  dairy: '#FFFFFF',
  hydration: '#81D4FA',
};

export const FOOD_GROUP_LABELS: Record<FoodGroup, string> = {
  fruits: 'Fruits',
  vegetables: 'Vegetables',
  proteins: 'Proteins',
  grains: 'Grains',
  dairy: 'Dairy',
  hydration: 'Water',
};

export function getRandomHealthyItem(): HealthyItemDef {
  return HEALTHY_ITEMS[Math.floor(Math.random() * HEALTHY_ITEMS.length)];
}

export function getRandomAlcoholItem(): AlcoholItemDef {
  return ALCOHOL_ITEMS[Math.floor(Math.random() * ALCOHOL_ITEMS.length)];
}

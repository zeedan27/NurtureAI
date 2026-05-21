// Age-band Nutrition Guides with Local Recipes and MUAC Guide
// For rural Bangladesh child care context

export interface Recipe {
  id: string;
  name: string; // Bangla
  nameEn: string;
  ingredients: string; // Bangla
  ingredientsEn: string;
  instructions: string; // Bangla
  instructionsEn: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  calories: number;
  nutrients: string; // Bangla
  nutrientsEn: string;
}

export interface NutritionGuide {
  ageBand: string; // Bangla
  ageBandEn: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  title: string; // Bangla
  titleEn: string;
  content: string; // Bangla
  contentEn: string;
  foods: string; // Bangla recommended foods
  foodsEn: string;
  frequency: string; // Bangla
  frequencyEn: string;
  warnings: string; // Bangla
  warningsEn: string;
}

export interface MuacStep {
  step: number;
  instruction: string; // Bangla
  instructionEn: string;
}

export const nutritionGuides: NutritionGuide[] = [
  {
    ageBand: '০-৬ মাস',
    ageBandEn: '0-6 Months',
    ageMonthsMin: 0,
    ageMonthsMax: 6,
    title: 'শুধুমাত্র মায়ের দুধ',
    titleEn: 'Exclusive Breastfeeding',
    content:
      'জন্মের পর থেকে ৬ মাস পর্যন্ত শিশুকে শুধুমাত্র মায়ের দুধ খাওয়াতে হবে। পানি, মধু, চিনির পানি বা অন্য কিছু দেওয়া দরকার নেই। মায়ের দুধে শিশুর প্রয়োজনীয় সব পুষ্টি ও পানি থাকে। শালদুধ (কোলোস্ট্রাম) অবশ্যই খাওয়াতে হবে - এটি শিশুর প্রথম টিকা।',
    contentEn:
      'From birth to 6 months, the baby should be exclusively breastfed. No water, honey, sugar water, or anything else is needed. Breast milk contains all the nutrition and water the baby needs. Colostrum must be given — it is the baby\'s first vaccine.',
    foods: 'শুধুমাত্র মায়ের দুধ। অন্য কোনো খাবার বা পানীয় দেবেন না।',
    foodsEn: 'Only breast milk. Do not give any other food or drink.',
    frequency: 'প্রতি ২-৩ ঘণ্টা অন্তর, দিনে কমপক্ষে ৮-১২ বার। শিশু চাইলেই দিন।',
    frequencyEn: 'Every 2-3 hours, at least 8-12 times per day. Feed on demand.',
    warnings: 'কখনো বোতল দিয়ে দুধ খাওয়াবেন না। মধু, পানি, চিনির পানি দেবেন না। ছয় মাসের আগে কোনো কঠিন খাবার দেবেন না।',
    warningsEn: 'Never bottle feed. Do not give honey, water, or sugar water. No solid foods before 6 months.',
  },
  {
    ageBand: '৬-৮ মাস',
    ageBandEn: '6-8 Months',
    ageMonthsMin: 6,
    ageMonthsMax: 8,
    title: 'পরিপূরক খাবারের সূচনা',
    titleEn: 'Introduction to Complementary Foods',
    content:
      '৬ মাস বয়স থেকে মায়ের দুধের পাশাপাশি পরিপূরক খাবার শুরু করতে হবে। প্রথমে একটি খাবার দিয়ে শুরু করুন, ৩-৪ দিন পর নতুন খাবার যোগ করুন। খাবার নরম ও মসৃণ হতে হবে। লবণ ও চিনি দেবেন না। মায়ের দুধ চালিয়ে যান।',
    contentEn:
      'Starting at 6 months, begin complementary foods alongside breast milk. Start with one food, add new foods every 3-4 days. Food should be soft and smooth. No salt or sugar. Continue breastfeeding.',
    foods: 'সুজির ভাত, কলা মাখানো, সিদ্ধ ডিমের কুসুম, চালের সিরিয়াল, আলু সিদ্ধ মাখানো, ডালের পানি, সবজির পেস্ট',
    foodsEn: 'Semolina cereal, mashed banana, boiled egg yolk, rice cereal, mashed potato, lentil water, vegetable paste',
    frequency: 'দিনে ২-৩ বার পরিপূরক খাবার। মায়ের দুধ চাহিদা অনুযায়ী।',
    frequencyEn: '2-3 times daily complementary food. Breast milk on demand.',
    warnings: 'গরুর দুধ ১ বছরের আগে দেবেন না। মধু ১ বছরের আগে দেবেন না। ছোট হাড় বা শক্ত খাবার দেবেন না।',
    warningsEn: 'No cow\'s milk before 1 year. No honey before 1 year. No small bones or hard foods.',
  },
  {
    ageBand: '৮-১২ মাস',
    ageBandEn: '8-12 Months',
    ageMonthsMin: 8,
    ageMonthsMax: 12,
    title: 'বৈচিত্র্য বৃদ্ধি',
    titleEn: 'Increasing Variety',
    content:
      'এই বয়সে শিশুকে বিভিন্ন ধরনের খাবার পরিচিত করান। আঙুল দিয়ে ধরে খাওয়ার মতো খাবার দিন। পরিবারের খাবার থেকে সামান্য পরিবর্তন করে শিশুকে খাওয়াতে পারেন। মায়ের দুধ অব্যাহত রাখুন।',
    contentEn:
      'Introduce a variety of foods at this age. Offer finger foods. You can give slightly modified family foods. Continue breastfeeding.',
    foods: 'ভাত মাখানো, ডাল ভাত, সবজি ভাত, মাছের পাতলা ঝোল, ডিম ভুনা, খিচুড়ি, ফলের টুকরো, রুটি ভিজিয়ে',
    foodsEn: 'Mashed rice, lentil rice, vegetable rice, thin fish curry, egg curry, khichuri, fruit pieces, soaked bread',
    frequency: 'দিনে ৩-৪ বার পরিপূরক খাবার এবং ১-২ বার স্ন্যাকস। মায়ের দুধ চালিয়ে যান।',
    frequencyEn: '3-4 times daily complementary food and 1-2 snacks. Continue breastfeeding.',
    warnings: 'মসলা কম দিন। লবণ ও চিনি এড়িয়ে চলুন। শিশু খাওয়ার সময় নজর রাখুন যাতে শ্বাসরোধ না হয়।',
    warningsEn: 'Use less spices. Avoid salt and sugar. Watch the baby while eating to prevent choking.',
  },
  {
    ageBand: '১২-২৪ মাস',
    ageBandEn: '12-24 Months',
    ageMonthsMin: 12,
    ageMonthsMax: 24,
    title: 'পারিবারিক খাবার',
    titleEn: 'Family Foods',
    content:
      'এক বছর বয়সের পর শিশু পরিবারের সবার সাথে একই খাবার খেতে পারে। তবে খাবার নরম ও ছোট টুকরোয় কাটা হতে হবে। প্রোটিন, শাকসবজি ও কার্বোহাইড্রেটের সমন্বয় রাখুন। মায়ের দুধ চালিয়ে যেতে পারেন ২ বছর পর্যন্ত।',
    contentEn:
      'After one year, the baby can eat the same food as the family. Food should be soft and cut into small pieces. Balance protein, vegetables, and carbohydrates. Breastfeeding can continue until 2 years.',
    foods: 'ভাত, ডাল, মাছ, মাংস, ডিম, সবজি, ফল, দুধ, দই, খিচুড়ি, পরোটা, সবজি ভাত',
    foodsEn: 'Rice, lentils, fish, meat, egg, vegetables, fruits, milk, yogurt, khichuri, paratha, vegetable rice',
    frequency: 'দিনে ৩ বার প্রধান খাবার ও ২ বার স্ন্যাকস। মায়ের দুধ চাহিদা অনুযায়ী।',
    frequencyEn: '3 main meals and 2 snacks daily. Breast milk on demand.',
    warnings: 'চায়ের সাথে দুধ মিশিয়ে দেবেন না (চায়ের ট্যানিন আয়রণ শোষণ কমায়)। বেশি লবণ বা চিনি দেবেন না। জংক ফুড এড়িয়ে চলুন।',
    warningsEn: 'Do not mix milk with tea (tea tannin reduces iron absorption). Avoid excess salt or sugar. Avoid junk food.',
  },
  {
    ageBand: '২-৫ বছর',
    ageBandEn: '2-5 Years',
    ageMonthsMin: 24,
    ageMonthsMax: 60,
    title: 'সুষম খাদ্যাভ্যাস',
    titleEn: 'Balanced Diet',
    content:
      'এই বয়সে শিশুর সুষম খাদ্যাভ্যাস গড়ে তুলুন। প্রতিদিন বিভিন্ন ধরনের খাবার দিন। মৌসুমী ফল ও সবজি অবশ্যই অন্তর্ভুক্ত করুন। শিশুর ক্ষুধা অনুযায়ী খাবার দিন, জোর করবেন না। স্বাস্থ্যকর স্ন্যাকস রাখুন।',
    contentEn:
      'Build a balanced diet at this age. Provide a variety of foods daily. Include seasonal fruits and vegetables. Feed according to appetite, don\'t force. Keep healthy snacks available.',
    foods: 'ভাত/রুটি, ডাল, মাছ/মাংস, ডিম, দুধ/দই, সবজি, মৌসুমী ফল, সালাদ, খিচুড়ি, হালুয়া',
    foodsEn: 'Rice/bread, lentils, fish/meat, egg, milk/yogurt, vegetables, seasonal fruits, salad, khichuri, halwa',
    frequency: 'দিনে ৩ বার প্রধান খাবার ও ২ বার স্বাস্থ্যকর স্ন্যাকস।',
    frequencyEn: '3 main meals and 2 healthy snacks daily.',
    warnings: 'কমলালেবু বা ভিটামিন সি সমৃদ্ধ খাবার আয়রণ সমৃদ্ধ খাবারের সাথে দিন। চা খাবারের সাথে দেবেন না। প্রক্রিয়াজাত খাবার এড়িয়ে চলুন।',
    warningsEn: 'Give vitamin C rich foods with iron-rich foods. Do not give tea with meals. Avoid processed foods.',
  },
];

export const recipes: Recipe[] = [
  {
    id: 'suji-kheer',
    name: 'সুজি খির',
    nameEn: 'Semolina Pudding',
    ingredients: 'সুজি ২ টেবিল চামচ, মায়ের দুধ বা পানি ১ কাপ, চিনি সামান্য (১ বছরের বেশি হলে)',
    ingredientsEn: 'Semolina 2 tbsp, breast milk or water 1 cup, a little sugar (if over 1 year)',
    instructions:
      '১. সুজি শুকনা প্যানে হালকা ভাজুন সোনালী হওয়া পর্যন্ত। ২. আঁচ কমিয়ে পানি বা দুধ ধীরে ধীরে যোগ করুন। ৩. একটানা নাড়ুন যাতে দলা না পাকে। ৪. ঘন হলে নামিয়ে নিন। ৫. হালকা গরম অবস্থায় শিশুকে খাওয়ান।',
    instructionsEn:
      '1. Lightly roast semolina in a dry pan until golden. 2. Reduce heat, slowly add water or milk. 3. Stir continuously to avoid lumps. 4. Remove when thickened. 5. Feed when slightly warm.',
    ageMonthsMin: 6,
    ageMonthsMax: 24,
    calories: 120,
    nutrients: 'কার্বোহাইড্রেট, প্রোটিন, ক্যালসিয়াম',
    nutrientsEn: 'Carbohydrate, Protein, Calcium',
  },
  {
    id: 'dim-bhuna',
    name: 'ডিম ভুনা',
    nameEn: 'Egg Curry',
    ingredients: 'ডিম ১টি, পেঁয়াজ কুচি ১ চামচ, হলুদ সামান্য, সরিষার তেল ১ চামচ, পানি আধা কাপ',
    ingredientsEn: 'Egg 1, chopped onion 1 tsp, turmeric pinch, mustard oil 1 tsp, water half cup',
    instructions:
      '১. ডিম সিদ্ধ করে খোসা ছাড়ুন। ২. তেলে পেঁয়াজ ও হলুদ হালকা ভাজুন। ৩. সিদ্ধ ডিম দিন। ৪. পানি দিয়ে ঢেকে রান্না করুন। ৫. নরম হলে ভাতের সাথে মাখিয়ে শিশুকে খাওয়ান।',
    instructionsEn:
      '1. Boil egg and peel. 2. Lightly fry onion and turmeric in oil. 3. Add boiled egg. 4. Add water, cover and cook. 5. When soft, mash with rice and feed.',
    ageMonthsMin: 8,
    ageMonthsMax: 60,
    calories: 150,
    nutrients: 'প্রোটিন, আয়রণ, ভিটামিন এ, ডি',
    nutrientsEn: 'Protein, Iron, Vitamin A, D',
  },
  {
    id: 'khichuri',
    name: 'খিচুড়ি',
    nameEn: 'Khichuri',
    ingredients: 'চাল আধা কাপ, মসুর ডাল আধা কাপ, সবজি (গাজর, আলু, শাক) পরিমাণমতো, হলুদ সামান্য, ঘি বা তেল ১ চামচ',
    ingredientsEn: 'Rice half cup, red lentil half cup, vegetables (carrot, potato, greens) as needed, turmeric pinch, ghee or oil 1 tsp',
    instructions:
      '১. চাল ও ডাল ধুয়ে নিন। ২. সবজি ছোট টুকরোয় কাটুন। ৩. তেলে হলুদ ও সবজি হালকা ভাজুন। ৪. চাল, ডাল ও পর্যাপ্ত পানি দিন। ৫. নরম হওয়া পর্যন্ত রান্না করুন। ৬. মাখিয়ে শিশুকে খাওয়ান।',
    instructionsEn:
      '1. Wash rice and lentils. 2. Cut vegetables into small pieces. 3. Lightly fry turmeric and vegetables in oil. 4. Add rice, lentils, and enough water. 5. Cook until soft. 6. Mash and feed the baby.',
    ageMonthsMin: 8,
    ageMonthsMax: 60,
    calories: 200,
    nutrients: 'কার্বোহাইড্রেট, প্রোটিন, ফাইবার, ভিটামিন এ, সি, আয়রণ',
    nutrientsEn: 'Carbohydrate, Protein, Fiber, Vitamin A, C, Iron',
  },
  {
    id: 'sobji-bhat',
    name: 'সবজি ভাত',
    nameEn: 'Vegetable Rice',
    ingredients: 'চাল আধা কাপ, গাজর কুচি ২ চামচ, আলু কুচি ২ চামচ, পালং শাক কুচি ১ চামচ, ঘি বা তেল ১ চামচ, হলুদ সামান্য',
    ingredientsEn: 'Rice half cup, chopped carrot 2 tsp, chopped potato 2 tsp, chopped spinach 1 tsp, ghee or oil 1 tsp, turmeric pinch',
    instructions:
      '১. চাল ধুয়ে নিন। ২. সবজি ছোট টুকরোয় কাটুন। ৩. তেলে হলুদ ও সবজি ভাজুন। ৪. চাল ও পানি দিয়ে রান্না করুন। ৫. ভাত সিদ্ধ ও নরম হলে ভালো মাখিয়ে শিশুকে খাওয়ান।',
    instructionsEn:
      '1. Wash rice. 2. Cut vegetables into small pieces. 3. Fry turmeric and vegetables in oil. 4. Add rice and water, cook. 5. When rice is cooked and soft, mash well and feed the baby.',
    ageMonthsMin: 8,
    ageMonthsMax: 36,
    calories: 160,
    nutrients: 'কার্বোহাইড্রেট, ভিটামিন এ, সি, ফাইবার, আয়রণ',
    nutrientsEn: 'Carbohydrate, Vitamin A, C, Fiber, Iron',
  },
  {
    id: 'kola-dudh',
    name: 'কলা দুধ',
    nameEn: 'Banana Milk',
    ingredients: 'পাকা কলা অর্ধেক, মায়ের দুধ বা পানি ৩-৪ চামচ',
    ingredientsEn: 'Ripe banana half, breast milk or water 3-4 tsp',
    instructions:
      '১. পাকা কলা ভালো মাখুন চামচ দিয়ে। ২. মায়ের দুধ বা হালকা কুসুম গরম পানি মিশিয়ে মসৃণ পেস্ট তৈরি করুন। ৩. গলদ রহিত করে শিশুকে খাওয়ান।',
    instructionsEn:
      '1. Mash ripe banana well with a spoon. 2. Mix with breast milk or lukewarm water to make a smooth paste. 3. Ensure no lumps and feed the baby.',
    ageMonthsMin: 6,
    ageMonthsMax: 24,
    calories: 100,
    nutrients: 'পটাসিয়াম, কার্বোহাইড্রেট, ভিটামিন বি৬, সি',
    nutrientsEn: 'Potassium, Carbohydrate, Vitamin B6, C',
  },
  {
    id: 'macher-jhol',
    name: 'মাছের পাতলা ঝোল',
    nameEn: 'Fish Soup',
    ingredients: 'ছোট মাছ বা রুই মাছ ১টি, আলু কুচি ১ চামচ, হলুদ সামান্য, রসুন কুচি সামান্য, সরিষার তেল ১ চামচ, পানি ১ কাপ',
    ingredientsEn: 'Small fish or rohu 1, chopped potato 1 tsp, turmeric pinch, garlic paste pinch, mustard oil 1 tsp, water 1 cup',
    instructions:
      '১. মাছ পরিষ্কার করে হলুদ মাখিয়ে তেলে হালকা ভাজুন। ২. আলু, রসুন ও পানি দিন। ৩. মাছ সিদ্ধ হলে কাঁটা সাবধানে বের করুন। ৪. মাছের মাংস ভালো মাখিয়ে ঝোলের সাথে ভাত মিশিয়ে খাওয়ান।',
    instructionsEn:
      '1. Clean fish, coat with turmeric, lightly fry in oil. 2. Add potato, garlic, and water. 3. When fish is cooked, carefully remove bones. 4. Mash fish meat well, mix with broth and rice to feed.',
    ageMonthsMin: 10,
    ageMonthsMax: 60,
    calories: 130,
    nutrients: 'প্রোটিন, ওমেগা-৩, আয়রণ, ক্যালসিয়াম, ভিটামিন ডি',
    nutrientsEn: 'Protein, Omega-3, Iron, Calcium, Vitamin D',
  },
];

export const muacGuide: {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  steps: MuacStep[];
  interpretations: {
    color: string;
    colorBn: string;
    range: string;
    rangeEn: string;
    meaning: string;
    meaningEn: string;
    action: string;
    actionEn: string;
  }[];
} = {
  title: 'মুয়াক ফিতা পরিমাপ নির্দেশিকা',
  titleEn: 'MUAC Tape Measurement Guide',
  description:
    'মুয়াক (মিড-আপার আর্ম সার্কামফারেন্স) ফিতা দিয়ে শিশুর পুষ্টি অবস্থা পরিমাপ করা হয়। এটি ৬-৫৯ মাসের শিশুদের জন্য ব্যবহৃত হয়।',
  descriptionEn:
    'MUAC (Mid-Upper Arm Circumference) tape measures a child\'s nutritional status. Used for children 6-59 months.',
  steps: [
    {
      step: 1,
      instruction: 'শিশুকে আরামদায়কভাবে বসান বা কোলে নিন।',
      instructionEn: 'Seat the child comfortably or hold on lap.',
    },
    {
      step: 2,
      instruction: 'শিশুর বাম হাতটি শরীরের পাশে সোজা রাখুন বা হাঁটুতে ভাঁজ করুন।',
      instructionEn: 'Keep the child\'s left arm straight alongside the body or bent at the elbow.',
    },
    {
      step: 3,
      instruction: 'কনুইয়ের উপর থেকে কাঁধের শেষ পর্যন্ত মাপুন — ঠিক মাঝখানের বিন্দু চিহ্নিত করুন।',
      instructionEn: 'Measure from the tip of the shoulder to the tip of the elbow — mark the midpoint.',
    },
    {
      step: 4,
      instruction: 'মুয়াক ফিতা মাঝখানের বিন্দুতে হাতের চারপাশে পেঁচিয়ে দিন। ফিতা শক্ত বা ঢিলা হবে না।',
      instructionEn: 'Wrap the MUAC tape around the arm at the midpoint. The tape should not be too tight or too loose.',
    },
    {
      step: 5,
      instruction: 'ফিতার রঙ দেখুন — সবুজ, হলুদ বা লাল অংশে কোনটিতে পড়ছে তা নির্ণয় করুন।',
      instructionEn: 'Check the tape color — determine if it falls in the green, yellow, or red zone.',
    },
  ],
  interpretations: [
    {
      color: 'green',
      colorBn: 'সবুজ',
      range: '১২.৫ সেমি বা বেশি',
      rangeEn: '12.5 cm or more',
      meaning: 'স্বাভাবিক পুষ্টি অবস্থা',
      meaningEn: 'Normal nutritional status',
      action: 'বর্তমান খাদ্যাভ্যাস চালিয়ে যান। নিয়মিত মাপুন।',
      actionEn: 'Continue current feeding practices. Measure regularly.',
    },
    {
      color: 'yellow',
      colorBn: 'হলুদ',
      range: '১১.৫ - ১২.৪ সেমি',
      rangeEn: '11.5 - 12.4 cm',
      meaning: 'মাঝারি তীব্র অপুষ্টি (এমএএম)',
      meaningEn: 'Moderate Acute Malnutrition (MAM)',
      action: 'অতিরিক্ত পুষ্টিকর খাবার দিন। স্বাস্থ্যকর্মীর পরামর্শ নিন। পরিপূরক খাদ্য কর্মসূচির সুবিধা নিন।',
      actionEn: 'Give extra nutritious food. Consult a health worker. Access supplementary feeding programs.',
    },
    {
      color: 'red',
      colorBn: 'লাল',
      range: '১১.৫ সেমির কম',
      rangeEn: 'Less than 11.5 cm',
      meaning: 'তীব্র তীব্র অপুষ্টি (স্যাম)',
      meaningEn: 'Severe Acute Malnutrition (SAM)',
      action: 'তাড়াতাড়ি স্বাস্থ্যকেন্দ্রে নিয়ে যান। আরটিইউএফ (রেডি-টু-ইজ থেরাপিউটিক ফুড) প্রয়োজন। চিকিৎসকের পরামর্শ অবশ্যই নিন।',
      actionEn: 'Take to health center urgently. RUTF (Ready-to-Use Therapeutic Food) needed. Must consult a doctor.',
    },
  ],
};

export function getNutritionGuideByAge(months: number): NutritionGuide | undefined {
  return nutritionGuides.find(
    (g) => months >= g.ageMonthsMin && months <= g.ageMonthsMax
  );
}

export function getRecipesByAge(months: number): Recipe[] {
  return recipes.filter(
    (r) => months >= r.ageMonthsMin && months <= r.ageMonthsMax
  );
}

// Age-based learning activities, ABC flashcards, and fun facts

export interface Activity {
  id: string;
  ageGroup: string;
  ageGroupEn: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

export interface Flashcard {
  id: string;
  type: 'bangla' | 'english';
  letter: string;
  example: string;
  exampleEn: string;
  illustration: string;
}

export interface FunFact {
  id: string;
  fact: string;
  factEn: string;
  category: string;
}

export const activities: Activity[] = [
  // 0-6 months
  { id: 'a1', ageGroup: '০-৬ মাস', ageGroupEn: '0-6 months', ageMonthsMin: 0, ageMonthsMax: 6, title: 'মুখোমুখি কথা', titleEn: 'Face-to-face Talk', description: 'শিশুর চোখের দিকে তাকিয়ে কথা বলুন। মুখের ভাব দেখান।', descriptionEn: 'Look into baby\'s eyes and talk. Show facial expressions.', icon: '👀' },
  { id: 'a2', ageGroup: '০-৬ মাস', ageGroupEn: '0-6 months', ageMonthsMin: 0, ageMonthsMax: 6, title: 'বস্তু অনুসরণ', titleEn: 'Object Tracking', description: 'রঙিন খেলনা ধীরে ধীরে এপাশ-ওপাশ নাড়ুন, শিশুর চোখ অনুসরণ করবে।', descriptionEn: 'Move colorful toy slowly side to side, baby\'s eyes will follow.', icon: '🎯' },
  { id: 'a3', ageGroup: '০-৬ মাস', ageGroupEn: '0-6 months', ageMonthsMin: 0, ageMonthsMax: 6, title: 'মৃদু মালিশ', titleEn: 'Gentle Massage', description: 'শিশুর শরীরে হালকা তেল মাখিয়ে মৃদু মালিশ করুন।', descriptionEn: 'Lightly massage baby with oil.', icon: '💆' },
  { id: 'a4', ageGroup: '০-৬ মাস', ageGroupEn: '0-6 months', ageMonthsMin: 0, ageMonthsMax: 6, title: 'গান গান', titleEn: 'Singing', description: 'শিশুর কাছে মৃদু সুরে গান গান।', descriptionEn: 'Sing softly to baby.', icon: '🎵' },
  // 6-12 months
  { id: 'a5', ageGroup: '৬-১২ মাস', ageGroupEn: '6-12 months', ageMonthsMin: 6, ageMonthsMax: 12, title: 'লুকোচুরি', titleEn: 'Peek-a-boo', description: 'মুখ ঢেকে লুকোচুরি খেলুন। শিশু আনন্দে হাসবে।', descriptionEn: 'Cover face and play peek-a-boo. Baby will laugh with joy.', icon: '🎭' },
  { id: 'a6', ageGroup: '৬-১২ মাস', ageGroupEn: '6-12 months', ageMonthsMin: 6, ageMonthsMax: 12, title: 'কাপ সাজানো', titleEn: 'Stacking Cups', description: 'প্লাস্টিকের কাপ বা ব্লক সাজান ও ফেলুন।', descriptionEn: 'Stack plastic cups or blocks and knock them down.', icon: '🧱' },
  { id: 'a7', ageGroup: '৬-১২ মাস', ageGroupEn: '6-12 months', ageMonthsMin: 6, ageMonthsMax: 12, title: 'হামাগুড়ি খেলা', titleEn: 'Crawling Games', description: 'শিশুকে হামাগুড়ি দিতে উৎসাহিত করুন। খেলনা সামনে রাখুন।', descriptionEn: 'Encourage crawling. Place toy in front.', icon: '👶' },
  { id: 'a8', ageGroup: '৬-১২ মাস', ageGroupEn: '6-12 months', ageMonthsMin: 6, ageMonthsMax: 12, title: 'বস্তুর নাম বলুন', titleEn: 'Name Objects', description: 'জিনিস দেখিয়ে নাম বলুন। "এটি বল, এটি কাপ"', descriptionEn: 'Show objects and name them. "This is a ball, this is a cup"', icon: '🏷️' },
  // 1-3 years
  { id: 'a9', ageGroup: '১-৩ বছর', ageGroupEn: '1-3 years', ageMonthsMin: 12, ageMonthsMax: 36, title: 'সহজ ধাঁধা', titleEn: 'Simple Puzzles', description: '২-৪ টুকরোর ধাঁধা দিন। সাহায্য করুন কিন্তু নিজে করতে দিন।', descriptionEn: 'Give 2-4 piece puzzles. Help but let them try.', icon: '🧩' },
  { id: 'a10', ageGroup: '১-৩ বছর', ageGroupEn: '1-3 years', ageMonthsMin: 12, ageMonthsMax: 36, title: 'আঁকাআঁকি', titleEn: 'Drawing', description: 'ক্রেয়ন দিয়ে আঁকতে দিন। শুধু ঘষাঘষি করলেও চলবে।', descriptionEn: 'Let them draw with crayons. Even scribbling is fine.', icon: '🖍️' },
  { id: 'a11', ageGroup: '১-৩ বছর', ageGroupEn: '1-3 years', ageMonthsMin: 12, ageMonthsMax: 36, title: 'রঙ সাজানো', titleEn: 'Color Sorting', description: 'রঙিন বস্তু রঙ অনুযায়ী আলাদা করুন।', descriptionEn: 'Sort colored objects by color.', icon: '🌈' },
  { id: 'a12', ageGroup: '১-৩ বছর', ageGroupEn: '1-3 years', ageMonthsMin: 12, ageMonthsMax: 36, title: 'গুণতে শেখা', titleEn: 'Learning to Count', description: 'সিঁড়িতে পা ফেলতে গুণুন। আঙুল গুণুন।', descriptionEn: 'Count steps on stairs. Count fingers.', icon: '🔢' },
  // 3-5 years
  { id: 'a13', ageGroup: '৩-৫ বছর', ageGroupEn: '3-5 years', ageMonthsMin: 36, ageMonthsMax: 60, title: 'গল্প বলা', titleEn: 'Story Telling', description: 'ছবি দেখিয়ে গল্প বলুন। শিশুকেও গল্প বলতে বলুন।', descriptionEn: 'Tell stories from pictures. Ask child to tell stories too.', icon: '📖' },
  { id: 'a14', ageGroup: '৩-৫ বছর', ageGroupEn: '3-5 years', ageMonthsMin: 36, ageMonthsMax: 60, title: 'মিলানো খেলা', titleEn: 'Matching Games', description: 'ছবি বা কার্ড মিলানো খেলা খেলুন।', descriptionEn: 'Play picture or card matching games.', icon: '🃏' },
  { id: 'a15', ageGroup: '৩-৫ বছর', ageGroupEn: '3-5 years', ageMonthsMin: 36, ageMonthsMax: 60, title: 'প্রকৃতি হাঁটা', titleEn: 'Nature Walks', description: 'বাইরে হেঁটে গাছপালা, পাখি, ফুল চিনুন।', descriptionEn: 'Walk outside, learn about trees, birds, flowers.', icon: '🌿' },
  { id: 'a16', ageGroup: '৩-৫ বছর', ageGroupEn: '3-5 years', ageMonthsMin: 36, ageMonthsMax: 60, title: 'অক্ষর আঁকা', titleEn: 'Letter Drawing', description: 'বালিতে বা কাগজে অক্ষর আঁকুন।', descriptionEn: 'Draw letters in sand or on paper.', icon: '✍️' },
];

export const banglaFlashcards: Flashcard[] = [
  { id: 'b1', type: 'bangla', letter: 'অ', example: 'অজগর', exampleEn: 'Python (snake)', illustration: '🐍' },
  { id: 'b2', type: 'bangla', letter: 'আ', example: 'আম', exampleEn: 'Mango', illustration: '🥭' },
  { id: 'b3', type: 'bangla', letter: 'ই', example: 'ইঁদুর', exampleEn: 'Mouse', illustration: '🐭' },
  { id: 'b4', type: 'bangla', letter: 'ঈ', example: 'ঈগল', exampleEn: 'Eagle', illustration: '🦅' },
  { id: 'b5', type: 'bangla', letter: 'উ', example: 'উট', exampleEn: 'Camel', illustration: '🐪' },
  { id: 'b6', type: 'bangla', letter: 'ঊ', example: 'ঊর্ণা', exampleEn: 'Wool', illustration: '🧶' },
  { id: 'b7', type: 'bangla', letter: 'ঋ', example: 'ঋষি', exampleEn: 'Sage', illustration: '🧘' },
  { id: 'b8', type: 'bangla', letter: 'এ', example: 'এক', exampleEn: 'One', illustration: '☝️' },
  { id: 'b9', type: 'bangla', letter: 'ঐ', example: 'ঐরাবত', exampleEn: 'Elephant of Indra', illustration: '🐘' },
  { id: 'b10', type: 'bangla', letter: 'ও', example: 'ওষুধ', exampleEn: 'Medicine', illustration: '💊' },
  { id: 'b11', type: 'bangla', letter: 'ঔ', example: 'ঔষধি', exampleEn: 'Herbal plant', illustration: '🌿' },
  { id: 'b12', type: 'bangla', letter: 'ক', example: 'কলা', exampleEn: 'Banana', illustration: '🍌' },
  { id: 'b13', type: 'bangla', letter: 'খ', example: 'খরগোশ', exampleEn: 'Rabbit', illustration: '🐰' },
  { id: 'b14', type: 'bangla', letter: 'গ', example: 'গরু', exampleEn: 'Cow', illustration: '🐄' },
  { id: 'b15', type: 'bangla', letter: 'ঘ', example: 'ঘোড়া', exampleEn: 'Horse', illustration: '🐴' },
  { id: 'b16', type: 'bangla', letter: 'ঙ', example: 'ঙ্গ', exampleEn: 'Sound', illustration: '🔔' },
  { id: 'b17', type: 'bangla', letter: 'চ', example: 'চা', exampleEn: 'Tea', illustration: '🍵' },
  { id: 'b18', type: 'bangla', letter: 'ছ', example: 'ছাতা', exampleEn: 'Umbrella', illustration: '☂️' },
  { id: 'b19', type: 'bangla', letter: 'জ', example: 'জল', exampleEn: 'Water', illustration: '💧' },
  { id: 'b20', type: 'bangla', letter: 'ঝ', example: 'ঝর্ণা', exampleEn: 'Waterfall', illustration: '🏞️' },
  { id: 'b21', type: 'bangla', letter: 'ঞ', example: 'ঞ্চল', exampleEn: 'Region', illustration: '🗺️' },
];

export const englishFlashcards: Flashcard[] = [
  { id: 'e1', type: 'english', letter: 'A', example: 'Apple', exampleEn: 'Apple', illustration: '🍎' },
  { id: 'e2', type: 'english', letter: 'B', example: 'Ball', exampleEn: 'Ball', illustration: '⚽' },
  { id: 'e3', type: 'english', letter: 'C', example: 'Cat', exampleEn: 'Cat', illustration: '🐱' },
  { id: 'e4', type: 'english', letter: 'D', example: 'Dog', exampleEn: 'Dog', illustration: '🐶' },
  { id: 'e5', type: 'english', letter: 'E', example: 'Egg', exampleEn: 'Egg', illustration: '🥚' },
  { id: 'e6', type: 'english', letter: 'F', example: 'Fish', exampleEn: 'Fish', illustration: '🐟' },
  { id: 'e7', type: 'english', letter: 'G', example: 'Goat', exampleEn: 'Goat', illustration: '🐐' },
  { id: 'e8', type: 'english', letter: 'H', example: 'Hat', exampleEn: 'Hat', illustration: '🎩' },
  { id: 'e9', type: 'english', letter: 'I', example: 'Ice cream', exampleEn: 'Ice cream', illustration: '🍦' },
  { id: 'e10', type: 'english', letter: 'J', example: 'Juice', exampleEn: 'Juice', illustration: '🧃' },
];

export const funFacts: FunFact[] = [
  { id: 'ff1', fact: 'শিশুর মস্তিষ্ক জন্মের সময় প্রাপ্তবয়স্ক মস্তিষ্কের এক-চতুর্থাংশ আকারের হয় এবং ৩ বছর বয়সে ৮০% পর্যন্ত বৃদ্ধি পায়।', factEn: 'A baby\'s brain is one-quarter the size of an adult brain at birth and grows to 80% by age 3.', category: 'brain' },
  { id: 'ff2', fact: 'শিশুর প্রথম ১০০০ দিন (গর্ভধারণ থেকে ২ বছর) মস্তিষ্কের বিকাশের সবচেয়ে গুরুত্বপূর্ণ সময়।', factEn: 'The first 1000 days (conception to 2 years) are the most important for brain development.', category: 'brain' },
  { id: 'ff3', fact: 'মায়ের দুধে ২০০+ ধরনের অ্যান্টিবডি থাকে যা শিশুকে রোগ থেকে রক্ষা করে।', factEn: 'Breast milk contains 200+ types of antibodies that protect the baby from diseases.', category: 'breastfeeding' },
  { id: 'ff4', fact: 'নবজাতক প্রতিদিন গড়ে ১ মিনিট থেকে ১ ঘণ্টা পর্যন্ত কান্না কাটে।', factEn: 'Newborns cry on average between 1 minute to 1 hour per day.', category: 'baby' },
  { id: 'ff5', fact: 'শিশুর প্রথম হাসি সাধারণত ৬-৮ সপ্তাহ বয়সে দেখা যায়।', factEn: 'Baby\'s first smile usually appears at 6-8 weeks.', category: 'baby' },
  { id: 'ff6', fact: 'শিশু জন্মের সময় সব রঙ দেখতে পায় না। প্রথমে কালো-সাদা ও লাল রঙ দেখে।', factEn: 'Babies can\'t see all colors at birth. They see black, white, and red first.', category: 'baby' },
  { id: 'ff7', fact: '১ বছর বয়সে শিশু তার জন্মের সময়ের ওজনের ৩ গুণ হয়।', factEn: 'By 1 year, a baby triples their birth weight.', category: 'growth' },
  { id: 'ff8', fact: 'শিশু জন্মের সময় ৩০০টি হাড় থাকে, প্রাপ্তবয়স্ক হলে ২০৬টি হয়। কিছু হাড় একত্রিত হয়।', factEn: 'Babies are born with 300 bones, adults have 206. Some bones fuse together.', category: 'body' },
  { id: 'ff9', fact: 'গর্ভে থাকাকালীন শিশু মায়ের কণ্ঠস্বর চিনতে পারে এবং জন্মের পর তাতে সাড়া দেয়।', factEn: 'Babies recognize mother\'s voice in the womb and respond to it after birth.', category: 'prenatal' },
  { id: 'ff10', fact: 'শিশুর মস্তিষ্ক প্রতি সেকেন্ডে ৭০০+ নতুন স্নায়ু সংযোগ তৈরি করে প্রথম বছরে।', factEn: 'A baby\'s brain creates 700+ new neural connections per second in the first year.', category: 'brain' },
  { id: 'ff11', fact: 'বুকের দুধ খাওয়ানো মায়ের স্তন ক্যানসার ও ডায়াবেটিসের ঝুঁকি কমায়।', factEn: 'Breastfeeding reduces mother\'s risk of breast cancer and diabetes.', category: 'breastfeeding' },
  { id: 'ff12', fact: 'শিশুর প্রথম দাঁত সাধারণত ৬-১০ মাস বয়সে ওঠে।', factEn: 'Baby\'s first tooth usually appears at 6-10 months.', category: 'baby' },
  { id: 'ff13', fact: 'খিচুড়ি বাংলাদেশের শিশুদের জন্য একটি আদর্শ পুষ্টিকর খাবার — এতে কার্বোহাইড্রেট, প্রোটিন ও ফাইবার থাকে।', factEn: 'Khichuri is an ideal nutritious food for Bangladeshi babies — it has carbs, protein, and fiber.', category: 'nutrition' },
  { id: 'ff14', fact: 'শিশুকে বই পড়ে শোনালে ১৮ মাস বয়সেই তাদের ভাষার বিকাশ দ্রুত হয়।', factEn: 'Reading to babies speeds up language development by 18 months.', category: 'brain' },
  { id: 'ff15', fact: 'শিশু জন্মের সময় একই সাথে শ্বাস নিতে ও গিলতে পারে, প্রাপ্তবয়স্করা পারে না।', factEn: 'Babies can breathe and swallow at the same time, adults cannot.', category: 'body' },
  { id: 'ff16', fact: 'পৃথিবীতে প্রতি সেকেন্ডে ৪.৪টি শিশুর জন্ম হয়।', factEn: '4.4 babies are born every second worldwide.', category: 'general' },
  { id: 'ff17', fact: 'নবজাতকের পেটের আকার একটি চেরির সমান — তাই অল্প দুধেই পূর্ণ হয়।', factEn: 'A newborn\'s stomach is the size of a cherry — so a little milk fills it.', category: 'baby' },
  { id: 'ff18', fact: 'শিশুর প্রথম বছরে গড়ে ৬০টি কাপ পানি জাতীয় পদার্থ মায়ের দুধ থেকে পায়।', factEn: 'In the first year, a baby gets about 60 cups of fluid from breast milk.', category: 'breastfeeding' },
  { id: 'ff19', fact: 'ডিম হলো শিশুর জন্য প্রকৃতির বহুমাত্রিক পুষ্টি — প্রোটিন, আয়রণ, ভিটামিন এ, ডি সবই আছে।', factEn: 'Eggs are nature\'s multivitamin for babies — protein, iron, vitamins A, D all included.', category: 'nutrition' },
  { id: 'ff20', fact: 'শিশু জন্মের পর প্রথম সপ্তাহে ওজন কিছুটা কমে, এটি স্বাভাবিক। ২ সপ্তাহের মধ্যে ফিরে আসে।', factEn: 'Babies lose some weight in the first week, this is normal. It returns by 2 weeks.', category: 'growth' },
  { id: 'ff21', fact: 'মায়ের দুধের গন্ধ ও স্বাদ মায়ের খাবারের উপর নির্ভর করে পরিবর্তিত হয় — এটি শিশুকে বিভিন্ন স্বাদের সাথে পরিচিত করায়।', factEn: 'Breast milk flavor changes based on mother\'s diet — introducing baby to various tastes.', category: 'breastfeeding' },
  { id: 'ff22', fact: 'শিশুর প্রথম ৬ মাসে ঘুমের সময় মস্তিষ্ক দিনের শেখা সব স্মৃতিতে সংরক্ষণ করে।', factEn: 'In the first 6 months, the brain stores all daily learning during sleep.', category: 'brain' },
  { id: 'ff23', fact: 'বাংলাদেশে প্রতি বছর ৩০ লক্ষ শিশু জন্মগ্রহণ করে।', factEn: '3 million babies are born in Bangladesh every year.', category: 'general' },
  { id: 'ff24', fact: 'শিশুর ত্বক প্রাপ্তবয়স্কদের তুলনায় পাতলা ও সংবেদনশীল — তাই মৃদু সাবান ও লোশন ব্যবহার করুন।', factEn: 'Baby skin is thinner and more sensitive than adults — use mild soap and lotion.', category: 'care' },
  { id: 'ff25', fact: 'শিশুর চোখের রঙ ৬-৯ মাস বয়স পর্যন্ত পরিবর্তন হতে পারে।', factEn: 'Baby\'s eye color can change until 6-9 months of age.', category: 'baby' },
  { id: 'ff26', fact: 'শিশুর মস্তিষ্ক ২ বছর বয়সে প্রাপ্তবয়স্কদের মস্তিষ্কের চেয়ে ২.৫ গুণ বেশি শক্তি ব্যবহার করে।', factEn: 'A 2-year-old\'s brain uses 2.5 times more energy than an adult brain.', category: 'brain' },
  { id: 'ff27', fact: 'শিশুকে বই পড়ে শোনানো শুধু ভাষা বিকাশে নয়, আবেগীয় বন্ধনেও সাহায্য করে।', factEn: 'Reading to babies helps not just language development but emotional bonding.', category: 'brain' },
  { id: 'ff28', fact: 'কোলোস্ট্রাম (শালদুধ) শিশুর প্রথম টিকা — এতে আইজিএ অ্যান্টিবডি থাকে যা অন্ত্রকে সুরক্ষিত করে।', factEn: 'Colostrum is baby\'s first vaccine — it contains IgA antibodies that protect the gut.', category: 'breastfeeding' },
  { id: 'ff29', fact: 'শিশু জন্মের সময় শুনতে পারে কিন্তু দেখতে পায় না পরিষ্কার — ৬-৮ সপ্তাহে ভালো দেখতে পায়।', factEn: 'Babies can hear at birth but can\'t see clearly — vision improves by 6-8 weeks.', category: 'baby' },
  { id: 'ff30', fact: 'পুষ্টিকর খাবার শুধু শরীর নয়, মস্তিষ্কের বিকাশেও সাহায্য করে। প্রথম ৫ বছর সবচেয়ে গুরুত্বপূর্ণ।', factEn: 'Nutritious food helps not just the body but brain development too. First 5 years are most important.', category: 'nutrition' },
];

export function getActivitiesByAge(months: number): Activity[] {
  return activities.filter((a) => months >= a.ageMonthsMin && months <= a.ageMonthsMax);
}

export function getDailyFunFact(): FunFact {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return funFacts[dayOfYear % funFacts.length];
}

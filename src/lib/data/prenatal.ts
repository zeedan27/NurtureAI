// Prenatal guide by week (4-week chunks from week 4 to week 40)

export interface PrenatalGuide {
  weekStart: number;
  weekEnd: number;
  title: string;
  titleEn: string;
  development: string;
  developmentEn: string;
  tips: string;
  tipsEn: string;
  dangerSigns: string[];
  dangerSignsEn: string[];
  ancVisit: boolean;
}

export const prenatalGuides: PrenatalGuide[] = [
  {
    weekStart: 4, weekEnd: 7,
    title: 'গর্ভের প্রথম মাস',
    titleEn: 'First Month of Pregnancy',
    development: 'ভ্রূণের আকার একটি তিলের সমান। হৃদপিণ্ড ও মেরুদণ্ড গঠন শুরু হয়।',
    developmentEn: 'Embryo is the size of a poppy seed. Heart and spine begin forming.',
    tips: 'ফলিক অ্যাসিড ট্যাবলেট খান। পুষ্টিকর খাবার খান। ধূমপান ও মদ পান বন্ধ করুন।',
    tipsEn: 'Take folic acid tablets. Eat nutritious food. Stop smoking and alcohol.',
    dangerSigns: ['যোনিপথে রক্তক্ষরণ', 'প্রচণ্ড পেটে ব্যথা'],
    dangerSignsEn: ['Vaginal bleeding', 'Severe abdominal pain'],
    ancVisit: false,
  },
  {
    weekStart: 8, weekEnd: 11,
    title: 'গর্ভের দ্বিতীয় মাস',
    titleEn: 'Second Month of Pregnancy',
    development: 'ভ্রূণের আকার একটি আঙুরের সমান। অঙ্গ-প্রত্যঙ্গ গঠন শুরু। হৃদপিণ্ড স্পন্দিত হয়।',
    developmentEn: 'Embryo is grape-sized. Limbs forming. Heart is beating.',
    tips: 'বমি বমি ভাব স্বাভাবিক। সকালে শুকনো বিস্কুট খান। প্রচুর পানি পান করুন।',
    tipsEn: 'Nausea is normal. Eat dry biscuits in morning. Drink plenty of water.',
    dangerSigns: ['ভারী রক্তক্ষরণ', 'প্রচণ্ড বমি (দিনে ৩-৪ বারের বেশি)'],
    dangerSignsEn: ['Heavy bleeding', 'Severe vomiting (more than 3-4 times daily)'],
    ancVisit: true,
  },
  {
    weekStart: 12, weekEnd: 15,
    title: 'গর্ভের তৃতীয় মাস',
    titleEn: 'Third Month of Pregnancy',
    development: 'ভ্রূণের আকার একটি লেবুর সমান। সব অঙ্গ গঠিত হয়েছে। আঙুল ও পায়ের আঙুল দেখা যায়।',
    developmentEn: 'Fetus is lemon-sized. All organs formed. Fingers and toes visible.',
    tips: 'প্রথম ত্রৈমাসিক চেকআপ করুন। আয়রণ ট্যাবলেট শুরু করুন। হালকা ব্যায়াম করুন।',
    tipsEn: 'Get first trimester checkup. Start iron tablets. Light exercise.',
    dangerSigns: ['রক্তক্ষরণ', 'প্রচণ্ড মাথাব্যথা', 'জ্বর'],
    dangerSignsEn: ['Bleeding', 'Severe headache', 'Fever'],
    ancVisit: true,
  },
  {
    weekStart: 16, weekEnd: 19,
    title: 'গর্ভের চতুর্থ মাস',
    titleEn: 'Fourth Month of Pregnancy',
    development: 'ভ্রূণের আকার একটি অ্যাভোকাডোর সমান। মুখের অংশ স্পষ্ট হয়। শিশু নড়াচড়া শুরু করতে পারে।',
    developmentEn: 'Fetus is avocado-sized. Facial features clear. Baby may start moving.',
    tips: 'পুষ্টিকর খাবার বাড়ান। দুধ, ডিম, মাছ খান। নিয়মিত হাঁটুন।',
    tipsEn: 'Increase nutritious food. Eat milk, eggs, fish. Walk regularly.',
    dangerSigns: ['যোনিপথে রক্ত বা পানি আসা', 'প্রচণ্ড পেটে ব্যথা'],
    dangerSignsEn: ['Vaginal bleeding or fluid', 'Severe abdominal pain'],
    ancVisit: true,
  },
  {
    weekStart: 20, weekEnd: 23,
    title: 'গর্ভের পঞ্চম মাস',
    titleEn: 'Fifth Month of Pregnancy',
    development: 'শিশুর আকার একটি কলার সমান। মায়েরা শিশুর নড়াচড়া অনুভব করতে পারেন (কুইকেনিং)।',
    developmentEn: 'Baby is banana-sized. Mothers can feel baby moving (quickening).',
    tips: 'শিশুর নড়াচড়া অনুভব করুন। বাম কাতে ঘুমান। গরম পানিতে গোসল করবেন না।',
    tipsEn: 'Feel baby\'s movements. Sleep on left side. Don\'t bathe in hot water.',
    dangerSigns: ['শিশুর নড়াচড়া কমে যাওয়া', 'যোনিপথে রক্তক্ষরণ'],
    dangerSignsEn: ['Reduced baby movements', 'Vaginal bleeding'],
    ancVisit: true,
  },
  {
    weekStart: 24, weekEnd: 27,
    title: 'গর্ভের ষষ্ঠ মাস',
    titleEn: 'Sixth Month of Pregnancy',
    development: 'শিশুর আকার একটি ভুট্টার সমান। চোখ খোলে ও বন্ধ করে। শ্বাস-প্রশ্বাসের অনুশীলন শুরু করে।',
    developmentEn: 'Baby is corn-sized. Eyes open and close. Practices breathing.',
    tips: 'টিটির টিকা নিন। প্রচুর পানি পান করুন। আরাম করুন।',
    tipsEn: 'Get TT vaccine. Drink plenty of water. Rest well.',
    dangerSigns: ['অকালে প্রসব ব্যথা', 'পানি ভাঙা', 'রক্তক্ষরণ'],
    dangerSignsEn: ['Premature labor pain', 'Water breaking', 'Bleeding'],
    ancVisit: true,
  },
  {
    weekStart: 28, weekEnd: 31,
    title: 'গর্ভের সপ্তম মাস',
    titleEn: 'Seventh Month of Pregnancy',
    development: 'শিশুর আকার একটি নারকেলের সমান। মস্তিষ্ক দ্রুত বিকাশ লাভ করে। চর্বি জমা হয়।',
    developmentEn: 'Baby is coconut-sized. Brain develops rapidly. Fat accumulates.',
    tips: 'প্রসবের প্রস্তুতি নিন। হাসপাতালের ঠিকানা রাখুন। শিশুর নড়াচড়া গুণুন (দিনে ১০ বারের কম হলে চিকিৎসকে দেখান)।',
    tipsEn: 'Prepare for delivery. Keep hospital address. Count baby movements (less than 10/day, see doctor).',
    dangerSigns: ['শিশুর নড়াচড়া কমে যাওয়া', 'মাথা ঘোরা', চোখের সামনে ঝাপসা', 'হাত-পা ফোলা'],
    dangerSignsEn: ['Reduced baby movements', 'Dizziness', 'Blurred vision', 'Swelling of hands/feet'],
    ancVisit: true,
  },
  {
    weekStart: 32, weekEnd: 35,
    title: 'গর্ভের অষ্টম মাস',
    titleEn: 'Eighth Month of Pregnancy',
    development: 'শিশুর আকার একটি তরমুজের সমান। ফুসফুস পরিণত হচ্ছে। শিশু মাথা নিচে নামে।',
    developmentEn: 'Baby is watermelon-sized. Lungs maturing. Baby moves head down.',
    tips: 'প্রসবের ব্যাগ তৈরি রাখুন। জরুরি ফোন নম্বর সংরক্ষণ করুন। বিশ্রাম নিন।',
    tipsEn: 'Keep delivery bag ready. Save emergency numbers. Rest.',
    dangerSigns: ['প্রসব ব্যথা শুরু', 'পানি ভাঙা', 'রক্তক্ষরণ', 'শিশুর নড়াচড়া কমা'],
    dangerSignsEn: ['Labor pain starts', 'Water breaking', 'Bleeding', 'Reduced movements'],
    ancVisit: true,
  },
  {
    weekStart: 36, weekEnd: 40,
    title: 'গর্ভের নবম মাস',
    titleEn: 'Ninth Month of Pregnancy',
    development: 'শিশু সম্পূর্ণ পরিণত। ওজন প্রায় ৩-৩.৫ কেজি। প্রসবের জন্য প্রস্তুত।',
    developmentEn: 'Baby is fully developed. Weight about 3-3.5 kg. Ready for birth.',
    tips: 'প্রসব চিহ্ন চিনুন: নিয়মিত ব্যথা, পানি ভাঙা, রক্ত স্রাব। হাসপাতালে যাওয়ার পরিকল্পনা প্রস্তুত রাখুন।',
    tipsEn: 'Recognize labor signs: regular contractions, water breaking, blood show. Keep hospital plan ready.',
    dangerSigns: ['প্রসব ব্যথা ৫ মিনিটের কম ব্যবধানে', 'পানি ভাঙা', 'রক্তক্ষরণ', 'শিশুর নড়াচড়া বন্ধ'],
    dangerSignsEn: ['Contractions less than 5 min apart', 'Water breaking', 'Bleeding', 'No baby movements'],
    ancVisit: true,
  },
];

export const allDangerSigns = [
  { bn: 'যোনিপথে রক্তক্ষরণ', en: 'Vaginal bleeding' },
  { bn: 'প্রচণ্ড মাথাব্যথা', en: 'Severe headache' },
  { bn: 'ঝাপসা দৃষ্টি', en: 'Blurred vision' },
  { bn: 'শিশুর নড়াচড়া কমে যাওয়া', en: 'Reduced fetal movement' },
  { bn: 'উচ্চ জ্বর', en: 'High fever' },
  { bn: 'প্রচণ্ড পেটে ব্যথা', en: 'Severe abdominal pain' },
  { bn: 'হাত-পা-মুখ ফোলা', en: 'Swelling of hands/feet/face' },
  { bn: 'পানি ভাঙা (অকালে)', en: 'Water breaking (premature)' },
];

export function getPrenatalGuideByWeek(week: number): PrenatalGuide | undefined {
  return prenatalGuides.find((g) => week >= g.weekStart && week <= g.weekEnd);
}

export function getANCWeeks(): number[] {
  return prenatalGuides.filter((g) => g.ancVisit).map((g) => g.weekStart);
}

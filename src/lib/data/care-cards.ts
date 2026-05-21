// Daily Care Cards by Age Band
// Age-adaptive daily guidance for parents

export interface CareTask {
  icon: string;
  text: string;
  textEn: string;
}

export interface CareCard {
  ageBand: string;
  ageBandEn: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  title: string;
  titleEn: string;
  tasks: CareTask[];
}

export const careCards: CareCard[] = [
  {
    ageBand: 'গর্ভকালীন',
    ageBandEn: 'Prenatal',
    ageMonthsMin: -36,
    ageMonthsMax: 0,
    title: 'গর্ভকালীন যত্ন',
    titleEn: 'Prenatal Care',
    tasks: [
      { icon: '🏥', text: 'এএনসি চেকআপ নিয়মিত করুন', textEn: 'Regular ANC checkups' },
      { icon: '💊', text: 'আয়রণ ও ফলিক অ্যাসিড ট্যাবলেট খান', textEn: 'Take iron and folic acid tablets' },
      { icon: '🥛', text: 'দুধ, ডিম, সবুজ শাক খান', textEn: 'Eat milk, eggs, green vegetables' },
      { icon: '🚶‍♀️', text: 'হালকা হাঁটুন প্রতিদিন', textEn: 'Light walk daily' },
      { icon: '⚠️', text: 'রক্তক্ষরণ হলে তাড়াতাড়ি হাসপাতালে যান', textEn: 'Go to hospital immediately if bleeding' },
      { icon: '💧', text: 'প্রচুর পানি পান করুন', textEn: 'Drink plenty of water' },
    ],
  },
  {
    ageBand: '০-১ মাস',
    ageBandEn: '0-1 Month',
    ageMonthsMin: 0,
    ageMonthsMax: 1,
    title: 'নবজাতক যত্ন',
    titleEn: 'Newborn Care',
    tasks: [
      { icon: '🤱', text: 'শুধুমাত্র মায়ের দুধ খাওয়ান, ঘন ঘন', textEn: 'Exclusive breastfeeding, frequent' },
      { icon: '🌡️', text: 'শিশুকে উষ্ণ রাখুন', textEn: 'Keep baby warm' },
      { icon: '🧴', text: 'নাড়ির যত্ন নিন, শুকনো রাখুন', textEn: 'Care for umbilical cord, keep dry' },
      { icon: '🛏️', text: 'পিঠের উপর শুইয়ে ঘুমান', textEn: 'Sleep baby on back' },
      { icon: '🧼', text: 'হাত ধুয়ে শিশুকে ধরুন', textEn: 'Wash hands before handling baby' },
      { icon: '💉', text: 'বিসিজি ও হেপাটাইটিস বি টিকা দিন', textEn: 'Give BCG and Hepatitis B vaccines' },
    ],
  },
  {
    ageBand: '১-৩ মাস',
    ageBandEn: '1-3 Months',
    ageMonthsMin: 1,
    ageMonthsMax: 3,
    title: 'শিশুর যত্ন',
    titleEn: 'Baby Care',
    tasks: [
      { icon: '🤱', text: 'মায়ের দুধ চাহিদা অনুযায়ী খাওয়ান', textEn: 'Breastfeed on demand' },
      { icon: '🗣️', text: 'শিশুর সাথে কথা বলুন', textEn: 'Talk to your baby' },
      { icon: '😴', text: 'উপুড় করে তোলার সময় দিন (সুপারভাইজড)', textEn: 'Supervised tummy time' },
      { icon: '🎵', text: 'গান শোনান বা ঘুমের গান গান', textEn: 'Sing or play lullabies' },
      { icon: '👀', text: 'রঙিন জিনিস দেখান', textEn: 'Show colorful objects' },
      { icon: '💉', text: 'টিকার সময়সূচি মেনে চলুন', textEn: 'Follow vaccination schedule' },
    ],
  },
  {
    ageBand: '৩-৬ মাস',
    ageBandEn: '3-6 Months',
    ageMonthsMin: 3,
    ageMonthsMax: 6,
    title: 'শিশুর বিকাশ',
    titleEn: 'Baby Development',
    tasks: [
      { icon: '🤱', text: 'মায়ের দুধ চালিয়ে যান', textEn: 'Continue breastfeeding' },
      { icon: '🧸', text: 'খেলনা ধরতে সাহায্য করুন', textEn: 'Help baby grasp toys' },
      { icon: '😊', text: 'হাসাহাসি করুন শিশুর সাথে', textEn: 'Smile and laugh with baby' },
      { icon: '🔄', text: 'গড়ানোর সুযোগ দিন', textEn: 'Allow rolling practice' },
      { icon: '📖', text: ছবির বই দেখান', textEn: 'Show picture books' },
      { icon: '🍽️', text: '৬ মাসের কাছাকাছি পরিপূরক খাবারের প্রস্তুতি নিন', textEn: 'Prepare for complementary foods near 6 months' },
    ],
  },
  {
    ageBand: '৬-১২ মাস',
    ageBandEn: '6-12 Months',
    ageMonthsMin: 6,
    ageMonthsMax: 12,
    title: 'পরিপূরক খাদ্য ও খেলা',
    titleEn: 'Complementary Feeding & Play',
    tasks: [
      { icon: '🥣', text: 'পরিপূরক খাবার দিন দিনে ২-৩ বার', textEn: 'Give complementary food 2-3 times daily' },
      { icon: '🤱', text: 'মায়ের দুধ চালিয়ে যান', textEn: 'Continue breastfeeding' },
      { icon: '👶', text: 'বসার ও হামাগুড়ির সুযোগ দিন', textEn: 'Allow sitting and crawling practice' },
      { icon: '🎭', text: 'লুকোচুরি খেলুন', textEn: 'Play peek-a-boo' },
      { icon: '🎵', text: 'ছড়া ও গান শোনান', textEn: 'Rhymes and songs' },
      { icon: '🛡️', text: 'বাচ্চার নিরাপত্তা নিশ্চিত করুন', textEn: 'Ensure baby safety' },
    ],
  },
  {
    ageBand: '১-২ বছর',
    ageBandEn: '1-2 Years',
    ageMonthsMin: 12,
    ageMonthsMax: 24,
    title: 'হাঁটা ও কথা বলা',
    titleEn: 'Walking & Talking',
    tasks: [
      { icon: '🍚', text: 'পরিবারের খাবার নরম করে দিন', textEn: 'Give soft family food' },
      { icon: '🚶', text: 'হাঁটার সুযোগ দিন', textEn: 'Allow walking practice' },
      { icon: '📚', text: গল্পের বই পড়ুন', textEn: 'Read story books' },
      { icon: '🎨', text: 'আঁকাআঁকি করতে দিন', textEn: 'Allow drawing' },
      { icon: '🗣️', text: 'শিশুর কথা শুনুন ও সাড়া দিন', textEn: 'Listen and respond to baby\'s words' },
      { icon: '🧩', text: 'সহজ ধাঁধা দিন', textEn: 'Give simple puzzles' },
    ],
  },
  {
    ageBand: '২-৩ বছর',
    ageBandEn: '2-3 Years',
    ageMonthsMin: 24,
    ageMonthsMax: 36,
    title: 'খেলা ও শেখা',
    titleEn: 'Play & Learn',
    tasks: [
      { icon: '🍽️', text: 'স্বাস্থ্যকর খাবার দিন ৩ বেলা', textEn: 'Give healthy food 3 times' },
      { icon: '🏃', text: 'দৌড়াদৌড়ি ও খেলাধুলা করুন', textEn: 'Run and play' },
      { icon: '🔤', text: 'বর্ণমালা পরিচিত করুন', textEn: 'Introduce alphabet' },
      { icon: '🔢', text: 'গুণতে শেখান', textEn: 'Teach counting' },
      { icon: '🚸', text: 'রাস্তা পার হওয়ার নিয়ম শেখান', textEn: 'Teach road safety' },
      { icon: '🪥', text: 'দাঁত ব্রাশ করার অভ্যাস করুন', textEn: 'Build tooth brushing habit' },
    ],
  },
  {
    ageBand: '৩-৫ বছর',
    ageBandEn: '3-5 Years',
    ageMonthsMin: 36,
    ageMonthsMax: 60,
    title: 'স্কুল প্রস্তুতি',
    titleEn: 'School Readiness',
    tasks: [
      { icon: '📖', text: 'প্রতিদিন গল্প পড়ুন', textEn: 'Read stories daily' },
      { icon: '✏️', text: 'অক্ষর লেখার অনুশীলন করুন', textEn: 'Practice writing letters' },
      { icon: '🎨', text: 'আঁকাআঁকি ও রঙ করুন', textEn: 'Draw and color' },
      { icon: '🤝', text: 'অন্যদের সাথে খেলতে শেখান', textEn: 'Teach playing with others' },
      { icon: '🧮', text: 'সংখ্যা ও গণনা শেখান', textEn: 'Teach numbers and counting' },
      { icon: '🌳', text: 'বাইরে খেলার সুযোগ দিন', textEn: 'Allow outdoor play' },
    ],
  },
];

export function getCareCardByAge(months: number): CareCard {
  return careCards.find((c) => months >= c.ageMonthsMin && months <= c.ageMonthsMax) || careCards[careCards.length - 1];
}

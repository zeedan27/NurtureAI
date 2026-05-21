// Bangladesh EPI (Expanded Programme on Immunization) Vaccination Schedule
// Based on the national immunization schedule of Bangladesh

export interface Vaccine {
  id: string;
  name: string; // Bangla
  nameEn: string;
  ageWeeks: number;
  description: string; // Bangla
  descriptionEn: string;
  sideEffects?: string; // Bangla
  sideEffectsEn?: string;
}

export interface VaccineGroup {
  id: string;
  ageLabel: string; // Bangla
  ageLabelEn: string;
  ageWeeks: number;
  vaccines: Vaccine[];
}

export const vaccineGroups: VaccineGroup[] = [
  {
    id: 'birth',
    ageLabel: 'জন্মের সময়',
    ageLabelEn: 'At Birth',
    ageWeeks: 0,
    vaccines: [
      {
        id: 'bcg',
        name: 'বিসিজি',
        nameEn: 'BCG',
        ageWeeks: 0,
        description: 'যক্ষ্মা প্রতিরোধের টিকা। বাম হাতের উপরে দেওয়া হয়।',
        descriptionEn: 'Vaccine to prevent tuberculosis. Given on the upper left arm.',
        sideEffects: 'ইঞ্জেকশনের জায়গায় ছোট ফোঁড়া হতে পারে, ২-৩ সপ্তাহ পর সামান্য পুঁজ বের হতে পারে। এটি স্বাভাবিক।',
        sideEffectsEn: 'A small sore may appear at the injection site, slight pus may come out after 2-3 weeks. This is normal.',
      },
      {
        id: 'hepb-birth',
        name: 'হেপাটাইটিস বি (জন্মকালীন)',
        nameEn: 'Hepatitis B (Birth Dose)',
        ageWeeks: 0,
        description: 'হেপাটাইটিস বি রোগ প্রতিরোধের টিকা। ডান উরুতে দেওয়া হয়।',
        descriptionEn: 'Vaccine to prevent Hepatitis B. Given on the right thigh.',
        sideEffects: 'সামান্য জ্বর বা ইঞ্জেকশনের জায়গায় ব্যথা হতে পারে।',
        sideEffectsEn: 'Mild fever or pain at the injection site may occur.',
      },
      {
        id: 'opv-0',
        name: 'পোলিও টিকা-০ (ওপিভি)',
        nameEn: 'OPV-0 (Oral Polio Vaccine)',
        ageWeeks: 0,
        description: 'পোলিও রোগ প্রতিরোধের মুখে খাওয়ার টিকা। জন্মের পর যত দ্রুত সম্ভব দিতে হবে।',
        descriptionEn: 'Oral vaccine to prevent polio. Should be given as soon as possible after birth.',
        sideEffects: 'সাধারণত কোনো পার্শ্বপ্রতিক্রিয়া হয় না।',
        sideEffectsEn: 'Usually no side effects.',
      },
    ],
  },
  {
    id: '6-weeks',
    ageLabel: '৬ সপ্তাহ',
    ageLabelEn: '6 Weeks',
    ageWeeks: 6,
    vaccines: [
      {
        id: 'opv-1',
        name: 'পোলিও টিকা-১ (ওপিভি)',
        nameEn: 'OPV-1',
        ageWeeks: 6,
        description: 'পোলিও রোগ প্রতিরোধের প্রথম ডোজ। মুখে খাওয়ার টিকা।',
        descriptionEn: 'First dose of oral polio vaccine.',
        sideEffects: 'সাধারণত কোনো পার্শ্বপ্রতিক্রিয়া হয় না।',
        sideEffectsEn: 'Usually no side effects.',
      },
      {
        id: 'penta-1',
        name: 'পেন্টাভ্যালেন্ট-১',
        nameEn: 'Pentavalent-1',
        ageWeeks: 6,
        description: 'পাঁচটি রোগ প্রতিরোধের টিকা: ডিপথেরিয়া, পারটুসিস, টিটেনাস, হেপাটাইটিস বি, হিমোফাইলাস ইনফ্লুয়েঞ্জা। বাম উরুতে দেওয়া হয়।',
        descriptionEn: 'Vaccine against five diseases: Diphtheria, Pertussis, Tetanus, Hepatitis B, Haemophilus Influenzae. Given on the left thigh.',
        sideEffects: 'সামান্য জ্বর, ইঞ্জেকশনের জায়গায় লালভাব বা ফোলাভাব হতে পারে। ১-২ দিনের মধ্যে সেরে যায়।',
        sideEffectsEn: 'Mild fever, redness or swelling at injection site may occur. Resolves within 1-2 days.',
      },
      {
        id: 'pcv-1',
        name: 'নিউমোকক্কাল টিকা-১ (পিসিভি)',
        nameEn: 'PCV-1 (Pneumococcal Conjugate Vaccine)',
        ageWeeks: 6,
        description: 'নিউমোনিয়া ও মেনিনজাইটিস প্রতিরোধের টিকা। ডান উরুতে দেওয়া হয়।',
        descriptionEn: 'Vaccine to prevent pneumonia and meningitis. Given on the right thigh.',
        sideEffects: 'সামান্য জ্বর, খাওয়ায় অনীহা হতে পারে।',
        sideEffectsEn: 'Mild fever, loss of appetite may occur.',
      },
      {
        id: 'rota-1',
        name: 'রোটা ভাইরাস টিকা-১',
        nameEn: 'Rotavirus Vaccine-1',
        ageWeeks: 6,
        description: 'রোটা ভাইরাসজনিত ডায়রিয়া প্রতিরোধের মুখে খাওয়ার টিকা।',
        descriptionEn: 'Oral vaccine to prevent rotavirus diarrhea.',
        sideEffects: 'সামান্য ডায়রিয়া বা বমি হতে পারে। গুরুতর পার্শ্বপ্রতিক্রিয়া বিরল।',
        sideEffectsEn: 'Mild diarrhea or vomiting may occur. Serious side effects are rare.',
      },
    ],
  },
  {
    id: '10-weeks',
    ageLabel: '১০ সপ্তাহ',
    ageLabelEn: '10 Weeks',
    ageWeeks: 10,
    vaccines: [
      {
        id: 'opv-2',
        name: 'পোলিও টিকা-২ (ওপিভি)',
        nameEn: 'OPV-2',
        ageWeeks: 10,
        description: 'পোলিও রোগ প্রতিরোধের দ্বিতীয় ডোজ।',
        descriptionEn: 'Second dose of oral polio vaccine.',
        sideEffects: 'সাধারণত কোনো পার্শ্বপ্রতিক্রিয়া হয় না।',
        sideEffectsEn: 'Usually no side effects.',
      },
      {
        id: 'penta-2',
        name: 'পেন্টাভ্যালেন্ট-২',
        nameEn: 'Pentavalent-2',
        ageWeeks: 10,
        description: 'পাঁচটি রোগ প্রতিরোধের দ্বিতীয় ডোজ। বাম উরুতে দেওয়া হয়।',
        descriptionEn: 'Second dose of the five-disease vaccine. Given on the left thigh.',
        sideEffects: 'সামান্য জ্বর, ইঞ্জেকশনের জায়গায় ব্যথা হতে পারে।',
        sideEffectsEn: 'Mild fever, pain at injection site may occur.',
      },
      {
        id: 'pcv-2',
        name: 'নিউমোকক্কাল টিকা-২ (পিসিভি)',
        nameEn: 'PCV-2',
        ageWeeks: 10,
        description: 'নিউমোনিয়া প্রতিরোধের দ্বিতীয় ডোজ। ডান উরুতে দেওয়া হয়।',
        descriptionEn: 'Second dose of pneumonia vaccine. Given on the right thigh.',
        sideEffects: 'সামান্য জ্বর, ইঞ্জেকশনের জায়গায় ফোলাভাব হতে পারে।',
        sideEffectsEn: 'Mild fever, swelling at injection site may occur.',
      },
      {
        id: 'rota-2',
        name: 'রোটা ভাইরাস টিকা-২',
        nameEn: 'Rotavirus Vaccine-2',
        ageWeeks: 10,
        description: 'রোটা ভাইরাসজনিত ডায়রিয়া প্রতিরোধের দ্বিতীয় ডোজ।',
        descriptionEn: 'Second dose of rotavirus diarrhea vaccine.',
        sideEffects: 'সামান্য পেট খারাপ হতে পারে।',
        sideEffectsEn: 'Mild stomach upset may occur.',
      },
    ],
  },
  {
    id: '14-weeks',
    ageLabel: '১৪ সপ্তাহ',
    ageLabelEn: '14 Weeks',
    ageWeeks: 14,
    vaccines: [
      {
        id: 'opv-3',
        name: 'পোলিও টিকা-৩ (ওপিভি)',
        nameEn: 'OPV-3',
        ageWeeks: 14,
        description: 'পোলিও রোগ প্রতিরোধের তৃতীয় ডোজ।',
        descriptionEn: 'Third dose of oral polio vaccine.',
        sideEffects: 'সাধারণত কোনো পার্শ্বপ্রতিক্রিয়া হয় না।',
        sideEffectsEn: 'Usually no side effects.',
      },
      {
        id: 'penta-3',
        name: 'পেন্টাভ্যালেন্ট-৩',
        nameEn: 'Pentavalent-3',
        ageWeeks: 14,
        description: 'পাঁচটি রোগ প্রতিরোধের তৃতীয় ও শেষ ডোজ। বাম উরুতে দেওয়া হয়।',
        descriptionEn: 'Third and final dose of the five-disease vaccine. Given on the left thigh.',
        sideEffects: 'সামান্য জ্বর, দুর্বলতা হতে পারে। ১-২ দিনে সেরে যায়।',
        sideEffectsEn: 'Mild fever, weakness may occur. Resolves within 1-2 days.',
      },
      {
        id: 'pcv-3',
        name: 'নিউমোকক্কাল টিকা-৩ (পিসিভি)',
        nameEn: 'PCV-3',
        ageWeeks: 14,
        description: 'নিউমোনিয়া প্রতিরোধের তৃতীয় ডোজ। ডান উরুতে দেওয়া হয়।',
        descriptionEn: 'Third dose of pneumonia vaccine. Given on the right thigh.',
        sideEffects: 'সামান্য জ্বর বা ইঞ্জেকশনের জায়গায় ব্যথা হতে পারে।',
        sideEffectsEn: 'Mild fever or pain at injection site may occur.',
      },
      {
        id: 'ipv',
        name: 'ইনজেক্টেবল পোলিও টিকা (আইপিভি)',
        nameEn: 'IPV (Inactivated Polio Vaccine)',
        ageWeeks: 14,
        description: 'পোলিও রোগ প্রতিরোধের ইঞ্জেকশন টিকা। ডান হাতে দেওয়া হয়।',
        descriptionEn: 'Injectable polio vaccine. Given on the right arm.',
        sideEffects: 'ইঞ্জেকশনের জায়গায় লালভাব, সামান্য ব্যথা হতে পারে।',
        sideEffectsEn: 'Redness, mild pain at injection site may occur.',
      },
    ],
  },
  {
    id: '9-months',
    ageLabel: '৯ মাস',
    ageLabelEn: '9 Months',
    ageWeeks: 39,
    vaccines: [
      {
        id: 'mr-1',
        name: 'হাম-রুবেলা টিকা-১ (এমআর)',
        nameEn: 'MR-1 (Measles-Rubella)',
        ageWeeks: 39,
        description: 'হাম ও রুবেলা রোগ প্রতিরোধের প্রথম ডোজ। ডান হাতে দেওয়া হয়।',
        descriptionEn: 'First dose of measles and rubella vaccine. Given on the right arm.',
        sideEffects: 'টিকার ৫-১২ দিন পর সামান্য জ্বর ও দুর্বলভাব হতে পারে। চিকিৎসকের পরামর্শ নিন।',
        sideEffectsEn: 'Mild fever and weakness may occur 5-12 days after vaccination. Consult a doctor if needed.',
      },
    ],
  },
  {
    id: '15-months',
    ageLabel: '১৫ মাস',
    ageLabelEn: '15 Months',
    ageWeeks: 65,
    vaccines: [
      {
        id: 'mr-2',
        name: 'হাম-রুবেলা টিকা-২ (এমআর)',
        nameEn: 'MR-2 (Measles-Rubella)',
        ageWeeks: 65,
        description: 'হাম ও রুবেলা রোগ প্রতিরোধের দ্বিতীয় ডোজ। ডান হাতে দেওয়া হয়।',
        descriptionEn: 'Second dose of measles and rubella vaccine. Given on the right arm.',
        sideEffects: 'সামান্য জ্বর বা ফুসকুড়ি হতে পারে। গুরুতর কিছু হলে চিকিৎসকে দেখান।',
        sideEffectsEn: 'Mild fever or rash may occur. See a doctor if anything serious happens.',
      },
    ],
  },
  {
    id: '12-15-months',
    ageLabel: '১২-১৫ মাস (স্থানীয় এলাকায়)',
    ageLabelEn: '12-15 Months (Endemic Areas)',
    ageWeeks: 52,
    vaccines: [
      {
        id: 'je',
        name: 'জাপানিজ এনসেফালাইটিস টিকা (জেই)',
        nameEn: 'JE (Japanese Encephalitis)',
        ageWeeks: 52,
        description: 'জাপানিজ এনসেফালাইটিস রোগ প্রতিরোধের টিকা। শুধু স্থানীয় এলাকায় দেওয়া হয়। বাম হাতে দেওয়া হয়।',
        descriptionEn: 'Vaccine to prevent Japanese Encephalitis. Given only in endemic areas. Given on the left arm.',
        sideEffects: 'সামান্য জ্বর, মাথাব্যথা, ইঞ্জেকশনের জায়গায় ব্যথা হতে পারে।',
        sideEffectsEn: 'Mild fever, headache, pain at injection site may occur.',
      },
    ],
  },
];

export const allVaccines: Vaccine[] = vaccineGroups.flatMap((g) => g.vaccines);

export function getVaccinesByAgeWeeks(ageWeeks: number): Vaccine[] {
  return allVaccines.filter((v) => v.ageWeeks <= ageWeeks);
}

export function getPendingVaccines(completedVaccineIds: string[]): Vaccine[] {
  return allVaccines.filter((v) => !completedVaccineIds.includes(v.id));
}

export function getNextDueVaccine(ageWeeks: number, completedVaccineIds: string[]): Vaccine | undefined {
  const pending = allVaccines.filter(
    (v) => !completedVaccineIds.includes(v.id) && v.ageWeeks >= ageWeeks
  );
  return pending.sort((a, b) => a.ageWeeks - b.ageWeeks)[0];
}

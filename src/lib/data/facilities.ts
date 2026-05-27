// Static facility data for Bangladesh
// Upazila Health Complexes, District Hospitals, Medical College Hospitals

export interface Facility {
  id: string;
  name: string;
  nameEn: string;
  type: 'uhc' | 'district' | 'medical_college';
  upazila: string;
  district: string;
  division: string;
  address: string;
  phone: string;
  bedsTotal: number;
  bedsAvailable: number;
  hasOxygen: boolean;
  hasPediatric: boolean;
  hasPower: boolean;
  latitude: number;
  longitude: number;
  lastUpdated: string; // ISO string with realistic offset
}

export const facilityTypes = {
  uhc: { bn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', en: 'Upazila Health Complex' },
  district: { bn: 'জেলা সদর হাসপাতাল', en: 'District Sadar Hospital' },
  medical_college: { bn: 'মেডিকেল কলেজ হাসপাতাল', en: 'Medical College Hospital' },
};

// Helper: create realistic timestamp offsets
function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

export const facilities: Facility[] = [
  // ── Dhaka Division ──
  {
    id: 'f-1',
    name: 'মিরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Mirpur Upazila Health Complex',
    type: 'uhc',
    upazila: 'mirpur',
    district: 'dhaka-district',
    division: 'dhaka',
    address: 'মিরপুর-১০, ঢাকা',
    phone: '02-8012345',
    bedsTotal: 50,
    bedsAvailable: 12,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.7935,
    longitude: 90.3639,
    lastUpdated: hoursAgo(3),
  },
  {
    id: 'f-2',
    name: 'সাভার উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Savar Upazila Health Complex',
    type: 'uhc',
    upazila: 'savar',
    district: 'dhaka-district',
    division: 'dhaka',
    address: 'সাভার, ঢাকা',
    phone: '02-7712345',
    bedsTotal: 50,
    bedsAvailable: 8,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: false,
    latitude: 23.8591,
    longitude: 90.2567,
    lastUpdated: hoursAgo(8),
  },
  {
    id: 'f-3',
    name: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Dhaka Medical College Hospital',
    type: 'medical_college',
    upazila: 'dhanmondi',
    district: 'dhaka-district',
    division: 'dhaka',
    address: 'বকশীবাজার, ঢাকা-১০০০',
    phone: '02-8612345',
    bedsTotal: 2600,
    bedsAvailable: 150,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.7274,
    longitude: 90.3894,
    lastUpdated: hoursAgo(1),
  },
  {
    id: 'f-7',
    name: 'গাজীপুর সদর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Gazipur Sadar Upazila Health Complex',
    type: 'uhc',
    upazila: 'gazipur-sadar',
    district: 'gazipur',
    division: 'dhaka',
    address: 'গাজীপুর সদর, গাজীপুর',
    phone: '02-9251234',
    bedsTotal: 50,
    bedsAvailable: 15,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.8893,
    longitude: 90.3618,
    lastUpdated: hoursAgo(5),
  },
  {
    id: 'f-13',
    name: 'নারায়ণগঞ্জ সদর জেলা হাসপাতাল',
    nameEn: 'Narayanganj Sadar District Hospital',
    type: 'district',
    upazila: 'narayanganj-sadar',
    district: 'narayanganj',
    division: 'dhaka',
    address: 'নারায়ণগঞ্জ সদর, নারায়ণগঞ্জ',
    phone: '02-7612345',
    bedsTotal: 200,
    bedsAvailable: 20,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.6238,
    longitude: 90.5000,
    lastUpdated: hoursAgo(2),
  },

  // ── Chittagong Division ──
  {
    id: 'f-8',
    name: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Chittagong Medical College Hospital',
    type: 'medical_college',
    upazila: 'chittagong-sadar',
    district: 'chittagong-district',
    division: 'chittagong',
    address: 'চট্টগ্রাম সদর, চট্টগ্রাম',
    phone: '031-612345',
    bedsTotal: 900,
    bedsAvailable: 60,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 22.3358,
    longitude: 91.8266,
    lastUpdated: hoursAgo(4),
  },
  {
    id: 'f-6',
    name: 'কুমিল্লা সদর জেলা হাসপাতাল',
    nameEn: 'Comilla Sadar District Hospital',
    type: 'district',
    upazila: 'comilla-sadar',
    district: 'comilla',
    division: 'chittagong',
    address: 'কুমিল্লা সদর, কুমিল্লা',
    phone: '081-61234',
    bedsTotal: 250,
    bedsAvailable: 30,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.4607,
    longitude: 91.1809,
    lastUpdated: hoursAgo(6),
  },
  {
    id: 'f-15',
    name: 'কক্সবাজার সদর জেলা হাসপাতাল',
    nameEn: "Cox's Bazar Sadar District Hospital",
    type: 'district',
    upazila: 'coxsbazar-sadar',
    district: 'coxsbazar',
    division: 'chittagong',
    address: 'কক্সবাজার সদর, কক্সবাজার',
    phone: '0341-61234',
    bedsTotal: 200,
    bedsAvailable: 18,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 21.4272,
    longitude: 92.0058,
    lastUpdated: hoursAgo(26), // stale — triggers 24h warning
  },

  // ── Rajshahi Division ──
  {
    id: 'f-5',
    name: 'রাজশাহী মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Rajshahi Medical College Hospital',
    type: 'medical_college',
    upazila: 'rajshahi-sadar',
    district: 'rajshahi-district',
    division: 'rajshahi',
    address: 'রাজশাহী সদর, রাজশাহী',
    phone: '0721-770345',
    bedsTotal: 700,
    bedsAvailable: 80,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 24.3663,
    longitude: 88.6258,
    lastUpdated: hoursAgo(7),
  },

  // ── Khulna Division ──
  {
    id: 'f-11',
    name: 'খুলনা মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Khulna Medical College Hospital',
    type: 'medical_college',
    upazila: 'khulna-sadar',
    district: 'khulna-district',
    division: 'khulna',
    address: 'খুলনা সদর, খুলনা',
    phone: '041-712345',
    bedsTotal: 500,
    bedsAvailable: 35,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 22.8157,
    longitude: 89.5317,
    lastUpdated: hoursAgo(2),
  },
  {
    id: 'f-16',
    name: 'বটিয়াঘাটা উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Batiaghata Upazila Health Complex',
    type: 'uhc',
    upazila: 'dighalia',
    district: 'khulna-district',
    division: 'khulna',
    address: 'বটিয়াঘাটা, খুলনা',
    phone: '041-780123',
    bedsTotal: 31,
    bedsAvailable: 8,
    hasOxygen: true,
    hasPediatric: false,
    hasPower: true,
    latitude: 22.7350,
    longitude: 89.5100,
    lastUpdated: hoursAgo(4),
  },
  {
    id: 'f-17',
    name: 'ডিঘলিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Dighalia Upazila Health Complex',
    type: 'uhc',
    upazila: 'dighalia',
    district: 'khulna-district',
    division: 'khulna',
    address: 'ডিঘলিয়া, খুলনা',
    phone: '041-780234',
    bedsTotal: 31,
    bedsAvailable: 5,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: false,
    latitude: 22.8900,
    longitude: 89.5200,
    lastUpdated: hoursAgo(28), // stale — triggers 24h warning
  },
  {
    id: 'f-18',
    name: 'যশোর সদর জেলা হাসপাতাল',
    nameEn: 'Jessore Sadar District Hospital',
    type: 'district',
    upazila: 'jessore-sadar',
    district: 'jessore',
    division: 'khulna',
    address: 'যশোর সদর, যশোর',
    phone: '0421-61234',
    bedsTotal: 200,
    bedsAvailable: 22,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.1700,
    longitude: 89.2100,
    lastUpdated: hoursAgo(10),
  },
  {
    id: 'f-19',
    name: 'কুষ্টিয়া সদর জেলা হাসপাতাল',
    nameEn: 'Kushtia Sadar District Hospital',
    type: 'district',
    upazila: 'kushtia-sadar',
    district: 'kushtia',
    division: 'khulna',
    address: 'কুষ্টিয়া সদর, কুষ্টিয়া',
    phone: '071-61234',
    bedsTotal: 150,
    bedsAvailable: 18,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 23.9000,
    longitude: 89.1200,
    lastUpdated: hoursAgo(6),
  },
  {
    id: 'f-20',
    name: 'সাতক্ষীরা সদর জেলা হাসপাতাল',
    nameEn: 'Satkhira Sadar District Hospital',
    type: 'district',
    upazila: 'satkhira-sadar',
    district: 'satkhira',
    division: 'khulna',
    address: 'সাতক্ষীরা সদর, সাতক্ষীরা',
    phone: '0471-61234',
    bedsTotal: 150,
    bedsAvailable: 12,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 22.7200,
    longitude: 89.0700,
    lastUpdated: hoursAgo(15),
  },

  // ── Barishal Division ──
  {
    id: 'f-4',
    name: 'শেরেবাংলা মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Sher-e-Bangla Medical College Hospital',
    type: 'medical_college',
    upazila: 'barishal-sadar',
    district: 'barishal-district',
    division: 'barishal',
    address: 'বরিশাল সদর, বরিশাল',
    phone: '0431-512345',
    bedsTotal: 500,
    bedsAvailable: 45,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 22.7010,
    longitude: 90.3637,
    lastUpdated: hoursAgo(3),
  },

  // ── Sylhet Division ──
  {
    id: 'f-9',
    name: 'সিলেট মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Sylhet Medical College Hospital',
    type: 'medical_college',
    upazila: 'sylhet-sadar',
    district: 'sylhet-district',
    division: 'sylhet',
    address: 'সিলেট সদর, সিলেট',
    phone: '0821-712345',
    bedsTotal: 600,
    bedsAvailable: 55,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 24.8990,
    longitude: 91.8680,
    lastUpdated: hoursAgo(5),
  },

  // ── Rangpur Division ──
  {
    id: 'f-10',
    name: 'রংপুর মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Rangpur Medical College Hospital',
    type: 'medical_college',
    upazila: 'rangpur-sadar',
    district: 'rangpur-district',
    division: 'rangpur',
    address: 'রংপুর সদর, রংপুর',
    phone: '0521-61234',
    bedsTotal: 500,
    bedsAvailable: 40,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 25.7466,
    longitude: 89.2495,
    lastUpdated: hoursAgo(9),
  },
  {
    id: 'f-14',
    name: 'দিনাজপুর সদর জেলা হাসপাতাল',
    nameEn: 'Dinajpur Sadar District Hospital',
    type: 'district',
    upazila: 'dinajpur-sadar',
    district: 'dinajpur',
    division: 'rangpur',
    address: 'দিনাজপুর সদর, দিনাজপুর',
    phone: '0531-61234',
    bedsTotal: 200,
    bedsAvailable: 25,
    hasOxygen: true,
    hasPediatric: false,
    hasPower: true,
    latitude: 25.6270,
    longitude: 88.6330,
    lastUpdated: hoursAgo(12),
  },

  // ── Mymensingh Division ──
  {
    id: 'f-12',
    name: 'ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল',
    nameEn: 'Mymensingh Medical College Hospital',
    type: 'medical_college',
    upazila: 'mymensingh-sadar',
    district: 'mymensingh-district',
    division: 'mymensingh',
    address: 'ময়মনসিংহ সদর, ময়মনসিংহ',
    phone: '091-61234',
    bedsTotal: 500,
    bedsAvailable: 50,
    hasOxygen: true,
    hasPediatric: true,
    hasPower: true,
    latitude: 24.7471,
    longitude: 90.4016,
    lastUpdated: hoursAgo(2),
  },
];

export function getFacilitiesByUpazila(upazilaId: string): Facility[] {
  return facilities.filter((f) => f.upazila === upazilaId);
}

export function getFacilitiesByDistrict(districtId: string): Facility[] {
  return facilities.filter((f) => f.district === districtId);
}

export function getFacilitiesByDivision(divisionId: string): Facility[] {
  return facilities.filter((f) => f.division === divisionId);
}

export function getFacilitiesByUrgency(urgencyLevel: number, upazilaId: string, districtId: string): Facility[] {
  if (urgencyLevel <= 2) {
    // CHW level: show upazila facilities + nearby upazilas in same district
    const upazilaFacs = getFacilitiesByUpazila(upazilaId);
    if (upazilaFacs.length > 0) return upazilaFacs;
    // fallback: show all in district
    return getFacilitiesByDistrict(districtId);
  } else if (urgencyLevel === 3) {
    const districtFacs = getFacilitiesByDistrict(districtId);
    if (districtFacs.length > 0) return districtFacs;
    // fallback: show all in division
    return [];
  } else {
    return facilities.filter((f) => f.type === 'medical_college');
  }
}

export function isStale(lastUpdated: string): boolean {
  const hours = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60);
  return hours > 24;
}

export function getHoursSinceUpdate(lastUpdated: string): number {
  return (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60);
}

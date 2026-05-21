// Bangladesh geographic data for dropdowns
// Divisions, Districts, and Upazilas with Bangla and English names

export interface Division {
  id: string;
  bn: string;
  en: string;
}

export interface District {
  id: string;
  divisionId: string;
  bn: string;
  en: string;
}

export interface Upazila {
  id: string;
  districtId: string;
  bn: string;
  en: string;
}

export const divisions: Division[] = [
  { id: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
  { id: 'chittagong', bn: 'চট্টগ্রাম', en: 'Chittagong' },
  { id: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
  { id: 'khulna', bn: 'খুলনা', en: 'Khulna' },
  { id: 'barishal', bn: 'বরিশাল', en: 'Barishal' },
  { id: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
  { id: 'rangpur', bn: 'রংপুর', en: 'Rangpur' },
  { id: 'mymensingh', bn: 'ময়মনসিংহ', en: 'Mymensingh' },
];

export const districts: District[] = [
  // Dhaka Division
  { id: 'dhaka-district', divisionId: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
  { id: 'gazipur', divisionId: 'dhaka', bn: 'গাজীপুর', en: 'Gazipur' },
  { id: 'narayanganj', divisionId: 'dhaka', bn: 'নারায়ণগঞ্জ', en: 'Narayanganj' },
  { id: 'manikganj', divisionId: 'dhaka', bn: 'মানিকগঞ্জ', en: 'Manikganj' },
  { id: 'munshiganj', divisionId: 'dhaka', bn: 'মুন্সিগঞ্জ', en: 'Munshiganj' },
  { id: 'narsingdi', divisionId: 'dhaka', bn: 'নরসিংদী', en: 'Narsingdi' },
  { id: 'tangail', divisionId: 'dhaka', bn: 'টাঙ্গাইল', en: 'Tangail' },
  { id: 'kishoreganj', divisionId: 'dhaka', bn: 'কিশোরগঞ্জ', en: 'Kishoreganj' },

  // Chittagong Division
  { id: 'chittagong-district', divisionId: 'chittagong', bn: 'চট্টগ্রাম', en: 'Chittagong' },
  { id: 'comilla', divisionId: 'chittagong', bn: 'কুমিল্লা', en: 'Comilla' },
  { id: 'coxsbazar', divisionId: 'chittagong', bn: 'কক্সবাজার', en: "Cox's Bazar" },
  { id: 'feni', divisionId: 'chittagong', bn: 'ফেনী', en: 'Feni' },
  { id: 'rangamati', divisionId: 'chittagong', bn: 'রাঙ্গামাটি', en: 'Rangamati' },
  { id: 'bandarban', divisionId: 'chittagong', bn: 'বান্দরবান', en: 'Bandarban' },
  { id: 'noakhali', divisionId: 'chittagong', bn: 'নোয়াখালী', en: 'Noakhali' },

  // Rajshahi Division
  { id: 'rajshahi-district', divisionId: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
  { id: 'natore', divisionId: 'rajshahi', bn: 'নাটোর', en: 'Natore' },
  { id: 'naogaon', divisionId: 'rajshahi', bn: 'নওগাঁ', en: 'Naogaon' },
  { id: 'chapainawabganj', divisionId: 'rajshahi', bn: 'চাঁপাইনওয়াবগঞ্জ', en: 'Chapainawabganj' },
  { id: 'pabna', divisionId: 'rajshahi', bn: 'পাবনা', en: 'Pabna' },
  { id: 'bogra', divisionId: 'rajshahi', bn: 'বগুড়া', en: 'Bogra' },
  { id: 'joypurhat', divisionId: 'rajshahi', bn: 'জয়পুরহাট', en: 'Joypurhat' },

  // Khulna Division
  { id: 'khulna-district', divisionId: 'khulna', bn: 'খুলনা', en: 'Khulna' },
  { id: 'jessore', divisionId: 'khulna', bn: 'যশোর', en: 'Jessore' },
  { id: 'satkhira', divisionId: 'khulna', bn: 'সাতক্ষীরা', en: 'Satkhira' },
  { id: 'kushtia', divisionId: 'khulna', bn: 'কুষ্টিয়া', en: 'Kushtia' },
  { id: 'bagerhat', divisionId: 'khulna', bn: 'বাগেরহাট', en: 'Bagerhat' },
  { id: 'meherpur', divisionId: 'khulna', bn: 'মেহেরপুর', en: 'Meherpur' },
  { id: 'chuadanga', divisionId: 'khulna', bn: 'চুয়াডাঙ্গা', en: 'Chuadanga' },

  // Barishal Division
  { id: 'barishal-district', divisionId: 'barishal', bn: 'বরিশাল', en: 'Barishal' },
  { id: 'patuakhali', divisionId: 'barishal', bn: 'পটুয়াখালী', en: 'Patuakhali' },
  { id: 'barguna', divisionId: 'barishal', bn: 'বরগুনা', en: 'Barguna' },
  { id: 'bhola', divisionId: 'barishal', bn: 'ভোলা', en: 'Bhola' },
  { id: 'jhalokati', divisionId: 'barishal', bn: 'ঝালকাঠি', en: 'Jhalokati' },
  { id: 'pirojpur', divisionId: 'barishal', bn: 'পিরোজপুর', en: 'Pirojpur' },

  // Sylhet Division
  { id: 'sylhet-district', divisionId: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
  { id: 'moulvibazar', divisionId: 'sylhet', bn: 'মৌলভীবাজার', en: 'Moulvibazar' },
  { id: 'habiganj', divisionId: 'sylhet', bn: 'হবিগঞ্জ', en: 'Habiganj' },
  { id: 'sunamganj', divisionId: 'sylhet', bn: 'সুনামগঞ্জ', en: 'Sunamganj' },
  { id: 'kishoreganj-s', divisionId: 'sylhet', bn: 'কিশোরগঞ্জ', en: 'Kishoreganj' },

  // Rangpur Division
  { id: 'rangpur-district', divisionId: 'rangpur', bn: 'রংপুর', en: 'Rangpur' },
  { id: 'dinajpur', divisionId: 'rangpur', bn: 'দিনাজপুর', en: 'Dinajpur' },
  { id: 'kurigram', divisionId: 'rangpur', bn: 'কুড়িগ্রাম', en: 'Kurigram' },
  { id: 'lalmonirhat', divisionId: 'rangpur', bn: 'লালমনিরহাট', en: 'Lalmonirhat' },
  { id: 'nilphamari', divisionId: 'rangpur', bn: 'নীলফামারী', en: 'Nilphamari' },
  { id: 'gaibandha', divisionId: 'rangpur', bn: 'গাইবান্ধা', en: 'Gaibandha' },
  { id: 'thakurgaon', divisionId: 'rangpur', bn: 'ঠাকুরগাঁও', en: 'Thakurgaon' },

  // Mymensingh Division
  { id: 'mymensingh-district', divisionId: 'mymensingh', bn: 'ময়মনসিংহ', en: 'Mymensingh' },
  { id: 'jamalpur', divisionId: 'mymensingh', bn: 'জামালপুর', en: 'Jamalpur' },
  { id: 'sherpur', divisionId: 'mymensingh', bn: 'শেরপুর', en: 'Sherpur' },
  { id: 'netrokona', divisionId: 'mymensingh', bn: 'নেত্রকোণা', en: 'Netrokona' },
  { id: 'kishoreganj-m', divisionId: 'mymensingh', bn: 'কিশোরগঞ্জ', en: 'Kishoreganj' },
];

export const upazilas: Upazila[] = [
  // Dhaka District
  { id: 'dhanmondi', districtId: 'dhaka-district', bn: 'ধানমন্ডি', en: 'Dhanmondi' },
  { id: 'gulshan', districtId: 'dhaka-district', bn: 'গুলশান', en: 'Gulshan' },
  { id: 'mirpur', districtId: 'dhaka-district', bn: 'মিরপুর', en: 'Mirpur' },
  { id: 'uttara', districtId: 'dhaka-district', bn: 'উত্তরা', en: 'Uttara' },
  { id: 'savar', districtId: 'dhaka-district', bn: 'সাভার', en: 'Savar' },
  { id: 'keraniganj', districtId: 'dhaka-district', bn: 'কেরানীগঞ্জ', en: 'Keraniganj' },

  // Gazipur
  { id: 'gazipur-sadar', districtId: 'gazipur', bn: 'গাজীপুর সদর', en: 'Gazipur Sadar' },
  { id: 'kaliakair', districtId: 'gazipur', bn: 'কালিয়াকৈর', en: 'Kaliakair' },
  { id: 'kaliganj-g', districtId: 'gazipur', bn: 'কালীগঞ্জ', en: 'Kaliganj' },
  { id: 'kapasia', districtId: 'gazipur', bn: 'কাপাসিয়া', en: 'Kapasia' },

  // Narayanganj
  { id: 'narayanganj-sadar', districtId: 'narayanganj', bn: 'নারায়ণগঞ্জ সদর', en: 'Narayanganj Sadar' },
  { id: 'sonargaon', districtId: 'narayanganj', bn: 'সোনারগাঁও', en: 'Sonargaon' },
  { id: 'bandar', districtId: 'narayanganj', bn: 'বন্দর', en: 'Bandar' },
  { id: 'araihazar', districtId: 'narayanganj', bn: 'আড়াইহাজার', en: 'Araihazar' },

  // Manikganj
  { id: 'manikganj-sadar', districtId: 'manikganj', bn: 'মানিকগঞ্জ সদর', en: 'Manikganj Sadar' },
  { id: 'singair', districtId: 'manikganj', bn: 'সিংগাইর', en: 'Singair' },
  { id: 'harirampur', districtId: 'manikganj', bn: 'হরিরামপুর', en: 'Harirampur' },
  { id: 'ghior', districtId: 'manikganj', bn: 'ঘিওর', en: 'Ghior' },

  // Munshiganj
  { id: 'munshiganj-sadar', districtId: 'munshiganj', bn: 'মুন্সিগঞ্জ সদর', en: 'Munshiganj Sadar' },
  { id: 'sreenagar', districtId: 'munshiganj', bn: 'শ্রীনগর', en: 'Sreenagar' },
  { id: 'lauhajang', districtId: 'munshiganj', bn: 'লৌহজং', en: 'Lauhajang' },
  { id: 'sirajdikhan', districtId: 'munshiganj', bn: 'সিরাজদিখান', en: 'Sirajdikhan' },

  // Narsingdi
  { id: 'narsingdi-sadar', districtId: 'narsingdi', bn: 'নরসিংদী সদর', en: 'Narsingdi Sadar' },
  { id: 'shibpur', districtId: 'narsingdi', bn: 'শিবপুর', en: 'Shibpur' },
  { id: 'monohardi', districtId: 'narsingdi', bn: 'মনোহরদী', en: 'Monohardi' },
  { id: 'belabo', districtId: 'narsingdi', bn: 'বেলাবো', en: 'Belabo' },

  // Tangail
  { id: 'tangail-sadar', districtId: 'tangail', bn: 'টাঙ্গাইল সদর', en: 'Tangail Sadar' },
  { id: 'mirzapur', districtId: 'tangail', bn: 'মির্জাপুর', en: 'Mirzapur' },
  { id: 'ghatail', districtId: 'tangail', bn: 'ঘাটাইল', en: 'Ghatail' },
  { id: 'sakhipur', districtId: 'tangail', bn: 'সখিপুর', en: 'Sakhipur' },

  // Kishoreganj (Dhaka)
  { id: 'kishoreganj-sadar', districtId: 'kishoreganj', bn: 'কিশোরগঞ্জ সদর', en: 'Kishoreganj Sadar' },
  { id: 'bhairab', districtId: 'kishoreganj', bn: 'ভৈরব', en: 'Bhairab' },
  { id: 'austagram', districtId: 'kishoreganj', bn: 'অষ্টগ্রাম', en: 'Austagram' },
  { id: 'mithamain', districtId: 'kishoreganj', bn: 'মিঠামইন', en: 'Mithamain' },

  // Chittagong District
  { id: 'chittagong-sadar', districtId: 'chittagong-district', bn: 'চট্টগ্রাম সদর', en: 'Chittagong Sadar' },
  { id: 'anwara', districtId: 'chittagong-district', bn: 'আনোয়ারা', en: 'Anwara' },
  { id: 'raozan', districtId: 'chittagong-district', bn: 'রাউজান', en: 'Raozan' },
  { id: 'hathazari', districtId: 'chittagong-district', bn: 'হাটহাজারী', en: 'Hathazari' },
  { id: 'sandwip', districtId: 'chittagong-district', bn: 'সন্দ্বীপ', en: 'Sandwip' },

  // Comilla
  { id: 'comilla-sadar', districtId: 'comilla', bn: 'কুমিল্লা সদর', en: 'Comilla Sadar' },
  { id: 'laksam', districtId: 'comilla', bn: 'লাকসাম', en: 'Laksam' },
  { id: 'chandina', districtId: 'comilla', bn: 'চান্দিনা', en: 'Chandina' },
  { id: 'debidwar', districtId: 'comilla', bn: 'দেবিদ্বার', en: 'Debidwar' },

  // Cox's Bazar
  { id: 'coxsbazar-sadar', districtId: 'coxsbazar', bn: 'কক্সবাজার সদর', en: "Cox's Bazar Sadar" },
  { id: 'teknaf', districtId: 'coxsbazar', bn: 'টেকনাফ', en: 'Teknaf' },
  { id: 'ukhia', districtId: 'coxsbazar', bn: 'উখিয়া', en: 'Ukhia' },
  { id: 'ramu', districtId: 'coxsbazar', bn: 'রামু', en: 'Ramu' },

  // Feni
  { id: 'feni-sadar', districtId: 'feni', bn: 'ফেনী সদর', en: 'Feni Sadar' },
  { id: 'sonagazi', districtId: 'feni', bn: 'সোনাগাজী', en: 'Sonagazi' },
  { id: 'fulgazi', districtId: 'feni', bn: 'ফুলগাজী', en: 'Fulgazi' },
  { id: 'daganbhuiyan', districtId: 'feni', bn: 'দাগনভূঞা', en: 'Daganbhuiyan' },

  // Rangamati
  { id: 'rangamati-sadar', districtId: 'rangamati', bn: 'রাঙ্গামাটি সদর', en: 'Rangamati Sadar' },
  { id: 'kaptai', districtId: 'rangamati', bn: 'কাপ্তাই', en: 'Kaptai' },
  { id: 'kawkhali', districtId: 'rangamati', bn: 'কাউখালী', en: 'Kawkhali' },
  { id: 'baghaichhari', districtId: 'rangamati', bn: 'বাঘাইছড়ি', en: 'Baghaichhari' },

  // Bandarban
  { id: 'bandarban-sadar', districtId: 'bandarban', bn: 'বান্দরবান সদর', en: 'Bandarban Sadar' },
  { id: 'lama', districtId: 'bandarban', bn: 'লামা', en: 'Lama' },
  { id: 'ali-kadam', districtId: 'bandarban', bn: 'আলীকদম', en: 'Ali Kadam' },
  { id: 'naikhongchhari', districtId: 'bandarban', bn: 'নাইক্ষ্যংছড়ি', en: 'Naikhongchhari' },

  // Noakhali
  { id: 'noakhali-sadar', districtId: 'noakhali', bn: 'নোয়াখালী সদর', en: 'Noakhali Sadar' },
  { id: 'begumganj', districtId: 'noakhali', bn: 'বেগমগঞ্জ', en: 'Begumganj' },
  { id: 'chatkhil', districtId: 'noakhali', bn: 'চাটখিল', en: 'Chatkhil' },
  { id: 'companiganj-n', districtId: 'noakhali', bn: 'কোম্পানীগঞ্জ', en: 'Companiganj' },

  // Rajshahi District
  { id: 'rajshahi-sadar', districtId: 'rajshahi-district', bn: 'রাজশাহী সদর', en: 'Rajshahi Sadar' },
  { id: 'paba', districtId: 'rajshahi-district', bn: 'পবা', en: 'Paba' },
  { id: 'godagari', districtId: 'rajshahi-district', bn: 'গোদাগাড়ী', en: 'Godagari' },
  { id: 'tanore', districtId: 'rajshahi-district', bn: 'তানোর', en: 'Tanore' },
  { id: 'mohanpur', districtId: 'rajshahi-district', bn: 'মোহনপুর', en: 'Mohanpur' },

  // Natore
  { id: 'natore-sadar', districtId: 'natore', bn: 'নাটোর সদর', en: 'Natore Sadar' },
  { id: 'bagatipara', districtId: 'natore', bn: 'বাগাতিপাড়া', en: 'Bagatipara' },
  { id: 'baraigram', districtId: 'natore', bn: 'বড়াইগ্রাম', en: 'Baraigram' },
  { id: 'lalpur', districtId: 'natore', bn: 'লালপুর', en: 'Lalpur' },

  // Naogaon
  { id: 'naogaon-sadar', districtId: 'naogaon', bn: 'নওগাঁ সদর', en: 'Naogaon Sadar' },
  { id: 'manda', districtId: 'naogaon', bn: 'মান্দা', en: 'Manda' },
  { id: 'mahadebpur', districtId: 'naogaon', bn: 'মহাদেবপুর', en: 'Mahadebpur' },
  { id: 'patnitala', districtId: 'naogaon', bn: 'পত্নীতলা', en: 'Patnitala' },

  // Chapainawabganj
  { id: 'chapai-sadar', districtId: 'chapainawabganj', bn: 'চাঁপাইনওয়াবগঞ্জ সদর', en: 'Chapainawabganj Sadar' },
  { id: 'shibganj', districtId: 'chapainawabganj', bn: 'শিবগঞ্জ', en: 'Shibganj' },
  { id: 'gomastapur', districtId: 'chapainawabganj', bn: 'গোমস্তাপুর', en: 'Gomastapur' },
  { id: 'bholahat', districtId: 'chapainawabganj', bn: 'ভোলাহাট', en: 'Bholahat' },

  // Pabna
  { id: 'pabna-sadar', districtId: 'pabna', bn: 'পাবনা সদর', en: 'Pabna Sadar' },
  { id: 'ishwardi', districtId: 'pabna', bn: 'ঈশ্বরদী', en: 'Ishwardi' },
  { id: 'atgharia', districtId: 'pabna', bn: 'আটঘরিয়া', en: 'Atgharia' },
  { id: 'bera', districtId: 'pabna', bn: 'বেড়া', en: 'Bera' },

  // Bogra
  { id: 'bogra-sadar', districtId: 'bogra', bn: 'বগুড়া সদর', en: 'Bogra Sadar' },
  { id: 'shajahanpur', districtId: 'bogra', bn: 'শাজাহানপুর', en: 'Shajahanpur' },
  { id: 'sherpur-b', districtId: 'bogra', bn: 'শেরপুর', en: 'Sherpur' },
  { id: 'dhunat', districtId: 'bogra', bn: 'ধুনট', en: 'Dhunat' },

  // Joypurhat
  { id: 'joypurhat-sadar', districtId: 'joypurhat', bn: 'জয়পুরহাট সদর', en: 'Joypurhat Sadar' },
  { id: 'akkelpur', districtId: 'joypurhat', bn: 'আক্কেলপুর', en: 'Akkelpur' },
  { id: 'kalai', districtId: 'joypurhat', bn: 'কালাই', en: 'Kalai' },
  { id: 'panchbibi', districtId: 'joypurhat', bn: 'পাঁচবিবি', en: 'Panchbibi' },

  // Khulna District
  { id: 'khulna-sadar', districtId: 'khulna-district', bn: 'খুলনা সদর', en: 'Khulna Sadar' },
  { id: 'dumuria', districtId: 'khulna-district', bn: 'দৌলতপুর', en: 'Daulatpur' },
  { id: 'phultala', districtId: 'khulna-district', bn: 'ফুলতলা', en: 'Phultala' },
  { id: 'terokhada', districtId: 'khulna-district', bn: 'তেরখাদা', en: 'Terokhada' },
  { id: 'dighalia', districtId: 'khulna-district', bn: 'ডিঘলিয়া', en: 'Dighalia' },

  // Jessore
  { id: 'jessore-sadar', districtId: 'jessore', bn: 'যশোর সদর', en: 'Jessore Sadar' },
  { id: 'benapole', districtId: 'jessore', bn: 'বেনাপোল', en: 'Benapole' },
  { id: 'jhikargachha', districtId: 'jessore', bn: 'ঝিকরগাছা', en: 'Jhikargachha' },
  { id: 'chaugachha', districtId: 'jessore', bn: 'চৌগাছা', en: 'Chaugachha' },

  // Satkhira
  { id: 'satkhira-sadar', districtId: 'satkhira', bn: 'সাতক্ষীরা সদর', en: 'Satkhira Sadar' },
  { id: 'kalaroa', districtId: 'satkhira', bn: 'কলারোয়া', en: 'Kalaroa' },
  { id: 'shyamnagar', districtId: 'satkhira', bn: 'শ্যামনগর', en: 'Shyamnagar' },
  { id: 'assasuni', districtId: 'satkhira', bn: 'আশাশুনি', en: 'Assasuni' },

  // Kushtia
  { id: 'kushtia-sadar', districtId: 'kushtia', bn: 'কুষ্টিয়া সদর', en: 'Kushtia Sadar' },
  { id: 'kumarkhali', districtId: 'kushtia', bn: 'কুমারখালী', en: 'Kumarkhali' },
  { id: 'daulatpur-k', districtId: 'kushtia', bn: 'দৌলতপুর', en: 'Daulatpur' },
  { id: 'bheramara', districtId: 'kushtia', bn: 'ভেড়ামারা', en: 'Bheramara' },

  // Bagerhat
  { id: 'bagerhat-sadar', districtId: 'bagerhat', bn: 'বাগেরহাট সদর', en: 'Bagerhat Sadar' },
  { id: 'mollahat', districtId: 'bagerhat', bn: 'মোল্লাহাট', en: 'Mollahat' },
  { id: 'morrelganj', districtId: 'bagerhat', bn: 'মোরেলগঞ্জ', en: 'Morrelganj' },
  { id: 'rampal', districtId: 'bagerhat', bn: 'রামপাল', en: 'Rampal' },

  // Meherpur
  { id: 'meherpur-sadar', districtId: 'meherpur', bn: 'মেহেরপুর সদর', en: 'Meherpur Sadar' },
  { id: 'gangni', districtId: 'meherpur', bn: 'গাংনী', en: 'Gangni' },
  { id: 'mujibnagar', districtId: 'meherpur', bn: 'মুজিবনগর', en: 'Mujibnagar' },
  { id: 'daulatpur-m', districtId: 'meherpur', bn: 'দৌলতপুর', en: 'Daulatpur' },

  // Chuadanga
  { id: 'chuadanga-sadar', districtId: 'chuadanga', bn: 'চুয়াডাঙ্গা সদর', en: 'Chuadanga Sadar' },
  { id: 'damurhuda', districtId: 'chuadanga', bn: 'দামুড়হুদা', en: 'Damurhuda' },
  { id: 'jibannagar', districtId: 'chuadanga', bn: 'জীবননগর', en: 'Jibannagar' },
  { id: 'almardah', districtId: 'chuadanga', bn: 'আলমদাদ', en: 'Almadad' },

  // Barishal District
  { id: 'barishal-sadar', districtId: 'barishal-district', bn: 'বরিশাল সদর', en: 'Barishal Sadar' },
  { id: 'babuganj', districtId: 'barishal-district', bn: 'বাবুগঞ্জ', en: 'Babuganj' },
  { id: 'bakerganj', districtId: 'barishal-district', bn: 'বাকেরগঞ্জ', en: 'Bakerganj' },
  { id: 'banaripara', districtId: 'barishal-district', bn: 'বানারীপাড়া', en: 'Banaripara' },
  { id: 'gaurnadi', districtId: 'barishal-district', bn: 'গৌরনদী', en: 'Gaurnadi' },

  // Patuakhali
  { id: 'patuakhali-sadar', districtId: 'patuakhali', bn: 'পটুয়াখালী সদর', en: 'Patuakhali Sadar' },
  { id: 'kalapara', districtId: 'patuakhali', bn: 'কলাপাড়া', en: 'Kalapara' },
  { id: 'galachipa', districtId: 'patuakhali', bn: 'গলাচিপা', en: 'Galachipa' },
  { id: 'dashmina', districtId: 'patuakhali', bn: 'দশমিনা', en: 'Dashmina' },

  // Barguna
  { id: 'barguna-sadar', districtId: 'barguna', bn: 'বরগুনা সদর', en: 'Barguna Sadar' },
  { id: 'amtali', districtId: 'barguna', bn: 'আমতলী', en: 'Amtali' },
  { id: 'bamna', districtId: 'barguna', bn: 'বামনা', en: 'Bamna' },
  { id: 'patharghata', districtId: 'barguna', bn: 'পাথরঘাটা', en: 'Patharghata' },

  // Bhola
  { id: 'bhola-sadar', districtId: 'bhola', bn: 'ভোলা সদর', en: 'Bhola Sadar' },
  { id: 'daulatkhan', districtId: 'bhola', bn: 'দৌলতখান', en: 'Daulatkhan' },
  { id: 'borhanuddin', districtId: 'bhola', bn: 'বোরহানউদ্দিন', en: 'Borhanuddin' },
  { id: 'lalmohan', districtId: 'bhola', bn: 'লালমোহন', en: 'Lalmohan' },

  // Jhalokati
  { id: 'jhalokati-sadar', districtId: 'jhalokati', bn: 'ঝালকাঠি সদর', en: 'Jhalokati Sadar' },
  { id: 'nalchity', districtId: 'jhalokati', bn: 'নলছিটি', en: 'Nalchity' },
  { id: 'rajapur', districtId: 'jhalokati', bn: 'রাজাপুর', en: 'Rajapur' },
  { id: 'kathalia', districtId: 'jhalokati', bn: 'কাঠালিয়া', en: 'Kathalia' },

  // Pirojpur
  { id: 'pirojpur-sadar', districtId: 'pirojpur', bn: 'পিরোজপুর সদর', en: 'Pirojpur Sadar' },
  { id: 'nazirpur', districtId: 'pirojpur', bn: 'নাজিরপুর', en: 'Nazirpur' },
  { id: 'kawkhali-p', districtId: 'pirojpur', bn: 'কাউখালী', en: 'Kawkhali' },
  { id: 'bhandaria', districtId: 'pirojpur', bn: 'ভাণ্ডারিয়া', en: 'Bhandaria' },

  // Sylhet District
  { id: 'sylhet-sadar', districtId: 'sylhet-district', bn: 'সিলেট সদর', en: 'Sylhet Sadar' },
  { id: 'south-surma', districtId: 'sylhet-district', bn: 'দক্ষিণ সুরমা', en: 'South Surma' },
  { id: 'bishwanath', districtId: 'sylhet-district', bn: 'বিশ্বনাথ', en: 'Bishwanath' },
  { id: 'golapganj', districtId: 'sylhet-district', bn: 'গোলাপগঞ্জ', en: 'Golapganj' },
  { id: 'jaintiapur', districtId: 'sylhet-district', bn: 'জৈন্তাপুর', en: 'Jaintiapur' },

  // Moulvibazar
  { id: 'moulvibazar-sadar', districtId: 'moulvibazar', bn: 'মৌলভীবাজার সদর', en: 'Moulvibazar Sadar' },
  { id: 'srimangal', districtId: 'moulvibazar', bn: 'শ্রীমঙ্গল', en: 'Srimangal' },
  { id: 'kamalganj', districtId: 'moulvibazar', bn: 'কমলগঞ্জ', en: 'Kamalganj' },
  { id: 'rajnagar', districtId: 'moulvibazar', bn: 'রাজনগর', en: 'Rajnagar' },

  // Habiganj
  { id: 'habiganj-sadar', districtId: 'habiganj', bn: 'হবিগঞ্জ সদর', en: 'Habiganj Sadar' },
  { id: 'chunarughat', districtId: 'habiganj', bn: 'চুনারুঘাট', en: 'Chunarughat' },
  { id: 'madhabpur', districtId: 'habiganj', bn: 'মাধবপুর', en: 'Madhabpur' },
  { id: 'bahubal', districtId: 'habiganj', bn: 'বাহুবল', en: 'Bahubal' },

  // Sunamganj
  { id: 'sunamganj-sadar', districtId: 'sunamganj', bn: 'সুনামগঞ্জ সদর', en: 'Sunamganj Sadar' },
  { id: 'tahirpur', districtId: 'sunamganj', bn: 'তাহিরপুর', en: 'Tahirpur' },
  { id: 'bishwamvarpur', districtId: 'sunamganj', bn: 'বিশ্বম্ভরপুর', en: 'Bishwamvarpur' },
  { id: 'jagannathpur', districtId: 'sunamganj', bn: 'জগন্নাথপুর', en: 'Jagannathpur' },

  // Rangpur District
  { id: 'rangpur-sadar', districtId: 'rangpur-district', bn: 'রংপুর সদর', en: 'Rangpur Sadar' },
  { id: 'pirgachha', districtId: 'rangpur-district', bn: 'পীরগাছা', en: 'Pirgachha' },
  { id: 'mithapukur', districtId: 'rangpur-district', bn: 'মিঠাপুকুর', en: 'Mithapukur' },
  { id: 'badarganj', districtId: 'rangpur-district', bn: 'বদরগঞ্জ', en: 'Badarganj' },
  { id: 'taraganj', districtId: 'rangpur-district', bn: 'তারাগঞ্জ', en: 'Taraganj' },

  // Dinajpur
  { id: 'dinajpur-sadar', districtId: 'dinajpur', bn: 'দিনাজপুর সদর', en: 'Dinajpur Sadar' },
  { id: 'birampur', districtId: 'dinajpur', bn: 'বিরামপুর', en: 'Birampur' },
  { id: 'parbatipur', districtId: 'dinajpur', bn: 'পার্বতীপুর', en: 'Parbatipur' },
  { id: 'chirirbandar', districtId: 'dinajpur', bn: 'চিরিরবন্দর', en: 'Chirirbandar' },
  { id: 'fulbari', districtId: 'dinajpur', bn: 'ফুলবাড়ী', en: 'Fulbari' },

  // Kurigram
  { id: 'kurigram-sadar', districtId: 'kurigram', bn: 'কুড়িগ্রাম সদর', en: 'Kurigram Sadar' },
  { id: 'nageshwari', districtId: 'kurigram', bn: 'নাগেশ্বরী', en: 'Nageshwari' },
  { id: 'bhurungamari', districtId: 'kurigram', bn: 'ভুরুঙ্গামারী', en: 'Bhurungamari' },
  { id: 'char-rajibpur', districtId: 'kurigram', bn: 'চর রাজিবপুর', en: 'Char Rajibpur' },

  // Lalmonirhat
  { id: 'lalmonirhat-sadar', districtId: 'lalmonirhat', bn: 'লালমনিরহাট সদর', en: 'Lalmonirhat Sadar' },
  { id: 'patgram', districtId: 'lalmonirhat', bn: 'পাটগ্রাম', en: 'Patgram' },
  { id: 'hatibandha', districtId: 'lalmonirhat', bn: 'হাতীবান্ধা', en: 'Hatibandha' },
  { id: 'aditmari', districtId: 'lalmonirhat', bn: 'আদিতমারী', en: 'Aditmari' },

  // Nilphamari
  { id: 'nilphamari-sadar', districtId: 'nilphamari', bn: 'নীলফামারী সদর', en: 'Nilphamari Sadar' },
  { id: 'saidpur', districtId: 'nilphamari', bn: 'সৈয়দপুর', en: 'Saidpur' },
  { id: 'jaldhaka', districtId: 'nilphamari', bn: 'জলঢাকা', en: 'Jaldhaka' },
  { id: 'kishoreganj-n', districtId: 'nilphamari', bn: 'কিশোরগঞ্জ', en: 'Kishoreganj' },

  // Gaibandha
  { id: 'gaibandha-sadar', districtId: 'gaibandha', bn: 'গাইবান্ধা সদর', en: 'Gaibandha Sadar' },
  { id: 'saghata', districtId: 'gaibandha', bn: 'সাঘাটা', en: 'Saghata' },
  { id: 'gobindaganj', districtId: 'gaibandha', bn: 'গোবিন্দগঞ্জ', en: 'Gobindaganj' },
  { id: 'sundarganj', districtId: 'gaibandha', bn: 'সুন্দরগঞ্জ', en: 'Sundarganj' },

  // Thakurgaon
  { id: 'thakurgaon-sadar', districtId: 'thakurgaon', bn: 'ঠাকুরগাঁও সদর', en: 'Thakurgaon Sadar' },
  { id: 'pirganj-t', districtId: 'thakurgaon', bn: 'পীরগঞ্জ', en: 'Pirganj' },
  { id: 'ranisankail', districtId: 'thakurgaon', bn: 'রাণীশংকৈল', en: 'Ranisankail' },
  { id: 'haripur', districtId: 'thakurgaon', bn: 'হরিপুর', en: 'Haripur' },

  // Mymensingh District
  { id: 'mymensingh-sadar', districtId: 'mymensingh-district', bn: 'ময়মনসিংহ সদর', en: 'Mymensingh Sadar' },
  { id: 'trishal', districtId: 'mymensingh-district', bn: 'ত্রিশাল', en: 'Trishal' },
  { id: 'bhaluka', districtId: 'mymensingh-district', bn: 'ভালুকা', en: 'Bhaluka' },
  { id: 'ishwarganj', districtId: 'mymensingh-district', bn: 'ঈশ্বরগঞ্জ', en: 'Ishwarganj' },
  { id: 'muktagachha', districtId: 'mymensingh-district', bn: 'মুক্তাগাছা', en: 'Muktagachha' },

  // Jamalpur
  { id: 'jamalpur-sadar', districtId: 'jamalpur', bn: 'জামালপুর সদর', en: 'Jamalpur Sadar' },
  { id: 'sherpur-j', districtId: 'jamalpur', bn: 'শেরপুর', en: 'Sherpur' },
  { id: 'bakshiganj', districtId: 'jamalpur', bn: 'বকশীগঞ্জ', en: 'Bakshiganj' },
  { id: 'dewanganj', districtId: 'jamalpur', bn: 'দেওয়ানগঞ্জ', en: 'Dewanganj' },

  // Sherpur
  { id: 'sherpur-sadar', districtId: 'sherpur', bn: 'শেরপুর সদর', en: 'Sherpur Sadar' },
  { id: 'jhenaigati', districtId: 'sherpur', bn: 'ঝিনাইগাতী', en: 'Jhenaigati' },
  { id: 'nakla', districtId: 'sherpur', bn: 'নকলা', en: 'Nakla' },
  { id: 'nalitabari', districtId: 'sherpur', bn: 'নালিতাবাড়ী', en: 'Nalitabari' },

  // Netrokona
  { id: 'netrokona-sadar', districtId: 'netrokona', bn: 'নেত্রকোণা সদর', en: 'Netrokona Sadar' },
  { id: 'madan', districtId: 'netrokona', bn: 'মদন', en: 'Madan' },
  { id: 'kalmakanda', districtId: 'netrokona', bn: 'কলমাকান্দা', en: 'Kalmakanda' },
  { id: 'purbadhala', districtId: 'netrokona', bn: 'পূর্বধলা', en: 'Purbadhala' },
];

export function getDistricts(divisionId: string): District[] {
  return districts.filter((d) => d.divisionId === divisionId);
}

export function getUpazilas(districtId: string): Upazila[] {
  return upazilas.filter((u) => u.districtId === districtId);
}

export function getDivisionById(id: string): Division | undefined {
  return divisions.find((d) => d.id === id);
}

export function getDistrictById(id: string): District | undefined {
  return districts.find((d) => d.id === id);
}

export function getUpazilaById(id: string): Upazila | undefined {
  return upazilas.find((u) => u.id === id);
}

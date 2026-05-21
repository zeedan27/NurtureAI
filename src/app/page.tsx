'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppStore, getChildAge, type Page, type ChildData } from '@/store/app-store';
import { divisions, getDistricts, getUpazilas } from '@/lib/data/bangladesh';
import { vaccineGroups, getNextDueVaccine, allVaccines } from '@/lib/data/epi-schedule';
import { milestones, getMilestonesByAge, getCategoryLabel } from '@/lib/data/milestones';
import { nutritionGuides, recipes, muacGuide, getNutritionGuideByAge, getRecipesByAge } from '@/lib/data/nutrition';
import { myths, searchMyths } from '@/lib/data/myths';
import { facilities, getFacilitiesByDistrict, getFacilitiesByDivision, getFacilitiesByUrgency, facilityTypes, getHoursSinceUpdate, isStale } from '@/lib/data/facilities';
import { careCards, getCareCardByAge } from '@/lib/data/care-cards';
import { activities, banglaFlashcards, englishFlashcards, funFacts, getActivitiesByAge, getDailyFunFact } from '@/lib/data/activities';
import { prenatalGuides, allDangerSigns, getPrenatalGuideByWeek } from '@/lib/data/prenatal';

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════

function t(bn: string, en: string, lang: 'bn' | 'en') { return lang === 'bn' ? bn : en; }

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
      <span className="text-lg">←</span> {label}
    </button>
  );
}

function PageHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-3xl">{icon}</span>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

function UrgencyCard({ level }: { level: number }) {
  const colors = ['bg-green-100 border-green-500 text-green-800', 'bg-yellow-100 border-yellow-500 text-yellow-800', 'bg-orange-100 border-orange-500 text-orange-800', 'bg-red-100 border-red-500 text-red-800'];
  const labels = [
    { bn: 'স্তর ১: বাড়িতে যত্ন', en: 'Level 1: Home Care' },
    { bn: 'স্তর ২: স্বাস্থ্যকর্মীর পরামর্শ', en: 'Level 2: Visit CHW' },
    { bn: 'স্তর ৩: উপজেলা স্বাস্থ্য কমপ্লেক্স', en: 'Level 3: Upazila Health Complex' },
    { bn: 'স্তর ৪: জেলা/মেডিকেল কলেজ হাসপাতাল', en: 'Level 4: District/Medical College Hospital' },
  ];
  const icons = ['🏠', '👨‍⚕️', '🏥', '🚑'];
  const lang = useAppStore(s => s.language);
  return (
    <div className={`rounded-xl border-l-4 p-4 ${colors[level - 1]}`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icons[level - 1]}</span>
        <div>
          <div className="font-bold text-lg">{t(labels[level - 1].bn, labels[level - 1].en, lang)}</div>
          <div className="text-sm mt-1">
            {level === 1 && t('ঘরেই যত্ন নিন, প্রচুর তরল খাবার দিন', 'Care at home, give plenty of fluids', lang)}
            {level === 2 && t('স্থানীয় স্বাস্থ্যকর্মীর পরামর্শ নিন', 'Consult local health worker', lang)}
            {level === 3 && t('নিকটতম উপজেলা স্বাস্থ্য কমপ্লেক্সে যান', 'Go to nearest Upazila Health Complex', lang)}
            {level === 4 && t('জরুরি ভিত্তিতে জেলা হাসপাতালে যান', 'Go to District Hospital urgently', lang)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ONBOARDING PAGE
// ═══════════════════════════════════════════

function OnboardingPage() {
  const { language, setLanguage, setParent, setPage } = useAppStore();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');

  const districts = division ? getDistricts(division) : [];
  const upazilas = district ? getUpazilas(district) : [];

  const handleComplete = () => {
    setParent({
      id: `parent-${Date.now()}`,
      phone,
      name: name || phone,
      language,
      division,
      district,
      upazila,
    });
    setPage('child-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">👶</div>
          <h1 className="text-3xl font-bold text-emerald-700">
            {t('শিশু যত্ন', 'Child Care AI', language)}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t('আপনার শিশুর স্বাস্থ্য ও বিকাশের সঙ্গী', 'Your child\'s health & development companion', language)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          {/* Step 0: Language */}
          {step === 0 && (
            <>
              <h2 className="text-xl font-semibold text-center">
                {t('ভাষা নির্বাচন করুন', 'Select Language', language)}
              </h2>
              <div className="space-y-3">
                <button onClick={() => { setLanguage('bn'); setStep(1); }} className="w-full py-4 px-6 bg-emerald-600 text-white rounded-xl text-xl font-semibold hover:bg-emerald-700 transition-colors">
                  🇧🇩 বাংলা
                </button>
                <button onClick={() => { setLanguage('en'); setStep(1); }} className="w-full py-4 px-6 bg-gray-100 text-gray-800 rounded-xl text-xl font-semibold hover:bg-gray-200 transition-colors">
                  🌐 English
                </button>
              </div>
            </>
          )}

          {/* Step 1: Phone & Name */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">{t('নিবন্ধন', 'Registration', language)}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('ফোন নম্বর', 'Phone Number', language)}</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" className="w-full mt-1 px-4 py-3 border rounded-xl text-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('নাম (ঐচ্ছিক)', 'Name (optional)', language)}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('আপনার নাম', 'Your name', language)} className="w-full mt-1 px-4 py-3 border rounded-xl text-lg" />
                </div>
                <button onClick={() => phone.length >= 11 ? setStep(2) : null} disabled={phone.length < 11} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                  {t('পরবর্তী', 'Next', language)} →
                </button>
              </div>
            </>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold">{t('আপনার এলাকা', 'Your Area', language)}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('বিভাগ', 'Division', language)}</label>
                  <select value={division} onChange={(e) => { setDivision(e.target.value); setDistrict(''); setUpazila(''); }} className="w-full mt-1 px-4 py-3 border rounded-xl text-lg bg-white">
                    <option value="">{t('বিভাগ নির্বাচন করুন', 'Select Division', language)}</option>
                    {divisions.map((d) => <option key={d.id} value={d.id}>{t(d.bn, d.en, language)}</option>)}
                  </select>
                </div>
                {division && (
                  <div>
                    <label className="text-sm font-medium">{t('জেলা', 'District', language)}</label>
                    <select value={district} onChange={(e) => { setDistrict(e.target.value); setUpazila(''); }} className="w-full mt-1 px-4 py-3 border rounded-xl text-lg bg-white">
                      <option value="">{t('জেলা নির্বাচন করুন', 'Select District', language)}</option>
                      {districts.map((d) => <option key={d.id} value={d.id}>{t(d.bn, d.en, language)}</option>)}
                    </select>
                  </div>
                )}
                {district && (
                  <div>
                    <label className="text-sm font-medium">{t('উপজেলা', 'Upazila', language)}</label>
                    <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="w-full mt-1 px-4 py-3 border rounded-xl text-lg bg-white">
                      <option value="">{t('উপজেলা নির্বাচন করুন', 'Select Upazila', language)}</option>
                      {upazilas.map((u) => <option key={u.id} value={u.id}>{t(u.bn, u.en, language)}</option>)}
                    </select>
                  </div>
                )}
                <button onClick={handleComplete} disabled={!upazila} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                  {t('শুরু করুন', 'Get Started', language)} 🎉
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CHILD PROFILE SETUP
// ═══════════════════════════════════════════

function ChildProfilePage() {
  const { language, addChild, setPage } = useAppStore();
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [dobMode, setDobMode] = useState<'dob' | 'edd'>('dob');
  const [dob, setDob] = useState('');
  const [edd, setEdd] = useState('');
  const [weight, setWeight] = useState('');

  const handleAdd = () => {
    const child: ChildData = {
      id: `child-${Date.now()}`,
      name: name || t('শিশু', 'Baby', language),
      dateOfBirth: dobMode === 'dob' ? dob : null,
      edd: dobMode === 'edd' ? edd : null,
      sex,
      birthWeight: weight ? parseFloat(weight) : null,
      isPrenatal: dobMode === 'edd',
      completedVaccines: [],
      completedMilestones: [],
      growthRecords: weight ? [{ weight: parseFloat(weight), height: 0, date: new Date().toISOString() }] : [],
      medicalEvents: [],
      symptomChecks: [],
    };
    addChild(child);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('onboarding')} label={t('ফিরে যান', 'Go Back', language)} />
        <PageHeader title={t('শিশুর তথ্য', 'Child Info', language)} icon="👶" />

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          <div>
            <label className="text-sm font-medium">{t('শিশুর নাম', 'Child\'s Name', language)}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('নাম লিখুন', 'Enter name', language)} className="w-full mt-1 px-4 py-3 border rounded-xl text-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">{t('লিঙ্গ', 'Sex', language)}</label>
            <div className="flex gap-3 mt-1">
              <button onClick={() => setSex('male')} className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-colors ${sex === 'male' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border'}`}>
                👦 {t('ছেলে', 'Boy', language)}
              </button>
              <button onClick={() => setSex('female')} className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-colors ${sex === 'female' ? 'bg-pink-100 border-2 border-pink-500' : 'bg-gray-50 border'}`}>
                👧 {t('মেয়ে', 'Girl', language)}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">{t('জন্ম তারিখ বা প্রসবের সম্ভাব্য তারিখ', 'Date of Birth or EDD', language)}</label>
            <div className="flex gap-2 mt-1">
              <button onClick={() => setDobMode('dob')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${dobMode === 'dob' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50 border'}`}>
                {t('জন্ম তারিখ', 'Date of Birth', language)}
              </button>
              <button onClick={() => setDobMode('edd')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${dobMode === 'edd' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-50 border'}`}>
                {t('প্রসবের তারিখ (EDD)', 'Due Date (EDD)', language)}
              </button>
            </div>
            <input type="date" value={dobMode === 'dob' ? dob : edd} onChange={(e) => dobMode === 'dob' ? setDob(e.target.value) : setEdd(e.target.value)} className="w-full mt-2 px-4 py-3 border rounded-xl text-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">{t('জন্মের ওজন (কেজি)', 'Birth Weight (kg)', language)}</label>
            <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="3.0" className="w-full mt-1 px-4 py-3 border rounded-xl text-lg" />
          </div>

          <button onClick={handleAdd} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
            {t('সংরক্ষণ করুন', 'Save', language)} ✅
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// HOME DASHBOARD
// ═══════════════════════════════════════════

function HomeDashboard() {
  const { language, children, selectedChildId, setPage, addChild, setLanguage } = useAppStore();
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const dailyFact = getDailyFunFact();

  const navItems: { icon: string; label: string; labelEn: string; page: Page; color: string; show?: boolean }[] = [
    { icon: '🩺', label: 'শিশু অসুস্থ?', labelEn: 'Child Unwell?', page: 'triage', color: 'bg-red-50 border-red-200' },
    { icon: '📋', label: 'দৈনিক যত্ন', labelEn: 'Daily Care', page: 'care', color: 'bg-blue-50 border-blue-200' },
    { icon: '🍎', label: 'পুষ্টি', labelEn: 'Nutrition', page: 'nutrition', color: 'bg-orange-50 border-orange-200' },
    { icon: '💉', label: 'টিকা', labelEn: 'Vaccines', page: 'vaccination', color: 'bg-green-50 border-green-200' },
    { icon: '🎯', label: 'মাইলফলক', labelEn: 'Milestones', page: 'care', color: 'bg-purple-50 border-purple-200' },
    { icon: '📚', label: 'শিখুন ও খেলুন', labelEn: 'Learn & Play', page: 'learn', color: 'bg-yellow-50 border-yellow-200' },
    { icon: '🏥', label: 'হাসপাতাল খুঁজুন', labelEn: 'Find Hospital', page: 'facility', color: 'bg-indigo-50 border-indigo-200' },
    { icon: '❌', label: 'কুসংস্কার', labelEn: 'Myth vs Fact', page: 'myth', color: 'bg-pink-50 border-pink-200' },
    { icon: '👥', label: 'সম্প্রদায়', labelEn: 'Community', page: 'community', color: 'bg-teal-50 border-teal-200' },
    { icon: '📄', label: 'চিকিৎসা ইতিহাস', labelEn: 'Medical History', page: 'history', color: 'bg-slate-50 border-slate-200' },
    { icon: '🤰', label: 'গর্ভকালীন', labelEn: 'Prenatal', page: 'prenatal', color: 'bg-fuchsia-50 border-fuchsia-200', show: age?.isPrenatal },
  ];

  const nextVaccine = child ? getNextDueVaccine(age?.weeks || 0, child.completedVaccines) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👶</span>
              <span className="font-bold text-lg">{t('শিশু যত্ন', 'Child Care AI', language)}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')} className="px-2 py-1 bg-white/20 rounded-lg text-xs">
                {language === 'bn' ? 'EN' : 'বাং'}
              </button>
              <button onClick={() => setPage('admin')} className="px-2 py-1 bg-white/20 rounded-lg text-xs">
                ⚙️
              </button>
            </div>
          </div>

          {/* Child Card */}
          {child && age && (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{child.name}</h2>
                  {age.isPrenatal ? (
                    <p className="text-sm opacity-90">🤰 {t(`${age.prenatalWeek} সপ্তাহের গর্ভ`, `${age.prenatalWeek} weeks pregnant`, language)}</p>
                  ) : (
                    <p className="text-sm opacity-90">
                      {child.sex === 'male' ? '👦' : '👧'} {age.months >= 12 ? t(`${Math.floor(age.months / 12)} বছর ${age.months % 12} মাস`, `${Math.floor(age.months / 12)}y ${age.months % 12}m`, language) : t(`${age.months} মাস ${age.weeks % 4} সপ্তাহ`, `${age.months}m ${age.weeks % 4}w`, language)}
                    </p>
                  )}
                </div>
                {children.length > 1 && (
                  <select value={selectedChildId || ''} onChange={(e) => useAppStore.getState().selectChild(e.target.value)} className="bg-white/20 text-white rounded-lg px-2 py-1 text-sm">
                    {children.map(c => <option key={c.id} value={c.id} className="text-black">{c.name}</option>)}
                  </select>
                )}
              </div>

              {/* Next vaccine badge */}
              {nextVaccine && !age.isPrenatal && (
                <div className="mt-3 bg-white/20 rounded-xl p-3 flex items-center gap-3">
                  <span className="text-2xl">💉</span>
                  <div className="text-sm">
                    <p className="font-semibold">{t('পরবর্তী টিকা:', 'Next Vaccine:', language)} {t(nextVaccine.name, nextVaccine.nameEn, language)}</p>
                    <p className="opacity-80">{t(nextVaccine.description, nextVaccine.descriptionEn, language)}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add child button */}
          <button onClick={() => setPage('child-profile')} className="mt-3 w-full py-2 bg-white/20 rounded-xl text-sm hover:bg-white/30 transition-colors">
            + {t('শিশু যোগ করুন', 'Add Child', language)}
          </button>
        </div>
      </div>

      {/* Daily Care Card */}
      {child && age && (
        <div className="max-w-sm mx-auto px-4 -mt-4">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="font-semibold text-sm text-emerald-700 mb-2">📋 {t('আজকের যত্ন', 'Today\'s Care', language)}</h3>
            {(() => {
              const card = getCareCardByAge(age.isPrenatal ? -1 : age.months);
              return (
                <div className="space-y-2">
                  {card.tasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span>{task.icon}</span>
                      <span>{t(task.text, task.textEn, language)}</span>
                    </div>
                  ))}
                  <button onClick={() => setPage('care')} className="text-emerald-600 text-sm font-medium mt-1">
                    {t('আরও দেখুন →', 'See more →', language)}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Daily Fun Fact */}
      <div className="max-w-sm mx-auto px-4 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h3 className="font-semibold text-sm text-amber-700 mb-1">💡 {t('আজকের তথ্য', 'Today\'s Fact', language)}</h3>
          <p className="text-sm text-amber-800">{t(dailyFact.fact, dailyFact.factEn, language)}</p>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="max-w-sm mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {navItems.filter(item => item.show !== false).map((item) => (
            <button key={item.page + item.label} onClick={() => setPage(item.page)} className={`${item.color} border rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all active:scale-95`}>
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">{t(item.label, item.labelEn, language)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency */}
      <div className="max-w-sm mx-auto px-4 pb-6">
        <button onClick={() => setPage('triage')} className="w-full bg-red-500 text-white rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-red-600 transition-colors">
          <span className="text-2xl">🚨</span>
          <span className="font-bold text-lg">{t('শিশু অসুস্থ মনে হচ্ছে?', 'Child seems unwell?', language)}</span>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SYMPTOM TRIAGE PAGE
// ═══════════════════════════════════════════

const SYMPTOM_LIST = [
  { id: 'fever', icon: '🤒', bn: 'জ্বর', en: 'Fever', urgency: 2 },
  { id: 'cough', icon: '😷', bn: 'কাশি', en: 'Cough', urgency: 1 },
  { id: 'diarrhea', icon: '💧', bn: 'ডায়রিয়া', en: 'Diarrhea', urgency: 2 },
  { id: 'rash', icon: '🔴', bn: 'ফুসকুড়ি', en: 'Rash', urgency: 1 },
  { id: 'not_eating', icon: '🤢', bn: 'খাবার নিচ্ছে না', en: 'Not Eating', urgency: 1 },
  { id: 'breathing', icon: '😮‍💨', bn: 'শ্বাসকষ্ট', en: 'Difficulty Breathing', urgency: 4 },
  { id: 'vomit', icon: '🤮', bn: 'বমি', en: 'Vomiting', urgency: 2 },
  { id: 'lethargy', icon: '😴', bn: 'অসারতা', en: 'Lethargy', urgency: 3 },
  { id: 'ear_pain', icon: '👂', bn: 'কান ব্যথা', en: 'Ear Pain', urgency: 1 },
  { id: 'eye_issue', icon: '👁️', bn: 'চোখের সমস্যা', en: 'Eye Issue', urgency: 1 },
  { id: 'convulsion', icon: '⚡', bn: 'খিঁচুনি', en: 'Convulsion', urgency: 4 },
  { id: 'bleeding', icon: '🩸', bn: 'রক্তক্ষরণ', en: 'Bleeding', urgency: 4 },
];

function TriagePage() {
  const { language, setPage, triageState, setTriageState, children, selectedChildId, addSymptomCheck, addMedicalEvent } = useAppStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const runTriage = () => {
    const selectedSymptoms = SYMPTOM_LIST.filter(s => selected.includes(s.id));
    const maxUrgency = Math.max(...selectedSymptoms.map(s => s.urgency), 1);

    const ruleEngineResult = { symptoms: selected, urgencyLevel: maxUrgency };

    const actions: Record<number, string> = {
      1: language === 'bn' ? 'বাড়িতে যত্ন নিন। প্রচুর তরল খাবার দিন। বিশ্রাম নিন।' : 'Care at home. Give plenty of fluids. Rest.',
      2: language === 'bn' ? 'স্বাস্থ্যকর্মীর পরামর্শ নিন। লক্ষণ খারাপ হলে হাসপাতালে যান।' : 'Consult health worker. Go to hospital if symptoms worsen.',
      3: language === 'bn' ? 'নিকটতম উপজেলা স্বাস্থ্য কমপ্লেক্সে যান।' : 'Go to nearest Upazila Health Complex.',
      4: language === 'bn' ? 'জরুরি ভিত্তিতে হাসপাতালে যান! এটি গুরুতর অবস্থা।' : 'Go to hospital URGENTLY! This is a serious condition.',
    };

    setTriageState({ symptoms: selected, urgencyLevel: maxUrgency, result: actions[maxUrgency] });
    setShowResult(true);

    if (selectedChildId) {
      addSymptomCheck(selectedChildId, {
        symptoms: selected,
        urgencyLevel: maxUrgency,
        date: new Date().toISOString(),
        action: actions[maxUrgency],
      });
      addMedicalEvent(selectedChildId, {
        type: 'symptom_check',
        description: selectedSymptoms.map(s => t(s.bn, s.en, language)).join(', '),
        date: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => { setShowResult(false); setPage('home'); }} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('শিশু অসুস্থ মনে হচ্ছে?', 'Child Seems Unwell?', language)} icon="🩺" />

        {!showResult ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">{t('শিশুর কোন কোন লক্ষণ দেখা যাচ্ছে?', 'What symptoms does the child have?', language)}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {SYMPTOM_LIST.map((symptom) => (
                <button key={symptom.id} onClick={() => toggleSymptom(symptom.id)} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all active:scale-95 ${selected.includes(symptom.id) ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-gray-200'}`}>
                  <span className="text-3xl">{symptom.icon}</span>
                  <span className="text-sm font-medium text-center">{t(symptom.bn, symptom.en, language)}</span>
                </button>
              ))}
            </div>

            <button onClick={runTriage} disabled={selected.length === 0} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors">
              {t('পরামর্শ নিন', 'Get Advice', language)} 🔍
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <UrgencyCard level={triageState?.urgencyLevel || 1} />

            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-semibold mb-2">{t('নির্বাচিত লক্ষণ:', 'Selected Symptoms:', language)}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {triageState?.symptoms.map(id => {
                  const s = SYMPTOM_LIST.find(x => x.id === id);
                  return s ? <span key={id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s.icon} {t(s.bn, s.en, language)}</span> : null;
                })}
              </div>
              <p className="text-sm">{triageState?.result}</p>
            </div>

            {triageState && (triageState.urgencyLevel ?? 0) >= 3 && (
              <button onClick={() => setPage('facility')} className="w-full py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors">
                🏥 {t('নিকটতম হাসপাতাল খুঁজুন', 'Find Nearest Hospital', language)}
              </button>
            )}

            <button onClick={() => { setShowResult(false); setSelected([]); }} className="w-full py-3 bg-gray-100 rounded-2xl font-semibold hover:bg-gray-200 transition-colors">
              {t('আবার চেক করুন', 'Check Again', language)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// DAILY CARE & MILESTONES PAGE
// ═══════════════════════════════════════════

function CarePage() {
  const { language, children, selectedChildId, markMilestoneComplete, setPage } = useAppStore();
  const [tab, setTab] = useState<'care' | 'milestones'>('care');
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const months = age?.isPrenatal ? -1 : (age?.months || 0);
  const ageMilestones = getMilestonesByAge(months);
  const careCard = getCareCardByAge(months);

  const categories = ['motor', 'social', 'cognitive', 'speech'] as const;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('যত্ন ও মাইলফলক', 'Care & Milestones', language)} icon="📋" />

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('care')} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${tab === 'care' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
            📋 {t('দৈনিক যত্ন', 'Daily Care', language)}
          </button>
          <button onClick={() => setTab('milestones')} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${tab === 'milestones' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
            🎯 {t('মাইলফলক', 'Milestones', language)}
          </button>
        </div>

        {tab === 'care' ? (
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-bold text-lg mb-1">{t(careCard.title, careCard.titleEn, language)}</h3>
            <p className="text-xs text-muted-foreground mb-4">{t(careCard.ageBand, careCard.ageBandEn, language)}</p>
            <div className="space-y-3">
              {careCard.tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl flex-shrink-0">{task.icon}</span>
                  <span className="text-sm">{t(task.text, task.textEn, language)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map(cat => {
              const catMilestones = ageMilestones.filter(m => m.category === cat);
              if (catMilestones.length === 0) return null;
              const label = getCategoryLabel(cat);
              return (
                <div key={cat} className="bg-white rounded-2xl shadow p-4">
                  <h3 className="font-semibold mb-3">{t(label.bn, label.en, language)}</h3>
                  <div className="space-y-2">
                    {catMilestones.map(m => {
                      const completed = child?.completedMilestones.includes(m.id);
                      return (
                        <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl ${completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                          <button onClick={() => child && markMilestoneComplete(child.id, m.id)} className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                            {completed && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className={`text-sm ${completed ? 'line-through text-muted-foreground' : ''}`}>{t(m.description, m.descriptionEn, language)}</p>
                            {m.flag && !completed && <p className="text-xs text-orange-600 mt-1">⚠️ {t('বিলম্ব হলে চিকিৎসকে দেখান', 'See a doctor if delayed', language)}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// NUTRITION PAGE
// ═══════════════════════════════════════════

function NutritionPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const [tab, setTab] = useState<'guide' | 'recipes' | 'muac'>('guide');
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const months = age?.isPrenatal ? 0 : (age?.months || 0);
  const guide = getNutritionGuideByAge(months);
  const childRecipes = getRecipesByAge(months);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('পুষ্টি', 'Nutrition', language)} icon="🍎" />

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('guide')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'guide' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            📖 {t('নির্দেশিকা', 'Guide', language)}
          </button>
          <button onClick={() => setTab('recipes')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'recipes' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            🍳 {t('রেসিপি', 'Recipes', language)}
          </button>
          <button onClick={() => setTab('muac')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'muac' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
            📏 {t('মুয়াক', 'MUAC', language)}
          </button>
        </div>

        {tab === 'guide' && guide && (
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">
            <div>
              <h3 className="font-bold text-lg">{t(guide.title, guide.titleEn, language)}</h3>
              <p className="text-xs text-muted-foreground">{t(guide.ageBand, guide.ageBandEn, language)}</p>
            </div>
            <p className="text-sm leading-relaxed">{t(guide.content, guide.contentEn, language)}</p>
            <div className="bg-orange-50 p-3 rounded-xl">
              <p className="font-semibold text-sm mb-1">🍽️ {t('সুপারিশকৃত খাবার:', 'Recommended Foods:', language)}</p>
              <p className="text-sm">{t(guide.foods, guide.foodsEn, language)}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <p className="font-semibold text-sm mb-1">⏰ {t('খাওয়ার সময়সূচি:', 'Feeding Schedule:', language)}</p>
              <p className="text-sm">{t(guide.frequency, guide.frequencyEn, language)}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl">
              <p className="font-semibold text-sm mb-1">⚠️ {t('সতর্কতা:', 'Warnings:', language)}</p>
              <p className="text-sm">{t(guide.warnings, guide.warningsEn, language)}</p>
            </div>
          </div>
        )}

        {tab === 'recipes' && (
          <div className="space-y-4">
            {childRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-bold text-lg mb-1">{t(recipe.name, recipe.nameEn, language)}</h3>
                <p className="text-xs text-muted-foreground mb-3">{recipe.calories} kcal | {t(recipe.nutrients, recipe.nutrientsEn, language)}</p>
                <div className="bg-orange-50 p-3 rounded-xl mb-2">
                  <p className="font-semibold text-sm mb-1">🥕 {t('উপকরণ:', 'Ingredients:', language)}</p>
                  <p className="text-sm">{t(recipe.ingredients, recipe.ingredientsEn, language)}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <p className="font-semibold text-sm mb-1">👩‍🍳 {t('পদ্ধতি:', 'Instructions:', language)}</p>
                  <p className="text-sm whitespace-pre-line">{t(recipe.instructions, recipe.instructionsEn, language)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'muac' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-lg mb-1">{t(muacGuide.title, muacGuide.titleEn, language)}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t(muacGuide.description, muacGuide.descriptionEn, language)}</p>
              <div className="space-y-3">
                {muacGuide.steps.map(step => (
                  <div key={step.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{step.step}</span>
                    <p className="text-sm">{t(step.instruction, step.instructionEn, language)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {muacGuide.interpretations.map(interp => (
                <div key={interp.color} className={`${interp.color === 'green' ? 'bg-green-50 border-green-300' : interp.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' : 'bg-red-50 border-red-300'} border-2 rounded-2xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-5 h-5 rounded-full ${interp.color === 'green' ? 'bg-green-500' : interp.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                    <span className="font-bold">{t(interp.colorBn, interp.color, language)} ({t(interp.range, interp.rangeEn, language)})</span>
                  </div>
                  <p className="font-semibold text-sm">{t(interp.meaning, interp.meaningEn, language)}</p>
                  <p className="text-sm mt-1">{t(interp.action, interp.actionEn, language)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// VACCINATION TRACKER
// ═══════════════════════════════════════════

function VaccinationPage() {
  const { language, children, selectedChildId, markVaccineReceived, setPage } = useAppStore();
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const weeks = age?.weeks || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('টিকাকরণ', 'Vaccination', language)} icon="💉" />

        {/* Progress */}
        {child && (
          <div className="bg-white rounded-2xl shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">{t('অগ্রগতি', 'Progress', language)}</span>
              <span className="text-sm text-muted-foreground">{child.completedVaccines.length}/{allVaccines.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${(child.completedVaccines.length / allVaccines.length) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* Schedule */}
        <div className="space-y-4">
          {vaccineGroups.map(group => {
            const isCurrentOrPast = weeks >= group.ageWeeks;
            return (
              <div key={group.id} className={`rounded-2xl shadow p-4 ${isCurrentOrPast ? 'bg-white' : 'bg-gray-50 opacity-70'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">💉</span>
                  <h3 className="font-bold">{t(group.ageLabel, group.ageLabelEn, language)}</h3>
                </div>
                <div className="space-y-2">
                  {group.vaccines.map(vaccine => {
                    const completed = child?.completedVaccines.includes(vaccine.id);
                    const isDue = isCurrentOrPast && !completed;
                    return (
                      <div key={vaccine.id} className={`flex items-center justify-between p-3 rounded-xl ${completed ? 'bg-green-50' : isDue ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
                            {t(vaccine.name, vaccine.nameEn, language)}
                          </p>
                          <p className="text-xs text-muted-foreground">{t(vaccine.description, vaccine.descriptionEn, language)}</p>
                        </div>
                        {isDue && child && (
                          <button onClick={() => markVaccineReceived(child.id, vaccine.id)} className="ml-2 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex-shrink-0">
                            {t('নিয়েছি', 'Done', language)}
                          </button>
                        )}
                        {completed && <span className="text-green-500 text-lg ml-2">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// LEARN & PLAY PAGE
// ═══════════════════════════════════════════

function LearnPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const [tab, setTab] = useState<'activities' | 'flashcards' | 'facts'>('activities');
  const [fcType, setFcType] = useState<'bangla' | 'english'>('bangla');
  const [fcIndex, setFcIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const months = age?.isPrenatal ? 0 : (age?.months || 0);
  const ageActivities = getActivitiesByAge(months);
  const cards = fcType === 'bangla' ? banglaFlashcards : englishFlashcards;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('শিখুন ও খেলুন', 'Learn & Play', language)} icon="📚" />

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('activities')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'activities' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
            🎮 {t('কার্যকলাপ', 'Activities', language)}
          </button>
          <button onClick={() => setTab('flashcards')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'flashcards' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
            🔤 {t('ফ্ল্যাশকার্ড', 'Flashcards', language)}
          </button>
          <button onClick={() => setTab('facts')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'facts' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
            💡 {t('তথ্য', 'Facts', language)}
          </button>
        </div>

        {tab === 'activities' && (
          <div className="space-y-4">
            {ageActivities.length > 0 ? ageActivities.map(act => (
              <div key={act.id} className="bg-white rounded-2xl shadow p-4 flex items-start gap-3">
                <span className="text-3xl">{act.icon}</span>
                <div>
                  <h3 className="font-bold">{t(act.title, act.titleEn, language)}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t(act.description, act.descriptionEn, language)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t(act.ageGroup, act.ageGroupEn, language)}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-muted-foreground py-8">{t('এই বয়সের জন্য কার্যকলাপ শীঘ্রই আসছে', 'Activities for this age coming soon', language)}</p>
            )}
          </div>
        )}

        {tab === 'flashcards' && (
          <div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => { setFcType('bangla'); setFcIndex(0); setShowAnswer(false); }} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${fcType === 'bangla' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
                বাংলা
              </button>
              <button onClick={() => { setFcType('english'); setFcIndex(0); setShowAnswer(false); }} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${fcType === 'english' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                ABC
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">{showAnswer ? cards[fcIndex]?.illustration : '❓'}</div>
              <div className="text-5xl font-bold mb-4">{cards[fcIndex]?.letter}</div>
              {showAnswer && (
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <p className="text-xl font-semibold">{cards[fcIndex]?.example}</p>
                </div>
              )}
              <button onClick={() => setShowAnswer(!showAnswer)} className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-xl font-semibold">
                {showAnswer ? t('লুকান', 'Hide', language) : t('দেখুন', 'Reveal', language)}
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={() => { setFcIndex(Math.max(0, fcIndex - 1)); setShowAnswer(false); }} disabled={fcIndex === 0} className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-50">← {t('আগে', 'Prev', language)}</button>
              <span className="text-sm text-muted-foreground self-center">{fcIndex + 1}/{cards.length}</span>
              <button onClick={() => { setFcIndex(Math.min(cards.length - 1, fcIndex + 1)); setShowAnswer(false); }} disabled={fcIndex === cards.length - 1} className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-50">{t('পরে', 'Next', language)} →</button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-3">⚠️ {t('২.৫ বছরের বেশি শিশুদের জন্য', 'For children 2.5+ years', language)}</p>
          </div>
        )}

        {tab === 'facts' && (
          <div className="space-y-3">
            {funFacts.map(fact => (
              <div key={fact.id} className="bg-white rounded-2xl shadow p-4">
                <p className="text-sm leading-relaxed">💡 {t(fact.fact, fact.factEn, language)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// FACILITY FINDER
// ═══════════════════════════════════════════

function FacilityPage() {
  const { language, parent, triageState, setPage } = useAppStore();
  const urgencyLevel = triageState?.urgencyLevel || 2;
  const division = parent?.division || '';
  const district = parent?.district || '';

  const relevantFacilities = urgencyLevel >= 4
    ? facilities.filter(f => f.type === 'medical_college')
    : urgencyLevel >= 3
      ? getFacilitiesByDistrict(district)
      : getFacilitiesByDivision(division);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('হাসপাতাল খুঁজুন', 'Find Hospital', language)} icon="🏥" />

        {triageState && (triageState.urgencyLevel ?? 0) >= 3 && (
          <div className="mb-4">
            <UrgencyCard level={triageState.urgencyLevel ?? 1} />
          </div>
        )}

        {/* Emergency Numbers */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-red-700 mb-2">🚨 {t('জরুরি নম্বর', 'Emergency Numbers', language)}</h3>
          <div className="space-y-1 text-sm">
            <p>📞 {t('জাতীয় জরুরি: ৯৯৯', 'National Emergency: 999', language)}</p>
            <p>📞 {t('স্বাস্থ্য হটলাইন: ১৬২৬৩', 'Health Hotline: 16263', language)}</p>
            <p>📞 {t('শিশু হটলাইন: ৯৮', 'Child Hotline: 98', language)}</p>
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-4">
          {relevantFacilities.map(facility => {
            const hoursSinceUpdate = getHoursSinceUpdate(facility.lastUpdated);
            const stale = isStale(facility.lastUpdated);
            return (
              <div key={facility.id} className="bg-white rounded-2xl shadow p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold">{t(facility.name, facility.nameEn, language)}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${facility.type === 'medical_college' ? 'bg-purple-100 text-purple-700' : facility.type === 'district' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {t(facilityTypes[facility.type].bn, facilityTypes[facility.type].en, language)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">📍 {facility.address} | 📞 {facility.phone}</p>

                {/* Stale data warning */}
                {stale && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                    <p className="text-xs text-red-700">⚠️ {t(`সর্বশেষ আপডেট ${Math.floor(hoursSinceUpdate)} ঘণ্টা আগে। তথ্য পুরোনো হতে পারে।`, `Last updated ${Math.floor(hoursSinceUpdate)} hours ago. Data may be stale.`, language)}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">{t('বেড', 'Beds', language)}</p>
                    <p className="font-bold">{facility.bedsAvailable}/{facility.bedsTotal}</p>
                  </div>
                  <div className={`${facility.hasOxygen ? 'bg-green-50' : 'bg-red-50'} p-2 rounded-lg text-center`}>
                    <p className="text-xs text-muted-foreground">{t('অক্সিজেন', 'Oxygen', language)}</p>
                    <p className="font-bold">{facility.hasOxygen ? '✅' : '❌'}</p>
                  </div>
                  <div className={`${facility.hasPediatric ? 'bg-green-50' : 'bg-red-50'} p-2 rounded-lg text-center`}>
                    <p className="text-xs text-muted-foreground">{t('পেডিয়াট্রিক', 'Pediatric', language)}</p>
                    <p className="font-bold">{facility.hasPediatric ? '✅' : '❌'}</p>
                  </div>
                  <div className={`${facility.hasPower ? 'bg-green-50' : 'bg-yellow-50'} p-2 rounded-lg text-center`}>
                    <p className="text-xs text-muted-foreground">{t('বিদ্যুৎ', 'Power', language)}</p>
                    <p className="font-bold">{facility.hasPower ? '✅' : '⚡'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MYTH VS FACT CHATBOT
// ═══════════════════════════════════════════

function MythPage() {
  const { language, setPage } = useAppStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(myths.slice(0, 5));
  const [selected, setSelected] = useState<typeof myths[0] | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = searchMyths(query);
    setResults(found.length > 0 ? found : myths.slice(0, 5));
    setChatMessages(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
  };

  const handleMythClick = (myth: typeof myths[0]) => {
    setSelected(myth);
    setChatMessages(prev => [...prev, { role: 'bot', text: language === 'bn' ? `কুসংস্কার: ${myth.myth}\n\nসত্য: ${myth.fact}\n\nউৎস: ${myth.source}` : `Myth: ${myth.mythEn}\n\nFact: ${myth.factEn}\n\nSource: ${myth.sourceEn}` }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('কুসংস্কার বনাম সত্য', 'Myth vs Fact', language)} icon="❌" />
      </div>

      {/* Chat area */}
      <div className="flex-1 px-4 overflow-y-auto max-h-96 space-y-3 mb-4">
        {chatMessages.length === 0 && (
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm">{t('আপনার প্রশ্ন লিখুন বা নিচের বিষয়গুলো থেকে বেছে নিন', 'Type your question or choose from topics below', language)}</p>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className={`${msg.role === 'user' ? 'bg-emerald-100 ml-8' : 'bg-white mr-8'} rounded-2xl p-3 shadow-sm`}>
            <p className="text-sm whitespace-pre-line">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Quick topics */}
      <div className="px-4 mb-3">
        <div className="flex flex-wrap gap-2">
          {['breastfeeding', 'newborn', 'vaccination', 'nutrition', 'illness', 'prenatal'].map(cat => (
            <button key={cat} onClick={() => { const catMyths = myths.filter(m => m.category === cat).slice(0, 2); catMyths.forEach(m => handleMythClick(m)); }} className="px-3 py-1 bg-white border rounded-full text-xs font-medium hover:bg-gray-50">
              {cat === 'breastfeeding' ? '🤱' : cat === 'newborn' ? '👶' : cat === 'vaccination' ? '💉' : cat === 'nutrition' ? '🍎' : cat === 'illness' ? '🤒' : '🤰'} {t(cat === 'breastfeeding' ? 'দুধ' : cat === 'newborn' ? 'নবজাতক' : cat === 'vaccination' ? 'টিকা' : cat === 'nutrition' ? 'পুষ্টি' : cat === 'illness' ? 'অসুস্থতা' : 'গর্ভকালীন', cat.charAt(0).toUpperCase() + cat.slice(1), language)}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder={t('প্রশ্ন লিখুন...', 'Type a question...', language)} className="flex-1 px-4 py-3 border rounded-xl text-sm" />
          <button onClick={handleSearch} className="px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold">🔍</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// COMMUNITY BOARD
// ═══════════════════════════════════════════

interface CommunityPost {
  id: string;
  authorName: string;
  authorType: string;
  title: string;
  content: string;
  upvotes: number;
  date: string;
}

const samplePosts: CommunityPost[] = [
  { id: 'p1', authorName: 'ফাতেমা বেগম', authorType: 'parent', title: 'খিচুড়ি রেসিপি শেয়ার', content: 'আমার শিশু খিচুড়ি খেতে ভালোবাসে। আমি চাল, ডাল, গাজর, আলু ও একটু ডিম মিশিয়ে রান্না করি। খুবই পুষ্টিকর!', upvotes: 15, date: '2025-01-15' },
  { id: 'p2', authorName: 'ডাঃ কামাল', authorType: 'chw', title: 'ওআরএস এর গুরুত্ব', content: 'ডায়রিয়ার সময় অনেকেই ওআরএস এড়িয়ে ঘরোয়া স্যালাইন বানায়। অনুগ্রহ করে WHO অনুমোদিত ওআরএস ব্যবহার করুন।', upvotes: 23, date: '2025-01-14' },
  { id: 'p3', authorName: 'রুবিনা আক্তার', authorType: 'parent', title: 'বুকের দুধ বাড়ানোর উপায়', content: 'প্রচুর পানি পান করুন, মেথি শাক খান, ঘুম ঠিকমতো নিন। এগুলো আমার জন্য কাজ করেছে।', upvotes: 8, date: '2025-01-13' },
  { id: 'p4', authorName: 'সাবরিনা সুলতানা', authorType: 'chw', title: 'শীতে শিশুর যত্ন', content: 'শীতে শিশুকে উষ্ণ রাখুন। ভারী কাপড়ের বদলে একাধিক পাতলা কাপড় পরান। মাথা ও হাত ঢেকে রাখুন।', upvotes: 19, date: '2025-01-12' },
];

function CommunityPage() {
  const { language, setPage } = useAppStore();
  const [posts, setPosts] = useState(samplePosts);

  const upvote = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('সম্প্রদায়', 'Community', language)} icon="👥" />

        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${post.authorType === 'chw' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {post.authorType === 'chw' ? '👨‍⚕️' : '👩'}
                </div>
                <div>
                  <p className="font-semibold text-sm">{post.authorName}</p>
                  <p className="text-xs text-muted-foreground">{post.authorType === 'chw' ? t('স্বাস্থ্যকর্মী', 'Health Worker', language) : t('অভিভাবক', 'Parent', language)}</p>
                </div>
              </div>
              <h3 className="font-bold text-sm mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <button onClick={() => upvote(post.id)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-emerald-600 transition-colors">
                  👍 {post.upvotes}
                </button>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MEDICAL HISTORY
// ═══════════════════════════════════════════

function HistoryPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const child = children.find(c => c.id === selectedChildId);
  const [tab, setTab] = useState<'events' | 'growth' | 'checks'>('events');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('চিকিৎসা ইতিহাস', 'Medical History', language)} icon="📄" />

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('events')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'events' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
            📝 {t('ঘটনা', 'Events', language)}
          </button>
          <button onClick={() => setTab('growth')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'growth' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
            📏 {t('বৃদ্ধি', 'Growth', language)}
          </button>
          <button onClick={() => setTab('checks')} className={`flex-1 py-2 rounded-xl font-semibold text-xs transition-colors ${tab === 'checks' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
            🩺 {t('ট্রায়েজ', 'Triage', language)}
          </button>
        </div>

        {child ? (
          <>
            {tab === 'events' && (
              <div className="space-y-3">
                {child.medicalEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">{t('কোনো চিকিৎসা ঘটনা নেই', 'No medical events recorded', language)}</p>
                ) : child.medicalEvents.map((event, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 rounded-full">{event.type}</span>
                        <p className="text-sm mt-1">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {/* Vaccination events */}
                {child.completedVaccines.map(vId => {
                  const vaccine = allVaccines.find(v => v.id === vId);
                  return vaccine ? (
                    <div key={vId} className="bg-green-50 rounded-2xl shadow p-4 flex items-center gap-3">
                      <span className="text-xl">💉</span>
                      <div>
                        <p className="text-sm font-medium">{t(vaccine.name, vaccine.nameEn, language)}</p>
                        <p className="text-xs text-muted-foreground">{t('সম্পন্ন', 'Completed', language)}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {tab === 'growth' && (
              <div className="space-y-3">
                {child.growthRecords.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">{t('বৃদ্ধির রেকর্ড নেই', 'No growth records', language)}</p>
                ) : child.growthRecords.map((record, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-4">
                    <div className="flex justify-between">
                      <span className="text-sm">{t(`ওজন: ${record.weight} কেজি`, `Weight: ${record.weight} kg`, language)}</span>
                      <span className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'checks' && (
              <div className="space-y-3">
                {child.symptomChecks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">{t('কোনো লক্ষণ পরীক্ষা নেই', 'No symptom checks', language)}</p>
                ) : child.symptomChecks.map((check, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <UrgencyCard level={check.urgencyLevel} />
                    </div>
                    <p className="text-sm mt-2">{check.action}</p>
                    <span className="text-xs text-muted-foreground">{new Date(check.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* PDF Export button */}
            <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-colors">
              📄 {t('রিপোর্ট তৈরি করুন (PDF)', 'Generate Report (PDF)', language)}
            </button>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-8">{t('শিশু নির্বাচন করুন', 'Select a child', language)}</p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PRENATAL MODULE
// ═══════════════════════════════════════════

function PrenatalPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const child = children.find(c => c.id === selectedChildId);
  const age = child ? getChildAge(child) : null;
  const currentWeek = age?.isPrenatal ? age.prenatalWeek : 20;
  const currentGuide = getPrenatalGuideByWeek(currentWeek);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        <BackButton onClick={() => setPage('home')} label={t('হোম', 'Home', language)} />
        <PageHeader title={t('গর্ভকালীন যত্ন', 'Prenatal Care', language)} icon="🤰" />

        {/* Current week */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-2xl p-5 mb-4">
          <p className="text-sm opacity-80">{t('বর্তমান সপ্তাহ', 'Current Week', language)}</p>
          <p className="text-4xl font-bold">{currentWeek}</p>
          {currentGuide && <p className="text-sm mt-1">{t(currentGuide.title, currentGuide.titleEn, language)}</p>}
        </div>

        {/* Danger Signs */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-red-700 mb-2">⚠️ {t('বিপদ সংকেত', 'Danger Signs', language)}</h3>
          <div className="space-y-1">
            {allDangerSigns.map((sign, i) => (
              <p key={i} className="text-sm text-red-800">• {t(sign.bn, sign.en, language)}</p>
            ))}
          </div>
          <p className="text-xs text-red-600 mt-2 font-semibold">{t('এই লক্ষণগুলো দেখা দিলে তাড়াতাড়ি হাসপাতালে যান!', 'Go to hospital immediately if these appear!', language)}</p>
        </div>

        {/* Weekly Guide */}
        {prenatalGuides.map(guide => (
          <div key={guide.weekStart} className={`bg-white rounded-2xl shadow p-4 mb-3 ${currentWeek >= guide.weekStart && currentWeek <= guide.weekEnd ? 'ring-2 ring-fuchsia-400' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{guide.ancVisit ? '🏥' : '📅'}</span>
              <h3 className="font-bold text-sm">{t(guide.title, guide.titleEn, language)}</h3>
              <span className="text-xs text-muted-foreground">{guide.weekStart}-{guide.weekEnd} {t('সপ্তাহ', 'weeks', language)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{t(guide.development, guide.developmentEn, language)}</p>
            <div className="bg-fuchsia-50 p-2 rounded-lg">
              <p className="text-xs">💡 {t(guide.tips, guide.tipsEn, language)}</p>
            </div>
            {guide.ancVisit && (
              <div className="mt-2 bg-green-50 p-2 rounded-lg">
                <p className="text-xs text-green-700">✅ {t('এই সময়ে এএনসি চেকআপ প্রয়োজন', 'ANC checkup needed this period', language)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════

function AdminPage() {
  const { language, setPage, setAdminMode } = useAppStore();
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [facilityEdits, setFacilityEdits] = useState(facilities.map(f => ({
    id: f.id,
    name: f.nameEn,
    bedsAvailable: f.bedsAvailable,
    hasOxygen: f.hasOxygen,
    hasPediatric: f.hasPediatric,
    hasPower: f.hasPower,
  })));

  const handleLogin = () => {
    if (email && pin.length >= 4) {
      setAuthenticated(true);
      setAdminMode(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
          <PageHeader title={t('স্টাফ লগইন', 'Staff Login', language)} icon="🔐" />
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t('ইমেইল', 'Email', language)}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-3 border rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium">{t('পিন', 'PIN', language)}</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} maxLength={6} className="w-full mt-1 px-4 py-3 border rounded-xl" />
            </div>
            <button onClick={handleLogin} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700">
              {t('প্রবেশ করুন', 'Login', language)}
            </button>
            <button onClick={() => setPage('home')} className="w-full py-2 text-sm text-muted-foreground">
              ← {t('ফিরে যান', 'Go Back', language)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <PageHeader title={t('হাসপাতাল ড্যাশবোর্ড', 'Facility Dashboard', language)} icon="🏥" />
          <button onClick={() => { setAuthenticated(false); setAdminMode(false); setPage('home'); }} className="text-sm text-red-600">{t('লগআউট', 'Logout', language)}</button>
        </div>

        {/* Referral count */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-emerald-700 mb-1">{t('আজকের রেফারেল', 'Today\'s Referrals', language)}</h3>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">3</p>
              <p className="text-xs">{t('স্তর ৩', 'Level 3', language)}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">1</p>
              <p className="text-xs">{t('স্তর ৪', 'Level 4', language)}</p>
            </div>
          </div>
        </div>

        {/* Facility toggles */}
        <div className="space-y-4">
          {facilityEdits.map(facility => (
            <div key={facility.id} className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-bold mb-3">{facility.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">{t('বেড সংখ্যা', 'Available Beds', language)}</label>
                  <input type="number" value={facility.bedsAvailable} onChange={(e) => setFacilityEdits(prev => prev.map(f => f.id === facility.id ? { ...f, bedsAvailable: parseInt(e.target.value) || 0 } : f))} className="w-full px-3 py-2 border rounded-lg text-sm mt-1" />
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={facility.hasOxygen} onChange={(e) => setFacilityEdits(prev => prev.map(f => f.id === facility.id ? { ...f, hasOxygen: e.target.checked } : f))} className="w-5 h-5" />
                    {t('অক্সিজেন', 'O₂', language)}
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={facility.hasPediatric} onChange={(e) => setFacilityEdits(prev => prev.map(f => f.id === facility.id ? { ...f, hasPediatric: e.target.checked } : f))} className="w-5 h-5" />
                    {t('পেডিয়াট্রিক', 'Pediatric', language)}
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={facility.hasPower} onChange={(e) => setFacilityEdits(prev => prev.map(f => f.id === facility.id ? { ...f, hasPower: e.target.checked } : f))} className="w-5 h-5" />
                    {t('বিদ্যুৎ', 'Power', language)}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-colors">
          ✅ {t('আপডেট করুন', 'Submit Update', language)}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP ROUTER
// ═══════════════════════════════════════════

export default function ChildCareApp() {
  const currentPage = useAppStore(s => s.currentPage);

  const pages: Record<Page, React.ReactNode> = {
    onboarding: <OnboardingPage />,
    'child-profile': <ChildProfilePage />,
    home: <HomeDashboard />,
    triage: <TriagePage />,
    care: <CarePage />,
    nutrition: <NutritionPage />,
    vaccination: <VaccinationPage />,
    learn: <LearnPage />,
    history: <HistoryPage />,
    facility: <FacilityPage />,
    myth: <MythPage />,
    community: <CommunityPage />,
    prenatal: <PrenatalPage />,
    admin: <AdminPage />,
  };

  return pages[currentPage] || <OnboardingPage />;
}

'use client';

import React, { useState, useMemo } from 'react';
import { divisions, getDistricts, getUpazilas } from '@/lib/data/bangladesh';
import { vaccineGroups, getNextDueVaccine, allVaccines } from '@/lib/data/epi-schedule';
import { milestones, getMilestonesByAge, getCategoryLabel } from '@/lib/data/milestones';
import { nutritionGuides, recipes, muacGuide, getNutritionGuideByAge, getRecipesByAge } from '@/lib/data/nutrition';
import { myths, searchMyths } from '@/lib/data/myths';
import { facilities, getFacilitiesByDistrict, getFacilitiesByDivision, getFacilitiesByUrgency, facilityTypes, getHoursSinceUpdate, isStale } from '@/lib/data/facilities';
import { careCards, getCareCardByAge } from '@/lib/data/care-cards';
import { activities, banglaFlashcards, englishFlashcards, funFacts, getActivitiesByAge, getDailyFunFact } from '@/lib/data/activities';
import { prenatalGuides, allDangerSigns, getPrenatalGuideByWeek } from '@/lib/data/prenatal';
import { useAppStore, getChildAge, type Page, type ChildData } from '@/store/app-store';

// ─── Helpers ────────────────────────────────────────────────────────
function t(bn: string, en: string, lang: 'bn' | 'en') { return lang === 'bn' ? bn : en; }

const urgencyColors: Record<number, { bg: string; border: string; text: string; label: string; labelBn: string }> = {
  1: { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-700', label: 'Home Care', labelBn: 'বাড়িতে যত্ন' },
  2: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700', label: 'Visit CHW', labelBn: 'স্বাস্থ্যকর্মী দেখান' },
  3: { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700', label: 'Upazila HC', labelBn: 'উপজেলা স্বাস্থ্য কেন্দ্র' },
  4: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', label: 'Emergency', labelBn: 'জরুরি হাসপাতাল' },
};

function ageDisplay(child: ChildData, lang: 'bn' | 'en'): string {
  const age = getChildAge(child);
  if (age.isPrenatal) return t(`গর্ভে ${age.prenatalWeek} সপ্তাহ`, `${age.prenatalWeek} weeks pregnant`, lang);
  if (age.months < 1) return t(`${age.weeks} সপ্তাহ`, `${age.weeks} weeks`, lang);
  if (age.months < 24) return t(`${age.months} মাস`, `${age.months} months`, lang);
  const y = Math.floor(age.months / 12);
  return t(`${y} বছর`, `${y} years`, lang);
}

// ─── Symptom definitions ───────────────────────────────────────────
interface SymptomDef { id: string; icon: string; bn: string; en: string; severity: 'mild' | 'moderate' | 'danger'; }
const mainSymptoms: SymptomDef[] = [
  { id: 'fever', icon: '🌡️', bn: 'জ্বর', en: 'Fever', severity: 'moderate' },
  { id: 'cough', icon: '😤', bn: 'কাশি', en: 'Cough', severity: 'mild' },
  { id: 'diarrhea', icon: '💧', bn: 'ডায়রিয়া', en: 'Diarrhea', severity: 'moderate' },
  { id: 'rash', icon: '🔴', bn: 'ফুসকুড়ি', en: 'Rash', severity: 'mild' },
  { id: 'not_eating', icon: '🚫', bn: 'খাবার নিচ্ছে না', en: 'Not Eating', severity: 'moderate' },
  { id: 'breathing', icon: '😮‍💨', bn: 'শ্বাসকষ্ট', en: 'Breathing Difficulty', severity: 'danger' },
];
const moreSymptoms: SymptomDef[] = [
  { id: 'vomit', icon: '🤮', bn: 'বমি', en: 'Vomiting', severity: 'moderate' },
  { id: 'lethargy', icon: '😴', bn: 'অসারতা', en: 'Lethargy', severity: 'moderate' },
  { id: 'ear_pain', icon: '👂', bn: 'কান ব্যথা', en: 'Ear Pain', severity: 'mild' },
  { id: 'eye_issue', icon: '👁️', bn: 'চোখের সমস্যা', en: 'Eye Issue', severity: 'mild' },
  { id: 'convulsion', icon: '⚡', bn: 'খিঁচুনি', en: 'Convulsion', severity: 'danger' },
  { id: 'bleeding', icon: '🩸', bn: 'রক্তক্ষরণ', en: 'Bleeding', severity: 'danger' },
];

function calculateUrgency(symptomIds: string[], ageMonths: number): number {
  if (symptomIds.length === 0) return 0;
  // Danger signs auto-escalate
  if (symptomIds.includes('convulsion') || symptomIds.includes('bleeding')) return 4;
  if (symptomIds.includes('breathing')) {
    if (ageMonths < 2 && symptomIds.includes('fever')) return 4;
    return 3;
  }
  if (symptomIds.includes('fever') && ageMonths < 2) return 3;
  const allDefs = [...mainSymptoms, ...moreSymptoms];
  const dangerCount = symptomIds.filter(id => allDefs.find(s => s.id === id)?.severity === 'danger').length;
  const moderateCount = symptomIds.filter(id => allDefs.find(s => s.id === id)?.severity === 'moderate').length;
  if (dangerCount > 0) return 3;
  if (moderateCount >= 2) return 2;
  if (moderateCount === 1) return 1;
  return 1;
}

// ─── Onboarding Page ───────────────────────────────────────────────
function OnboardingPage() {
  const { language, setLanguage, setParent, setPage } = useAppStore();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');
  const [role, setRole] = useState<'parent' | 'chw'>('parent');

  const lang = language;
  const districtList = useMemo(() => getDistricts(divisionId), [divisionId]);
  const upazilaList = useMemo(() => getUpazilas(districtId), [districtId]);

  const canNext = step === 0 ? true : step === 1 ? phone.length >= 10 && name.trim().length > 0 : step === 2 ? !!upazilaId : true;

  const handleFinish = () => {
    setParent({
      id: `p-${Date.now()}`,
      phone, name, language: lang,
      division: divisionId, district: districtId, upazila: upazilaId,
    });
    setPage('child-profile');
  };

  return (
    <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0,1,2,3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-white' : 'bg-emerald-400/40'}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="text-center animate-in fade-in duration-300">
            <div className="text-6xl mb-6">👶</div>
            <h1 className="text-3xl font-bold text-white mb-2">NurtureAI</h1>
            <p className="text-emerald-100 mb-8">{t('ভাষা নির্বাচন করুন', 'Select Language', lang)}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { setLanguage('bn'); setStep(1); }} className="bg-white text-emerald-700 font-bold text-xl px-8 py-5 rounded-2xl shadow-md active:scale-95 transition-transform min-w-[140px]">
                🇧🇩 বাংলা
              </button>
              <button onClick={() => { setLanguage('en'); setStep(1); }} className="bg-white/20 text-white font-bold text-xl px-8 py-5 rounded-2xl border-2 border-white/40 active:scale-95 transition-transform min-w-[140px]">
                🌐 English
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">{t('আপনার তথ্য', 'Your Information', lang)}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">📱 {t('ফোন নম্বর', 'Phone Number', lang)}</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">👤 {t('নাম', 'Name', lang)}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('আপনার নাম', 'Your name', lang)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border-2 border-white/40 text-white font-semibold active:scale-95 transition-transform">{t('পিছনে', 'Back', lang)}</button>
              <button onClick={() => setStep(2)} disabled={!canNext} className="flex-1 py-3 rounded-xl bg-white text-emerald-700 font-semibold disabled:opacity-40 active:scale-95 transition-transform">{t('পরবর্তী', 'Next', lang)}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">{t('আপনার এলাকা', 'Your Area', lang)}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">📍 {t('বিভাগ', 'Division', lang)}</label>
                <select value={divisionId} onChange={e => { setDivisionId(e.target.value); setDistrictId(''); setUpazilaId(''); }} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white">
                  <option value="">{t('বিভাগ নির্বাচন', 'Select Division', lang)}</option>
                  {divisions.map(d => <option key={d.id} value={d.id}>{t(d.bn, d.en, lang)}</option>)}
                </select>
              </div>
              {divisionId && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">🏘️ {t('জেলা', 'District', lang)}</label>
                  <select value={districtId} onChange={e => { setDistrictId(e.target.value); setUpazilaId(''); }} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white">
                    <option value="">{t('জেলা নির্বাচন', 'Select District', lang)}</option>
                    {districtList.map(d => <option key={d.id} value={d.id}>{t(d.bn, d.en, lang)}</option>)}
                  </select>
                </div>
              )}
              {districtId && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">🏥 {t('উপজেলা', 'Upazila', lang)}</label>
                  <select value={upazilaId} onChange={e => setUpazilaId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white">
                    <option value="">{t('উপজেলা নির্বাচন', 'Select Upazila', lang)}</option>
                    {upazilaList.map(u => <option key={u.id} value={u.id}>{t(u.bn, u.en, lang)}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border-2 border-white/40 text-white font-semibold active:scale-95 transition-transform">{t('পিছনে', 'Back', lang)}</button>
              <button onClick={() => setStep(3)} disabled={!canNext} className="flex-1 py-3 rounded-xl bg-white text-emerald-700 font-semibold disabled:opacity-40 active:scale-95 transition-transform">{t('পরবর্তী', 'Next', lang)}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">{t('আপনার ভূমিকা', 'Your Role', lang)}</h2>
            <div className="space-y-4">
              <button onClick={() => setRole('parent')} className={`w-full p-6 rounded-2xl shadow-md text-left transition-all active:scale-95 ${role === 'parent' ? 'bg-white text-emerald-700 ring-2 ring-emerald-400' : 'bg-white/20 text-white'}`}>
                <div className="text-3xl mb-2">🤱</div>
                <div className="text-xl font-bold">{t('অভিভাবক', 'Parent', lang)}</div>
                <div className="text-sm opacity-70">{t('শিশুর মা/বাবা', 'Baby\'s mother/father', lang)}</div>
              </button>
              <button onClick={() => setRole('chw')} className={`w-full p-6 rounded-2xl shadow-md text-left transition-all active:scale-95 ${role === 'chw' ? 'bg-white text-emerald-700 ring-2 ring-emerald-400' : 'bg-white/20 text-white'}`}>
                <div className="text-3xl mb-2">👩‍⚕️</div>
                <div className="text-xl font-bold">{t('স্বাস্থ্যকর্মী', 'CHW', lang)}</div>
                <div className="text-sm opacity-70">{t('সম্প্রদায় স্বাস্থ্যকর্মী', 'Community Health Worker', lang)}</div>
              </button>
            </div>
            <button onClick={handleFinish} className="w-full mt-6 py-4 rounded-xl bg-white text-emerald-700 font-bold text-lg active:scale-95 transition-transform shadow-md">
              {t('শুরু করুন ✨', 'Get Started ✨', lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Child Profile Page ────────────────────────────────────────────
function ChildProfilePage() {
  const { language, addChild, setPage } = useAppStore();
  const lang = language;
  const [childName, setChildName] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [dateMode, setDateMode] = useState<'dob' | 'edd'>('dob');
  const [dob, setDob] = useState('');
  const [edd, setEdd] = useState('');
  const [birthWeight, setBirthWeight] = useState('');

  const handleSave = () => {
    const child: ChildData = {
      id: `c-${Date.now()}`,
      name: childName,
      dateOfBirth: dateMode === 'dob' ? dob : null,
      edd: dateMode === 'edd' ? edd : null,
      sex,
      birthWeight: birthWeight ? parseFloat(birthWeight) : null,
      isPrenatal: dateMode === 'edd',
      completedVaccines: [],
      completedMilestones: [],
      growthRecords: [],
      medicalEvents: [],
      symptomChecks: [],
    };
    addChild(child);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('শিশুর তথ্য', 'Child Profile', lang)}</h1>
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">👶 {t('শিশুর নাম', 'Baby Name', lang)}</label>
            <input type="text" value={childName} onChange={e => setChildName(e.target.value)} placeholder={t('নাম লিখুন', 'Enter name', lang)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">{t('লিঙ্গ', 'Sex', lang)}</label>
            <div className="flex gap-4">
              <button onClick={() => setSex('male')} className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95 ${sex === 'male' ? 'bg-blue-100 border-2 border-blue-400 text-blue-700' : 'bg-gray-50 border-2 border-gray-200 text-gray-500'}`}>
                👦 {t('ছেলে', 'Boy', lang)}
              </button>
              <button onClick={() => setSex('female')} className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95 ${sex === 'female' ? 'bg-pink-100 border-2 border-pink-400 text-pink-700' : 'bg-gray-50 border-2 border-gray-200 text-gray-500'}`}>
                👧 {t('মেয়ে', 'Girl', lang)}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">{t('জন্ম তারিখ বা প্রসবের সম্ভাব্য তারিখ', 'Date of Birth or EDD', lang)}</label>
            <div className="flex gap-3 mb-3">
              <button onClick={() => setDateMode('dob')} className={`flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95 ${dateMode === 'dob' ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-700' : 'bg-gray-50 border-2 border-gray-200 text-gray-500'}`}>
                🎂 {t('জন্ম তারিখ', 'DOB', lang)}
              </button>
              <button onClick={() => setDateMode('edd')} className={`flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95 ${dateMode === 'edd' ? 'bg-purple-100 border-2 border-purple-400 text-purple-700' : 'bg-gray-50 border-2 border-gray-200 text-gray-500'}`}>
                🤰 {t('প্রসবের তারিখ', 'EDD', lang)}
              </button>
            </div>
            {dateMode === 'dob' ? (
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg" />
            ) : (
              <input type="date" value={edd} onChange={e => setEdd(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg" />
            )}
            {dateMode === 'edd' && (
              <div className="mt-2 bg-purple-50 p-3 rounded-xl text-sm text-purple-700">
                🤰 {t('গর্ভবতী মা হিসেবে প্রসবপূর্ব যত্ন দেখানো হবে', 'Prenatal care will be shown', lang)}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">⚖️ {t('জন্মের ওজন (কেজি)', 'Birth Weight (kg)', lang)}</label>
            <input type="number" step="0.1" value={birthWeight} onChange={e => setBirthWeight(e.target.value)} placeholder="3.0" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <button onClick={handleSave} disabled={!childName.trim() || (dateMode === 'dob' ? !dob : !edd)} className="w-full mt-6 py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg shadow-md active:scale-95 transition-transform disabled:opacity-40">
          {t('সংরক্ষণ করুন', 'Save Profile', lang)} ✅
        </button>
      </div>
    </div>
  );
}

// ─── Home Dashboard ────────────────────────────────────────────────
function HomeDashboard() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  if (!child) return null;

  const age = getChildAge(child);
  const ageStr = ageDisplay(child, lang);
  const nextVax = getNextDueVaccine(age.isPrenatal ? 0 : Math.floor(age.weeks), child.completedVaccines);
  const careCard = getCareCardByAge(age.isPrenatal ? -1 : age.months);
  const funFact = getDailyFunFact();

  const vaxDueSoon = nextVax && (nextVax.ageWeeks - age.weeks) <= 7 && (nextVax.ageWeeks - age.weeks) >= 0;

  const modules = [
    { icon: '🩺', label: t('ট্রায়েজ', 'Triage', lang), page: 'triage' as Page },
    { icon: '📋', label: t('যত্ন', 'Care', lang), page: 'care' as Page },
    { icon: '💉', label: t('টিকা', 'Vaccines', lang), page: 'vaccination' as Page },
    { icon: '🥗', label: t('পুষ্টি', 'Nutrition', lang), page: 'nutrition' as Page },
    { icon: '📚', label: t('শিখুন', 'Learn', lang), page: 'learn' as Page },
    { icon: '🏥', label: t('হাসপাতাল', 'Facility', lang), page: 'facility' as Page },
  ];

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-emerald-600 px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-emerald-100 text-sm font-medium">NurtureAI</span>
            <button onClick={() => setPage('child-profile')} className="text-white/80 text-sm active:scale-95">⚙️</button>
          </div>
          {/* Child Card */}
          <div className="bg-white/15 backdrop-blur rounded-2xl p-4 flex items-center gap-4">
            <div className="text-4xl">{child.sex === 'male' ? '👦' : '👧'}</div>
            <div className="flex-1">
              <div className="text-white font-bold text-lg">{child.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white/25 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{ageStr}</span>
                {age.isPrenatal && <span className="bg-purple-400/50 text-white text-xs font-semibold px-2 py-0.5 rounded-full">🤰 {t('গর্ভে', 'Prenatal', lang)}</span>}
              </div>
            </div>
            {vaxDueSoon && (
              <button onClick={() => setPage('vaccination')} className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-xl animate-pulse active:scale-95">
                💉 {t('টিকা বাকি!', 'Vax Due!', lang)}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4 space-y-4">
        {/* Next Vaccine */}
        {nextVax && (
          <button onClick={() => setPage('vaccination')} className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 active:scale-[0.98] transition-transform">
            <div className="text-3xl">💉</div>
            <div className="flex-1 text-left">
              <div className="text-sm text-gray-500">{t('পরবর্তী টিকা', 'Next Vaccine', lang)}</div>
              <div className="font-semibold text-gray-800">{t(nextVax.name, nextVax.nameEn, lang)}</div>
            </div>
            <span className="text-emerald-600 font-bold text-sm">→</span>
          </button>
        )}

        {/* Today's Care */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📋</span>
            <span className="font-semibold text-gray-800">{t("আজকের যত্ন", "Today's Care", lang)}</span>
          </div>
          <div className="space-y-2">
            {careCard.tasks.slice(0, 3).map((task, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <span>{task.icon}</span>
                <span className="text-sm">{t(task.text, task.textEn, lang)}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setPage('care')} className="mt-3 text-emerald-600 text-sm font-semibold active:scale-95">{t('সব দেখুন →', 'View All →', lang)}</button>
        </div>

        {/* Fun Fact */}
        <div className="bg-amber-50 rounded-2xl p-4 shadow-sm border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <span className="font-semibold text-amber-800">{t('আজকের তথ্য', 'Daily Fact', lang)}</span>
          </div>
          <p className="text-sm text-amber-900">{t(funFact.fact, funFact.factEn, lang)}</p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-3 gap-3">
          {modules.map(m => (
            <button key={m.page} onClick={() => setPage(m.page)} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <span className="text-3xl">{m.icon}</span>
              <span className="text-xs font-semibold text-gray-700">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Emergency */}
        <button onClick={() => setPage('triage')} className="w-full bg-red-500 text-white rounded-2xl p-4 font-bold text-lg shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
          🚨 {t('শিশু অসুস্থ মনে হচ্ছে', 'Child Seems Unwell', lang)}
        </button>
      </div>
    </div>
  );
}

// ─── Triage Page ───────────────────────────────────────────────────
function TriagePage() {
  const { language, children, selectedChildId, setTriageState, triageState, addSymptomCheck, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showMore, setShowMore] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resolved, setResolved] = useState(false);

  const ageMonths = child ? (getChildAge(child).isPrenatal ? 0 : getChildAge(child).months) : 0;
  const urgencyLevel = useMemo(() => calculateUrgency(Array.from(selected), ageMonths), [selected, ageMonths]);

  const toggleSymptom = (id: string) => {
    setSelected(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const handleAssess = () => {
    setTriageState({ symptoms: Array.from(selected), urgencyLevel, result: urgencyColors[urgencyLevel]?.labelBn ?? '' });
    if (child) {
      addSymptomCheck(child.id, { symptoms: Array.from(selected), urgencyLevel, date: new Date().toISOString(), action: urgencyColors[urgencyLevel]?.labelBn ?? '' });
    }
    setShowResult(true);
  };

  const uc = urgencyColors[urgencyLevel] ?? urgencyColors[1];

  const whatsappMsg = encodeURIComponent(
    `🚨 NurtureAI Alert\n${t('শিশু:', 'Child:', lang)} ${child?.name}\n${t('লক্ষণ:', 'Symptoms:', lang)} ${Array.from(selected).map(id => { const s = [...mainSymptoms, ...moreSymptoms].find(x => x.id === id); return s ? t(s.bn, s.en, lang) : id; }).join(', ')}\n${t('জরুরি স্তর:', 'Urgency:', lang)} ${t(uc.labelBn, uc.label, lang)}`
  );

  if (showResult && urgencyLevel > 0) {
    return (
      <div className="pb-24 bg-gray-50 min-h-screen p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => { setShowResult(false); setSelected(new Set()); }} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('ফিরে যান', 'Go Back', lang)}</button>
          <div className={`${uc.bg} ${uc.border} border-2 rounded-2xl p-6 ${urgencyLevel === 4 ? 'animate-pulse' : ''}`}>
            <div className="text-center">
              <div className="text-5xl mb-3">{urgencyLevel === 4 ? '🚨' : urgencyLevel === 3 ? '⚠️' : urgencyLevel === 2 ? '🟡' : '🟢'}</div>
              <h2 className={`text-2xl font-bold ${uc.text} mb-2`}>{t(uc.labelBn, uc.label, lang)}</h2>
              <p className={`${uc.text} text-sm`}>
                {urgencyLevel === 1 && t('বাড়িতে যত্ন নিন। লক্ষণ খারাপ হলে স্বাস্থ্যকর্মীকে দেখান।', 'Care at home. See a CHW if symptoms worsen.', lang)}
                {urgencyLevel === 2 && t('সম্প্রদায় স্বাস্থ্যকর্মীকে দেখান।', 'Visit a Community Health Worker.', lang)}
                {urgencyLevel === 3 && t('উপজেলা স্বাস্থ্য কেন্দ্রে যান।', 'Go to Upazila Health Center.', lang)}
                {urgencyLevel === 4 && t('তাড়াতাড়ি হাসপাতালে যান!', 'Go to hospital IMMEDIATELY!', lang)}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {urgencyLevel >= 2 && (
              <a href={`https://wa.me/?text=${whatsappMsg}`} target="_blank" rel="noopener" className="block w-full bg-green-500 text-white rounded-xl py-3 text-center font-bold active:scale-95 transition-transform">
                📲 {t('WhatsApp শেয়ার', 'Share via WhatsApp', lang)}
              </a>
            )}
            {urgencyLevel >= 3 && (
              <button onClick={() => setPage('facility')} className="w-full bg-blue-500 text-white rounded-xl py-3 font-bold active:scale-95 transition-transform">
                🏥 {t('নিকটস্থ হাসপাতাল খুঁজুন', 'Find Nearest Facility', lang)}
              </button>
            )}
            {!resolved ? (
              <button onClick={() => setResolved(true)} className="w-full bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold active:scale-95 transition-transform">
                ✅ {t('সমাধান হয়েছে', 'Mark as Resolved', lang)}
              </button>
            ) : (
              <div className="bg-emerald-50 text-emerald-700 rounded-xl p-3 text-center font-semibold">✅ {t('সমাধান হয়েছে', 'Resolved', lang)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🩺 {t('লক্ষণ যাচাই', 'Symptom Triage', lang)}</h1>
        <p className="text-gray-500 text-sm mb-4">{t('শিশুর লক্ষণ নির্বাচন করুন', 'Select your child\'s symptoms', lang)}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {mainSymptoms.map(s => (
            <button key={s.id} onClick={() => toggleSymptom(s.id)} className={`p-4 rounded-2xl text-left transition-all active:scale-95 ${selected.has(s.id) ? 'bg-emerald-50 border-2 border-emerald-400 shadow-sm' : 'bg-white border-2 border-gray-100'}`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-semibold text-sm text-gray-800">{t(s.bn, s.en, lang)}</div>
            </button>
          ))}
        </div>

        {!showMore ? (
          <button onClick={() => setShowMore(true)} className="w-full py-3 text-emerald-600 font-semibold text-sm active:scale-95">{t('আরও লক্ষণ দেখুন ⋯', 'Show More Symptoms ⋯', lang)}</button>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {moreSymptoms.map(s => (
              <button key={s.id} onClick={() => toggleSymptom(s.id)} className={`p-4 rounded-2xl text-left transition-all active:scale-95 ${selected.has(s.id) ? 'bg-emerald-50 border-2 border-emerald-400 shadow-sm' : 'bg-white border-2 border-gray-100'}`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-semibold text-sm text-gray-800">{t(s.bn, s.en, lang)}</div>
              </button>
            ))}
          </div>
        )}

        {selected.size > 0 && (
          <div className="bg-gray-100 rounded-xl p-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">{t(`${selected.size}টি লক্ষণ`, `${selected.size} symptoms`, lang)}</span>
            <button onClick={() => setSelected(new Set())} className="text-red-500 text-sm font-semibold active:scale-95">{t('মুছুন', 'Clear', lang)}</button>
          </div>
        )}

        <button onClick={handleAssess} disabled={selected.size === 0} className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg disabled:opacity-40 active:scale-95 transition-transform shadow-md">
          {t('যাচাই করুন', 'Assess Now', lang)} 🔍
        </button>
      </div>
    </div>
  );
}

// ─── Care Page ──────────────────────────────────────────────────────
function CarePage() {
  const { language, children, selectedChildId, markMilestoneComplete, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  const [tab, setTab] = useState<'care' | 'milestones'>('care');
  const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set());

  if (!child) return null;
  const age = getChildAge(child);
  const careCard = getCareCardByAge(age.isPrenatal ? -1 : age.months);
  const ageMilestones = getMilestonesByAge(age.isPrenatal ? 0 : age.months);
  const categories = ['motor', 'social', 'cognitive', 'speech'] as const;

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📋 {t('যত্ন ও মাইলফলক', 'Care & Milestones', lang)}</h1>

        {/* Tab Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button onClick={() => setTab('care')} className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${tab === 'care' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>
            📋 {t('দৈনিক যত্ন', 'Daily Care', lang)}
          </button>
          <button onClick={() => setTab('milestones')} className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${tab === 'milestones' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>
            🎯 {t('মাইলফলক', 'Milestones', lang)}
          </button>
        </div>

        {tab === 'care' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-1">{t(careCard.title, careCard.titleEn, lang)}</h3>
            <p className="text-xs text-gray-400 mb-3">{t(careCard.ageBand, careCard.ageBandEn, lang)}</p>
            <div className="space-y-3">
              {careCard.tasks.map((task, i) => (
                <button key={i} onClick={() => setCheckedTasks(prev => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; })} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all active:scale-95 ${checkedTasks.has(i) ? 'bg-emerald-50 line-through opacity-60' : 'bg-gray-50'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${checkedTasks.has(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>
                    {checkedTasks.has(i) && '✓'}
                  </div>
                  <span>{task.icon}</span>
                  <span className="text-sm">{t(task.text, task.textEn, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'milestones' && (
          <div className="space-y-4">
            {categories.map(cat => {
              const catMilestones = ageMilestones.filter(m => m.category === cat);
              if (catMilestones.length === 0) return null;
              const label = getCategoryLabel(cat);
              return (
                <div key={cat} className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">{t(label.bn, label.en, lang)}</h3>
                  <div className="space-y-2">
                    {catMilestones.map(m => (
                      <button key={m.id} onClick={() => markMilestoneComplete(child.id, m.id)} className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all active:scale-95 ${child.completedMilestones.includes(m.id) ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs mt-0.5 shrink-0 ${child.completedMilestones.includes(m.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>
                          {child.completedMilestones.includes(m.id) && '✓'}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-800">{t(m.description, m.descriptionEn, lang)}</span>
                          {m.flag && !child.completedMilestones.includes(m.id) && (
                            <div className="text-xs text-orange-600 font-semibold mt-1">⚠️ {t('বিলম্ব সতর্কতা', 'Delay Warning', lang)}</div>
                          )}
                        </div>
                      </button>
                    ))}
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

// ─── Nutrition Page ─────────────────────────────────────────────────
function NutritionPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  const [tab, setTab] = useState<'guide' | 'recipes' | 'muac'>('guide');

  if (!child) return null;
  const age = getChildAge(child);
  const guide = getNutritionGuideByAge(age.isPrenatal ? 0 : age.months);
  const ageRecipes = getRecipesByAge(age.isPrenatal ? 0 : age.months);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🥗 {t('পুষ্টি', 'Nutrition', lang)}</h1>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {(['guide', 'recipes', 'muac'] as const).map(t2 => (
            <button key={t2} onClick={() => setTab(t2)} className={`flex-1 py-2.5 rounded-lg font-semibold text-xs transition-all ${tab === t2 ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>
              {t2 === 'guide' ? '📖' : t2 === 'recipes' ? '🍳' : '📏'} {t2 === 'guide' ? t('নির্দেশিকা', 'Guide', lang) : t2 === 'recipes' ? t('রেসিপি', 'Recipes', lang) : 'MUAC'}
            </button>
          ))}
        </div>

        {tab === 'guide' && guide && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">{t(guide.title, guide.titleEn, lang)}</h3>
              <p className="text-sm text-gray-600 mb-4">{t(guide.content, guide.contentEn, lang)}</p>
              <div className="bg-emerald-50 rounded-xl p-3 mb-3">
                <div className="font-semibold text-emerald-700 text-sm mb-1">🍎 {t('প্রস্তাবিত খাবার', 'Recommended Foods', lang)}</div>
                <p className="text-sm text-emerald-800">{t(guide.foods, guide.foodsEn, lang)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 mb-3">
                <div className="font-semibold text-blue-700 text-sm mb-1">⏰ {t('খাবারের সময়সূচি', 'Feeding Schedule', lang)}</div>
                <p className="text-sm text-blue-800">{t(guide.frequency, guide.frequencyEn, lang)}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <div className="font-semibold text-red-700 text-sm mb-1">⚠️ {t('সতর্কতা', 'Warnings', lang)}</div>
                <p className="text-sm text-red-800">{t(guide.warnings, guide.warningsEn, lang)}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'recipes' && (
          <div className="space-y-3">
            {ageRecipes.map(r => (
              <details key={r.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <summary className="p-4 font-semibold text-gray-800 cursor-pointer active:scale-[0.98] transition-transform list-none flex items-center gap-2">
                  🍽️ {t(r.name, r.nameEn, lang)}
                  <span className="ml-auto text-xs text-gray-400">{r.calories} kcal</span>
                </summary>
                <div className="px-4 pb-4 space-y-2">
                  <div className="text-sm"><strong>{t('উপকরণ:', 'Ingredients:', lang)}</strong> {t(r.ingredients, r.ingredientsEn, lang)}</div>
                  <div className="text-sm"><strong>{t('প্রস্তুতি:', 'Instructions:', lang)}</strong> {t(r.instructions, r.instructionsEn, lang)}</div>
                  <div className="text-xs text-emerald-600 font-semibold">{t('পুষ্টি:', 'Nutrients:', lang)} {t(r.nutrients, r.nutrientsEn, lang)}</div>
                </div>
              </details>
            ))}
            {ageRecipes.length === 0 && <p className="text-center text-gray-400 py-8">{t('এই বয়সের জন্য রেসিপি শীঘ্রই আসছে', 'Recipes for this age coming soon', lang)}</p>}
          </div>
        )}

        {tab === 'muac' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">📏 {t(muacGuide.title, muacGuide.titleEn, lang)}</h3>
              <p className="text-sm text-gray-600 mb-4">{t(muacGuide.description, muacGuide.descriptionEn, lang)}</p>
              <div className="space-y-2 mb-4">
                {muacGuide.steps.map(s => (
                  <div key={s.step} className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                    <span className="text-sm text-gray-700">{t(s.instruction, s.instructionEn, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
            {muacGuide.interpretations.map((interp, i) => (
              <div key={i} className={`rounded-2xl p-4 shadow-sm border-2 ${interp.color === 'green' ? 'bg-emerald-50 border-emerald-400' : interp.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'}`}>
                <div className="font-bold text-gray-800 mb-1">{interp.color === 'green' ? '🟢' : interp.color === 'yellow' ? '🟡' : '🔴'} {t(interp.colorBn, interp.color, lang)}</div>
                <div className="text-sm text-gray-600">{t(interp.range, interp.rangeEn, lang)} — {t(interp.meaning, interp.meaningEn, lang)}</div>
                <div className="text-sm font-semibold mt-1">{t(interp.action, interp.actionEn, lang)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Vaccination Page ───────────────────────────────────────────────
function VaccinationPage() {
  const { language, children, selectedChildId, markVaccineReceived, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  if (!child) return null;

  const age = getChildAge(child);
  const ageWeeks = age.isPrenatal ? 0 : age.weeks;
  const totalVax = allVaccines.length;
  const completedCount = child.completedVaccines.length;
  const progressPct = Math.round((completedCount / totalVax) * 100);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">💉 {t('টিকাকরণ', 'Vaccination', lang)}</h1>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{t('অগ্রগতি', 'Progress', lang)}</span>
            <span className="font-bold text-emerald-600">{completedCount}/{totalVax} ({progressPct}%)</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Vaccine Groups */}
        <div className="space-y-3">
          {vaccineGroups.map(group => {
            const isCurrentOrPast = group.ageWeeks <= ageWeeks;
            return (
              <div key={group.id} className={`bg-white rounded-2xl p-4 shadow-sm ${!isCurrentOrPast ? 'opacity-60' : ''}`}>
                <h3 className="font-bold text-gray-800 mb-2">{t(group.ageLabel, group.ageLabelEn, lang)}</h3>
                <div className="space-y-2">
                  {group.vaccines.map(v => {
                    const done = child.completedVaccines.includes(v.id);
                    const due = !done && v.ageWeeks <= ageWeeks;
                    return (
                      <div key={v.id} className={`flex items-center gap-3 p-3 rounded-xl ${done ? 'bg-emerald-50' : due ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${done ? 'bg-emerald-500 text-white' : due ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          {done ? '✓' : due ? '!' : '○'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-800">{t(v.name, v.nameEn, lang)}</div>
                          <div className="text-xs text-gray-500 truncate">{t(v.description, v.descriptionEn, lang)}</div>
                        </div>
                        {due && (
                          <button onClick={() => markVaccineReceived(child.id, v.id)} className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform shrink-0">
                            ✅
                          </button>
                        )}
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

// ─── Learn & Play Page ──────────────────────────────────────────────
function LearnPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  const [tab, setTab] = useState<'activities' | 'flashcards' | 'facts'>('activities');
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcardType, setFlashcardType] = useState<'bangla' | 'english'>('bangla');

  if (!child) return null;
  const age = getChildAge(child);
  const ageActivities = getActivitiesByAge(age.isPrenatal ? 0 : age.months);
  const cards = flashcardType === 'bangla' ? banglaFlashcards : englishFlashcards;
  const funFact = getDailyFunFact();

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📚 {t('শিখুন ও খেলুন', 'Learn & Play', lang)}</h1>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {(['activities', 'flashcards', 'facts'] as const).map(t2 => (
            <button key={t2} onClick={() => setTab(t2)} className={`flex-1 py-2.5 rounded-lg font-semibold text-xs transition-all ${tab === t2 ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>
              {t2 === 'activities' ? '🎮' : t2 === 'flashcards' ? '🔤' : '💡'} {t2 === 'activities' ? t('কার্যক্রম', 'Activities', lang) : t2 === 'flashcards' ? t('ফ্ল্যাশকার্ড', 'Flashcards', lang) : t('তথ্য', 'Facts', lang)}
            </button>
          ))}
        </div>

        {tab === 'activities' && (
          <div className="space-y-3">
            {ageActivities.map(a => (
              <div key={a.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                <span className="text-3xl">{a.icon}</span>
                <div>
                  <div className="font-bold text-gray-800">{t(a.title, a.titleEn, lang)}</div>
                  <div className="text-sm text-gray-600 mt-1">{t(a.description, a.descriptionEn, lang)}</div>
                </div>
              </div>
            ))}
            {ageActivities.length === 0 && <p className="text-center text-gray-400 py-8">{t('শীঘ্রই আসছে', 'Coming soon', lang)}</p>}
          </div>
        )}

        {tab === 'flashcards' && (
          <div>
            <div className="flex gap-2 mb-4">
              <button onClick={() => { setFlashcardType('bangla'); setFlashcardIdx(0); setFlipped(false); }} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95 ${flashcardType === 'bangla' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' : 'bg-gray-100 text-gray-500'}`}>🇧🇩 বাংলা</button>
              <button onClick={() => { setFlashcardType('english'); setFlashcardIdx(0); setFlipped(false); }} className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95 ${flashcardType === 'english' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100 text-gray-500'}`}>🌐 English</button>
            </div>
            <button onClick={() => setFlipped(!flipped)} className="w-full bg-white rounded-2xl p-8 shadow-md text-center active:scale-95 transition-transform">
              {!flipped ? (
                <div>
                  <div className="text-6xl mb-4">{cards[flashcardIdx]?.illustration}</div>
                  <div className="text-5xl font-bold text-gray-800">{cards[flashcardIdx]?.letter}</div>
                  <div className="text-sm text-gray-400 mt-2">{t('ট্যাপ করুন', 'Tap to flip', lang)}</div>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">{cards[flashcardIdx]?.illustration}</div>
                  <div className="text-2xl font-bold text-emerald-600">{cards[flashcardIdx]?.example}</div>
                  <div className="text-sm text-gray-400 mt-2">{t('ট্যাপ করুন', 'Tap to flip', lang)}</div>
                </div>
              )}
            </button>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setFlashcardIdx(Math.max(0, flashcardIdx - 1)); setFlipped(false); }} className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold active:scale-95">← {t('আগে', 'Prev', lang)}</button>
              <span className="flex items-center text-sm text-gray-400">{flashcardIdx + 1}/{cards.length}</span>
              <button onClick={() => { setFlashcardIdx(Math.min(cards.length - 1, flashcardIdx + 1)); setFlipped(false); }} className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold active:scale-95">{t('পরে', 'Next', lang)} →</button>
            </div>
          </div>
        )}

        {tab === 'facts' && (
          <div className="space-y-3">
            {funFacts.slice(0, 10).map(f => (
              <div key={f.id} className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-sm text-amber-900">{t(f.fact, f.factEn, lang)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Facility Page ──────────────────────────────────────────────────
function FacilityPage() {
  const { language, parent, triageState, setPage } = useAppStore();
  const lang = language;
  const [filter, setFilter] = useState<'all' | 'uhc' | 'district' | 'medical_college'>('all');

  const urgencyLevel = triageState?.urgencyLevel ?? 1;
  let filtered = facilities;
  if (filter !== 'all') filtered = facilities.filter(f => f.type === filter);
  else if (urgencyLevel === 3 && parent?.district) filtered = getFacilitiesByDistrict(parent.district);
  else if (urgencyLevel >= 4) filtered = facilities.filter(f => f.type === 'medical_college');
  else if (parent?.division) filtered = getFacilitiesByDivision(parent.division);

  const typeColor = (type: string) => type === 'medical_college' ? 'bg-red-100 text-red-700' : type === 'district' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700';

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🏥 {t('হাসপাতাল খুঁজুন', 'Find Facility', lang)}</h1>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {(['all', 'uhc', 'district', 'medical_college'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all ${filter === f ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {f === 'all' ? t('সব', 'All', lang) : t(facilityTypes[f].bn, facilityTypes[f].en, lang)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(f => {
            const hours = getHoursSinceUpdate(f.lastUpdated);
            const stale = isStale(f.lastUpdated);
            return (
              <div key={f.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{t(f.name, f.nameEn, lang)}</div>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${typeColor(f.type)}`}>{t(facilityTypes[f.type].bn, facilityTypes[f.type].en, lang)}</span>
                    <div className="text-xs text-gray-500 mt-1">📞 {f.phone}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-3 text-xs">
                  <span className={f.bedsAvailable > 0 ? 'text-emerald-600' : 'text-red-500'}>🛏️ {f.bedsAvailable}/{f.bedsTotal}</span>
                  <span className={f.hasOxygen ? 'text-emerald-600' : 'text-red-500'}>🫁 {f.hasOxygen ? t('অক্সিজেন', 'O2', lang) : t('নেই', 'No O2', lang)}</span>
                  <span className={f.hasPediatric ? 'text-emerald-600' : 'text-red-500'}>👶 {f.hasPediatric ? t('শিশু', 'Peds', lang) : '—'}</span>
                  <span className={f.hasPower ? 'text-emerald-600' : 'text-red-500'}>⚡ {f.hasPower ? t('বিদ্যুৎ', 'Power', lang) : t('নেই', 'No', lang)}</span>
                </div>
                <div className={`text-xs mt-2 ${stale ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                  🕐 {t(`${Math.round(hours)} ঘণ্টা আগে`, `${Math.round(hours)}h ago`, lang)} {stale ? '⚠️' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Myth Page ──────────────────────────────────────────────────────
function MythPage() {
  const { language, setPage } = useAppStore();
  const lang = language;
  const [query, setQuery] = useState('');
  const results = query.trim().length > 0 ? searchMyths(query) : myths.slice(0, 10);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🧠 {t('কুসংস্কার বনাম সত্য', 'Myth vs Fact', lang)}</h1>

        <div className="relative mb-4">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('প্রশ্ন লিখুন...', 'Search myths...', lang)} className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 text-lg bg-white focus:ring-2 focus:ring-emerald-500 outline-none" />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>

        <div className="space-y-3">
          {results.map(m => (
            <div key={m.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="bg-red-50 rounded-xl p-3 mb-2">
                <span className="text-sm font-semibold text-red-700">❌ {t(m.myth, m.mythEn, lang)}</span>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <span className="text-sm font-semibold text-emerald-700">✅ {t(m.fact, m.factEn, lang)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">📖 {t(m.source, m.sourceEn, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Community Page ─────────────────────────────────────────────────
function CommunityPage() {
  const { language, setPage } = useAppStore();
  const lang = language;
  const [category, setCategory] = useState<'tips' | 'questions' | 'experiences'>('tips');

  const posts = [
    { id: '1', author: 'ফাতেমা', authorEn: 'Fatema', cat: 'tips', content: 'আমার শিশুকে খিচুড়ি খেতে ভালো লাগে। এতে ডাল ও সবজি মেশাই।', contentEn: 'My baby loves khichuri. I mix lentils and veggies in it.', time: '2h' },
    { id: '2', author: 'রহিমা', authorEn: 'Rahima', cat: 'questions', content: '৬ মাসের শিশুকে কতবার বুকের দুধ খাওয়ানো উচিত?', contentEn: 'How often should I breastfeed a 6-month-old?', time: '5h' },
    { id: '3', author: 'নাসরিন', authorEn: 'Nasrin', cat: 'experiences', content: 'আমার শিশু ১০ মাসে হাঁটতে শুরু করেছে!', contentEn: 'My baby started walking at 10 months!', time: '1d' },
  ];

  const filtered = posts.filter(p => p.cat === category);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">👥 {t('সম্প্রদায়', 'Community', lang)}</h1>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          {(['tips', 'questions', 'experiences'] as const).map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`flex-1 py-2.5 rounded-lg font-semibold text-xs transition-all ${category === c ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500'}`}>
              {c === 'tips' ? '💡' : c === 'questions' ? '❓' : '💬'} {c === 'tips' ? t('টিপস', 'Tips', lang) : c === 'questions' ? t('প্রশ্ন', 'Questions', lang) : t('অভিজ্ঞতা', 'Stories', lang)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm">👤</div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{t(p.author, p.authorEn, lang)}</div>
                  <div className="text-xs text-gray-400">{p.time}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{t(p.content, p.contentEn, lang)}</p>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold active:scale-95 transition-transform">
          ✏️ {t('নতুন পোস্ট', 'New Post', lang)}
        </button>
      </div>
    </div>
  );
}

// ─── Prenatal Page ──────────────────────────────────────────────────
function PrenatalPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  if (!child) return null;

  const age = getChildAge(child);
  const week = age.isPrenatal ? age.prenatalWeek : 0;
  const guide = getPrenatalGuideByWeek(week);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🤰 {t('গর্ভকালীন যত্ন', 'Prenatal Care', lang)}</h1>

        <div className="bg-purple-50 rounded-2xl p-4 mb-4 border border-purple-100">
          <div className="text-center">
            <div className="text-4xl mb-2">🤰</div>
            <div className="text-2xl font-bold text-purple-700">{t(`সপ্তাহ ${week}`, `Week ${week}`, lang)}</div>
            <div className="text-sm text-purple-500">{t('গর্ভকালীন সময়', 'Gestational Age', lang)}</div>
          </div>
        </div>

        {guide && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <h3 className="font-bold text-purple-700 text-lg mb-2">{t(guide.title, guide.titleEn, lang)}</h3>
            <div className="bg-purple-50 rounded-xl p-3 mb-3">
              <div className="font-semibold text-sm text-purple-700 mb-1">👶 {t('শিশুর বিকাশ', 'Baby Development', lang)}</div>
              <p className="text-sm text-purple-800">{t(guide.development, guide.developmentEn, lang)}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 mb-3">
              <div className="font-semibold text-sm text-blue-700 mb-1">💡 {t('পরামর্শ', 'Tips', lang)}</div>
              <p className="text-sm text-blue-800">{t(guide.tips, guide.tipsEn, lang)}</p>
            </div>
            {guide.ancVisit && (
              <div className="bg-emerald-50 rounded-xl p-3 mb-3">
                <div className="font-semibold text-sm text-emerald-700">🏥 {t('এএনসি ভিজিট প্রয়োজন', 'ANC Visit Required', lang)}</div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-red-700 mb-3">⚠️ {t('বিপদ সংকেত', 'Danger Signs', lang)}</h3>
          <div className="space-y-2">
            {allDangerSigns.map((d, i) => (
              <div key={i} className="bg-red-50 rounded-xl p-3 text-sm text-red-800 font-medium">
                🚨 {t(d.bn, d.en, lang)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── History Page ───────────────────────────────────────────────────
function HistoryPage() {
  const { language, children, selectedChildId, setPage } = useAppStore();
  const lang = language;
  const child = children.find(c => c.id === selectedChildId);
  if (!child) return null;

  const allEvents = [
    ...child.medicalEvents.map(e => ({ ...e, icon: '🏥', type: 'medical' })),
    ...child.symptomChecks.map(s => ({ date: s.date, description: `${t('লক্ষণ যাচাই - স্তর', 'Triage - Level', lang)} ${s.urgencyLevel}`, icon: '🩺', type: 'triage' })),
    ...child.growthRecords.map(g => ({ date: g.date, description: `${t('ওজন', 'Weight', lang)}: ${g.weight}kg, ${t('উচ্চতা', 'Height', lang)}: ${g.height}cm`, icon: '📏', type: 'growth' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => setPage('home')} className="mb-4 text-emerald-600 font-semibold active:scale-95">← {t('হোম', 'Home', lang)}</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📋 {t('চিকিৎসা ইতিহাস', 'Medical History', lang)}</h1>

        {allEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400">{t('কোনো রেকর্ড নেই', 'No records yet', lang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allEvents.map((e, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                <span className="text-2xl">{e.icon}</span>
                <div className="flex-1">
                  <div className="text-sm text-gray-800">{e.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(e.date).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US')}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="w-full mt-4 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold active:scale-95 transition-transform">
          📄 {t('PDF রপ্তানি', 'Export PDF', lang)}
        </button>
      </div>
    </div>
  );
}

// ─── Admin Page ─────────────────────────────────────────────────────
function AdminPage() {
  const { language, setAdminMode, adminMode, setPage } = useAppStore();
  const lang = language;
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [beds, setBeds] = useState(15);
  const [oxygen, setOxygen] = useState(true);
  const [pediatric, setPediatric] = useState(true);
  const [power, setPower] = useState(true);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-5xl text-center mb-4">🔐</div>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-6">{t('অ্যাডমিন লগইন', 'Admin Login', lang)}</h2>
          <input type="password" maxLength={4} value={pin} onChange={e => setPin(e.target.value)} placeholder="PIN" className="w-full px-4 py-4 rounded-xl border border-gray-200 text-center text-2xl tracking-[1em] bg-white focus:ring-2 focus:ring-emerald-500 outline-none mb-4" />
          <button onClick={() => { if (pin.length === 4) { setAuthenticated(true); setAdminMode(true); } }} disabled={pin.length < 4} className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-40 active:scale-95 transition-transform">
            {t('প্রবেশ করুন', 'Enter', lang)}
          </button>
          <button onClick={() => setPage('home')} className="w-full mt-3 py-3 text-emerald-600 font-semibold active:scale-95">{t('ফিরে যান', 'Go Back', lang)}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🏥 {t('হাসপাতাল অ্যাডমিন', 'Facility Admin', lang)}</h1>

        <div className="bg-emerald-50 rounded-2xl p-4 mb-4 border border-emerald-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-700">{facilities.filter(f => f.type === 'uhc').reduce((a, f) => a + (f.bedsAvailable > 0 ? 1 : 0), 0)}</div>
            <div className="text-sm text-emerald-600">{t("আজকের রেফারেল (স্তর ৩+৪)", "Today's Referrals (L3+L4)", lang)}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800">{t('সুবিধা আপডেট', 'Facility Status', lang)}</h3>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">🛏️ {t('শয্যা উপলব্ধ', 'Beds Available', lang)}</label>
            <input type="number" value={beds} onChange={e => setBeds(parseInt(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg" />
          </div>

          {[
            { label: t('অক্সিজেন', 'Oxygen', lang), value: oxygen, set: setOxygen, icon: '🫁' },
            { label: t('শিশু বিভাগ', 'Pediatric', lang), value: pediatric, set: setPediatric, icon: '👶' },
            { label: t('বিদ্যুৎ', 'Power', lang), value: power, set: setPower, icon: '⚡' },
          ].map(item => (
            <button key={item.label} onClick={() => item.set(!item.value)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all active:scale-95 ${item.value ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <span className="font-semibold text-sm">{item.icon} {item.label}</span>
              <span className={`font-bold ${item.value ? 'text-emerald-600' : 'text-red-500'}`}>{item.value ? '✅' : '❌'}</span>
            </button>
          ))}
        </div>

        <button className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold active:scale-95 transition-transform">
          💾 {t('আপডেট জমা দিন', 'Submit Update', lang)}
        </button>

        <button onClick={() => { setAuthenticated(false); setAdminMode(false); setPin(''); }} className="w-full mt-3 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold active:scale-95 transition-transform">
          🚪 {t('লগআউট', 'Logout', lang)}
        </button>
      </div>
    </div>
  );
}

// ─── More Sheet ─────────────────────────────────────────────────────
function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, setPage } = useAppStore();
  const lang = language;

  const items: { icon: string; bn: string; en: string; page: Page }[] = [
    { icon: '🥗', bn: 'পুষ্টি', en: 'Nutrition', page: 'nutrition' },
    { icon: '📚', bn: 'শিখুন ও খেলুন', en: 'Learn & Play', page: 'learn' },
    { icon: '🏥', bn: 'হাসপাতাল', en: 'Facility Finder', page: 'facility' },
    { icon: '🧠', bn: 'কুসংস্কার বনাম সত্য', en: 'Myth vs Fact', page: 'myth' },
    { icon: '👥', bn: 'সম্প্রদায়', en: 'Community', page: 'community' },
    { icon: '📋', bn: 'চিকিৎসা ইতিহাস', en: 'Medical History', page: 'history' },
    { icon: '🤰', bn: 'গর্ভকালীন', en: 'Prenatal', page: 'prenatal' },
    { icon: '⚙️', bn: 'অ্যাডমিন', en: 'Admin', page: 'admin' },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} />}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`} style={{ maxHeight: '70vh' }}>
        <div className="p-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
          <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">{t('আরও', 'More', lang)}</h3>
          <div className="grid grid-cols-3 gap-3 pb-6">
            {items.map(item => (
              <button key={item.page} onClick={() => { onClose(); setPage(item.page); }} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 active:scale-95 transition-transform">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-semibold text-gray-700 text-center">{t(item.bn, item.en, lang)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Bottom Navigation ──────────────────────────────────────────────
function BottomNav() {
  const { language, currentPage, setPage } = useAppStore();
  const lang = language;
  const [moreOpen, setMoreOpen] = useState(false);

  const tabs: { icon: string; labelBn: string; labelEn: string; page: Page }[] = [
    { icon: '🏠', labelBn: 'হোম', labelEn: 'Home', page: 'home' },
    { icon: '🩺', labelBn: 'ট্রায়েজ', labelEn: 'Triage', page: 'triage' },
    { icon: '📋', labelBn: 'যত্ন', labelEn: 'Care', page: 'care' },
    { icon: '💉', labelBn: 'টিকা', labelEn: 'Vax', page: 'vaccination' },
  ];

  const activeTab = (page: Page) => {
    if (page === 'home' && currentPage === 'home') return true;
    if (page === 'triage' && currentPage === 'triage') return true;
    if (page === 'care' && currentPage === 'care') return true;
    if (page === 'vaccination' && currentPage === 'vaccination') return true;
    return false;
  };

  const morePages: Page[] = ['nutrition', 'learn', 'facility', 'myth', 'community', 'history', 'prenatal', 'admin'];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-md mx-auto flex">
          {tabs.map(tab => (
            <button key={tab.page} onClick={() => setPage(tab.page)} className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all active:scale-95 ${activeTab(tab.page) ? 'text-emerald-600' : 'text-gray-400'}`}>
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] font-semibold">{t(tab.labelBn, tab.labelEn, lang)}</span>
            </button>
          ))}
          <button onClick={() => setMoreOpen(true)} className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all active:scale-95 ${morePages.includes(currentPage) ? 'text-emerald-600' : 'text-gray-400'}`}>
            <span className="text-xl">⋯</span>
            <span className="text-[10px] font-semibold">{t('আরও', 'More', lang)}</span>
          </button>
        </div>
      </nav>
      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function Page() {
  const { currentPage, isAuthenticated, children, selectedChildId } = useAppStore();

  const showNav = isAuthenticated && !['onboarding', 'child-profile'].includes(currentPage);

  // Auto-select child if none selected
  React.useEffect(() => {
    if (isAuthenticated && !selectedChildId && children.length > 0) {
      useAppStore.getState().selectChild(children[0].id);
    }
  }, [isAuthenticated, selectedChildId, children]);

  return (
    <main className="min-h-screen bg-gray-50">
      {currentPage === 'onboarding' && <OnboardingPage />}
      {currentPage === 'child-profile' && <ChildProfilePage />}
      {currentPage === 'home' && <HomeDashboard />}
      {currentPage === 'triage' && <TriagePage />}
      {currentPage === 'care' && <CarePage />}
      {currentPage === 'nutrition' && <NutritionPage />}
      {currentPage === 'vaccination' && <VaccinationPage />}
      {currentPage === 'learn' && <LearnPage />}
      {currentPage === 'facility' && <FacilityPage />}
      {currentPage === 'myth' && <MythPage />}
      {currentPage === 'community' && <CommunityPage />}
      {currentPage === 'prenatal' && <PrenatalPage />}
      {currentPage === 'history' && <HistoryPage />}
      {currentPage === 'admin' && <AdminPage />}
      {showNav && <BottomNav />}
    </main>
  );
}

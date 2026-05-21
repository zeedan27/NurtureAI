import { NextRequest, NextResponse } from 'next/server';

// Symptom Triage Rule Engine + AI Enhancement
// Rule engine runs FIRST, then Claude API adds triage classification

interface SymptomRule {
  id: string;
  symptoms: string[];
  urgencyLevel: number; // 1-4
  actionBn: string;
  actionEn: string;
  requiresAI: boolean;
}

const RULES: SymptomRule[] = [
  {
    id: 'emergency-breathing',
    symptoms: ['breathing'],
    urgencyLevel: 4,
    actionBn: 'শিশুর শ্বাসকষ্ট হলে তাড়াতাড়ি হাসপাতালে নিয়ে যান। এটি জরুরি অবস্থা।',
    actionEn: 'If child has difficulty breathing, take to hospital immediately. This is an emergency.',
    requiresAI: true,
  },
  {
    id: 'emergency-convulsion',
    symptoms: ['convulsion'],
    urgencyLevel: 4,
    actionBn: 'খিঁচুনি হলে তাড়াতাড়ি হাসপাতালে নিয়ে যান। শিশুকে একপাশে কাত করে রাখুন।',
    actionEn: 'If convulsion, go to hospital urgently. Place child on their side.',
    requiresAI: true,
  },
  {
    id: 'emergency-bleeding',
    symptoms: ['bleeding'],
    urgencyLevel: 4,
    actionBn: 'রক্তক্ষরণ হলে চাপ দিয়ে ধরুন এবং তাড়াতাড়ি হাসপাতালে যান।',
    actionEn: 'Apply pressure to bleeding and go to hospital urgently.',
    requiresAI: true,
  },
  {
    id: 'high-fever-lethargy',
    symptoms: ['fever', 'lethargy'],
    urgencyLevel: 3,
    actionBn: 'জ্বরের সাথে অসারতা গুরুতর লক্ষণ। উপজেলা স্বাস্থ্য কমপ্লেক্সে যান।',
    actionEn: 'Fever with lethargy is a serious sign. Go to Upazila Health Complex.',
    requiresAI: true,
  },
  {
    id: 'diarrhea-vomit',
    symptoms: ['diarrhea', 'vomit'],
    urgencyLevel: 3,
    actionBn: 'ডায়রিয়া ও বমি একসাথে পানিশূন্যতার ঝুঁকি বাড়ায়। ওআরএস দিন ও স্বাস্থ্যকেন্দ্রে যান।',
    actionEn: 'Diarrhea and vomiting together increase dehydration risk. Give ORS and visit health center.',
    requiresAI: true,
  },
  {
    id: 'fever-alone',
    symptoms: ['fever'],
    urgencyLevel: 2,
    actionBn: 'সামান্য জ্বরে পানি ও তরল খাবার দিন। ৩ দিনের বেশি জ্বর হলে চিকিৎসকে দেখান।',
    actionEn: 'For mild fever, give fluids. If fever lasts more than 3 days, see a doctor.',
    requiresAI: false,
  },
  {
    id: 'cough-alone',
    symptoms: ['cough'],
    urgencyLevel: 1,
    actionBn: 'সাধারণ কাশিতে হালকা গরম পানি দিন। মধু দেবেন না (১ বছরের কম শিশুকে)।',
    actionEn: 'For common cough, give lukewarm water. Do not give honey to babies under 1 year.',
    requiresAI: false,
  },
  {
    id: 'diarrhea-alone',
    symptoms: ['diarrhea'],
    urgencyLevel: 2,
    actionBn: 'ডায়রিয়াতে ওআরএস দিন। মায়ের দুধ চালিয়ে যান। খাবার বন্ধ করবেন না।',
    actionEn: 'Give ORS for diarrhea. Continue breastfeeding. Do not stop food.',
    requiresAI: false,
  },
  {
    id: 'rash-alone',
    symptoms: ['rash'],
    urgencyLevel: 1,
    actionBn: 'ফুসকুড়ি দেখা দিলে শিশুকে পরিষ্কার রাখুন। চুলকালে বা জ্বর হলে চিকিৎসকে দেখান।',
    actionEn: 'Keep baby clean if rash appears. See doctor if itchy or with fever.',
    requiresAI: false,
  },
  {
    id: 'not-eating',
    symptoms: ['not_eating'],
    urgencyLevel: 1,
    actionBn: 'খাবার না নিলে ছোট পরিমাণে ঘন ঘন দিন। মায়ের দুধ চালিয়ে যান।',
    actionEn: 'If not eating, give small amounts frequently. Continue breastfeeding.',
    requiresAI: false,
  },
];

function runRuleEngine(symptoms: string[]): { urgencyLevel: number; matchedRules: SymptomRule[] } {
  let maxUrgency = 1;
  const matchedRules: SymptomRule[] = [];

  for (const rule of RULES) {
    const allMatch = rule.symptoms.every(s => symptoms.includes(s));
    if (allMatch) {
      matchedRules.push(rule);
      maxUrgency = Math.max(maxUrgency, rule.urgencyLevel);
    }
  }

  // Also check individual symptoms for baseline urgency
  if (matchedRules.length === 0) {
    const symptomUrgencies: Record<string, number> = {
      fever: 2, cough: 1, diarrhea: 2, rash: 1, not_eating: 1,
      breathing: 4, vomit: 2, lethargy: 3, ear_pain: 1,
      eye_issue: 1, convulsion: 4, bleeding: 4,
    };
    for (const s of symptoms) {
      maxUrgency = Math.max(maxUrgency, symptomUrgencies[s] || 1);
    }
  }

  return { urgencyLevel: maxUrgency, matchedRules };
}

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: 'Symptoms array required' }, { status: 400 });
    }

    // Step 1: Rule engine (safety net)
    const ruleResult = runRuleEngine(symptoms);

    // Step 2: Build response with rule engine results
    const response = {
      symptoms,
      urgencyLevel: ruleResult.urgencyLevel,
      ruleEngineResult: {
        matchedRules: ruleResult.matchedRules.map(r => ({
          id: r.id,
          urgencyLevel: r.urgencyLevel,
          actionBn: r.actionBn,
          actionEn: r.actionEn,
        })),
      },
      // AI would be called here for requiresAI rules
      // For now, rule engine is the safety net and primary classifier
      aiEnhanced: false,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Triage error:', error);
    return NextResponse.json({ error: 'Triage processing failed' }, { status: 500 });
  }
}

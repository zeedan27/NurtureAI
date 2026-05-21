import { NextRequest, NextResponse } from 'next/server';
import { myths } from '@/lib/data/myths';

// Myth vs Fact Chatbot with cache-first retrieval
// Pre-cached top 30 Q&As — checks cache first, API only on miss

function findInCache(query: string) {
  const lowerQuery = query.toLowerCase();
  const scored = myths.map(m => {
    let score = 0;
    // Check category match
    if (m.category.toLowerCase().includes(lowerQuery)) score += 3;
    // Check myth text
    if (m.myth.toLowerCase().includes(lowerQuery)) score += 2;
    if (m.mythEn.toLowerCase().includes(lowerQuery)) score += 2;
    // Check fact text
    if (m.fact.toLowerCase().includes(lowerQuery)) score += 1;
    if (m.factEn.toLowerCase().includes(lowerQuery)) score += 1;
    // Keyword matching
    const keywords = lowerQuery.split(/\s+/);
    for (const kw of keywords) {
      if (kw.length < 2) continue;
      if (m.myth.toLowerCase().includes(kw)) score += 1;
      if (m.mythEn.toLowerCase().includes(kw)) score += 1;
      if (m.fact.toLowerCase().includes(kw)) score += 0.5;
      if (m.factEn.toLowerCase().includes(kw)) score += 0.5;
    }
    return { myth: m, score };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(s => s.myth);
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query string required' }, { status: 400 });
    }

    // Cache-first: check pre-cached Q&As
    const cachedResults = findInCache(query);

    if (cachedResults.length > 0) {
      return NextResponse.json({
        source: 'cache',
        results: cachedResults.map(m => ({
          myth: m.myth,
          mythEn: m.mythEn,
          fact: m.fact,
          factEn: m.factEn,
          source: m.source,
          sourceEn: m.sourceEn,
          category: m.category,
        })),
        timestamp: new Date().toISOString(),
      });
    }

    // Cache miss: would call Claude API here
    // For now, return general guidance
    return NextResponse.json({
      source: 'fallback',
      results: [{
        myth: query,
        mythEn: query,
        fact: 'এই বিষয়ে আমাদের ক্যাশে তথ্য নেই। অনুগ্রহ করে আপনার স্বাস্থ্যকর্মীর পরামর্শ নিন।',
        factEn: 'We do not have cached information on this topic. Please consult your health worker.',
        source: 'সাধারণ পরামর্শ',
        sourceEn: 'General Advice',
        category: 'general',
      }],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Chatbot processing failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { vaccineGroups, allVaccines } from '@/lib/data/epi-schedule';

// MCP-style Vaccination Schedule Query Tool
// Returns EPI schedule data with optional filtering

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ageWeeks = parseInt(searchParams.get('ageWeeks') || '0');
    const vaccineId = searchParams.get('vaccineId') || '';

    if (vaccineId) {
      // Return specific vaccine info
      const vaccine = allVaccines.find(v => v.id === vaccineId);
      if (!vaccine) {
        return NextResponse.json({ error: 'Vaccine not found' }, { status: 404 });
      }
      return NextResponse.json({
        tool: 'vaccination_schedule',
        action: 'lookup',
        result: vaccine,
        timestamp: new Date().toISOString(),
      });
    }

    // Return schedule filtered by age
    const upcoming = vaccineGroups
      .filter(g => g.ageWeeks >= ageWeeks)
      .map(g => ({
        ageLabel: g.ageLabel,
        ageLabelEn: g.ageLabelEn,
        ageWeeks: g.ageWeeks,
        vaccines: g.vaccines.map(v => ({
          id: v.id,
          name: v.name,
          nameEn: v.nameEn,
          description: v.description,
          descriptionEn: v.descriptionEn,
          sideEffects: v.sideEffects,
          sideEffectsEn: v.sideEffectsEn,
        })),
      }));

    const completed = vaccineGroups
      .filter(g => g.ageWeeks < ageWeeks)
      .map(g => ({
        ageLabel: g.ageLabel,
        ageLabelEn: g.ageLabelEn,
        ageWeeks: g.ageWeeks,
        vaccines: g.vaccines.map(v => ({ id: v.id, name: v.name, nameEn: v.nameEn })),
      }));

    return NextResponse.json({
      tool: 'vaccination_schedule',
      action: 'schedule',
      parameters: { ageWeeks },
      totalVaccines: allVaccines.length,
      upcoming,
      completed,
      nextDue: upcoming.length > 0 ? upcoming[0] : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Vaccination schedule error:', error);
    return NextResponse.json({ error: 'Vaccination schedule query failed' }, { status: 500 });
  }
}

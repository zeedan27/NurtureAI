import { NextRequest, NextResponse } from 'next/server';
import { facilities, facilityTypes, getFacilitiesByUrgency } from '@/lib/data/facilities';

// MCP-style Facility Lookup Tool
// Returns facility data matched by urgency level and location

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const urgencyLevel = parseInt(searchParams.get('urgency') || '2');
    const upazila = searchParams.get('upazila') || '';
    const district = searchParams.get('district') || '';
    const division = searchParams.get('division') || '';
    const facilityType = searchParams.get('type') || '';

    let results = facilities;

    // Filter by urgency level
    if (urgencyLevel >= 4) {
      results = results.filter(f => f.type === 'medical_college');
    } else if (urgencyLevel >= 3) {
      results = results.filter(f => f.type === 'district' || f.type === 'medical_college');
    }

    // Filter by location
    if (upazila) results = results.filter(f => f.upazila === upazila);
    if (district) results = results.filter(f => f.district === district);
    if (division) results = results.filter(f => f.division === division);
    if (facilityType) results = results.filter(f => f.type === facilityType);

    return NextResponse.json({
      tool: 'facility_lookup',
      parameters: { urgencyLevel, upazila, district, division, facilityType },
      results: results.map(f => ({
        id: f.id,
        name: f.name,
        nameEn: f.nameEn,
        type: f.type,
        typeName: facilityTypes[f.type],
        address: f.address,
        phone: f.phone,
        bedsAvailable: f.bedsAvailable,
        bedsTotal: f.bedsTotal,
        hasOxygen: f.hasOxygen,
        hasPediatric: f.hasPediatric,
        hasPower: f.hasPower,
        latitude: f.latitude,
        longitude: f.longitude,
        lastUpdated: f.lastUpdated,
        staleWarning: (Date.now() - new Date(f.lastUpdated).getTime()) > 24 * 60 * 60 * 1000,
      })),
      count: results.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Facility lookup error:', error);
    return NextResponse.json({ error: 'Facility lookup failed' }, { status: 500 });
  }
}

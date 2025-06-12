import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { generateCrisisReport } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { regionId } = await request.json();
    
    if (!regionId) {
      return NextResponse.json({ error: 'Region ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('crisis-insights');
    
    // Find the region document by ID
    const region = await db.collection('regions').findOne({ 
      _id: regionId.startsWith('new-') ? regionId : new ObjectId(regionId) 
    });
    
    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    
    // Generate the report using Gemini API
    const report = await generateCrisisReport(region);
    
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}

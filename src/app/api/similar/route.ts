import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { generateComparisonAnalysis } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { regionId } = await request.json();
    
    if (!regionId) {
      return NextResponse.json(
        { error: 'Region ID is required' }, 
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('crisis-insights');
    
    // Find the region by ID
    const region = await db.collection('regions').findOne({ 
      _id: regionId.startsWith('new-') ? regionId : new ObjectId(regionId) 
    });
    
    if (!region) {
      return NextResponse.json(
        { error: 'Region not found' }, 
        { status: 404 }
      );
    }

    // Execute vector search using MongoDB Atlas Vector Search
    const pipeline = [
      {
        $search: {
          index: "crisis_embedding_index",
          knnVector: {
            path: "embedding",
            query: region.embedding,
            k: 4 // Get top 4 to exclude self
          }
        }
      },
      {
        $project: {
          region: 1,
          country: 1,
          type: 1,
          summary: 1,
          displaced: 1,
          casualties: 1,
          severity_level: 1,
          health_status: 1,
          resources_needed: 1,
          affected_population: 1,
          score: { $meta: "searchScore" }
        }
      }
    ];
    
    const similarRegions = await db.collection('regions')
      .aggregate(pipeline)
      .toArray();
    
    // Filter out the original region (first exact match will be self)
    const filteredRegions = similarRegions.filter(
      r => r._id.toString() !== region._id.toString()
    ).slice(0, 3); // Take only top 3 similar regions
    
    // Calculate similarity scores and generate comparison text
    const results = await Promise.all(filteredRegions.map(async (similarRegion) => {
      // Convert search score to percentage similarity (rough approximation)
      const similarityScore = Math.min(similarRegion.score * 100, 99.9);
      
      // Generate AI comparison between the two regions
      const comparison = await generateComparisonAnalysis(region, similarRegion);
      
      return {
        region: similarRegion,
        similarity_score: similarityScore,
        comparison
      };
    }));
    
    return NextResponse.json({ regions: results }, { status: 200 });
  } catch (error) {
    console.error('Error finding similar regions:', error);
    return NextResponse.json(
      { error: 'Failed to find similar regions' }, 
      { status: 500 }
    );
  }
}

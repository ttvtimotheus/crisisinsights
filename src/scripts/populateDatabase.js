/**
 * MongoDB Database Initialization Script
 * 
 * This script populates the MongoDB database with sample crisis regions data.
 * Run with: node scripts/populateDatabase.js
 * 
 * Make sure to set MONGODB_URI environment variable in .env.local before running.
 */

require('dotenv').config({ path: '.env.local' });
const { MongoClient, ServerApiVersion } = require('mongodb');

// Sample crisis regions data
const sampleRegions = [
  {
    region: 'Eastern Donbas',
    country: 'Ukraine',
    type: 'Armed Conflict',
    summary: 'Ongoing armed conflict in eastern Ukraine causing major humanitarian impact.',
    displaced: 2800000,
    casualties: 14200,
    health_status: 'Critical with limited access to healthcare, medicine shortages, and damaged hospitals.',
    start_date: '2022-02-24',
    last_updated: '2025-05-15',
    severity_level: 9,
    affected_population: 5700000,
    resources_needed: [
      'Medical supplies',
      'Shelter',
      'Food aid',
      'Clean water',
      'Winter clothing'
    ],
    media_coverage: 9,
    international_response: 'High level of international aid and attention',
    coordinates: {
      lat: 48.0159,
      lng: 37.8028
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNHCR',
      'ICRC',
      'Médecins Sans Frontières',
      'World Food Programme'
    ],
    related_articles: [
      {
        title: 'Healthcare Systems Strained in Eastern Ukraine',
        url: 'https://example.com/article1',
        date: '2025-04-20'
      },
      {
        title: 'Winter Approaching: Crisis Deepens in Conflict Zone',
        url: 'https://example.com/article2',
        date: '2025-05-12'
      }
    ]
  },
  {
    region: 'Gaza Strip',
    country: 'Palestine',
    type: 'Complex Emergency',
    summary: 'Severe humanitarian crisis with limited access to basic services and high civilian casualties.',
    displaced: 1750000,
    casualties: 24600,
    health_status: 'Severe shortage of medical supplies, collapsed healthcare system, outbreak of diseases.',
    start_date: '2023-10-07',
    last_updated: '2025-06-01',
    severity_level: 10,
    affected_population: 2200000,
    resources_needed: [
      'Emergency medical aid',
      'Food',
      'Clean water',
      'Shelter materials',
      'Fuel'
    ],
    media_coverage: 10,
    international_response: 'Significant international attention with political obstacles to aid delivery',
    coordinates: {
      lat: 31.3547,
      lng: 34.3088
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNRWA',
      'WHO',
      'ICRC',
      'Oxfam'
    ],
    related_articles: [
      {
        title: 'Water Crisis Deepens in Gaza as Infrastructure Collapses',
        url: 'https://example.com/article3',
        date: '2025-05-22'
      },
      {
        title: 'Disease Outbreaks Threaten Displaced Populations',
        url: 'https://example.com/article4',
        date: '2025-05-30'
      }
    ]
  },
  {
    region: 'North Kivu',
    country: 'Democratic Republic of Congo',
    type: 'Armed Conflict',
    summary: 'Longstanding conflict with multiple armed groups, causing displacement and humanitarian needs.',
    displaced: 2200000,
    casualties: 6300,
    health_status: 'Poor access to healthcare, high risk of epidemics, malnutrition prevalent.',
    start_date: '2004-06-01',
    last_updated: '2025-05-10',
    severity_level: 8,
    affected_population: 4500000,
    resources_needed: [
      'Protection',
      'Food assistance',
      'Medical aid',
      'Clean water',
      'Education support'
    ],
    media_coverage: 4,
    international_response: 'Limited international attention despite severe needs',
    coordinates: {
      lat: -1.6504,
      lng: 29.2227
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'MONUSCO',
      'UNHCR',
      'World Food Programme',
      'Médecins Sans Frontières'
    ],
    related_articles: [
      {
        title: 'Forgotten Crisis: Displacement Continues in Eastern DRC',
        url: 'https://example.com/article5',
        date: '2025-04-15'
      },
      {
        title: 'Child Soldiers and Education Crisis in North Kivu',
        url: 'https://example.com/article6',
        date: '2025-05-02'
      }
    ]
  },
  {
    region: 'South Darfur',
    country: 'Sudan',
    type: 'Complex Emergency',
    summary: 'Prolonged crisis with recent escalation, causing large-scale displacement and acute needs.',
    displaced: 3100000,
    casualties: 11500,
    health_status: 'Critical with disease outbreaks, malnutrition, and collapsed health services.',
    start_date: '2003-02-26',
    last_updated: '2025-05-25',
    severity_level: 9,
    affected_population: 6800000,
    resources_needed: [
      'Food aid',
      'Clean water',
      'Medicine',
      'Shelter',
      'Protection'
    ],
    media_coverage: 5,
    international_response: 'Inconsistent international response with access challenges',
    coordinates: {
      lat: 12.0535,
      lng: 24.8801
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNAMID',
      'UNHCR',
      'World Food Programme',
      'UNICEF'
    ],
    related_articles: [
      {
        title: 'Renewed Violence Displaces Thousands in Darfur',
        url: 'https://example.com/article7',
        date: '2025-04-10'
      },
      {
        title: 'Food Insecurity Reaches Critical Levels in Sudan',
        url: 'https://example.com/article8',
        date: '2025-05-18'
      }
    ]
  },
  {
    region: 'Tigray',
    country: 'Ethiopia',
    type: 'Armed Conflict',
    summary: 'Conflict causing severe humanitarian crisis with limited aid access and widespread needs.',
    displaced: 2500000,
    casualties: 9800,
    health_status: 'Severe with destroyed health facilities, malnutrition, and disease outbreaks.',
    start_date: '2020-11-04',
    last_updated: '2025-06-02',
    severity_level: 8,
    affected_population: 5200000,
    resources_needed: [
      'Food',
      'Medical supplies',
      'Agricultural support',
      'Clean water',
      'Protection services'
    ],
    media_coverage: 6,
    international_response: 'Limited access for aid organizations with growing international concern',
    coordinates: {
      lat: 14.0323,
      lng: 38.3147
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNHCR',
      'World Food Programme',
      'ICRC',
      'Médecins Sans Frontières'
    ],
    related_articles: [
      {
        title: 'Hunger Crisis Deepens as Conflict Continues',
        url: 'https://example.com/article9',
        date: '2025-05-05'
      },
      {
        title: 'Access Challenges Hamper Aid Delivery in Northern Ethiopia',
        url: 'https://example.com/article10',
        date: '2025-05-29'
      }
    ]
  },
  {
    region: 'Idlib',
    country: 'Syria',
    type: 'Armed Conflict',
    summary: 'Prolonged crisis with large displacement and limited humanitarian access.',
    displaced: 2900000,
    casualties: 18400,
    health_status: 'Critical with targeted healthcare facilities, medicine shortages, and overwhelmed services.',
    start_date: '2011-03-15',
    last_updated: '2025-05-20',
    severity_level: 9,
    affected_population: 4100000,
    resources_needed: [
      'Shelter',
      'Winter supplies',
      'Medical aid',
      'Food',
      'Education support'
    ],
    media_coverage: 7,
    international_response: 'Cross-border aid challenged by political constraints',
    coordinates: {
      lat: 35.9359,
      lng: 36.6318
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNHCR',
      'Syrian Arab Red Crescent',
      'IOM',
      'World Food Programme'
    ],
    related_articles: [
      {
        title: 'Winter Threatens Displaced Families in Northwest Syria',
        url: 'https://example.com/article11',
        date: '2025-04-25'
      },
      {
        title: 'Healthcare Under Attack: Hospitals Targeted in Conflict',
        url: 'https://example.com/article12',
        date: '2025-05-15'
      }
    ]
  },
  {
    region: 'Rakhine State',
    country: 'Myanmar',
    type: 'Persecution and Displacement',
    summary: 'Ethnic conflict and persecution causing refugee crisis and internal displacement.',
    displaced: 925000,
    casualties: 7300,
    health_status: 'Poor with limited healthcare access, malnutrition, and mental health concerns.',
    start_date: '2017-08-25',
    last_updated: '2025-05-18',
    severity_level: 8,
    affected_population: 1800000,
    resources_needed: [
      'Protection',
      'Shelter materials',
      'Food aid',
      'Medical care',
      'Education'
    ],
    media_coverage: 6,
    international_response: 'Complex political situation limiting effective international response',
    coordinates: {
      lat: 20.1003,
      lng: 93.7847
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNHCR',
      'IOM',
      'MSF',
      'Save the Children'
    ],
    related_articles: [
      {
        title: 'Monsoon Season Threatens Refugee Camps',
        url: 'https://example.com/article13',
        date: '2025-04-28'
      },
      {
        title: 'Education Crisis for Displaced Children',
        url: 'https://example.com/article14',
        date: '2025-05-10'
      }
    ]
  },
  {
    region: 'Cabo Delgado',
    country: 'Mozambique',
    type: 'Armed Conflict',
    summary: 'Insurgency causing displacement and humanitarian needs in northern Mozambique.',
    displaced: 780000,
    casualties: 3900,
    health_status: 'Poor with limited healthcare infrastructure and growing disease concerns.',
    start_date: '2017-10-05',
    last_updated: '2025-05-23',
    severity_level: 7,
    affected_population: 1300000,
    resources_needed: [
      'Food security',
      'Shelter',
      'Protection',
      'Healthcare',
      'Livelihoods support'
    ],
    media_coverage: 3,
    international_response: 'Growing but limited international attention',
    coordinates: {
      lat: -12.3353,
      lng: 39.9998
    },
    embedding: Array(128).fill(0).map(() => (Math.random() * 2) - 1), // Placeholder embedding
    key_organizations: [
      'UNHCR',
      'World Food Programme',
      'UNICEF',
      'Save the Children'
    ],
    related_articles: [
      {
        title: 'Forgotten Crisis: Violence Continues in Northern Mozambique',
        url: 'https://example.com/article15',
        date: '2025-05-05'
      },
      {
        title: 'Children at Risk in Mozambique Displacement Camps',
        url: 'https://example.com/article16',
        date: '2025-05-20'
      }
    ]
  }
];

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable not found. Please set it in .env.local');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('crisis-insights');
    const regionsCollection = db.collection('regions');

    // Check if collection already has data
    const count = await regionsCollection.countDocuments();
    
    if (count > 0) {
      console.log(`Database already contains ${count} regions. Skipping seed data insertion.`);
      console.log('To re-seed, first drop the collection or use a different database.');
    } else {
      // Insert sample data
      const result = await regionsCollection.insertMany(sampleRegions);
      console.log(`Successfully inserted ${result.insertedCount} crisis regions.`);
      
      // Create vector search index (this is a reminder, actual index creation is done in Atlas UI)
      console.log('\nIMPORTANT: Remember to create a vector search index in MongoDB Atlas:');
      console.log('1. Go to your MongoDB Atlas cluster');
      console.log('2. Navigate to the "Search" tab');
      console.log('3. Create a new index named "crisis_embedding_index" on "regions" collection');
      console.log('4. Add embedding field as vector field with dimension 128');
    }
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

main().catch(console.error);

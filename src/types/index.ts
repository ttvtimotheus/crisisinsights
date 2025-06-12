export interface CrisisRegion {
  _id?: string;
  region: string;
  country: string;
  type: string; // e.g., "armed conflict", "natural disaster", "humanitarian crisis"
  summary: string;
  displaced: number;
  casualties: number;
  health_status: string;
  start_date: string; // ISO date string
  last_updated: string; // ISO date string
  severity_level: number; // 1-10 scale
  affected_population: number;
  resources_needed: string[];
  media_coverage: number; // 1-10 scale
  international_response: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  embedding: number[]; // for semantic search
  key_organizations: string[]; // NGOs, UN agencies involved
  related_articles: Array<{
    title: string;
    url: string;
    date: string;
  }>;
}

export interface AIGeneratedReport {
  overview: string;
  health_impact: string;
  timeline: string;
  recommendations: string;
}

export interface SimilarRegionResult {
  region: CrisisRegion;
  similarity_score: number;
  comparison: string; // AI-generated comparison
}

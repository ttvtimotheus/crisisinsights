# Crisis Insights Developer Guide

This document provides detailed information about the Crisis Insights application architecture and guidance for developers who want to extend or customize the application.

## Application Architecture

Crisis Insights is built using the following technologies:

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **UI Components**: TailwindCSS, Radix UI
- **Map**: Leaflet.js
- **Database**: MongoDB Atlas with Vector Search
- **AI**: Google Cloud Gemini API
- **Deployment**: Vercel

### Directory Structure

```
crisisinsights/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   │   ├── regions/  # Get all regions
│   │   │   ├── summary/  # AI-generated reports
│   │   │   └── similar/  # Vector search for similar regions
│   │   ├── map/          # Map page
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── Map.tsx       # Leaflet map component
│   │   └── RegionDialog.tsx # Region details dialog
│   ├── lib/              # Utility functions
│   │   ├── mongodb.ts    # MongoDB connection
│   │   └── gemini.ts     # Google Gemini API wrapper
│   ├── types/            # TypeScript interfaces
│   └── scripts/          # Helper scripts
└── public/               # Static assets
```

## Core Components

### 1. MongoDB Integration (src/lib/mongodb.ts)

This module handles the MongoDB connection with connection pooling optimization. It exports functions to connect to MongoDB and retrieve the database instance.

### 2. Google Gemini Integration (src/lib/gemini.ts)

This module provides a wrapper for the Google Gemini API, handling:
- Text generation for crisis reports
- Embedding generation for vector search
- Comparison analysis between crisis regions

### 3. Map Component (src/components/Map.tsx)

Built with Leaflet.js, this component:
- Displays an interactive world map
- Shows markers for crisis regions
- Handles opening the detail dialog on marker click

### 4. Region Dialog (src/components/RegionDialog.tsx)

Uses Radix UI to create a modal dialog with tabs:
- Overview tab with general crisis information
- Health Impact tab focused on health-related data
- Timeline tab showing the crisis evolution
- Similar Crises tab showing semantically similar crises

### 5. API Routes

- `/api/regions`: Fetches all crisis regions from MongoDB
- `/api/summary`: Generates AI reports for a specific region
- `/api/similar`: Finds similar crises using vector search

## Data Model

The core data model is defined in `src/types/index.ts`:

- `CrisisRegion`: The main data structure representing a crisis region
- `AIGeneratedReport`: Structure for AI-generated reports
- `SimilarRegionResult`: Structure for similar region search results

## Customization Guide

### Adding New Features

#### 1. Adding a New Tab to the Region Dialog

1. Update the tab definition in `RegionDialog.tsx`
2. Create a new component for the tab content
3. Add the necessary API route if needed

#### 2. Implementing User Authentication

1. Add NextAuth.js for authentication:
   ```bash
   npm install next-auth
   ```
2. Create auth API routes and configuration
3. Add protected routes and user profile features

#### 3. Adding Crisis Timeline Visualization

1. Install a charting library like Chart.js or D3.js
2. Create a timeline component
3. Update the data model to include detailed timeline events
4. Implement the visualization in the Timeline tab

### Extending the AI Capabilities

#### 1. Enhancing the Report Generation

Modify `src/lib/gemini.ts` to:
- Add more specific prompts for detailed analysis
- Include additional report types
- Implement report caching for performance

#### 2. Improving Vector Search

1. Update the embedding generation to use more specific context
2. Add filters to the vector search query
3. Implement hybrid search combining vector search with traditional filters

#### 3. Adding Multi-language Support

1. Implement language detection
2. Add translation capabilities using Google Cloud Translation API
3. Store reports in multiple languages

### Performance Optimization

#### 1. Implement Data Caching

1. Add Redis or other caching solution
2. Cache frequently accessed data like region lists and reports
3. Implement stale-while-revalidate pattern

#### 2. Optimize Map Performance

1. Implement region clustering for dense areas
2. Add progressive loading of region data
3. Optimize marker rendering

## Testing

### Setting Up Tests

1. Install testing libraries:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. Create test files with the `.test.ts` or `.test.tsx` extension

3. Write tests for:
   - Components
   - API routes
   - Utility functions

### Mocking External Services

1. Create mock implementations for:
   - MongoDB connection
   - Google Gemini API
   - Any other external services

2. Use environment variables to switch between real and mock services

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for your changes
5. Submit a pull request

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

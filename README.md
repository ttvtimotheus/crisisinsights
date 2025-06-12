# Crisis Insights

![Crisis Insights](https://i.imgur.com/example.png)

## About

**Crisis Insights** is an AI-powered platform for exploring, understanding, and comparing global crisis regions. Built for the Google Cloud Hackathon, this application leverages the power of Google Gemini API and MongoDB Atlas Vector Search to provide deep insights into humanitarian crises worldwide.

### Key Features

- **Interactive World Map**: Explore crisis regions globally with Leaflet.js
- **AI-Generated Reports**: In-depth analysis provided by Google Gemini API
- **Semantic Vector Search**: Find similar crises using MongoDB Atlas Vector Search
- **Intuitive UI**: Built with Next.js, TypeScript, TailwindCSS and Radix UI

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Radix UI  
- **Map**: Leaflet.js
- **Database**: MongoDB Atlas with Vector Search capabilities
- **AI**: Google Cloud Gemini API for text generation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Google Cloud Platform account with Gemini API access

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/crisisinsights.git
cd crisisinsights
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Environment Variables

Copy the example environment file and add your own credentials:

```bash
cp src/.env.local.example .env.local
```

Update `.env.local` with your MongoDB Atlas connection string and Google API key.

### MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Create a database named `crisis-insights` with a collection named `regions`
3. Run the database seed script to populate with sample data:

```bash
node src/scripts/populateDatabase.js
```

4. Create a Vector Search Index in MongoDB Atlas:
   - Navigate to your cluster in the MongoDB Atlas UI
   - Go to the "Search" tab and create a new index
   - Name it `crisis_embedding_index` on the `regions` collection
   - Add the `embedding` field as a vector field with dimension 128

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

The application is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

Push to GitHub and connect your repository to Vercel for automatic deployments.

## Project Structure

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

## Future Enhancements

- User accounts and saved regions
- Crisis timeline visualization
- Real-time data updates
- Mobile app version
- Advanced filtering options
- Notification system for worsening crises

## Contributors

- Your Name

## License

This project is submitted for the Google Cloud Hackathon.

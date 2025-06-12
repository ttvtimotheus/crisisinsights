# Crisis Insights Deployment Guide

This document provides step-by-step instructions for deploying the Crisis Insights application to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A [Vercel account](https://vercel.com/signup)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account with a configured cluster
3. A [Google Cloud](https://console.cloud.google.com) account with the Gemini API enabled
4. Git repository set up for your project (GitHub, GitLab, or BitBucket)

## Environment Variables Setup

You'll need to configure the following environment variables in Vercel:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `GOOGLE_API_KEY`: Your Google Cloud API key for accessing the Gemini API

## Deployment Steps

### Option 1: Deploy from the Vercel Dashboard

1. Push your code to a Git repository
2. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your Git repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Add the environment variables:
   - Click "Environment Variables"
   - Add `MONGODB_URI` and `GOOGLE_API_KEY` with their respective values
7. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Navigate to your project directory and deploy:
   ```bash
   vercel
   ```

4. Follow the interactive prompts to configure your deployment

5. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

## Post-Deployment Steps

After deployment is complete:

1. **Configure MongoDB Atlas Vector Search Index**:
   - Go to your MongoDB Atlas cluster
   - Navigate to the "Search" tab
   - Create a new index named `crisis_embedding_index` on the `regions` collection
   - Add the `embedding` field as a vector field with dimension 128

2. **Seed the Database**:
   - You can either:
     - Run the seed script locally: `node src/scripts/populateDatabase.js`
     - Or create a one-time deployment with the build command set to: `node src/scripts/populateDatabase.js && npm run build`

3. **Verify Deployment**:
   - Visit your deployed URL to ensure the application is working correctly
   - Test the map functionality and crisis region details
   - Verify that the AI-generated reports and similar crises features work as expected

## Common Issues and Troubleshooting

1. **API Routes Timeout**:
   - If your AI-generated reports take too long to generate, consider increasing the serverless function timeout in your Vercel project settings.

2. **MongoDB Connection Issues**:
   - Ensure your MongoDB Atlas cluster is configured to accept connections from anywhere or add Vercel's IP range to your MongoDB Atlas network access list.

3. **Missing Images or Styling**:
   - Check that all public assets were properly uploaded during deployment.
   - Verify that your `next.config.js` correctly configures image domains.

4. **Environment Variable Errors**:
   - Double-check that all environment variables are correctly set in your Vercel project settings.
   - Note that changes to environment variables require redeployment to take effect.

## Monitoring and Analytics

Once deployed, you can:

1. Use the Vercel Dashboard to monitor:
   - Deployment status
   - Performance metrics
   - Error logs

2. Set up additional analytics tools:
   - [Vercel Analytics](https://vercel.com/analytics)
   - Google Analytics
   - MongoDB Atlas performance monitoring

## Continuous Deployment

Set up continuous deployment by:

1. Connecting your Git repository to Vercel
2. Configuring automatic deployments for specific branches
3. Setting up preview deployments for pull requests

For more information, refer to the [Vercel Documentation](https://vercel.com/docs).

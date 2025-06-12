import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Please add your Google API Key to .env.local');
}

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

// The model to use for text generation
const MODEL_NAME = 'gemini-1.5-pro-latest';

export async function generateCrisisReport(region: any) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
      You are an AI crisis analyst specializing in global humanitarian situations.
      
      Please analyze the following crisis region and provide a comprehensive report:
      
      Region: ${region.region}
      Country: ${region.country}
      Type: ${region.type}
      Displaced: ${region.displaced}
      Casualties: ${region.casualties}
      Health Status: ${region.health_status}
      Severity Level: ${region.severity_level}/10
      Affected Population: ${region.affected_population}
      Resources Needed: ${region.resources_needed?.join(', ')}
      
      Generate a structured report with the following sections:
      1. Overview: A comprehensive summary of the crisis situation (3-4 paragraphs)
      2. Health Impact: Analysis of health conditions, disease risks, and medical needs (2-3 paragraphs)
      3. Timeline: Major events and how the situation has evolved (2-3 paragraphs)
      4. Recommendations: Suggest actionable steps for humanitarian response (1-2 paragraphs)
      
      Format the output as a JSON object with the following structure:
      {
        "overview": "...",
        "health_impact": "...",
        "timeline": "...",
        "recommendations": "..."
      }
      
      Be factual, informative, and analytical. Focus on humanitarian aspects, not political positions.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract the JSON object from the response
    const jsonStr = text.replace(/^```json|```$/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating report with Gemini API:', error);
    throw new Error('Failed to generate AI report');
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const result = await model.generateContent(`
      Generate a 128-dimensional embedding vector for the following text that captures the semantic meaning:
      ${text}
      
      Return only a JSON array of 128 floating point numbers.
    `);
    
    const response = result.response;
    const embedText = response.text();
    
    // Extract the JSON array from the response
    const cleanedText = embedText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error generating embedding with Gemini API:', error);
    throw new Error('Failed to generate embedding');
  }
}

export async function generateComparisonAnalysis(regionA: any, regionB: any): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const prompt = `
      Compare and contrast these two crisis regions:
      
      Region A: ${regionA.region}, ${regionA.country} (${regionA.type})
      - Displaced: ${regionA.displaced}
      - Casualties: ${regionA.casualties}
      - Severity: ${regionA.severity_level}/10
      
      Region B: ${regionB.region}, ${regionB.country} (${regionB.type})
      - Displaced: ${regionB.displaced}
      - Casualties: ${regionB.casualties}
      - Severity: ${regionB.severity_level}/10
      
      Provide a brief analysis (2-3 sentences) of how these crises are similar or different.
      Focus on humanitarian aspects, patterns, causes, or impacts.
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating comparison with Gemini API:', error);
    throw new Error('Failed to generate comparison');
  }
}

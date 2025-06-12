'use client';

import { useState, useEffect } from 'react';
import MapComponent from '@/components/Map';
import { CrisisRegion } from '@/types';

export default function MapPage() {
  const [regions, setRegions] = useState<CrisisRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions');
        if (!response.ok) {
          throw new Error('Failed to fetch crisis regions');
        }
        const data = await response.json();
        setRegions(data);
      } catch (err) {
        console.error('Error fetching regions:', err);
        setError('Failed to load crisis regions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crisis Map
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore crisis regions worldwide
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {regions.length} Regions
            </span>
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading crisis regions...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg max-w-md">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <MapComponent regions={regions} />
        )}
      </main>
    </div>
  );
}

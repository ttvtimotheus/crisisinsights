'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { CrisisRegion, AIGeneratedReport, SimilarRegionResult } from '@/types';

interface RegionDialogProps {
  region: CrisisRegion;
  open: boolean;
  onClose: () => void;
}

const RegionDialog = ({ region, open, onClose }: RegionDialogProps) => {
  const [report, setReport] = useState<AIGeneratedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [similarRegions, setSimilarRegions] = useState<SimilarRegionResult[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!region || !open) return;
      
      setLoading(true);
      try {
        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ regionId: region._id }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setReport(data);
        } else {
          console.error('Failed to fetch report');
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchReport();
    }
  }, [region, open]);

  const fetchSimilarRegions = async () => {
    if (!region || !open) return;
    
    setLoadingSimilar(true);
    try {
      const response = await fetch('/api/similar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regionId: region._id }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSimilarRegions(data.regions);
      } else {
        console.error('Failed to fetch similar regions');
      }
    } catch (error) {
      console.error('Error fetching similar regions:', error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  if (!region) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl max-h-[85vh] overflow-auto bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
            {region.region}, {region.country}
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 dark:text-gray-400 mb-4">
            {region.type} • Last updated: {new Date(region.last_updated).toLocaleDateString()}
          </Dialog.Description>

          <div className="stats flex flex-wrap gap-4 mb-6">
            <div className="stat bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Displaced</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{region.displaced.toLocaleString()}</p>
            </div>
            <div className="stat bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Casualties</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{region.casualties.toLocaleString()}</p>
            </div>
            <div className="stat bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Severity Level</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{region.severity_level}/10</p>
            </div>
            <div className="stat bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Affected Population</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {region.affected_population.toLocaleString()}
              </p>
            </div>
          </div>

          <Tabs.Root defaultValue="overview" className="w-full">
            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <Tabs.Trigger 
                value="overview" 
                className="px-4 py-2 text-sm focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-red-500"
              >
                Overview
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="health" 
                className="px-4 py-2 text-sm focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-red-500"
              >
                Health Impact
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="timeline" 
                className="px-4 py-2 text-sm focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-red-500"
              >
                Timeline
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="similar" 
                className="px-4 py-2 text-sm focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-red-500"
                onClick={() => similarRegions.length === 0 && fetchSimilarRegions()}
              >
                Similar Crises
              </Tabs.Trigger>
            </Tabs.List>

            <div className="tab-content">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse text-gray-500">Loading AI-generated report...</div>
                </div>
              ) : (
                <>
                  <Tabs.Content value="overview" className="space-y-4 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Crisis Summary</h3>
                    {report ? (
                      <div className="prose dark:prose-invert max-w-none">
                        <p>{report.overview}</p>
                        <h4>Resources Needed</h4>
                        <ul>
                          {region.resources_needed.map((resource, index) => (
                            <li key={index}>{resource}</li>
                          ))}
                        </ul>
                        <h4>Key Organizations Involved</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {region.key_organizations.map((org, index) => (
                            <span key={index} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                              {org}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{region.summary}</p>
                    )}
                  </Tabs.Content>

                  <Tabs.Content value="health" className="space-y-4 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Health Impact</h3>
                    {report ? (
                      <div className="prose dark:prose-invert max-w-none">
                        <p>{report.health_impact}</p>
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <h4 className="font-medium">Current Health Status</h4>
                          <p>{region.health_status}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{region.health_status}</p>
                    )}
                  </Tabs.Content>

                  <Tabs.Content value="timeline" className="space-y-4 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Crisis Timeline</h3>
                    {report ? (
                      <div className="prose dark:prose-invert max-w-none">
                        <p>{report.timeline}</p>
                        <div className="mt-6">
                          <h4>Related Articles</h4>
                          <ul className="space-y-2">
                            {region.related_articles.map((article, index) => (
                              <li key={index} className="border-l-2 border-red-500 pl-4 py-1">
                                <p className="font-medium">{article.title}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(article.date).toLocaleDateString()}
                                </p>
                                <a 
                                  href={article.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-red-600 dark:text-red-400 text-sm hover:underline"
                                >
                                  Read article →
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">Timeline information not available yet.</p>
                    )}
                  </Tabs.Content>

                  <Tabs.Content value="similar" className="space-y-4 py-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Similar Crisis Regions</h3>
                      <button 
                        onClick={fetchSimilarRegions} 
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
                        disabled={loadingSimilar}
                      >
                        Refresh
                      </button>
                    </div>
                    
                    {loadingSimilar ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-pulse text-gray-500">Finding similar regions...</div>
                      </div>
                    ) : similarRegions.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {similarRegions.map((item, index) => (
                          <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{item.region.region}, {item.region.country}</h4>
                                <p className="text-sm text-gray-500">{item.region.type}</p>
                              </div>
                              <div className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm">
                                {item.similarity_score.toFixed(2)}% similar
                              </div>
                            </div>
                            <p className="text-sm mt-2">{item.comparison}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 dark:text-gray-400">
                          Click the button below to find crisis regions similar to this one
                        </p>
                        <button
                          onClick={fetchSimilarRegions}
                          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                          disabled={loadingSimilar}
                        >
                          Find Similar Crises
                        </button>
                      </div>
                    )}
                    
                    {report && similarRegions.length > 0 && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-2">AI Recommendations</h4>
                        <p className="text-sm">{report.recommendations}</p>
                      </div>
                    )}
                  </Tabs.Content>
                </>
              )}
            </div>
          </Tabs.Root>

          <div className="mt-6 text-right">
            <Dialog.Close asChild>
              <button 
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RegionDialog;

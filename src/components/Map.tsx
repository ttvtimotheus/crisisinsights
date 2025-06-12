'use client';

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CrisisRegion } from '@/types';
import RegionDialog from './RegionDialog';

// Fix Leaflet icon issues in Next.js
// Need to manually set the icon paths since Next.js build breaks the default Leaflet paths
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
  });
};

interface MapComponentProps {
  regions?: CrisisRegion[];
}

const MapComponent = ({ regions = [] }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<CrisisRegion | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fixLeafletIcons();
    }

    // Initialize map only once
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([20, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);

      setLoading(false);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add markers when regions data is available
  useEffect(() => {
    if (mapRef.current && regions.length > 0 && !loading) {
      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      // Add new markers for each region
      regions.forEach((region) => {
        if (region.coordinates) {
          const { lat, lng } = region.coordinates;
          const marker = L.marker([lat, lng])
            .addTo(mapRef.current!)
            .bindPopup(`<b>${region.region}, ${region.country}</b><br>${region.type}`);
          
          // Add click handler
          marker.on('click', () => {
            setSelectedRegion(region);
            setIsDialogOpen(true);
          });
        }
      });
    }
  }, [regions, loading]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
          <div className="text-white">Loading map...</div>
        </div>
      )}
      <div 
        ref={mapContainerRef} 
        className="w-full h-screen" 
        style={{ height: "calc(100vh - 64px)" }}
      />
      
      {selectedRegion && (
        <RegionDialog
          region={selectedRegion}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default MapComponent;

// components/WorldMapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
});

export default function WorldMapWrapper() {
  return <WorldMap />;
}
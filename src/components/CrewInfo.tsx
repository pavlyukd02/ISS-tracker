'use client';

import { Astronaut } from '@/utils/api';

interface CrewInfoProps {
  crew: Astronaut[];
  lastUpdated: Date;
}

export default function CrewInfo({ crew, lastUpdated }: CrewInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ISS Crew</h2>
      <p className="text-gray-600 mb-4">
        Currently <span className="font-bold">{crew.length}</span> people on board
      </p>
      
      <div className="space-y-3">
        {crew.map((astronaut, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-800">{astronaut.name}</span>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Last updated: {lastUpdated.toUTCString()}
      </p>
    </div>
  );
}

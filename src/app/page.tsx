'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


const ISSMap = dynamic(() => import('@/components/ISSMap'), { 
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg w-full h-96 flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

// Demo data
import { fetchISSPosition, fetchPeopleInSpace } from '@/utils/api';

export default function Home() {
  const [position, setPosition] = useState<{ latitude: number; longitude: number; timestamp: number } | null>(null);
  const [crew, setCrew] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
  }, []);


  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isMounted]);


  useEffect(() => {
    if (!isMounted) return;
    const fetchData = async () => {
      const issPosition = await fetchISSPosition();
      setPosition(issPosition);
      setLastUpdated(new Date());
      const peopleData = await fetchPeopleInSpace();
      console.log('peopleData:', peopleData);
      if (Array.isArray(peopleData.people)) {
        const issCrew = peopleData.people.filter((a: any) => a.craft === 'ISS');
        console.log('ISS crew:', issCrew);
        setCrew(issCrew);
      } else {
        setCrew([]);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading ISS data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ISS Tracker</h1>
          <p className="text-gray-600">
            Track the International Space Station in real-time
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Current UTC Time: {currentTime ? currentTime.toUTCString() : 'Loading...'}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">ISS Location</h2>
              <div className="mb-4">
                {position ? (
                  <>
                    <p className="text-gray-700">
                      Latitude: <span className="font-mono">{position.latitude.toFixed(4)}°</span>
                    </p>
                    <p className="text-gray-700">
                      Longitude: <span className="font-mono">{position.longitude.toFixed(4)}°</span>
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">Loading ISS position...</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {lastUpdated.toUTCString()}
                </p>
              </div>
              <div className="h-96 w-full">
                <ISSMap position={position} />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">ISS Crew</h2>
              <p className="text-gray-700 mb-4">
                Currently <span className="font-bold text-blue-600">{crew.length}</span> astronauts aboard the ISS:
              </p>
              <ul className="space-y-2">
                {crew.map((astronaut, index) => (
                  <li key={index} className="text-gray-700">
                    • {astronaut.name}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">About ISS</h2>
              <p className="text-gray-700 mb-4">
                The International Space Station (ISS) orbits Earth at an average altitude of 420 km,
                traveling at a speed of 28,000 km/h, completing about 16 orbits per day.
              </p>
              <p className="text-sm text-gray-500">
                Data updates every 5 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

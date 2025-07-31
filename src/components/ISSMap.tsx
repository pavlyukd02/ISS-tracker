'use client';

import { useState, useEffect } from 'react';

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

interface ISSMapProps {
  position: { latitude: number; longitude: number } | null;
}

export default function ISSMap({ position }: ISSMapProps) {
  const center = position
    ? { lat: position.latitude, lng: position.longitude }
    : { lat: -25.363, lng: 131.044 };

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {position && (
            <MarkerF
              position={{ lat: position.latitude, lng: position.longitude }}
              title="ISS Location"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}


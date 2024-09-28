'use client';

import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import '../../../../styles/leafletStyles.css';

const DetailLocation = dynamic(
  () =>
    Promise.resolve(() => {
      const position: [number, number] = [-7.983908, 112.621391];
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        if (typeof window !== 'undefined') {
          const L = require('leaflet');
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl:
              'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl:
              'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
          });
        }
      }, []);

      const MapContainer = dynamic(
        () => import('react-leaflet').then(mod => mod.MapContainer),
        { ssr: false }
      );
      const TileLayer = dynamic(
        () => import('react-leaflet').then(mod => mod.TileLayer),
        { ssr: false }
      );
      const Marker = dynamic(
        () => import('react-leaflet').then(mod => mod.Marker),
        { ssr: false }
      );
      const Popup = dynamic(
        () => import('react-leaflet').then(mod => mod.Popup),
        { ssr: false }
      );

      return (
        <div>
          <div className="flex flex-col md:flex-row gap-6 pt-10 max-w-6xl mx-auto px-3 md:px-1">
            <div className="flex flex-col w-full">
              <span className="text-2xl md:text-[36px] font-bold">
                Location
              </span>

              <div className="mt-4 relative z-0">
                {loading ? (
                  <div className="animate-pulse h-64 bg-gray-300 w-full"></div>
                ) : (
                  <MapContainer
                    center={position}
                    zoom={13}
                    style={{
                      height: '500px',
                      width: '100%',
                      zIndex: '0 !important',
                      position: 'relative'
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                      <Popup>
                        Malang, Jawa Timur <br /> Koordinat: {position[0]},{' '}
                        {position[1]}
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }),
  { ssr: false }
);

export default DetailLocation;

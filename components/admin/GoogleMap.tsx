
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

export function GoogleMap({ latitude, longitude, onLocationChange }: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude || -74.0060, latitude || 40.7128],
      zoom: 12,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([longitude || -74.0060, latitude || 40.7128])
      .addTo(map);

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      onLocationChange(lngLat.lat, lngLat.lng);
    });

    map.on("click", (e) => {
      marker.setLngLat(e.lngLat);
      onLocationChange(e.lngLat.lat, e.lngLat.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (markerRef.current && latitude && longitude) {
      markerRef.current.setLngLat([longitude, latitude]);
      mapRef.current?.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface RouteMapProps {
  currentLat: number;
  currentLng: number;
  destinationAddress: string;
  destinationCity: string;
  destinationState: string;
  destinationCountry: string;
}

export function RouteMap({ 
  currentLat, 
  currentLng,
  destinationAddress,
  destinationCity,
  destinationState,
  destinationCountry
}: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [currentLng, currentLat],
      zoom: 8,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !currentLat || !currentLng) return;

    const map = mapRef.current;

    // Geocode destination address
    const geocodeAndDrawRoute = async () => {
      const query = `${destinationAddress}, ${destinationCity}, ${destinationState}, ${destinationCountry}`;
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;

      try {
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.features && geocodeData.features.length > 0) {
          const [destLng, destLat] = geocodeData.features[0].center;

          // Add current location marker (blue)
          new mapboxgl.Marker({ color: "#3b82f6" })
            .setLngLat([currentLng, currentLat])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Current Location</h3>"))
            .addTo(map);

          // Add destination marker (green)
          new mapboxgl.Marker({ color: "#10b981" })
            .setLngLat([destLng, destLat])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Destination</h3>"))
            .addTo(map);

          // Fetch route
          const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLng},${currentLat};${destLng},${destLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
          const routeResponse = await fetch(routeUrl);
          const routeData = await routeResponse.json();

          if (routeData.routes && routeData.routes.length > 0) {
            const route = routeData.routes[0];
            const distance = (route.distance / 1000).toFixed(2);
            const duration = (route.duration / 3600).toFixed(1);

            setRouteInfo({ distance: `${distance} km`, duration: `${duration} hrs` });

            map.on('load', () => {
              if (map.getSource('route')) {
                map.removeLayer('route');
                map.removeSource('route');
              }

              map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: route.geometry,
                },
              });

              map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#3b82f6',
                  'line-width': 5,
                  'line-opacity': 0.75,
                },
              });

              const coordinates = route.geometry.coordinates;
              const bounds = coordinates.reduce(
                (bounds: mapboxgl.LngLatBounds, coord: [number, number]) => {
                  return bounds.extend(coord);
                },
                new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
              );

              map.fitBounds(bounds, { padding: 80 });
            });
          }
        }
      } catch (error) {
        console.error('Error drawing route:', error);
      }
    };

    if (map.loaded()) {
      geocodeAndDrawRoute();
    } else {
      map.on('load', geocodeAndDrawRoute);
    }

  }, [currentLat, currentLng, destinationAddress, destinationCity, destinationState, destinationCountry]);

  return (
    <div className="space-y-3">
      <div className="w-full h-[500px] rounded-lg overflow-hidden border">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
      {routeInfo && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Current Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Destination</span>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Distance: </span>
              <span className="font-semibold">{routeInfo.distance}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Est. Time: </span>
              <span className="font-semibold">{routeInfo.duration}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

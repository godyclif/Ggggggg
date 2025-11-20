
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
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string; coveredDistance: string } | null>(null);

  // Calculate straight line distance helper
  const calculateStraightLineDistance = (lng1: number, lat1: number, lng2: number, lat2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

    // Geocode destination address and draw routes
    const geocodeAndDrawRoute = async () => {
      const query = `${destinationAddress}, ${destinationCity}, ${destinationState}, ${destinationCountry}`;
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;

      try {
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.features && geocodeData.features.length > 0) {
          const [destLng, destLat] = geocodeData.features[0].center;

          // Fetch the full route from current location to destination
          const fullRouteUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLng},${currentLat};${destLng},${destLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
          const fullRouteResponse = await fetch(fullRouteUrl);
          const fullRouteData = await fullRouteResponse.json();

          if (fullRouteData.routes && fullRouteData.routes.length > 0) {
            const route = fullRouteData.routes[0];
            const totalDistance = (route.distance / 1000).toFixed(2);
            const duration = (route.duration / 3600).toFixed(1);

            // Remove existing layers and sources
            if (map.getLayer('full-route')) map.removeLayer('full-route');
            if (map.getSource('full-route')) map.removeSource('full-route');
            if (map.getLayer('covered-route')) map.removeLayer('covered-route');
            if (map.getSource('covered-route')) map.removeSource('covered-route');

            // Add full route (blue line from current to destination)
            map.addSource('full-route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route.geometry,
              },
            });

            map.addLayer({
              id: 'full-route',
              type: 'line',
              source: 'full-route',
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

            // Get the origin point (start of the route) and draw covered distance
            const allCoordinates = route.geometry.coordinates;
            const originLng = allCoordinates[0][0];
            const originLat = allCoordinates[0][1];

            // Fetch covered route from origin to current location
            const coveredRouteUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${currentLng},${currentLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            const coveredRouteResponse = await fetch(coveredRouteUrl);
            const coveredRouteData = await coveredRouteResponse.json();

            let coveredDistanceStr = '0 km';

            if (coveredRouteData.routes && coveredRouteData.routes.length > 0) {
              const coveredRoute = coveredRouteData.routes[0];
              const coveredDist = (coveredRoute.distance / 1000).toFixed(2);
              coveredDistanceStr = `${coveredDist} km`;

              // Add covered route source and layer (red line)
              map.addSource('covered-route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: coveredRoute.geometry,
                },
              });

              map.addLayer({
                id: 'covered-route',
                type: 'line',
                source: 'covered-route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#ef4444',
                  'line-width': 5,
                  'line-opacity': 0.85,
                },
              });
            } else {
              // Fallback to straight line for covered distance
              const coveredDist = calculateStraightLineDistance(originLng, originLat, currentLng, currentLat);
              coveredDistanceStr = `${coveredDist.toFixed(2)} km`;

              map.addSource('covered-route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: [[originLng, originLat], [currentLng, currentLat]]
                  },
                },
              });

              map.addLayer({
                id: 'covered-route',
                type: 'line',
                source: 'covered-route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#ef4444',
                  'line-width': 5,
                  'line-opacity': 0.85,
                  'line-dasharray': [2, 2],
                },
              });
            }

            // Update route info
            setRouteInfo({ 
              distance: `${totalDistance} km`, 
              duration: `${duration} hrs`,
              coveredDistance: coveredDistanceStr
            });

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

            // Fit map to show entire route
            const coordinates = route.geometry.coordinates;
            const bounds = coordinates.reduce(
              (bounds: mapboxgl.LngLatBounds, coord: [number, number]) => {
                return bounds.extend(coord);
              },
              new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
            );

            map.fitBounds(bounds, { padding: 80 });
          } else {
            // No driving route available, draw straight lines
            const straightDistance = calculateStraightLineDistance(currentLng, currentLat, destLng, destLat);
            
            setRouteInfo({ 
              distance: `${straightDistance.toFixed(2)} km (straight line)`, 
              duration: 'N/A',
              coveredDistance: '0 km'
            });

            // Add current location marker
            new mapboxgl.Marker({ color: "#3b82f6" })
              .setLngLat([currentLng, currentLat])
              .setPopup(new mapboxgl.Popup().setHTML("<h3>Current Location</h3>"))
              .addTo(map);

            // Add destination marker
            new mapboxgl.Marker({ color: "#10b981" })
              .setLngLat([destLng, destLat])
              .setPopup(new mapboxgl.Popup().setHTML("<h3>Destination</h3>"))
              .addTo(map);

            // Draw straight line
            if (map.getLayer('full-route')) map.removeLayer('full-route');
            if (map.getSource('full-route')) map.removeSource('full-route');

            map.addSource('full-route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [[currentLng, currentLat], [destLng, destLat]]
                },
              },
            });

            map.addLayer({
              id: 'full-route',
              type: 'line',
              source: 'full-route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3b82f6',
                'line-width': 5,
                'line-opacity': 0.75,
                'line-dasharray': [2, 2],
              },
            });

            // Fit bounds
            const bounds = new mapboxgl.LngLatBounds()
              .extend([currentLng, currentLat])
              .extend([destLng, destLat]);

            map.fitBounds(bounds, { padding: 100 });
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
        <div className="flex flex-col gap-3">
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
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-red-500"></div>
                <span className="text-sm font-medium">Covered Path</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-sm p-4 bg-muted rounded-lg">
            <div>
              <span className="text-muted-foreground">Total Distance: </span>
              <span className="font-semibold">{routeInfo.distance}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Est. Time: </span>
              <span className="font-semibold">{routeInfo.duration}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Covered: </span>
              <span className="font-semibold text-red-600">{routeInfo.coveredDistance}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

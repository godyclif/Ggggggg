
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
          const fullRouteUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLng},${currentLat};${destLng},${destLat}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`;
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

            // Extract waypoints from the route steps
            const waypoints: [number, number][] = [];
            if (route.legs && route.legs.length > 0) {
              route.legs.forEach((leg: any) => {
                if (leg.steps) {
                  leg.steps.forEach((step: any) => {
                    if (step.maneuver && step.maneuver.location) {
                      waypoints.push(step.maneuver.location);
                    }
                  });
                }
              });
            }

            // If we have waypoints, add them as small markers
            waypoints.forEach((waypoint, index) => {
              // Skip first and last waypoints (they're the origin and destination)
              if (index === 0 || index === waypoints.length - 1) return;
              
              // Add small waypoint markers
              const waypointMarker = document.createElement('div');
              waypointMarker.className = 'waypoint-marker';
              waypointMarker.style.width = '8px';
              waypointMarker.style.height = '8px';
              waypointMarker.style.backgroundColor = '#8b5cf6';
              waypointMarker.style.borderRadius = '50%';
              waypointMarker.style.border = '2px solid white';
              
              new mapboxgl.Marker({ element: waypointMarker })
                .setLngLat(waypoint)
                .addTo(map);
            });

            // Since this is a tracking page showing where the package IS (not where it's going),
            // we need to show a "covered distance" line from origin to current location
            // The origin would be the sender's location, but we only have current location
            // So we'll assume the package started from the beginning of the route and show coverage
            
            // For simplicity, let's show the covered portion as the route from start to current
            // We'll use the current location as a point on the route
            const allCoordinates = route.geometry.coordinates;
            
            // Find closest point on route to current location
            let closestIndex = 0;
            let minDistance = Infinity;
            
            allCoordinates.forEach((coord: [number, number], index: number) => {
              const dist = Math.sqrt(
                Math.pow(coord[0] - currentLng, 2) + Math.pow(coord[1] - currentLat, 2)
              );
              if (dist < minDistance) {
                minDistance = dist;
                closestIndex = index;
              }
            });

            // Create covered route (red line from start to current position)
            const coveredCoordinates = allCoordinates.slice(0, closestIndex + 1);
            
            // Calculate covered distance
            let coveredDist = 0;
            for (let i = 0; i < coveredCoordinates.length - 1; i++) {
              const [lng1, lat1] = coveredCoordinates[i];
              const [lng2, lat2] = coveredCoordinates[i + 1];
              coveredDist += calculateStraightLineDistance(lng1, lat1, lng2, lat2);
            }
            
            const coveredDistanceStr = `${coveredDist.toFixed(2)} km`;

            // Add covered route source and layer
            map.addSource('covered-route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coveredCoordinates,
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
              },
            });

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
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium">Route Waypoints</span>
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

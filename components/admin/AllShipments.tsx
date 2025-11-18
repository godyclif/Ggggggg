"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Assuming RouteViewer component is defined elsewhere and handles map display
// import RouteViewer from './RouteViewer';

interface Shipment {
  trackingNumber: string;
  senderName: string;
  recipientName: string;
  status: string;
  serviceType: string;
  shippingDate: string;
  estimatedDeliveryDate: string;
  // Added properties for shipment tracking
  currentLocation?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
}

export function AllShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await fetch("/api/shipments");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch shipments");
      }

      // Assuming the API now returns shipments with location data
      setShipments(data.shipments);
    } catch (err: any) {
      toast.error(err.message || "Failed to load shipments");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500",
      "in-transit": "bg-blue-500",
      delivered: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Shipments</CardTitle>
        <CardDescription>
          View and manage all shipments in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No shipments found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tracking #</th>
                    <th className="text-left py-3 px-4">Sender</th>
                    <th className="text-left py-3 px-4">Recipient</th>
                    <th className="text-left py-3 px-4">Service</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Ship Date</th>
                    <th className="text-left py-3 px-4">Est. Delivery</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.trackingNumber} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-mono text-sm">{shipment.trackingNumber}</td>
                      <td className="py-3 px-4">{shipment.senderName}</td>
                      <td className="py-3 px-4">{shipment.recipientName}</td>
                      <td className="py-3 px-4 capitalize">{shipment.serviceType}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{shipment.shippingDate}</td>
                      <td className="py-3 px-4">{shipment.estimatedDeliveryDate}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setShowRouteDialog(true);
                          }}
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          View Route
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={showRouteDialog} onOpenChange={setShowRouteDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Shipment Route: {selectedShipment?.trackingNumber}</DialogTitle>
          </DialogHeader>
          {selectedShipment ? (
            // This is a placeholder for the actual map component.
            // You would integrate a mapping library like Leaflet, Mapbox, or Google Maps here.
            // The component should take currentLocation and destination as props.
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              {/* Replace with your actual RouteViewer or map component */}
              {/* Example: <RouteViewer currentLocation={selectedShipment.currentLocation} destination={selectedShipment.destination} /> */}
              <p className="text-muted-foreground">Map integration for route visualization goes here.</p>
              {selectedShipment.currentLocation && selectedShipment.destination && (
                <p className="mt-2 text-sm text-muted-foreground">
                  From: ({selectedShipment.currentLocation.lat}, {selectedShipment.currentLocation.lng}) to ({selectedShipment.destination.lat}, {selectedShipment.destination.lng})
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
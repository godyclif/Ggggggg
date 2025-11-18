
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FooterSection } from "@/components/layout/sections/footer";
import { Package, Loader2, MapPin, Calendar, DollarSign, Box, Weight, Ruler, User, Mail, Phone, Home, Shield, FileText, Download } from "lucide-react";
import { RouteMap } from "@/components/admin/RouteMap";
import toast from "react-hot-toast";

interface ShipmentData {
  trackingNumber: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  senderCountry: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientCountry: string;
  packageType: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  value: string;
  description: string;
  specialInstructions: string;
  serviceType: string;
  priority: string;
  insurance: boolean;
  signatureRequired: boolean;
  shippingDate: string;
  estimatedDeliveryDate: string;
  shippingCost: string;
  latitude: number;
  longitude: number;
  recipientLatitude?: number;
  recipientLongitude?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function TrackPage() {
  const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shipment, setShipment] = useState<ShipmentData | null>(null);

  useEffect(() => {
    const tn = searchParams.get('tn');
    if (tn) {
      setTrackingNumber(tn);
      handleTrackWithNumber(tn);
    }
  }, [searchParams]);

  const handleTrackWithNumber = async (tn: string) => {
    if (!tn.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/shipments/${tn.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Shipment not found");
      }

      setShipment(data.shipment);
      toast.success("Shipment found!");
    } catch (err: any) {
      toast.error(err.message || "Failed to find shipment");
      setShipment(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrack = async () => {
    await handleTrackWithNumber(trackingNumber);
  };

  const downloadShipmentLabel = () => {
    if (!shipment) return;

    // Create PDF content
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Shipping Label - ${shipment.trackingNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Arial', sans-serif; padding: 40px; background: #fff; }
          .container { max-width: 800px; margin: 0 auto; border: 2px solid #000; padding: 30px; }
          .header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 32px; font-weight: bold; color: #7c3aed; margin-bottom: 10px; }
          .tracking { font-size: 24px; font-weight: bold; margin-top: 15px; letter-spacing: 2px; }
          .barcode { text-align: center; margin: 20px 0; padding: 20px; background: #f5f5f5; }
          .barcode-number { font-size: 18px; font-weight: bold; letter-spacing: 3px; }
          .section { margin: 25px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #7c3aed; }
          .info-row { display: flex; margin-bottom: 10px; }
          .info-label { font-weight: bold; width: 150px; }
          .info-value { flex: 1; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .priority-badge { display: inline-block; padding: 5px 15px; background: #7c3aed; color: white; border-radius: 4px; font-weight: bold; text-transform: uppercase; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #000; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RapidWave Logistics</div>
            <div style="font-size: 14px; color: #666;">Global Shipping Solutions</div>
            <div class="tracking">TRACKING: ${shipment.trackingNumber}</div>
          </div>

          <div class="barcode">
            <div style="font-size: 48px; font-weight: bold;">||||| ||||| |||||</div>
            <div class="barcode-number">${shipment.trackingNumber}</div>
          </div>

          <div class="grid">
            <div class="section">
              <div class="section-title">FROM</div>
              <div class="info-row"><div class="info-label">Name:</div><div class="info-value">${shipment.senderName}</div></div>
              <div class="info-row"><div class="info-label">Email:</div><div class="info-value">${shipment.senderEmail}</div></div>
              <div class="info-row"><div class="info-label">Phone:</div><div class="info-value">${shipment.senderPhone}</div></div>
              <div class="info-row"><div class="info-label">Address:</div><div class="info-value">${shipment.senderAddress}</div></div>
              <div class="info-row"><div class="info-value">${shipment.senderCity}, ${shipment.senderState} ${shipment.senderZip}</div></div>
              <div class="info-row"><div class="info-value">${shipment.senderCountry}</div></div>
            </div>

            <div class="section">
              <div class="section-title">TO</div>
              <div class="info-row"><div class="info-label">Name:</div><div class="info-value">${shipment.recipientName}</div></div>
              <div class="info-row"><div class="info-label">Email:</div><div class="info-value">${shipment.recipientEmail}</div></div>
              <div class="info-row"><div class="info-label">Phone:</div><div class="info-value">${shipment.recipientPhone}</div></div>
              <div class="info-row"><div class="info-label">Address:</div><div class="info-value">${shipment.recipientAddress}</div></div>
              <div class="info-row"><div class="info-value">${shipment.recipientCity}, ${shipment.recipientState} ${shipment.recipientZip}</div></div>
              <div class="info-row"><div class="info-value">${shipment.recipientCountry}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">PACKAGE DETAILS</div>
            <div class="grid">
              <div>
                <div class="info-row"><div class="info-label">Type:</div><div class="info-value">${shipment.packageType.toUpperCase()}</div></div>
                <div class="info-row"><div class="info-label">Weight:</div><div class="info-value">${shipment.weight}</div></div>
                <div class="info-row"><div class="info-label">Dimensions:</div><div class="info-value">${shipment.dimensions.length} × ${shipment.dimensions.width} × ${shipment.dimensions.height}</div></div>
                <div class="info-row"><div class="info-label">Value:</div><div class="info-value">$${shipment.value}</div></div>
              </div>
              <div>
                <div class="info-row"><div class="info-label">Service:</div><div class="info-value">${shipment.serviceType.toUpperCase()}</div></div>
                <div class="info-row"><div class="info-label">Priority:</div><div class="info-value"><span class="priority-badge">${shipment.priority}</span></div></div>
                <div class="info-row"><div class="info-label">Ship Date:</div><div class="info-value">${shipment.shippingDate}</div></div>
                <div class="info-row"><div class="info-label">Est. Delivery:</div><div class="info-value">${shipment.estimatedDeliveryDate}</div></div>
              </div>
            </div>
            ${shipment.description ? `<div class="info-row" style="margin-top: 15px;"><div class="info-label">Description:</div><div class="info-value">${shipment.description}</div></div>` : ''}
            ${shipment.specialInstructions ? `<div class="info-row"><div class="info-label">Instructions:</div><div class="info-value">${shipment.specialInstructions}</div></div>` : ''}
          </div>

          <div class="section">
            <div class="section-title">ADDITIONAL SERVICES</div>
            <div class="info-row">
              ${shipment.insurance ? '✓ Insurance Coverage' : ''}
              ${shipment.signatureRequired ? ' | ✓ Signature Required' : ''}
            </div>
          </div>

          <div class="footer">
            <div style="font-weight: bold; margin-bottom: 5px;">RapidWave Logistics</div>
            <div>For support, contact us at support@rapidwave.com | 1-800-RAPIDWAVE</div>
            <div style="margin-top: 10px;">This is an official shipping label. Please keep for your records.</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shipping-label-${shipment.trackingNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Shipping label downloaded! Open in browser and print to PDF.");
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

  return (
    <>
      <section className="container py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Package className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your Shipment
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter your tracking number to see real-time updates
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTrack();
                }
              }}
              className="text-lg h-14"
            />
            <Button 
              onClick={handleTrack}
              size="lg" 
              className="w-full opacity-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tracking...
                </>
              ) : (
                "Track Shipment"
              )}
            </Button>
          </div>

          {shipment && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Tracking: {shipment.trackingNumber}</CardTitle>
                      <CardDescription className="mt-2">
                        Created on {new Date(shipment.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={downloadShipmentLabel}
                        variant="outline"
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Label
                      </Button>
                      <Badge className={`${getStatusColor(shipment.status)} text-white text-lg px-4 py-2`}>
                        {shipment.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Map Card */}
              {shipment.latitude && shipment.longitude && (
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipment Route & Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <RouteMap
                      currentLat={shipment.latitude}
                      currentLng={shipment.longitude}
                      destinationAddress={shipment.recipientAddress}
                      destinationCity={shipment.recipientCity}
                      destinationState={shipment.recipientState}
                      destinationCountry={shipment.recipientCountry}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Shipment Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sender Information */}
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Sender Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{shipment.senderName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.senderEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.senderPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.senderAddress}</p>
                        <p className="text-sm">{shipment.senderCity}, {shipment.senderState} {shipment.senderZip}</p>
                        <p className="text-sm">{shipment.senderCountry}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recipient Information */}
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Recipient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{shipment.recipientName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.recipientEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.recipientPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{shipment.recipientAddress}</p>
                        <p className="text-sm">{shipment.recipientCity}, {shipment.recipientState} {shipment.recipientZip}</p>
                        <p className="text-sm">{shipment.recipientCountry}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Package Details */}
              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <Box className="h-5 w-5" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Package Type</p>
                      <p className="font-medium capitalize">{shipment.packageType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Weight</p>
                      <p className="font-medium">{shipment.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Dimensions (L×W×H)</p>
                      <p className="font-medium">
                        {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Value</p>
                      <p className="font-medium">${shipment.value}</p>
                    </div>
                  </div>
                  {shipment.description && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{shipment.description}</p>
                    </div>
                  )}
                  {shipment.specialInstructions && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                      <p className="text-sm">{shipment.specialInstructions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Details */}
              <Card>
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Service Type</p>
                      <p className="font-medium capitalize">{shipment.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Priority</p>
                      <p className="font-medium capitalize">{shipment.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shipping Cost</p>
                      <p className="font-medium">${shipment.shippingCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shipping Date</p>
                      <p className="font-medium">{shipment.shippingDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Est. Delivery</p>
                      <p className="font-medium">{shipment.estimatedDeliveryDate}</p>
                    </div>
                    <div className="flex gap-4">
                      {shipment.insurance && (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">Insured</span>
                        </div>
                      )}
                      {shipment.signatureRequired && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Signature Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!shipment && !isLoading && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Enter a tracking number above to view shipment details
            </p>
          )}
        </div>
      </section>
      <FooterSection />
    </>
  );
}

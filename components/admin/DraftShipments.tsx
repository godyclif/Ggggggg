
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShipmentForm } from "./ShipmentForm";
import toast from "react-hot-toast";
import { FileText, Loader2, Trash2, Copy } from "lucide-react";
import { shipmentValidationSchema } from "@/lib/validations/shipment";
import { ZodError } from "zod";

interface Draft {
  _id: string;
  trackingNumber: string;
  senderName?: string;
  recipientName?: string;
  createdAt: string;
  [key: string]: any;
}

interface DraftShipmentsProps {
  onEditShipment?: (trackingNumber: string) => void;
}

export function DraftShipments({ onEditShipment }: DraftShipmentsProps) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderZip: "",
    senderCountry: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "",
    recipientZip: "",
    recipientCountry: "",
    packageType: "box",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    value: "",
    description: "",
    specialInstructions: "",
    serviceType: "standard",
    priority: "normal",
    insurance: false,
    signatureRequired: false,
    shippingDate: "",
    estimatedDeliveryDate: "",
    shippingCost: "",
    latitude: 40.7128,
    longitude: -74.0060,
  });

  const fetchDrafts = async () => {
    try {
      const response = await fetch("/api/drafts");
      const data = await response.json();

      if (response.ok) {
        setDrafts(data.drafts);
      } else {
        toast.error("Failed to fetch drafts");
      }
    } catch (error) {
      toast.error("Error fetching drafts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const loadDraft = (draft: Draft) => {
    setSelectedDraft(draft);
    setFormData({
      senderName: draft.senderName || "",
      senderEmail: draft.senderEmail || "",
      senderPhone: draft.senderPhone || "",
      senderAddress: draft.senderAddress || "",
      senderCity: draft.senderCity || "",
      senderState: draft.senderState || "",
      senderZip: draft.senderZip || "",
      senderCountry: draft.senderCountry || "",
      recipientName: draft.recipientName || "",
      recipientEmail: draft.recipientEmail || "",
      recipientPhone: draft.recipientPhone || "",
      recipientAddress: draft.recipientAddress || "",
      recipientCity: draft.recipientCity || "",
      recipientState: draft.recipientState || "",
      recipientZip: draft.recipientZip || "",
      recipientCountry: draft.recipientCountry || "",
      packageType: draft.packageType || "box",
      weight: draft.weight || "",
      dimensions: {
        length: draft.dimensions?.length || "",
        width: draft.dimensions?.width || "",
        height: draft.dimensions?.height || "",
      },
      value: draft.value || "",
      description: draft.description || "",
      specialInstructions: draft.specialInstructions || "",
      serviceType: draft.serviceType || "standard",
      priority: draft.priority || "normal",
      insurance: draft.insurance || false,
      signatureRequired: draft.signatureRequired || false,
      shippingDate: draft.shippingDate || "",
      estimatedDeliveryDate: draft.estimatedDeliveryDate || "",
      shippingCost: draft.shippingCost || "",
      latitude: draft.latitude || 40.7128,
      longitude: draft.longitude || -74.0060,
    });
  };

  const updateDraft = async () => {
    if (!selectedDraft) return;

    setIsProcessing(true);
    try {
      const response = await fetch(`/api/drafts/${selectedDraft.trackingNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update draft");
      }

      toast.success("Draft updated successfully!");
      await fetchDrafts();
    } catch (err: any) {
      toast.error(err.message || "Failed to update draft");
    } finally {
      setIsProcessing(false);
    }
  };

  const completeDraft = async () => {
    if (!selectedDraft) return;

    setIsProcessing(true);
    try {
      const dataToValidate = {
        ...formData,
        trackingNumber: selectedDraft.trackingNumber,
      };

      try {
        shipmentValidationSchema.parse(dataToValidate);
      } catch (error) {
        if (error instanceof ZodError) {
          const firstError = error.errors[0];
          toast.error(`${firstError.path.join('.')}: ${firstError.message}`);
          setIsProcessing(false);
          return;
        }
      }

      const response = await fetch("/api/shipments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToValidate),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          data.details.forEach((detail: { field: string; message: string }) => {
            toast.error(`${detail.field}: ${detail.message}`);
          });
        } else {
          throw new Error(data.error || "Failed to create shipment");
        }
        setIsProcessing(false);
        return;
      }

      // Delete the draft after successful shipment creation
      await fetch(`/api/drafts/${selectedDraft.trackingNumber}`, {
        method: "DELETE",
      });

      toast.success("Shipment created successfully from draft!");
      setSelectedDraft(null);
      await fetchDrafts();
    } catch (err: any) {
      toast.error(err.message || "Failed to complete draft");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteDraft = async (trackingNumber: string) => {
    if (!confirm("Are you sure you want to delete this draft?")) return;

    try {
      const response = await fetch(`/api/drafts/${trackingNumber}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete draft");
      }

      toast.success("Draft deleted successfully!");
      if (selectedDraft?.trackingNumber === trackingNumber) {
        setSelectedDraft(null);
      }
      await fetchDrafts();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete draft");
    }
  };

  const copyTrackingNumber = () => {
    if (selectedDraft) {
      navigator.clipboard.writeText(selectedDraft.trackingNumber);
      toast.success("Tracking number copied to clipboard!");
    }
  };

  const backToDraftsList = () => {
    setSelectedDraft(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // If a draft is selected, show the full edit interface
  if (selectedDraft) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle>Edit Draft Shipment</CardTitle>
              <CardDescription>
                Complete the form and create the shipment or save your changes
              </CardDescription>
            </div>
            <Button onClick={backToDraftsList} variant="outline">
              Back to Drafts
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm">
              {selectedDraft.trackingNumber}
            </div>
            <Button onClick={copyTrackingNumber} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ShipmentForm formData={formData} setFormData={setFormData} isEditMode={false} />
          <div className="flex gap-3">
            <Button onClick={completeDraft} className="flex-1" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Shipment...
                </>
              ) : (
                "Complete & Create Shipment"
              )}
            </Button>
            <Button onClick={updateDraft} variant="outline" className="flex-1" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save as Draft"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Otherwise, show the drafts list
  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Shipments</CardTitle>
        <CardDescription>
          {drafts.length} draft{drafts.length !== 1 ? "s" : ""} saved
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {drafts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No drafts saved</p>
            </div>
          ) : (
            drafts.map((draft) => (
              <div
                key={draft._id}
                className="p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted"
                onClick={() => loadDraft(draft)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-semibold">
                      {draft.trackingNumber}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {draft.senderName || "No sender"} → {draft.recipientName || "No recipient"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(draft.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDraft(draft.trackingNumber);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

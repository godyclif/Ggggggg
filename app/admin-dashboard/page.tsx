
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateShipment } from "@/components/admin/CreateShipment";
import { EditShipment } from "@/components/admin/EditShipment";
import { AllShipments } from "@/components/admin/AllShipments";
import { Analytics } from "@/components/admin/Analytics";
import { Package, Edit, List, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

function generateTrackingNumber(): string {
  const prefix = "RW";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

type TabType = "create" | "edit" | "all" | "analytics";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("create");

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  const regenerateTracking = () => {
    setTrackingNumber(generateTrackingNumber());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const navItems = [
    { id: "create" as TabType, label: "Create Shipment", icon: Package },
    { id: "edit" as TabType, label: "Edit Shipment", icon: Edit },
    { id: "all" as TabType, label: "All Shipments", icon: List },
    { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-screen border-r bg-card">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
            <p className="text-sm text-muted-foreground mb-6">Shipment Management</p>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "create" && (
              <CreateShipment
                trackingNumber={trackingNumber}
                onRegenerateTracking={regenerateTracking}
              />
            )}
            {activeTab === "edit" && <EditShipment />}
            {activeTab === "all" && <AllShipments />}
            {activeTab === "analytics" && <Analytics />}
          </div>
        </main>
      </div>
    </div>
  );
}

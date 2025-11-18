
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FooterSection } from "@/components/layout/sections/footer";
import { Package } from "lucide-react";

export default function TrackPage() {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Functionality to be implemented later
    alert(t("track.note"));
  };

  return (
    <>
      <section className="container py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Package className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("track.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("track.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder={t("track.placeholder")}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="text-lg h-14"
            />
            <Button type="submit" size="lg" className="w-full">
              {t("track.button")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("track.note")}
          </p>
        </div>
      </section>
      <FooterSection />
    </>
  );
}


"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/sections/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import "../../lib/i18n";

export default function TrackPage() {
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend functionality to be implemented
    alert(`Tracking number submitted: ${trackingNumber}\n\n${t("track.note")}`);
  };

  return (
    <>
      <Navbar />
      <section className="container py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("track.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("track.subtitle")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("track.title")}</CardTitle>
              <CardDescription>{t("track.note")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t("track.placeholder")}
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-lg py-6"
                    required
                  />
                </div>
                <Button type="submit" className="w-full py-6 text-lg">
                  {t("track.button")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {t("track.note")}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

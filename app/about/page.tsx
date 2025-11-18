
"use client";

import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/sections/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "../../lib/i18n";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <section className="container py-24 sm:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title")}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("about.title")}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
              <p>
                {t("about.content")}
              </p>
              <p className="text-muted-foreground">
                With 5 years of experience in the logistics industry, RapidWave Logistics has built a reputation for reliability, speed, and customer satisfaction. We understand that your shipments are important, and we treat them with the care they deserve.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("about.mission")}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>
                {t("about.missionText")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  5 years of proven track record in shipping and logistics
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Global reach with local expertise
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  24/7 customer support
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Competitive pricing without compromising quality
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}


"use client";

import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/sections/footer";
import { Team } from "@/components/layout/sections/team";
import "../../lib/i18n";

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <section className="container py-24 sm:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("team.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("team.subtitle")}
          </p>
        </div>
        <Team />
      </section>
      <Footer />
    </>
  );
}

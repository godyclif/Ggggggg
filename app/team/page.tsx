
"use client";

import { useTranslation } from "react-i18next";
import { TeamSection } from "@/components/layout/sections/team";
import { FooterSection } from "@/components/layout/sections/footer";

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("team.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("team.subtitle")}
          </p>
        </div>
      </section>
      <TeamSection />
      <FooterSection />
    </>
  );
}

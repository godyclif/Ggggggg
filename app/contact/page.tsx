
"use client";

import { useTranslation } from "react-i18next";
import { ContactSection } from "@/components/layout/sections/contact";
import { FooterSection } from "@/components/layout/sections/footer";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>
      <ContactSection />
      <FooterSection />
    </>
  );
}


"use client";

import { useTranslation } from "react-i18next";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { FooterSection } from "@/components/layout/sections/footer";

export default function TestimonialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("testimonials.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>
      </section>
      <TestimonialSection />
      <FooterSection />
    </>
  );
}

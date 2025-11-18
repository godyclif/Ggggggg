"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/sections/hero";
import { Sponsors } from "@/components/layout/sections/sponsors";
import { Services } from "@/components/layout/sections/services";
import { Features } from "@/components/layout/sections/features";
import { Benefits } from "@/components/layout/sections/benefits";
import { Pricing } from "@/components/layout/sections/pricing";
import { FAQ } from "@/components/layout/sections/faq";
import { Footer } from "@/components/layout/sections/footer";
import "../lib/i18n";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <Services />
      <Features />
      <Benefits />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
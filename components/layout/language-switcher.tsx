
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  if (!mounted) {
    return <div className="w-20" />;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      {i18n.language === 'en' ? (
        <>
          <span className="text-lg">🇺🇸</span>
          <span>EN</span>
        </>
      ) : (
        <>
          <span className="text-lg">🇫🇷</span>
          <span>FR</span>
        </>
      )}
    </Button>
  );
}

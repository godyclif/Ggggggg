import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />

              <h3 className="text-2xl">RapidWave Logistics</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{t("footer.contact")}</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Github
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{t("footer.platforms")}</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.ios")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.android")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.web")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{t("footer.help")}</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.contact_us")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.faq")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.feedback")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{t("footer.socials")}</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.twitch")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.discord")}
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                {t("footer.dribbble")}
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2024 {t("footer.designed_developed_by")}
            <Link
              target="_blank"
              href="https://github.com/leoMirandaa"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Leo Miranda
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
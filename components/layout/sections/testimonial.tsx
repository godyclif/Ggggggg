"use client";

import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: {
    en: string;
    fr: string;
  };
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://i.pravatar.cc/150?img=1",
    name: "Sarah Mitchell",
    userName: "@sarahm_imports",
    comment: {
      en: "We've been using RapidWave for 2 years now. Their reliability is unmatched - our shipments always arrive on time. The tracking system keeps us informed every step of the way.",
      fr: "Nous utilisons RapidWave depuis 2 ans maintenant. Leur fiabilité est inégalée - nos envois arrivent toujours à temps. Le système de suivi nous tient informés à chaque étape."
    }
  },
  {
    image: "https://i.pravatar.cc/150?img=12",
    name: "Marcus Chen",
    userName: "@mchen_logistics",
    comment: {
      en: "After testing several logistics companies, RapidWave stands out. Their rates are competitive and the customer service team actually responds quickly. Highly recommend for international shipping.",
      fr: "Après avoir testé plusieurs entreprises de logistique, RapidWave se démarque. Leurs tarifs sont compétitifs et l'équipe du service client répond réellement rapidement. Hautement recommandé pour l'expédition internationale."
    }
  },
  {
    image: "https://i.pravatar.cc/150?img=27",
    name: "Emily Rodriguez",
    userName: "@erod_exports",
    comment: {
      en: "Running an e-commerce business means I need dependable shipping. RapidWave has handled thousands of packages for us without major issues. The online portal makes managing shipments simple.",
      fr: "Gérer une entreprise de commerce électronique signifie que j'ai besoin d'une expédition fiable. RapidWave a géré des milliers de colis pour nous sans problèmes majeurs. Le portail en ligne simplifie la gestion des envois."
    }
  },
  {
    image: "https://i.pravatar.cc/150?img=33",
    name: "David Thompson",
    userName: "@dthompson_trade",
    comment: {
      en: "What impressed me most was how they handled a delayed customs clearance. The team kept me updated and resolved it professionally. That's the kind of service that builds trust.",
      fr: "Ce qui m'a le plus impressionné, c'est la façon dont ils ont géré un dédouanement retardé. L'équipe m'a tenu au courant et l'a résolu professionnellement. C'est le genre de service qui construit la confiance."
    }
  },
  {
    image: "https://i.pravatar.cc/150?img=44",
    name: "Lisa Anderson",
    userName: "@landerson_supply",
    comment: {
      en: "We switched to RapidWave 18 months ago and haven't looked back. Their network coverage is excellent and the pricing is transparent - no hidden fees that surprise you later.",
      fr: "Nous sommes passés à RapidWave il y a 18 mois et nous ne sommes pas revenus en arrière. Leur couverture réseau est excellente et les prix sont transparents - pas de frais cachés qui vous surprennent plus tard."
    }
  },
  {
    image: "https://i.pravatar.cc/150?img=58",
    name: "James Wilson",
    userName: "@jwilson_freight",
    comment: {
      en: "As a small business owner, I appreciate that RapidWave treats us just as well as their large corporate clients. Professional service, reasonable prices, and they actually care about getting it right.",
      fr: "En tant que propriétaire d'une petite entreprise, j'apprécie que RapidWave nous traite aussi bien que leurs grands clients corporatifs. Service professionnel, prix raisonnables, et ils se soucient vraiment de bien faire les choses."
    }
  }
];

export const TestimonialSection = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'fr';

  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear What Our 1000+ Clients Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {review.comment[currentLang]}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
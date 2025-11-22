
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import Image from "next/image";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
  image: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Shield",
    title: "Secure Transportation",
    description:
      "Your cargo is protected with comprehensive insurance coverage and real-time security monitoring throughout the entire journey.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: "Clock",
    title: "On-Time Delivery",
    description:
      "We guarantee 98% on-time delivery rate with precise scheduling and efficient route optimization for your shipments.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: "DollarSign",
    title: "Cost-Effective Solutions",
    description:
      "Competitive pricing without compromising quality. Get transparent quotes with no hidden fees for all your shipping needs.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: "Headphones",
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available around the clock to assist with tracking, updates, and any shipping inquiries.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32 overflow-hidden">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24 gap-12">
        <div className="animate-fade-in-up">
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RapidWave Transport
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience reliable, efficient, and secure logistics solutions designed to meet your business needs with excellence in every delivery.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} className="text-primary" />
              </div>
              <span className="text-lg font-medium">5+ Years of Excellence</span>
            </div>
            <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} className="text-primary" />
              </div>
              <span className="text-lg font-medium">50,000+ Shipments Delivered</span>
            </div>
            <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} className="text-primary" />
              </div>
              <span className="text-lg font-medium">Global Coverage Network</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 w-full">
          {benefitList.map(({ icon, title, description, image }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all duration-300 group/card overflow-hidden border-none shadow-lg hover:shadow-2xl animate-fade-in-up hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon
                      name={icon as keyof typeof icons}
                      size={24}
                      className="text-primary-foreground"
                    />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-6xl text-white/10 font-bold transition-all duration-300 group-hover/card:text-white/20">
                    0{index + 1}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover/card:text-primary transition-colors">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

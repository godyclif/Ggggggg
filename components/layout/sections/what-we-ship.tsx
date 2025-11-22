
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Car, Container, Dog, Home, Box } from "lucide-react";
import Image from "next/image";

interface ShipmentType {
  icon: typeof Package;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const shipmentTypes: ShipmentType[] = [
  {
    icon: Container,
    title: "Freight Containers",
    description: "Full and partial container loads with secure handling",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
    features: ["20ft & 40ft containers", "Climate-controlled options", "Door-to-door delivery"],
  },
  {
    icon: Car,
    title: "Vehicles & Machinery",
    description: "Specialized transport for cars, trucks, and heavy equipment",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    features: ["Enclosed transport", "Roll-on/Roll-off service", "International shipping"],
  },
  {
    icon: Dog,
    title: "Live Animals & Pets",
    description: "Safe and humane transport with veterinary-approved protocols",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    features: ["IATA LAR certified", "Climate-controlled", "24/7 monitoring"],
  },
  {
    icon: Home,
    title: "Household Goods",
    description: "Professional moving services for residential relocations",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80",
    features: ["Packing services", "Furniture protection", "Storage available"],
  },
  {
    icon: Box,
    title: "Commercial Cargo",
    description: "Business-to-business shipping solutions for all industries",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    features: ["Bulk shipping", "Express delivery", "White glove service"],
  },
  {
    icon: Package,
    title: "Perishable Goods",
    description: "Temperature-controlled shipping for food and pharmaceuticals",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
    features: ["Refrigerated transport", "Temperature monitoring", "Fast transit times"],
  },
];

export const WhatWeShipSection = () => {
  return (
    <section id="what-we-ship" className="container py-24 sm:py-32 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary mb-2 tracking-wider uppercase">
          Our Expertise
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          What We Ship
        </h3>
        <p className="md:w-2/3 mx-auto text-lg text-muted-foreground">
          From standard packages to specialized cargo, we have the expertise and equipment to handle it all safely and efficiently.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shipmentTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-primary/90 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription className="text-base">
                  {type.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-lg font-medium mb-2">Have special cargo requirements?</p>
            <p className="text-muted-foreground">
              Our team of logistics specialists can create custom shipping solutions for unique or oversized cargo. Contact us to discuss your specific needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

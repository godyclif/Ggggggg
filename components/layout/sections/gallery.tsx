
"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Camera } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Modern Warehouse Facility",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    title: "Loading Operations",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
  },
  {
    title: "Distribution Center",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  },
  {
    title: "Fleet Management",
    category: "Transport",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  },
  {
    title: "International Shipping",
    category: "Transit",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
  },
  {
    title: "Last Mile Delivery",
    category: "Operations",
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800&q=80",
  },
];

export const GallerySection = () => {
  return (
    <section id="gallery" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Camera className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-lg text-primary mb-2 tracking-wider uppercase">
          Our Facilities
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          See Our Operations in Action
        </h3>
        <p className="md:w-2/3 mx-auto text-lg text-muted-foreground">
          Take a look inside our state-of-the-art warehouses, distribution centers, and fleet operations that power your deliveries.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <Card
            key={index}
            className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs uppercase tracking-wider mb-1 text-primary-foreground/80">
                  {item.category}
                </p>
                <h4 className="text-lg font-semibold">{item.title}</h4>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          With over 50,000 sq ft of warehouse space and a fleet of 100+ vehicles, we&apos;re equipped to handle shipments of any size.
        </p>
      </div>
    </section>
  );
};

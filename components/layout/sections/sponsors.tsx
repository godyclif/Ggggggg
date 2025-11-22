"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";

interface PartnerProps {
  icon: string;
  name: string;
}

const partners: PartnerProps[] = [
  {
    icon: "Ship",
    name: "Maersk",
  },
  {
    icon: "Plane",
    name: "DHL Express",
  },
  {
    icon: "Truck",
    name: "FedEx",
  },
  {
    icon: "Package",
    name: "UPS",
  },
  {
    icon: "TrainFront",
    name: "DB Schenker",
  },
  {
    icon: "Globe",
    name: "Kuehne + Nagel",
  },
  {
    icon: "ShipWheel",
    name: "CMA CGM",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="partners" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6 font-semibold">
        Global Shipping & Logistics Partners
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {partners.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              <Icon
                name={icon as keyof typeof icons}
                size={32}
                color="white"
                className="mr-2"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
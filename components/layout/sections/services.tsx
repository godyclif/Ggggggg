import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Real-Time Shipment Tracking",
    description:
      "Monitor shipments with live GPS, delivery timelines, and instant status updates for full transparency.",
    pro: ProService.NO,
  },
  {
    title: "Smart Fleet Management",
    description:
      "Manage vehicle health, fuel usage, and driver activity in one intuitive dashboard.",
    pro: ProService.NO,
  },
  {
    title: "Route Optimization & Dispatch",
    description:
      "Automatically assign drivers and build efficient routes to reduce delays and operational costs.",
    pro: ProService.NO,
  },
  {
    title: "Advanced Analytics Suite",
    description:
      "Unlock insights into performance, cost efficiency, delivery times, and operational KPIs with powerful reporting.",
    pro: ProService.YES,
  },
  {
    title: "Warehouse & Inventory Sync",
    description:
      "Synchronize stock levels, automate intake logs, and track movement across multiple warehouse locations.",
    pro: ProService.YES,
  },
  {
    title: "Automated Invoice & Billing",
    description:
      "Generate invoices, track payments, and manage expenses effortlessly with built-in financial automation.",
    pro: ProService.YES,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary mb-2 tracking-wider uppercase">
          Services
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Powering Modern Transport & Logistics
        </h3>

        <p className="md:w-2/3 mx-auto text-lg text-muted-foreground">
          Our platform helps logistics companies streamline operations,
          automate workflows, and deliver goods faster and more efficiently.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/50 dark:bg-card h-full relative border-none shadow-sm hover:shadow-md transition"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {title}
              </CardTitle>
              <CardDescription className="text-sm mt-2 leading-relaxed">
                {description}
              </CardDescription>
            </CardHeader>

            <Badge
              data-pro={pro === ProService.YES}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
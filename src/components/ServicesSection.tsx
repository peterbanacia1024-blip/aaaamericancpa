import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import illustAccounting from "@/assets/illust-accounting.png";
import illustTax from "@/assets/illust-tax.png";
import illustAdvisory from "@/assets/illust-advisory.png";
import illustProjections from "@/assets/illust-projections.png";
import illustFormation from "@/assets/illust-formation.png";
import illustPayroll from "@/assets/illust-payroll.png";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const services = [
  { image: illustAccounting, title: "Accounting Services", description: "Comprehensive financial management including business formation, startup accounting, payroll & bookkeeping, and strategic planning." },
  { image: illustTax, title: "Tax Services", description: "Expert tax preparation & planning, IRS audit representation, tax problem resolution, and payroll tax solutions." },
  { image: illustAdvisory, title: "Advisory Services", description: "Strategic guidance including risk advisory, transaction advisory, fraud prevention, R&D credits, and business strategy." },
  { image: illustProjections, title: "Financial Projections", description: "Data-driven financial forecasting and modeling to help you make informed decisions and plan for sustainable growth." },
  { image: illustFormation, title: "Business Formation", description: "End-to-end support for entity selection, incorporation, compliance setup, and business structure consulting." },
  { image: illustPayroll, title: "Payroll & HR", description: "Comprehensive payroll processing, tax withholding, employee benefits administration, and HR compliance services." },
];

const ServicesSection = () => {
  const [rHeader, vHeader] = useScrollReveal();

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div ref={rHeader} className={`text-center mb-16 ${revealClasses(vHeader)}`}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide">
            Our Comprehensive Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Discover our comprehensive portfolio of financial services tailored to your business needs.
          </p>
          <div className="w-16 h-1 bg-sky mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [ref, visible] = useScrollReveal();
  const delays = ["", "delay-100", "delay-200", "", "delay-100", "delay-200"];

  return (
    <div
      ref={ref}
      className={`group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elevated)] hover:-translate-y-2 transition-all duration-500 cursor-pointer ${revealClasses(visible, delays[index])}`}
    >
      <div className="h-48 bg-gradient-to-br from-sky/5 to-navy/5 flex items-center justify-center p-6 overflow-hidden">
        <img src={service.image} alt={service.title} className="h-36 w-auto object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" width={512} height={512} />
      </div>
      <div className="p-7">
        <h3 className="text-lg font-heading font-bold text-foreground mb-3 group-hover:text-sky transition-colors">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>
        <Link to="/services" className="text-sky text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
          Learn more <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServicesSection;

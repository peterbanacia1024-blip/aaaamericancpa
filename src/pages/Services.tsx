import { Calculator, FileText, TrendingUp, BarChart3, Building, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import illustAccounting from "@/assets/illust-accounting.png";
import illustTax from "@/assets/illust-tax.png";
import illustAdvisory from "@/assets/illust-advisory.png";
import illustProjections from "@/assets/illust-projections.png";
import illustFormation from "@/assets/illust-formation.png";
import illustPayroll from "@/assets/illust-payroll.png";

const services = [
  {
    icon: Calculator,
    image: illustAccounting,
    title: "Accounting Services",
    description: "Our accounting services provide end-to-end financial management for businesses at every stage. From bookkeeping and financial reporting to strategic planning, we ensure your books are accurate, compliant, and insightful.",
    items: ["New Business Formation", "Small Business Accounting", "Bookkeeping & Payroll", "Financial Reporting & Analysis", "Business Valuation", "Strategic Financial Planning"],
  },
  {
    icon: FileText,
    image: illustTax,
    title: "Tax Services",
    description: "Navigate the complexities of federal and state tax with our expert team. We minimize your tax liability through strategic planning while ensuring full compliance with all regulatory requirements.",
    items: ["Tax Preparation & Planning", "IRS Audit Representation", "Tax Problem Resolution", "Payroll Tax Solutions", "Back Taxes & Payment Plans", "State & Local Tax Compliance"],
  },
  {
    icon: TrendingUp,
    image: illustAdvisory,
    title: "Advisory Services",
    description: "Our advisory team provides strategic guidance to help you make critical business decisions with confidence. We identify risks, uncover opportunities, and build frameworks for sustainable growth.",
    items: ["Risk Advisory & Management", "Transaction Advisory", "Fraud Prevention & Detection", "R&D Tax Credits", "Business Strategy Consulting", "Share Structure Consulting"],
  },
  {
    icon: BarChart3,
    image: illustProjections,
    title: "Financial Projections",
    description: "Leverage data-driven financial forecasting and modeling to plan your future with precision. Our projections help you secure funding, plan expansion, and make informed investment decisions.",
    items: ["Revenue Forecasting", "Cash Flow Modeling", "Budget Planning", "Scenario Analysis", "Investor-Ready Reports", "Growth Strategy Modeling"],
  },
  {
    icon: Building,
    image: illustFormation,
    title: "Business Formation",
    description: "Starting a new business? We guide you through every step — from choosing the right entity type to setting up compliance infrastructure and obtaining necessary permits and licenses.",
    items: ["Entity Selection (LLC, S-Corp, C-Corp)", "Incorporation & Registration", "EIN & Tax ID Setup", "Compliance Infrastructure", "Operating Agreements", "Business License Assistance"],
  },
  {
    icon: Users,
    image: illustPayroll,
    title: "Payroll & HR Services",
    description: "Streamline your people operations with our comprehensive payroll and HR services. We handle the complexity so you can focus on growing your team and your business.",
    items: ["Payroll Processing & Management", "Tax Withholding & Filing", "Employee Benefits Administration", "HR Compliance & Reporting", "Workers' Compensation", "Contractor Management"],
  },
];

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
            <span className="text-white/80 text-sm font-medium">What We Offer</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Services</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            From day-to-day bookkeeping to complex advisory, we deliver tailored financial solutions that drive business growth and ensure compliance.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center">
                      <service.icon className="text-navy" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-sky shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-sky transition-all group"
                  >
                    Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className={`bg-gradient-to-br from-sky/5 to-navy/5 rounded-2xl p-10 flex items-center justify-center ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-64 w-auto object-contain"
                    loading="lazy"
                    width={512}
                    height={512}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Services;

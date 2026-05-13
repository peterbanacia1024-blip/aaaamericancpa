import { Calculator, FileText, TrendingUp, Award, Briefcase, Users, Heart, CheckCircle, Target, Eye } from "lucide-react";
import founderImg from "@/assets/founder.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

// const industries = [
//   "Information Technology", "Blockchain & Crypto", "Life Sciences & Biotech", "Clean Energy",
//   "Construction & Real Estate", "Retail & Consumer Goods", "E-Commerce", "Education",
//   "Financial Services", "Entertainment & Media", "Healthcare", "Manufacturing",
// ];

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Briefcase, value: "350+", label: "Projects Completed" },
  { icon: Users, value: "80+", label: "Skilled Professionals" },
  { icon: Heart, value: "600+", label: "Happy Clients" },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower businesses with precise financial management and strategic insights that drive sustainable growth and profitability." },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted financial partner for mid-to-high-end businesses, delivering exceptional value through innovation and expertise." },
];

const About = () => {
  const [r1, v1] = useScrollReveal();
  const [r2, v2] = useScrollReveal();
  const [r3, v3] = useScrollReveal();
  const [r4, v4] = useScrollReveal();
  const [r5, v5] = useScrollReveal();
  const [r6, v6] = useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Our Story</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">About Us</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Learn about our story, mission, and the dedicated team behind your financial success.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div ref={r1} className={`max-w-3xl mx-auto text-center mb-16 ${revealClasses(v1)}`}>
            <span className="text-sky font-semibold text-sm uppercase tracking-widest mb-3 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-6">AAA American CPA, INC.</h2>
            <div className="w-16 h-1 bg-sky mx-auto mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with a commitment to excellence, AAA American CPA, INC. has grown to become one of the most trusted financial services firms in the Greater Los Angeles and San Francisco Bay Area.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We understand that every business is unique. That's why we take the time to understand your specific challenges, goals, and industry dynamics before crafting tailored solutions.
            </p>
          </div>

          {/* Mission & Vision */}
          <div ref={r2} className={`grid md:grid-cols-2 gap-8 mb-16 ${revealClasses(v2, "delay-100")}`}>
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center mb-5 group-hover:bg-sky group-hover:shadow-lg transition-all">
                  <v.icon className="text-navy group-hover:text-white transition-colors" size={26} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Industries */}
          {/* <div ref={r3} className={revealClasses(v3, "delay-100")}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Industries We Serve</h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">We bring specialized expertise across a wide range of industries.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {industries.map((ind) => (
                <span key={ind} className="px-5 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-medium hover:bg-sky/10 hover:border-sky/30 hover:text-sky transition-all cursor-default">
                  {ind}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 md:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-sky/5 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div ref={r4} className={`grid lg:grid-cols-2 gap-16 items-center ${revealClasses(v4)}`}>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-sky/10 blur-2xl" />
                <img src={founderImg} alt="Hongjian (Nick) Li" className="relative w-80 h-80 object-cover rounded-3xl shadow-2xl ring-4 ring-white/10" loading="lazy" width={800} height={1024} />
              </div>
            </div>
            <div>
              <span className="text-sky font-semibold text-sm uppercase tracking-widest mb-3 block">Meet Our Founder</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-2">Hongjian (Nick) Li, CPA</h2>
              <p className="text-sky font-medium mb-6">Founder and Chief Executive Officer</p>
              <p className="text-white/75 leading-relaxed mb-4">With extensive experience in accounting and finance, Hongjian (Nick) Li founded AAA American CPA with a clear vision: to provide businesses with the same caliber of financial services typically reserved for Fortune 500 companies.</p>
              <p className="text-white/75 leading-relaxed">Under his leadership, AAA American CPA has grown to serve over 600 clients across multiple states and internationally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div ref={r5} className={`text-center mb-14 ${revealClasses(v5)}`}>
            <span className="text-sky font-semibold text-sm uppercase tracking-widest mb-3 block">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">Comprehensive Solutions</h2>
            <div className="w-16 h-1 bg-sky mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calculator, title: "Accounting", items: ["New Business Formation", "Small Business Accounting", "Bookkeeping & Payroll", "Financial Reporting", "Business Incorporation", "Consulting"] },
              { icon: FileText, title: "Tax", items: ["Tax Preparation & Planning", "IRS Representation", "Financial Statement Audits", "State & Local Tax Audits", "Sales & Use Tax Compliance", "Get Your IRS File"] },
              { icon: TrendingUp, title: "Advisory", items: ["Business Strategy", "Risk Advisory", "Internal Controls", "Financial Projections", "Mergers & Acquisitions", "Share Structure Consulting"] },
            ].map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4 group-hover:bg-sky group-hover:shadow-lg transition-all">
                  <s.icon className="text-navy group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">{s.title} Services</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckCircle size={16} className="text-sky shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div ref={r6} className={revealClasses(v6)}>
            <div className="text-center mb-14">
              <span className="text-sky font-semibold text-sm uppercase tracking-widest mb-3 block">By The Numbers</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">Proven Track Record</h2>
              <div className="w-16 h-1 bg-sky mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group">
                  <stat.icon className="text-sky mx-auto mb-3 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-4xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

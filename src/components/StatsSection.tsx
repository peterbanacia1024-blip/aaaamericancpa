import { Award, Briefcase, Users, Heart, CheckCircle, Star, Shield, Zap } from "lucide-react";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Briefcase, value: "350+", label: "Projects Completed" },
  { icon: Users, value: "80+", label: "Skilled Professionals" },
  { icon: Heart, value: "600+", label: "Happy Clients" },
];

const reasons = [
  { icon: Star, title: "Proven Expertise", desc: "Over 15 years of industry-leading accounting and financial experience serving diverse businesses." },
  { icon: Shield, title: "Personalized Solutions", desc: "Every strategy is custom-tailored to your unique business needs, goals, and industry requirements." },
  { icon: CheckCircle, title: "Track Record of Success", desc: "Hundreds of satisfied clients across diverse industries and markets trust us with their finances." },
  { icon: Zap, title: "Full-Service Capabilities", desc: "Accounting, tax, advisory, and insurance — comprehensive solutions all under one roof." },
];

const StatsSection = () => {
  const [rHeader, vHeader] = useScrollReveal();
  const [rStats, vStats] = useScrollReveal();
  const [rReasons, vReasons] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div ref={rHeader} className={`text-center mb-16 ${revealClasses(vHeader)}`}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide">Why Choose Us</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">We combine deep expertise with personalized service to deliver results that matter.</p>
          <div className="w-16 h-1 bg-sky mx-auto mt-4" />
        </div>

        <div ref={rStats} className={`bg-navy rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 mb-16 overflow-hidden ${revealClasses(vStats)}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 px-6 text-center group hover:bg-white/5 transition-colors">
              <stat.icon size={28} className="text-sky mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-heading font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={rReasons} className={`grid md:grid-cols-2 gap-6 ${revealClasses(vReasons, "delay-100")}`}>
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-card border border-border rounded-2xl p-7 flex items-start gap-5 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-navy/10 flex items-center justify-center shrink-0 group-hover:bg-sky group-hover:shadow-lg transition-all duration-300">
                <reason.icon className="text-navy group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

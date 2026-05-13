import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const highlights = [
  "Trusted by 600+ clients across diverse industries",
  "Serving Greater LA & San Francisco Bay Area",
  "Comprehensive accounting, tax & advisory solutions",
  "Specialized support for startups to global enterprises",
];

const AboutSection = () => {
  const [r1, v1] = useScrollReveal();
  const [r2, v2] = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={r1} className={revealClasses(v1)}>
            <span className="text-sky font-semibold text-sm uppercase tracking-widest mb-3 block">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Trusted Financial Partner for Growing Businesses
            </h2>
            <div className="w-16 h-1 bg-sky mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              AAA American CPA is a trusted firm serving mid-to-high-end clients across Greater Los Angeles and the San Francisco Bay Area. We provide expert accounting, tax, and advisory services designed to help businesses grow with confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We support startups, small businesses, and global enterprises across industries including technology, blockchain, life sciences, construction, retail, and e-commerce.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-sky shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sky font-semibold hover:gap-3 transition-all group"
            >
              Learn more about us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div ref={r2} className={revealClasses(v2, "delay-200")}>
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-[var(--shadow-elevated)] hover:shadow-[0_20px_60px_-12px_hsl(220_50%_11%/0.2)] transition-all duration-500">
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-full bg-sky/10 blur-xl" />
                <img
                  src={founderImg}
                  alt="Hongjian (Nick) Li - Founder & CEO"
                  className="relative w-44 h-44 rounded-full object-cover shadow-lg ring-4 ring-sky/20"
                  loading="lazy"
                  width={800}
                  height={1024}
                />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">Hongjian (Nick) Li</h3>
              <p className="text-sky font-medium text-sm mb-4">Founder & CEO</p>
              <blockquote className="text-muted-foreground italic leading-relaxed">
                "Let us help you achieve your business goals with clarity, compliance, and confidence."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

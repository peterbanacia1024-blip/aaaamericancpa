import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, Handshake } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const valueCards = [
  { icon: Shield, title: "Trust", desc: "We build lasting relationships through integrity and transparent financial guidance." },
  { icon: Star, title: "Credibility", desc: "A reputation earned through consistent excellence and professional standards." },
  { icon: Handshake, title: "Ethics", desc: "Upholding the highest ethical standards in every engagement and transaction." },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero area */}
      <div className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Modern city skyline" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-navy/80" />
        </div>

        <div className="relative container mx-auto px-4 py-32 md:py-40">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Achieve Business Excellence with{" "}
              <span className="text-sky">Proven Accounting</span> & Financial Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-10 max-w-xl leading-relaxed">
              Unlock your company's full potential with expert accounting, tax, and advisory services tailored for growth and long-term success.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group px-8 py-3.5 rounded-lg bg-sky text-white font-semibold hover:bg-sky-light transition-all shadow-lg flex items-center gap-2"
              >
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#about"
                className="px-8 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping value cards */}
      <div className="relative -mt-24 z-10 container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-0">
          {valueCards.map((card, i) => (
            <div
              key={card.title}
              className={`p-10 text-center transition-all duration-300 hover:-translate-y-1 ${
                i === 1
                  ? "bg-navy text-white"
                  : "bg-white text-foreground shadow-lg"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                i === 1 ? "bg-sky/20" : "bg-navy/10"
              }`}>
                <card.icon size={28} className={i === 1 ? "text-sky" : "text-navy"} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 uppercase tracking-wide">{card.title}</h3>
              <p className={`text-sm leading-relaxed ${i === 1 ? "text-white/70" : "text-muted-foreground"}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

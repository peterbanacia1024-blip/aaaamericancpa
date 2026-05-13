import { Quote, Star } from "lucide-react";
import avatarKevin from "@/assets/avatar-kevin.jpg";
import avatarJames from "@/assets/avatar-james.jpg";
import avatarAdam from "@/assets/avatar-adam.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const testimonials = [
  { name: "Kevin W.", role: "Business Owner, LA", avatar: avatarKevin, text: "It has been 3 years since we had a business development company in LA. We needed a professional CPA to help with those financial aspects. AAA American CPA is our right choice. With their professional expertise, our company is moving forward in terms of tax and quality reports. Thanks for the great job!", rating: 5 },
  { name: "James Y.", role: "Entrepreneur", avatar: avatarJames, text: "Nick was very insightful and knowledgeable with the tax-saving advice he gave us when setting up operations and took the time to show us various different investment accounts and every portion of accounting to ensure we set up the best business structure.", rating: 5 },
  { name: "Adam W.", role: "Startup Founder", avatar: avatarAdam, text: "Nick thoughtfully answered all of my questions and gave me great financial advice. Nick helped us set up a strong tax plan so we could keep our business on track while avoiding unnecessary taxes. The business structure advice he gave was spot-on, and our future success looks very bright now.", rating: 5 },
];

const TestimonialsSection = () => {
  const [rHeader, vHeader] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div ref={rHeader} className={`text-center mb-14 ${revealClasses(vHeader)}`}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-wide">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Hear from businesses who trust us with their financial success.</p>
          <div className="w-16 h-1 bg-sky mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => {
  const [ref, visible] = useScrollReveal();
  const delays = ["", "delay-100", "delay-200"];

  return (
    <div ref={ref} className={`bg-card border border-border rounded-2xl p-8 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-2 transition-all duration-500 group relative ${revealClasses(visible, delays[index])}`}>
      <Quote className="text-sky/15 absolute top-6 right-6" size={40} />
      <div className="flex gap-1 mb-5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={16} className="text-gold fill-gold" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[120px]">"{t.text}"</p>
      <div className="flex items-center gap-4 pt-5 border-t border-border">
        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-sky/20" loading="lazy" width={512} height={512} />
        <div>
          <div className="font-heading font-bold text-foreground">{t.name}</div>
          <div className="text-sky text-sm">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

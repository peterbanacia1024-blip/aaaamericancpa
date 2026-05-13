import { MapPin, Phone, Mail, MessageCircle, Globe, ExternalLink } from "lucide-react";
import officesBg from "@/assets/offices-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const offices = [
  
  {
    name: "Monterey Park Office",
    address: "108 N Ynex Ave #202 Monterey Park, CA 91754",
    phone: "+1(626) 741-1750",
    email: "info@aaaamericancpa.com",
    wechat: "nongkencity",
    region: "California",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=108+N+Ynex+Ave+#202+Monterey+Park+CA+91754",
  },
  {
    name: "San Jose Office",
    address: "4100 MOORPARK AVE STE 227 SAN JOSE, CA 95117",
    phone: "+1(626) 741-1750",
    email: "info@aaaamericancpa.com",
    wechat: "nongkencity",
    region: "California",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=4100+Moorpark+Ave+Ste+227+San+Jose+CA+95117",
  },
];

const Offices = () => {
  const [r1, v1] = useScrollReveal();
  const [r2, v2] = useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={officesBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Globe size={14} className="text-sky" />
            <span className="text-white/80 text-sm font-medium">Global Presence</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Offices</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            With offices across the United States and China, we provide accounting, tax, advisory, and insurance services wherever you need us.
          </p>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 bg-muted">
        <div ref={r1} className={`container mx-auto px-4 text-center max-w-3xl ${revealClasses(v1)}`}>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Conveniently Located to Serve You</h2>
          <p className="text-muted-foreground leading-relaxed">
            AAA American CPA maintains a strategic presence across key business hubs in California, Nevada, and internationally in Shenzhen, China.
          </p>
        </div>
      </section>

      {/* Office Cards */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div ref={r2} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${revealClasses(v2, "delay-100")}`}>
            {offices.map((office) => (
              <div
                key={office.name}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="px-3 py-1 rounded-full bg-sky/10 text-sky text-xs font-semibold">{office.region}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-5 group-hover:text-sky transition-colors">{office.name}</h3>
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin size={18} className="text-sky shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={18} className="text-sky shrink-0" />
                    <a href={`tel:${office.phone}`} className="hover:text-sky transition-colors">{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={18} className="text-sky shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-sky transition-colors">{office.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MessageCircle size={18} className="text-sky shrink-0" />
                    <span>WeChat: {office.wechat}</span>
                  </div>
                </div>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-sky transition-all w-full justify-center"
                >
                  <MapPin size={16} /> View on Google Maps <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Offices;

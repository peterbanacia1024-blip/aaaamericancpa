import { Link } from "react-router-dom";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer>
      {/* CTA Banner */}
      <div className="bg-navy py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            File Your Federal and State Taxes Online
          </h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">Get started with our simple, guided process for tax filing.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-sky text-white font-semibold hover:bg-sky-light transition-all group"
          >
            Start Your Return Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Footer content */}
      <div className="bg-navy-light">
        <div className="container mx-auto py-14 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <img src={logo} alt="AAA American CPA" className="h-12 mb-4" />
              <p className="text-white/60 text-sm leading-relaxed">
                Expert accounting, tax, and advisory services for businesses at every stage of development.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-4 uppercase text-sm tracking-wide">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Shows", path: "/shows" },
                  { label: "Offices", path: "/offices" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-sm text-white/60 hover:text-sky transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-4 uppercase text-sm tracking-wide">Contact Info</h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a href="mailto:info@aaaamericancpa.com" className="flex items-center gap-2 hover:text-sky transition-colors">
                  <Mail size={14} /> info@aaaamericancpa.com
                </a>
                <a href="tel:+16267411750" className="flex items-center gap-2 hover:text-sky transition-colors">
                  <Phone size={14} /> +1 (626) 741-1750
                </a>
                <span className="flex items-center gap-2">
                  <Clock size={14} /> Mon-Fri: 9am - 6pm
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-4 uppercase text-sm tracking-wide">Legal</h4>
              <div className="flex flex-col gap-2.5 text-sm text-white/60">
                <Link to="/privacy" className="hover:text-sky transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-sky transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
            © {new Date().getFullYear()} AAA American CPA, INC. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

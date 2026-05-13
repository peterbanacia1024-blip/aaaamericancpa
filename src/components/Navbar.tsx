import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Shows", path: "/shows" },
  { label: "Offices", path: "/offices" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar */}
      <div className="bg-navy text-white/80 text-xs hidden md:block">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-6">
            <a href="tel:+16267411750" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} /> +1 (626) 741-1750
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} /> Mon - Fri: 9:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="AAA American CPA" className="h-10 md:h-12" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 uppercase tracking-wide group ${
                  location.pathname === link.path
                    ? "text-sky bg-sky/10"
                    : "text-foreground/80 hover:text-sky hover:bg-sky/5"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-sky transition-all duration-300 ${
                  location.pathname === link.path ? "w-6" : "w-0 group-hover:w-6"
                }`} />
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-sky hover:shadow-lg transition-all duration-300 uppercase tracking-wide"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border animate-fade-in">
            <div className="container mx-auto py-4 flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 px-4 text-sm font-medium transition-all rounded-lg uppercase tracking-wide ${
                    location.pathname === link.path
                      ? "text-sky bg-sky/10"
                      : "text-foreground/80 hover:text-sky hover:bg-sky/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 px-5 py-3 rounded-lg bg-navy text-white text-center text-sm font-semibold uppercase hover:bg-sky transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

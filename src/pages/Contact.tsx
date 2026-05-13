import { useState } from "react";
import { CheckCircle, Send, User, Mail, Phone, Building2, Globe, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const industries = [
  "Technology", "Healthcare", "Construction", "Retail", "E-Commerce",
  "Real Estate", "Financial Services", "Entertainment", "Education", "Other",
];

const serviceOptions = [
  "Tax Preparation", "Bookkeeping", "Payroll Services", "Business Consulting",
  "Financial Planning", "Audit Services", "Insurance",
];

const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    companyName: "", industry: "", website: "",
    services: [] as string[],
    message: "", contactMethod: "email", agreed: false,
  });
  const [rForm, vForm] = useScrollReveal();

  const handleServiceToggle = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.agreed) {
      toast({ title: "Please fill in all required fields and accept the terms.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-navy/85" />
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">Contact Us</h1>
          </div>
        </section>
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto max-w-xl text-center">
            <div className="bg-card border border-border rounded-2xl p-12 shadow-[var(--shadow-card)]">
              <CheckCircle className="text-sky mx-auto mb-6" size={64} />
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Thank You!</h2>
              <p className="text-muted-foreground text-lg">Your inquiry has been submitted. We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Send size={14} className="text-sky" />
            <span className="text-white/80 text-sm font-medium">Get In Touch</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Let us help you find the right accounting solutions. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div ref={rForm} className={revealClasses(vForm)}>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Client Inquiry Form</h2>
              <p className="text-muted-foreground text-sm mb-8">Fill out the details below and our team will reach out to you shortly.</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">First Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="John" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Doe" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="email" placeholder="john@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Business Information</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Acme Inc." value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Industry</label>
                  <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all">
                    <option value="">Select your industry</option>
                    {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Business Website</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="url" placeholder="https://www.yourwebsite.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Services of Interest</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {serviceOptions.map((service) => (
                  <label key={service} className={`flex items-center gap-2 text-sm cursor-pointer px-4 py-2.5 rounded-lg border transition-all ${
                    form.services.includes(service) ? "bg-sky/10 border-sky text-sky font-medium" : "border-border text-foreground hover:border-sky/30"
                  }`}>
                    <input type="checkbox" checked={form.services.includes(service)} onChange={() => handleServiceToggle(service)} className="sr-only" />
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${form.services.includes(service) ? "bg-sky border-sky" : "border-border"}`}>
                      {form.services.includes(service) && <span className="w-2 h-2 rounded-sm bg-white" />}
                    </span>
                    {service}
                  </label>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-1.5">Your Message</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder="Tell us about your business needs and how we can help..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky transition-all resize-none" />
                </div>
              </div>

              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Preferred Contact Method</h3>
              <div className="flex gap-4 mb-8">
                {["email", "phone", "either"].map((method) => (
                  <label key={method} className={`flex items-center gap-2 text-sm cursor-pointer capitalize px-5 py-2.5 rounded-lg border transition-all ${
                    form.contactMethod === method ? "bg-sky/10 border-sky text-sky font-medium" : "border-border text-foreground"
                  }`}>
                    <input type="radio" name="contactMethod" value={method} checked={form.contactMethod === method}
                      onChange={(e) => setForm({ ...form, contactMethod: e.target.value })} className="sr-only" />
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.contactMethod === method ? "border-sky" : "border-border"}`}>
                      {form.contactMethod === method && <span className="w-2 h-2 rounded-full bg-sky" />}
                    </span>
                    {method}
                  </label>
                ))}
              </div>

              <label className="flex items-start gap-3 mb-8 cursor-pointer">
                <input type="checkbox" checked={form.agreed} onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                  className="mt-1 rounded border-border text-sky focus:ring-sky" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  By checking this box, you agree to receive text messages from AAA American CPA related to our services at the phone number provided. You may reply STOP to opt-out at any time. Reply HELP for assistance. Message and data rates may apply.
                </span>
              </label>

              <button type="submit" className="w-full py-3.5 rounded-lg bg-navy text-white font-semibold hover:bg-sky transition-all text-lg flex items-center justify-center gap-2 shadow-lg">
                <Send size={18} /> Submit Inquiry
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4">🔒 Your information is secure and encrypted.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

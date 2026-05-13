import { FileText, Mail, Phone, MessageSquare, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const Terms = () => {
  const [r1, v1] = useScrollReveal();
  const [r2, v2] = useScrollReveal();
  const [r3, v3] = useScrollReveal();
  const [r4, v4] = useScrollReveal();
  const [r5, v5] = useScrollReveal();

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
            <FileText size={14} className="text-sky" />
            <span className="text-white/80 text-sm font-medium">Legal</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Last Updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Section 1 */}
          <div ref={r1} className={revealClasses(v1)}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">1</span>
              SMS Consent Communication
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">The information (Phone Numbers) obtained as part of the SMS consent process will not be shared with third parties for marketing purposes.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div ref={r2} className={revealClasses(v2, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">2</span>
              Types of SMS Communications
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-4 text-sm">If you have consented to receive text messages from AAA American CPA, you may receive messages related to the following services:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {["Accounting", "Tax Preparation", "Bookkeeping", "Payroll", "Business Consulting", "Financial Planning", "Audit Services", "Insurance Services"].map((s) => (
                  <span key={s} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="text-sky">•</span>{s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sections 3-5 */}
          <div ref={r3} className={revealClasses(v3, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">3</span>
              User Responsibilities
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-3 text-sm">You agree to:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Provide accurate and complete information</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Not submit false or misleading information</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Not use this form for any unlawful purpose</li>
              </ul>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">4</span>
              Message Frequency
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">Our SMS message frequency is estimated to be 50 to 100 text messages daily across all users.</p>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">5</span>
              Potential Fees for SMS Messaging
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm mb-5">Standard message and data rates may apply, depending on your carrier's pricing plan. These fees may vary if messages are sent domestically or internationally.</p>
              <h4 className="font-semibold text-foreground mb-3">Message Types</h4>
              <p className="text-muted-foreground text-sm mb-3">Users may also expect to receive the following types of messages:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {[
                  ["Service Updates", "Notifications about service changes or improvements"],
                  ["Billing and Payment Notices", "Invoices, payment confirmations, or overdue notices"],
                  ["Legal and Regulatory Notices", "Updates on compliance or regulatory requirements"],
                  ["Privacy Policy Updates", "Changes in how personal data is handled"],
                  ["Security Alerts", "Notifications related to account security"],
                  ["Marketing and Promotional Offers", "Special offers or additional services"],
                  ["Client Satisfaction Surveys", "Requests for service feedback"],
                  ["Emergency or Service Disruptions", "System outages or maintenance notices"],
                  ["Tax Filing Reminders", "Important tax deadlines and reminders"],
                  ["Service Termination Notices", "Notices regarding service discontinuation"],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-2">
                    <span className="text-sky mt-1 font-bold">•</span>
                    <span><strong className="text-foreground">{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sections 6-7 */}
          <div ref={r4} className={revealClasses(v4, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">6</span>
              Opt-In Method
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">You may opt-in to receive SMS messages from AAA American CPA by submitting an online form.</p>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">7</span>
              SMS Communication Consent
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm mb-4">By opting into SMS from a web form or other medium, you agree to receive SMS messages from AAA American CPA. This includes:</p>
              <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>SMS messages for conversations (external)</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Messaging frequency may vary</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Message and data rates may apply</li>
              </ul>
              <p className="text-muted-foreground text-sm">You may opt out at any time by replying <strong className="text-foreground">STOP</strong> to any SMS message or by contacting us directly.</p>
            </div>
          </div>

          {/* Sections 8-9 + Contact */}
          <div ref={r5} className={revealClasses(v5, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">8</span>
              Help
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm mb-5">If you experience issues, reply with <strong className="text-foreground">HELP</strong> or contact us:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="mailto:info@aaaamericancpa.com" className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-sky/10 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center group-hover:bg-sky transition-colors">
                    <Mail size={18} className="text-sky group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-foreground">info@aaaamericancpa.com</span>
                </a>
                <a href="tel:+16827417500" className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-sky/10 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center group-hover:bg-sky transition-colors">
                    <Phone size={18} className="text-sky group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-foreground">+1 (626) 741-1750</span>
                </a>
                <a href="sms:+16824240004" className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-sky/10 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center group-hover:bg-sky transition-colors">
                    <MessageSquare size={18} className="text-sky group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-foreground">+1 (626) 741-1750</span>
                </a>
                <a href="https://aaaamericancpa.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-sky/10 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center group-hover:bg-sky transition-colors">
                    <Globe size={18} className="text-sky group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-foreground">aaaamericancpa.com</span>
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">9</span>
              Standard Messaging Disclosures
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8">
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Message and data rates may apply</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>You can opt out at any time by texting <strong className="text-foreground">"STOP"</strong></li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>For assistance, text <strong className="text-foreground">HELP</strong> or visit our Privacy Policy and Terms & Conditions pages</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Message frequency may vary</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;

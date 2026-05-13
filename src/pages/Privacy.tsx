import { Shield, Mail, Phone, MessageSquare, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const Privacy = () => {
  const [r1, v1] = useScrollReveal();
  const [r2, v2] = useScrollReveal();
  const [r3, v3] = useScrollReveal();
  const [r4, v4] = useScrollReveal();
  const [r5, v5] = useScrollReveal();
  const [r6, v6] = useScrollReveal();
  const [r7, v7] = useScrollReveal();

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
            <Shield size={14} className="text-sky" />
            <span className="text-white/80 text-sm font-medium">Your Privacy Matters</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Intro */}
          <div ref={r1} className={revealClasses(v1)}>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-10">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">AAA American CPA</strong> ("we," "our," or "us") is committed to protecting the privacy and confidentiality of our clients' personal and financial information. This Privacy Policy explains how we collect, use, disclose, and safeguard information obtained in the course of providing accounting, tax, bookkeeping, consulting, and related professional services.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div ref={r2} className={revealClasses(v2, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">1</span>
              Information We Collect
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-5">We may collect the following types of information:</p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Name, address, email address, phone number, and date of birth</li>
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Government-issued identification, including Social Security Number (SSN), Individual Taxpayer Identification Number (ITIN), or state-issued Driver's License</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Financial and Tax Information</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Income details such as W-2s, 1099s, K-1s, and business income records</li>
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Bank account and payment information</li>
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Investment, retirement, and asset information</li>
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Tax returns and supporting documentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Business Information</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Business name, Employer Identification Number (EIN), and entity structure</li>
                    <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Accounting records and financial statements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div ref={r3} className={revealClasses(v3, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">2</span>
              How We Use Information
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-4">We use collected information to:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Provide accounting, tax preparation, bookkeeping, payroll, consulting, and advisory services</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Prepare and file federal, state, and local tax returns and related forms</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Communicate with clients regarding services, deadlines, and compliance matters</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Respond to inquiries from tax authorities with proper authorization</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Improve our services, internal processes, and client experience</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Comply with legal, regulatory, or professional obligations</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div ref={r4} className={revealClasses(v4, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">3</span>
              Whom Personal Information is Shared With
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-4">
                SMS opt-in or phone numbers for the purposes of SMS are not being shared with any third party and affiliate company for marketing purposes. We do not sell client information and may share information only in the following circumstances:
              </p>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1 font-bold">•</span><span><strong className="text-foreground">With Client Authorization:</strong> When you authorize us, such as through Form 2148 (Power of Attorney) or written consent</span></li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1 font-bold">•</span><span><strong className="text-foreground">With Service Providers:</strong> Trusted third parties who assist us in operations (e.g., tax software providers, secure payment processors), subject to confidentiality obligations</span></li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1 font-bold">•</span><span><strong className="text-foreground">With Government Authorities:</strong> When required to comply with tax laws, regulations, court orders, or lawful requests</span></li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1 font-bold">•</span><span><strong className="text-foreground">For Professional Purposes:</strong> With legal counsel, insurers, or auditors as required for compliance or risk management</span></li>
              </ul>
            </div>
          </div>

          {/* Sections 4-8 */}
          <div ref={r5} className={revealClasses(v5, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">4</span>
              Data Security
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground mb-4">We maintain reasonable administrative, technical, and physical safeguards to protect personal and financial information, including:</p>
              <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Secure client portals and encrypted file transmission</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Access controls and confidentiality policies for staff</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Secure storage of electronic and physical records</li>
              </ul>
              <p className="text-muted-foreground text-sm">Despite these measures, no data transmission or storage system can be guaranteed 100% secure. Clients are encouraged to use secure methods when sharing sensitive information.</p>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">5</span>
              Client Responsibilities
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Providing accurate and complete information</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Using secure communication methods recommended by us</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Protecting their own login credentials and portal access</li>
              </ul>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">6</span>
              Record Retention
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">We retain client records in accordance with professional standards, legal requirements, and internal retention policies. Records may be destroyed after the applicable retention period unless otherwise required by law or requested by the client.</p>
            </div>
          </div>

          {/* Sections 7-9 */}
          <div ref={r6} className={revealClasses(v6, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">7</span>
              Third-Party Links
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">Our website or communications may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Clients should review the privacy policies of any third-party websites they visit.</p>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">8</span>
              Messaging & Communication
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Messaging frequency may vary</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>Message and data rates may apply</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>To opt out at any time, text STOP</li>
                <li className="flex items-start gap-2"><span className="text-sky mt-1">•</span>For assistance, text HELP or visit our website at aaaamericancpa.com</li>
              </ul>
            </div>

            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">9</span>
              Changes to This Privacy Policy
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 mb-10">
              <p className="text-muted-foreground text-sm">We may update this Privacy Policy from time to time to reflect changes in laws, regulations, or business practices. Updates will be posted on our website with a revised effective date.</p>
            </div>
          </div>

          {/* Section 10 - Contact */}
          <div ref={r7} className={revealClasses(v7, "delay-100")}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-sm font-bold">10</span>
              Contact Information
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-muted-foreground mb-6">If you have questions about this Privacy Policy or how we handle your information, please contact:</p>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;

import { useState } from "react";
import { Play, X, Tv } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal, revealClasses } from "@/hooks/useScrollReveal";

const allVideos = [
  { id: "z-4QTR2a5Dk", title: "Tax Planning Strategies for Small Businesses", desc: "Learn essential tax-saving strategies to maximize your business deductions." },
  { id: "BP0BrcLu69o", title: "Understanding Business Formation", desc: "A comprehensive guide to choosing the right business entity type." },
  { id: "nSPeEEXKuG8", title: "Payroll Management Best Practices", desc: "Tips for efficient payroll processing and compliance." },
  { id: "lur139ZdQpo", title: "IRS Audit Preparation Guide", desc: "How to prepare and protect your business during an IRS audit." },
  { id: "5ivDyrjEUvU", title: "Financial Reporting Essentials", desc: "Key financial reports every business owner should understand." },
  { id: "8qgCmOMdYwk", title: "R&D Tax Credit Overview", desc: "Discover if your business qualifies for valuable R&D tax credits." },
  { id: "qlh_W_rxPaM", title: "Bookkeeping for Startups", desc: "Essential bookkeeping practices for new businesses." },
  { id: "zva2SQCJyMQ", title: "Year-End Tax Planning", desc: "Strategies to minimize your tax burden before year-end." },
  { id: "ViZambiXzsw", title: "Business Valuation Methods", desc: "Understanding how to determine your company's true value." },
  { id: "Qt9t3K0CvUo", title: "Cash Flow Management Tips", desc: "Maintaining healthy cash flow for business sustainability." },
  { id: "Q_H6SXFEdsg", title: "International Tax Compliance", desc: "Navigating cross-border tax obligations and regulations." },
  { id: "aUIR2zQac5M", title: "Retirement Planning for Entrepreneurs", desc: "Building a secure retirement while running your business." },
  { id: "5pykyzgD8wI", title: "State & Local Tax Updates", desc: "Latest changes in state and local tax regulations you need to know." },
  { id: "DdkOu1SrTt8", title: "Employee Benefits Administration", desc: "Setting up competitive benefits packages for your team." },
  { id: "RbjK16CdK3s", title: "Fraud Prevention Strategies", desc: "Protecting your business from financial fraud and theft." },
  { id: "iypTrCJK_ko", title: "Cryptocurrency Tax Guide", desc: "How to properly report and pay taxes on crypto transactions." },
  { id: "QGgeJybxWGY", title: "Business Insurance Essentials", desc: "Understanding the insurance coverage your business needs." },
  { id: "d8-0PLgMpdA", title: "Mergers & Acquisitions Advisory", desc: "Financial guidance for buying or selling a business." },
  { id: "RRFu1oZPoxI", title: "QuickBooks Setup & Training", desc: "Getting started with QuickBooks for your business." },
  { id: "jKZ9c1wrPHg", title: "Tax Deductions You May Be Missing", desc: "Commonly overlooked deductions that could save you thousands." },
  { id: "Z4937Jn9eTw", title: "Financial Projections for Investors", desc: "Creating compelling financial projections for fundraising." },
  { id: "_yYY_FbZBWk", title: "Sales Tax Compliance", desc: "Managing multi-state sales tax obligations effectively." },
  { id: "fpQbxoOct4I", title: "Construction Industry Accounting", desc: "Specialized accounting practices for construction companies." },
  { id: "RL8dKVUBoAQ", title: "E-Commerce Tax Strategies", desc: "Tax planning specifically designed for online businesses." },
  { id: "vsurv8O5ou0", title: "Non-Profit Organization Accounting", desc: "Financial management best practices for non-profits." },
  { id: "bxWCKrRHgAQ", title: "Quarterly Tax Payments Guide", desc: "Understanding and managing estimated quarterly tax payments." },
  { id: "R2JxOcMOQHQ", title: "Business Growth Strategies", desc: "Financial strategies for scaling your business." },
  { id: "TMrIdPLe0yI", title: "Real Estate Tax Benefits", desc: "Maximizing tax advantages in real estate investments." },
  { id: "sLRHXt2QTt8", title: "Succession Planning", desc: "Planning for the future transition of your business." },
  { id: "t9mfiTuP3PE", title: "Cost Reduction Strategies", desc: "Smart ways to reduce costs without sacrificing quality." },
  { id: "Uy6XFOiB1cg", title: "Healthcare Industry Finance", desc: "Financial management for healthcare providers." },
  { id: "UdAcLxClkMY", title: "Technology Startup Funding", desc: "Financial guidance for tech startups seeking funding." },
  { id: "fhK-dqzA0Tg", title: "Payroll Tax Compliance", desc: "Staying compliant with federal and state payroll taxes." },
  { id: "l1GuakjwfdY", title: "Financial Risk Management", desc: "Identifying and mitigating financial risks in your business." },
  { id: "1FRc3jcam2c", title: "Tax Season Preparation Tips", desc: "Getting organized and prepared for a smooth tax season." },
  { id: "NH3epEqqJTg", title: "Accounting Software Comparison", desc: "Choosing the right accounting software for your needs." },
  { id: "RvXZth_j2TM", title: "Foreign Investment Tax Guide", desc: "Tax implications of foreign investments in the US." },
  { id: "6CpvPD1SEEI", title: "Small Business Grants & Loans", desc: "Finding and applying for business funding opportunities." },
  { id: "pf-vsPaYWdU", title: "Internal Controls for SMBs", desc: "Implementing effective internal controls in small businesses." },
  { id: "869U2wCqBQI", title: "Lease vs. Buy Decisions", desc: "Financial analysis for equipment and property decisions." },
  { id: "2vSfUW-Agss", title: "Export & Import Tax Planning", desc: "Tax strategies for international trade businesses." },
  { id: "I2KmnmIueCg", title: "Entertainment Industry Accounting", desc: "Specialized financial services for entertainment companies." },
  { id: "iC74W833UHU", title: "Inventory Management Accounting", desc: "Best practices for inventory valuation and reporting." },
  { id: "Fz9D5Xl8axY", title: "Clean Energy Tax Incentives", desc: "Available tax credits for green energy businesses." },
  { id: "wKena9tx6o0", title: "Debt Management Strategies", desc: "Managing business debt for financial health." },
  { id: "k8nRnixbs6I", title: "Year-End Financial Review", desc: "Essential steps for closing your books at year-end." },
  { id: "6V9SbonMlu0", title: "Partnership Tax Returns", desc: "Understanding partnership tax obligations and filings." },
  { id: "hk5pjpMMh88", title: "Estate & Trust Planning", desc: "Protecting your wealth through estate and trust strategies." },
];

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

const Shows = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [rHeader, vHeader] = useScrollReveal();

  const visibleVideos = allVideos.slice(0, visibleCount);

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
            <Tv size={14} className="text-sky" />
            <span className="text-white/80 text-sm font-medium">Media Gallery</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Shows & Videos</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Watch our latest episodes, expert interviews, and financial insights from Nick Li and the AAA American CPA team.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div ref={rHeader} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${revealClasses(vHeader)}`}>
            {visibleVideos.map((video) => (
              <div key={video.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300">
                <button onClick={() => setActiveVideo(video.id)} className="relative w-full aspect-video overflow-hidden">
                  <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-sky/90 flex items-center justify-center shadow-lg"><Play className="text-white ml-1" size={24} /></div>
                  </div>
                </button>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-1 line-clamp-1 group-hover:text-sky transition-colors">{video.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < allVideos.length && (
            <div className="text-center mt-14">
              <button onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)} className="px-8 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-sky transition-all">
                Load More Videos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white hover:text-sky transition-colors" aria-label="Close video"><X size={28} /></button>
            <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Shows;

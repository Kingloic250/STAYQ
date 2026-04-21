import { useState } from "react";
import { Search, ChevronDown, ChevronRight, MessageCircle, BookOpen, Video, Mail } from "lucide-react";

const faqs = [
  {
    q: "How do I create a new property?",
    a: "Navigate to the Properties tab and click the 'Add Property' button in the top right. Fill in the details, upload photos, set pricing, then confirm.",
  },
  {
    q: "How do I track bookings in real-time?",
    a: "Go to the Bookings tab and you can see all upcoming, active, and past reservations with their status.",
  },
  {
    q: "Can I export my booking history?",
    a: "Yes! In the Finances tab, use the export button to download your records as CSV or PDF.",
  },
  {
    q: "How do I add team members to my account?",
    a: "Go to Settings → Security and invite team members by email. They'll receive an invitation link to join your workspace.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major credit cards (Visa, MasterCard, Amex), PayPal, and bank transfers for enterprise accounts.",
  },
  {
    q: "How do I set up notifications?",
    a: "Visit Settings → Notifications to configure email, SMS, and push notification preferences for each event type.",
  },
];

const resources = [
  { icon: BookOpen, label: "Documentation", desc: "Full API docs and guides", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Video, label: "Video Tutorials", desc: "Step-by-step walkthroughs", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: MessageCircle, label: "Live Chat", desc: "Talk to support in real-time", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Mail, label: "Email Support", desc: "support@stayq.com", color: "text-amber-400", bg: "bg-amber-500/10" },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="text-[13px] font-medium text-foreground">{q}</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-3" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 ml-3" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-border bg-secondary/20">
          <p className="text-[13px] text-muted-foreground leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground tracking-tight mb-1">Help Center</h1>
        <p className="text-[14px] text-muted-foreground">Find answers, guides, and support resources</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for help articles..."
          className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-2xl text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {resources.map((r) => (
          <button
            key={r.label}
            className="bg-card border border-border rounded-2xl p-5 text-left hover:border-primary/20 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl ${r.bg} flex items-center justify-center mb-3`}>
              <r.icon className={`w-5 h-5 ${r.color}`} />
            </div>
            <p className="text-[13px] font-semibold text-foreground">{r.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{r.desc}</p>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-[16px] font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)
          ) : (
            <div className="text-center py-10 text-muted-foreground text-[13px]">No results found for "{search}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
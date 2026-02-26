import { useState } from "react";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trusted & Secure",
    desc: "Shop with confidence. Every transaction is encrypted end-to-end with bank-grade security and fraud protection.",
    gradient: "from-violet-500 to-purple-600",
    shadow: "hover:shadow-violet-500/20",
    hborder: "hover:border-violet-500/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast Delivery",
    desc: "From warehouse to your doorstep in record time. Express shipping available across 50+ countries worldwide.",
    gradient: "from-amber-400 to-orange-500",
    shadow: "hover:shadow-amber-500/20",
    hborder: "hover:border-amber-500/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Curated Collections",
    desc: "Every product is hand-picked by our style experts. Quality over quantity — only the finest make it to ShopVera.",
    gradient: "from-rose-400 to-pink-600",
    shadow: "hover:shadow-rose-500/20",
    hborder: "hover:border-rose-500/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Easy Returns",
    desc: "Changed your mind? No problem. Hassle-free 30-day returns with instant refunds — no questions asked.",
    gradient: "from-emerald-400 to-teal-500",
    shadow: "hover:shadow-emerald-500/20",
    hborder: "hover:border-emerald-500/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Best Price Guarantee",
    desc: "Find it cheaper elsewhere? We'll match it. Our price promise ensures you always get the best deal.",
    gradient: "from-sky-400 to-blue-600",
    shadow: "hover:shadow-sky-500/20",
    hborder: "hover:border-sky-500/40",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "24/7 Support",
    desc: "Our dedicated team is always here for you. Live chat, email, or call — real humans ready to help anytime.",
    gradient: "from-fuchsia-400 to-purple-600",
    shadow: "hover:shadow-fuchsia-500/20",
    hborder: "hover:border-fuchsia-500/40",
  },
];

const stats = [
  { value: "2M+", label: "Happy Customers" },
  { value: "50K+", label: "Products" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "150+", label: "Countries" },
];

export default function WhyChoose() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-slate-900">
      {/* Ambient blobs */}
         <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{background:"rgba(124,58,237,0.15)"}} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{background:"rgba(219,39,119,0.12)"}} />
          <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px"}} />
        </div>


      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl" style={{background:"rgba(124,58,237,0.12)"}} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full blur-3xl" style={{background:"rgba(225,29,72,0.10)"}} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl" style={{background:"rgba(14,165,233,0.08)"}} />
        <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(148,163,184,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/30 border border-slate-700/50 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">Why ShopVera</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
            Shopping,{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We didn't just build a store — we crafted an experience. Every detail at ShopVera is designed around one thing:{" "}
            <span className="text-slate-200 font-medium">you</span>.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative p-7 rounded-2xl bg-slate-800/30 border border-slate-700/50 transition-all duration-300 overflow-hidden cursor-default ${f.hborder} hover:shadow-2xl`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-linear-to-r ${f.gradient} opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${f.gradient} mb-5 text-white shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{f.desc}</p>
              {/* Glow overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/60 transition-colors duration-300">
              <div className="text-3xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg hover:scale-105 active:scale-100">
            Start Shopping
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-slate-600 text-xs mt-4">No account needed · Free to browse</p>
        </div>
      </div>
    </section>
  );
}
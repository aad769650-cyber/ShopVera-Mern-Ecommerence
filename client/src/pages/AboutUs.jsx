import { useState, useEffect, useRef } from "react";

const teamMembers = [
  {
    name: "Vera Castillo",
    role: "Founder & CEO",
    bio: "Visionary behind ShopVera, with 12+ years in luxury retail and a passion for accessible elegance.",
    initials: "VC",
    color: "from-rose-400 to-pink-600",
    img:"/ceo.jpg"
  },
  {
    name: "James Okoye",
    role: "Head of Design",
    bio: "Former lead designer at Vogue Commerce. Believes every product deserves a runway moment.",
    initials: "JO",
    color: "from-amber-400 to-orange-500",
    img:"/head.jpg"
  },
  {
    name: "Mia Chen",
    role: "CTO",
    bio: "Built ShopVera's platform from scratch. Obsessed with seamless, fast, beautiful experiences.",
    initials: "MC",
    color: "from-teal-400 to-cyan-600",
    img:"/cto.jpg"
  },
  {
    name: "Leo Fontaine",
    role: "Head of Curation",
    bio: "Traveled 40+ countries sourcing the world's finest artisan products. Every pick is personal.",
    initials: "LF",
    color: "from-violet-400 to-purple-600",
    img:"/hoc.jpg"
  },
];

const stats = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "180+", label: "Countries Served" },
  { value: "50K+", label: "Curated Products" },
  { value: "99.2%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: "✦",
    title: "Curated Excellence",
    desc: "Every product on ShopVera is handpicked. We reject 94% of applications to ensure only the extraordinary makes it to you.",
  },
  {
    icon: "◈",
    title: "Radical Transparency",
    desc: "We show you the full story — who made it, where it came from, and why we love it. No smoke, no mirrors.",
  },
  {
    icon: "⟡",
    title: "Sustainable by Default",
    desc: "From carbon-neutral shipping to ethical sourcing, sustainability isn't a checkbox. It's how we operate.",
  },
  {
    icon: "◉",
    title: "Effortless Beauty",
    desc: "Shopping should feel like wandering a beautiful boutique, not navigating a maze. We design for delight.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutUs() {
  const [activeTeam, setActiveTeam] = useState(null);

  return (
    <div
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
      className="min-h-screen bg-[#faf8f5] text-[#1a1510] overflow-x-hidden"
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .jost { font-family: 'Jost', sans-serif; }
        .marquee-track {
          display: flex;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, #f0e6d8 0%, #faf8f5 70%)",
          }}
        />
        {/* Decorative circles */}
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #c8956b, transparent 70%)" }}
        />
        <div
          className="absolute bottom-32 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b6c4f, transparent 70%)" }}
        />

        

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <p
            className="jost text-xs tracking-[0.4em] text-[#9a7a5e] mb-8 uppercase"
            style={{ animation: "fadeIn 1s ease 0.2s both" }}
          >
            Est. 2018 · Our Story
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none mb-8"
            style={{
              animation: "fadeIn 1.2s ease 0.4s both",
              letterSpacing: "-0.02em",
            }}
          >
            Made for
            <br />
            <em className="italic" style={{ color: "#9a7a5e" }}>dreamers.</em>
          </h1>
          <p
            className="jost text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed opacity-70"
            style={{ animation: "fadeIn 1s ease 0.8s both" }}
          >
            ShopVera was born from a simple belief — that beautiful, thoughtfully crafted
            things should be within everyone's reach. We source the world so you don't have to.
          </p>
          <div
            className="mt-12 flex items-center justify-center gap-3"
            style={{ animation: "fadeIn 1s ease 1.1s both" }}
          >
            <div className="w-8 h-px bg-[#9a7a5e]" />
            <span className="jost text-xs tracking-[0.3em] text-[#9a7a5e] uppercase">
              Scroll to explore
            </span>
            <div className="w-8 h-px bg-[#9a7a5e]" />
          </div>
        </div>

        {/* Bottom editorial image blocks */}
        <div className="absolute bottom-12 right-8 hidden lg:flex gap-3">
          {["#e8d5c4", "#d4c4b0", "#c4b09a"].map((c, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                width: 80,
                height: 110 + i * 20,
                background: `linear-gradient(160deg, ${c}, ${c}aa)`,
                animation: `fadeIn 1s ease ${1.3 + i * 0.2}s both`,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-5 bg-[#1a1510] text-[#faf8f5] overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="jost flex items-center gap-10 px-5">
              {["CURATED WITH LOVE", "★", "ETHICALLY SOURCED", "★", "GLOBALLY INSPIRED", "★", "LOCALLY LOVED", "★", "2.4M CUSTOMERS", "★"].map(
                (w, i) => (
                  <span key={i} className="text-xs tracking-[0.3em] whitespace-nowrap opacity-80">
                    {w}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-[#d4c4b0]">
          {stats.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="p-10 text-center">
              <div className="text-5xl md:text-6xl font-light mb-2" style={{ color: "#9a7a5e" }}>
                {s.value}
              </div>
              <div className="jost text-xs tracking-[0.25em] opacity-50 uppercase">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <AnimatedSection>
            <p className="jost text-xs tracking-[0.4em] text-[#9a7a5e] uppercase mb-6">Our Story</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8">
              A market stall
              <br />
              <em className="italic">became a movement.</em>
            </h2>
            <p className="jost text-sm leading-loose opacity-65 mb-5">
              In 2018, Vera Castillo set up a tiny stall at a Barcelona flea market, selling handmade
              ceramics she'd discovered in rural Portugal. By noon, she'd sold everything. By evening,
              she had 300 emails asking when she'd restock.
            </p>
            <p className="jost text-sm leading-loose opacity-65 mb-8">
              That moment became ShopVera — a place where artisans, makers, and small brands
              could reach customers who truly cared about what they were buying. Today we're a
              global platform, but we've never forgotten that first stall.
            </p>
            <a
              href="#"
              className="jost inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase border-b border-[#9a7a5e] pb-1 text-[#9a7a5e] hover:gap-5 transition-all duration-300"
            >
              Read the full story <span>→</span>
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="relative">
            <div
              className="aspect-[3/4] rounded-2xl relative overflow-hidden shimmer"
              style={{
                background: "linear-gradient(145deg, #e8d5c4 0%, #c4a882 50%, #9a7a5e 100%)",
              }}
            >
              <div
                className="absolute bottom-8 left-8 right-8 p-6 rounded-xl"
                style={{ background: "rgba(250,248,245,0.85)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-2xl italic font-light mb-2">
                  "We don't just sell things. We connect people to the stories behind them."
                </p>
                <p className="jost text-xs tracking-widest opacity-50">— Vera Castillo, Founder</p>
              </div>
            </div>
            {/* Floating badge */}
            <div
              className="absolute -top-5 -right-5 w-24 h-24 rounded-full flex items-center justify-center text-center"
              style={{ background: "#1a1510", color: "#faf8f5" }}
            >
              <span className="jost text-xs leading-tight tracking-wider opacity-90">
                Est.<br />2018
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6" style={{ background: "#f2ece4" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="jost text-xs tracking-[0.4em] text-[#9a7a5e] uppercase mb-4">What We Stand For</p>
            <h2 className="text-5xl md:text-6xl font-light">Our Values</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-[#faf8f5] rounded-2xl p-8 h-full hover:-translate-y-2 transition-transform duration-300 cursor-default">
                  <div className="text-3xl mb-6" style={{ color: "#9a7a5e" }}>{v.icon}</div>
                  <h3 className="text-xl font-light mb-4">{v.title}</h3>
                  <p className="jost text-xs leading-relaxed opacity-60">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="jost text-xs tracking-[0.4em] text-[#9a7a5e] uppercase mb-4">The People</p>
            <h2 className="text-5xl md:text-6xl font-light">
              Meet the team
              <br />
              <em className="italic">behind the magic.</em>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div
                  className="rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveTeam(activeTeam === i ? null : i)}
                >
                  {/* Avatar */}
                  <img
                  src={`${m.img}`}
                    className={`h-56 bg-gradient-to-br ${m.color} flex items-center justify-center relative overflow-hidden`}
                 />
                    <span className="text-5xl font-light text-white/80">{m.initials}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-light mb-1">{m.name}</h3>
                    <p className="jost text-xs tracking-widest text-[#9a7a5e] uppercase mb-3">
                      {m.role}
                    </p>
                    <div
                      style={{
                        maxHeight: activeTeam === i ? "80px" : "0px",
                        opacity: activeTeam === i ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.4s ease, opacity 0.4s ease",
                      }}
                    >
                      <p className="jost text-xs leading-relaxed opacity-60">{m.bio}</p>
                    </div>
                    <p className="jost text-xs text-[#9a7a5e] mt-3">
                      {activeTeam === i ? "▲ Less" : "▼ More"}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION CTA ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1a1510 60%, #3d2e20 100%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-2/3 h-full opacity-10"
          style={{
            background: "radial-gradient(ellipse at right, #c8956b, transparent 70%)",
          }}
        />
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center text-[#faf8f5]">
          <p className="jost text-xs tracking-[0.4em] text-[#c8956b] uppercase mb-6">
            Join the Community
          </p>
          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">
            Shop with
            <br />
            <em className="italic" style={{ color: "#c8956b" }}>intention.</em>
          </h2>
          <p className="jost text-sm leading-loose opacity-60 max-w-lg mx-auto mb-12">
            Every purchase on ShopVera supports an independent maker, artisan, or small business.
            Together, we're rewriting what shopping can mean.
          </p>
          <a
            href="#"
            className="jost inline-block px-12 py-4 text-xs tracking-[0.35em] uppercase border border-[#c8956b] text-[#c8956b] rounded-full hover:bg-[#c8956b] hover:text-[#1a1510] transition-all duration-300"
          >
            Explore ShopVera
          </a>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
     

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
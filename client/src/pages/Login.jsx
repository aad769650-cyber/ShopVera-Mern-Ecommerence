import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { loginUser } from "../api/api";

const EyeIcon = ({ show }) => show ? (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const socialProviders = [
  {
    name: "Google",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: "Apple",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.36c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.54 4.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
  },
];

const FloatingParticle = ({ style }) => (
  <div className="absolute rounded-full pointer-events-none" style={style} />
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [shake, setShake] = useState(false);
const navigate=useNavigate()
  const particles = [
    { width:6, height:6, background:"rgba(168,85,247,0.3)", top:"12%", left:"8%", animation:"ping 3s ease-in-out infinite" },
    { width:4, height:4, background:"rgba(236,72,153,0.4)", top:"70%", left:"5%", animation:"ping 2.5s ease-in-out infinite 0.5s" },
    { width:5, height:5, background:"rgba(99,102,241,0.3)", top:"30%", right:"6%", animation:"ping 3.5s ease-in-out infinite 1s" },
    { width:3, height:3, background:"rgba(168,85,247,0.5)", top:"80%", right:"10%", animation:"ping 2s ease-in-out infinite 0.2s" },
    { width:7, height:7, background:"rgba(236,72,153,0.2)", top:"50%", left:"3%", animation:"ping 4s ease-in-out infinite 1.5s" },
  ];

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);


    console.log(form);
    loginUser(form)
    setForm({email:"",password:""})
    navigate("/cart")
  };

  const handleForgot = () => {
    if (!forgotEmail.includes("@")) return;
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setForgotSent(true); }, 1600);
  };

  // Success screen
 

  // Forgot password screen
  if (forgotMode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background:"radial-gradient(ellipse at 30% 60%, #1e1b4b 0%, #0f172a 55%, #1a0a2e 100%)"}}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{background:"radial-gradient(circle,#7c3aed,transparent)"}} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl" style={{background:"radial-gradient(circle,#db2777,transparent)"}} />
        </div>

        <div className="w-full max-w-md relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.2 2.4C6.1 2.4 5.1 3 4.6 4L2 9h20l-2.6-5c-.5-1-1.5-1.6-2.6-1.6H7.2zM2 11v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9H2zm10 7a3 3 0 110-6 3 3 0 010 6z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white" style={{fontFamily:"Georgia,serif"}}>ShopVera</span>
            </div>
          </div>

          <div className="rounded-3xl p-8 relative overflow-hidden" style={{background:"rgba(15,23,42,0.85)",backdropFilter:"blur(24px)",border:"1px solid rgba(168,85,247,0.15)",boxShadow:"0 25px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05)"}}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{background:"linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)"}} />

            {!forgotSent ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setForgotMode(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h2 className="text-lg font-bold text-white" style={{fontFamily:"Georgia,serif"}}>Reset password</h2>
                    <p className="text-slate-500 text-xs">We'll send a reset link to your email</p>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.2)"}}>
                  <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>

                <label className="block text-slate-400 mb-1.5" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Email Address</label>
                <div className="relative mb-5">
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    onFocus={() => setFocused("forgot")}
                    onBlur={() => setFocused(null)}
                    className="w-full py-3 px-4 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                    style={{
                      background: focused==="forgot" ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.04)",
                      border:`1px solid ${focused==="forgot" ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: focused==="forgot" ? "0 0 0 3px rgba(168,85,247,0.1)" : "none",
                    }}
                  />
                </div>

                <button
                  onClick={handleForgot}
                  disabled={!forgotEmail.includes("@") || forgotLoading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                  style={{
                    background: forgotEmail.includes("@") ? "linear-gradient(135deg,#7c3aed,#a21caf,#db2777)" : "rgba(255,255,255,0.06)",
                    border: forgotEmail.includes("@") ? "none" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: forgotEmail.includes("@") ? "0 8px 30px rgba(124,58,237,0.4)" : "none",
                  }}
                >
                  {forgotLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending…
                    </div>
                  ) : "Send Reset Link"}
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.2),rgba(219,39,119,0.2))",border:"1px solid rgba(168,85,247,0.3)"}}>
                  <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2" style={{fontFamily:"Georgia,serif"}}>Check your inbox</h3>
                <p className="text-slate-400 text-sm mb-1">Reset link sent to</p>
                <p className="text-violet-400 text-sm font-medium mb-6">{forgotEmail}</p>
                <button onClick={() => { setForgotMode(false); setForgotSent(false); setForgotEmail(""); }} className="text-slate-400 hover:text-white text-sm transition-colors">
                  ← Back to sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main login
  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{background:"radial-gradient(ellipse at 30% 60%, #1e1b4b 0%, #0f172a 55%, #1a0a2e 100%)"}}>

      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden" style={{borderRight:"1px solid rgba(168,85,247,0.1)"}}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{background:"rgba(124,58,237,0.15)"}} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{background:"rgba(219,39,119,0.12)"}} />
          <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px"}} />
        </div>

        {/* Brand */}
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)",boxShadow:"0 4px 15px rgba(124,58,237,0.4)"}}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.2 2.4C6.1 2.4 5.1 3 4.6 4L2 9h20l-2.6-5c-.5-1-1.5-1.6-2.6-1.6H7.2zM2 11v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9H2zm10 7a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white" style={{fontFamily:"Georgia,serif"}}>ShopVera</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{fontFamily:"Georgia,serif",letterSpacing:"-0.02em"}}>
            Your style,<br/>
            <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">curated for you.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm">Discover thousands of hand-picked products from the world's finest brands, delivered to your door.</p>
        </div>

        {/* Feature pills */}
        <div className="relative space-y-3">
          {[
            { icon:"🛡️", text:"Bank-grade secure checkout" },
            { icon:"⚡", text:"Express delivery worldwide" },
            { icon:"↩️", text:"Hassle-free 30-day returns" },
            { icon:"💎", text:"Exclusive member discounts" },
          ].map((f,i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <span className="text-base">{f.icon}</span>
              <span className="text-slate-300 text-sm">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative p-5 rounded-2xl" style={{background:"rgba(168,85,247,0.07)",border:"1px solid rgba(168,85,247,0.15)"}}>
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_,i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">"ShopVera completely changed how I shop online. The curation is incredible and delivery is always on time."</p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>S</div>
            <div>
              <p className="text-white text-xs font-semibold">Sofia Martinez</p>
              <p className="text-slate-500 text-xs">Member since 2022</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">

        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{background:"radial-gradient(circle,#7c3aed,transparent)"}} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{background:"radial-gradient(circle,#db2777,transparent)"}} />
          {particles.map((p,i) => <FloatingParticle key={i} style={p} />)}
        </div>

        <div className="w-full max-w-sm relative">

          {/* Mobile brand only */}
          <div className="flex lg:hidden justify-center mb-7">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.2 2.4C6.1 2.4 5.1 3 4.6 4L2 9h20l-2.6-5c-.5-1-1.5-1.6-2.6-1.6H7.2zM2 11v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9H2zm10 7a3 3 0 110-6 3 3 0 010 6z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white" style={{fontFamily:"Georgia,serif"}}>ShopVera</span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1.5" style={{fontFamily:"Georgia,serif",letterSpacing:"-0.02em"}}>Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to continue shopping</p>
          </div>

          {/* Card */}
          <div
            className="rounded-3xl p-7 relative overflow-hidden"
            style={{
              background:"rgba(15,23,42,0.85)",
              backdropFilter:"blur(24px)",
              border:"1px solid rgba(168,85,247,0.15)",
              boxShadow:"0 25px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05)",
              animation: shake ? "shake 0.4s ease" : "none",
            }}
          >
            <style>{`
              @keyframes shake {
                0%,100%{transform:translateX(0)}
                20%{transform:translateX(-6px)}
                40%{transform:translateX(6px)}
                60%{transform:translateX(-4px)}
                80%{transform:translateX(4px)}
              }
            `}</style>

            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{background:"linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)"}} />

            {/* Social */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {socialProviders.map((p) => (
                <button key={p.name} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-300 hover:text-white transition-all duration-200 hover:scale-[1.02]" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",fontSize:"12px",fontWeight:500}}>
                  {p.icon}
                  <span>with {p.name}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
              <span className="text-slate-600" style={{fontSize:"10px",letterSpacing:"0.1em"}}>OR</span>
              <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-4" style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)"}}>
                <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-slate-400 mb-1.5" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={e => { setForm({...form, email: e.target.value}); setError(""); }}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full py-3 pl-10 pr-4 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: focused==="email" ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.04)",
                    border:`1px solid ${focused==="email" ? "rgba(168,85,247,0.5)" : error ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: focused==="email" ? "0 0 0 3px rgba(168,85,247,0.1)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-400" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Password</label>
                <button onClick={() => setForgotMode(true)} className="text-violet-400 hover:text-violet-300 transition-colors" style={{fontSize:"11px"}}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={e => { setForm({...form, password: e.target.value}); setError(""); }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className="w-full py-3 pl-10 pr-10 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{
                    background: focused==="password" ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.04)",
                    border:`1px solid ${focused==="password" ? "rgba(168,85,247,0.5)" : error ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: focused==="password" ? "0 0 0 3px rgba(168,85,247,0.1)" : "none",
                  }}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  <EyeIcon show={showPass} />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 mb-6 mt-4">
              <button
                onClick={() => setRemember(!remember)}
                className="w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: remember ? "linear-gradient(135deg,#7c3aed,#db2777)" : "transparent",
                  border: remember ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                }}
              >
                {remember && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className="text-slate-400 text-xs">Keep me signed in for 30 days</span>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 relative overflow-hidden group"
              style={{
                background:"linear-gradient(135deg,#7c3aed 0%,#a21caf 50%,#db2777 100%)",
                boxShadow:"0 8px 30px rgba(124,58,237,0.4)",
                transform: loading ? "scale(0.98)" : "scale(1)",
              }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.1) 50%,transparent 60%)",transform:"translateX(-100%)",animation:"shimmer 2s infinite"}} />
              <style>{`@keyframes shimmer{to{transform:translateX(200%)}}`}</style>

              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  Sign In
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </button>

            {/* Sign up link */}
            <p className="text-center text-slate-500 text-xs mt-5">
              New to ShopVera?{" "}
              <span className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium transition-colors"><NavLink to="/signup">Create an account</NavLink></span>
            </p>
          </div>

          <p className="text-center text-slate-600 text-xs mt-5">
            Protected by SSL encryption · <span className="text-slate-500">SOC 2 Type II</span>
          </p>
        </div>
      </div>
    </div>
  );
}
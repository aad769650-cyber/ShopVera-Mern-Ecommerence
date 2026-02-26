import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("isAuthenticate",true)
      navigate("/admin");
    } else {
      setLoading(false);
      setError("Invalid credentials. Access denied.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-jost   { font-family: 'Jost', sans-serif; }

        @keyframes drift1 { to { transform: translate(40px, 30px) scale(1.08); } }
        @keyframes drift2 { to { transform: translate(-30px, -40px) scale(1.05); } }
        @keyframes drift3 {
          0%   { transform: translate(-50%,-50%) scale(1); }
          100% { transform: translate(-50%,-50%) scale(1.12); }
        }
        .orb-1 { animation: drift1 14s ease-in-out infinite alternate; }
        .orb-2 { animation: drift2 10s ease-in-out infinite alternate; }
        .orb-3 { animation: drift3 18s ease-in-out infinite alternate; }

        @keyframes shake {
          10%,90%      { transform: translateX(-3px); }
          20%,80%      { transform: translateX(5px); }
          30%,50%,70%  { transform: translateX(-5px); }
          40%,60%      { transform: translateX(5px); }
        }
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97); }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-in { animation: cardIn 0.85s cubic-bezier(.22,1,.36,1) forwards; }

        @keyframes fadeMsg {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-msg { animation: fadeMsg 0.3s ease forwards; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-ring {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(10,8,0,0.3); border-top-color: #0a0800;
          border-radius: 50%; animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }

        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%; }
        }
        .shimmer-btn::after {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }

        /* Gold input with glow on focus */
        .gold-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 2px;
          color: #e8d9b0;
          padding: 0.8rem 2.6rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .gold-input::placeholder { color: rgba(255,255,255,0.15); }
        .gold-input:focus {
          border-color: rgba(201,168,76,0.55);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08), 0 0 18px rgba(201,168,76,0.07);
        }

        /* Card corner brackets */
        .bracket-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 2px;
          backdrop-filter: blur(24px);
          box-shadow: 0 0 0 1px rgba(201,168,76,0.05),
                      0 32px 80px rgba(0,0,0,0.78),
                      inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
        }
        .bracket-card::before, .bracket-card::after {
          content: ''; position: absolute;
          width: 18px; height: 18px;
          border-color: #c9a84c; border-style: solid;
        }
        .bracket-card::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .bracket-card::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        /* Gold submit button */
        .gold-btn {
          width: 100%;
          background: linear-gradient(135deg, #c9a84c 0%, #a07830 50%, #c9a84c 100%);
          background-size: 200% 100%;
          border: none; border-radius: 2px;
          color: #0a0800;
          font-family: 'Cinzel', serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          padding: 0.95rem; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background-position 0.5s, box-shadow 0.3s, transform 0.2s;
        }
        .gold-btn:hover:not(:disabled) {
          background-position: 100% 0;
          box-shadow: 0 8px 30px rgba(201,168,76,0.28), 0 0 0 1px rgba(201,168,76,0.4);
          transform: translateY(-1px);
        }
        .gold-btn:active:not(:disabled) { transform: translateY(0); }
        .gold-btn:disabled { opacity: 0.65; cursor: not-allowed; }
      `}</style>

      {/* ── Page root ── */}
      <div
        className="font-jost relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#050508" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Orbs */}
        <div
          className="orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,#c9a84c,transparent)", filter: "blur(80px)", opacity: 0.18 }}
        />
        <div
          className="orb-2 absolute -bottom-28 -right-28 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,#8b5e3c,transparent)", filter: "blur(80px)", opacity: 0.15 }}
        />
        <div
          className="orb-3 absolute top-1/2 left-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,#c9a84c,transparent)", filter: "blur(80px)", opacity: 0.1 }}
        />

        {/* ── Card ── */}
        <div
          className={`bracket-card w-full max-w-md mx-5 px-8 py-12 sm:px-11 ${mounted ? "card-in" : "opacity-0"} ${shake ? "shake" : ""}`}
        >
          {/* ── Logo ── */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                border: "1px solid rgba(201,168,76,0.4)",
                background: "radial-gradient(circle,rgba(201,168,76,0.09),transparent)",
              }}
            >
              <div
                className="absolute inset-1 rounded-full"
                style={{ border: "1px solid rgba(201,168,76,0.12)" }}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <h1
              className="font-cinzel text-2xl font-semibold tracking-widest text-center mb-1"
              style={{ color: "#e8d9b0" }}
            >
              ADMIN PORTAL
            </h1>
            <p
              className="text-xs tracking-widest uppercase text-center"
              style={{ color: "rgba(201,168,76,0.5)" }}
            >
              Restricted Access
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)" }}
            />
            <div className="w-1 h-1 rounded-full" style={{ background: "rgba(201,168,76,0.55)" }} />
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left,transparent,rgba(201,168,76,0.3),transparent)" }}
            />
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <label
                className="block text-xs font-medium tracking-widest uppercase"
                style={{ color: "rgba(201,168,76,0.6)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  className="gold-input"
                  placeholder="admin@admin.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                className="block text-xs font-medium tracking-widest uppercase"
                style={{ color: "rgba(201,168,76,0.6)" }}
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="1.5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="gold-input"
                  style={{ paddingRight: "2.6rem" }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
                  style={{ color: "rgba(201,168,76,0.35)" }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="fade-msg flex items-center gap-2.5 rounded px-3.5 py-2.5 text-xs"
                style={{
                  background: "rgba(220,38,38,0.08)",
                  border: "1px solid rgba(220,38,38,0.22)",
                  color: "#fca5a5",
                  letterSpacing: "0.03em",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="gold-btn shimmer-btn mt-1" disabled={loading}>
              {loading ? (
                <><span className="spin-ring" />Authenticating...</>
              ) : (
                "Gain Access"
              )}
            </button>
          </form>

          {/* Footer */}
          <p
            className="mt-8 text-center text-xs tracking-widest uppercase font-jost"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            <span style={{ color: "rgba(201,168,76,0.38)" }}>✦</span>
            {" "}Secured Connection · Admin Only{" "}
            <span style={{ color: "rgba(201,168,76,0.38)" }}>✦</span>
          </p>
        </div>
      </div>
    </>
  );
}
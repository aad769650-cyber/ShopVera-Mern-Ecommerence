import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { Register } from "../api/api";

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

const CheckIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

// Validation rules
const validate = (form, agreed) => {
  const errs = {};
  if (!form.name.trim()) errs.name = "Full name is required.";
  else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";

  if (!form.password) errs.password = "Password is required.";
  else if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";


//   if (!agreed) errs.agreed = "You must agree to the Terms of Service.";

  return errs;
};

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarHover, setAvatarHover] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [touched, setTouched] = useState({});
  const [profile,setProfile]=useState(null)
  const fileRef = useRef();
const navigate=useNavigate()
  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#6366f1"];
  const strength = passwordStrength();

  const handleFile = (file) => {
    console.log("file",file);
    
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target.result);
    reader.readAsDataURL(file);

    setProfile(file)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Live validation on blur
  const handleBlur = (field) => {
    setFocused(null);
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate(form, agreed);
    setErrors(prev => ({ ...prev, [field]: errs[field] }));
  };

  // Clear field error on change
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value }, agreed);
      setErrors(prev => ({ ...prev, [field]: errs[field] }));
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = () => {
    // Mark all fields touched
    setTouched({ name: true, email: true, password: true, agreed: true });
    const errs = validate(form, agreed);
    setErrors(errs);

    if (Object.keys(errs).length > 0||!profile) {
      triggerShake();
 
 if (!profile) {
       return toast.error("Profile image  is missing")
 }
 
      toast.error("Error in some fields")
      return;
    }

    setLoading(true);

    // Console log submitted data
    const submittedData = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      ProfilePhoto: profile,
      agreedToTerms: agreed,
      submittedAt: new Date().toISOString(),
    };
    console.log("✅ ShopVera Signup — Form submitted:", submittedData);
toast.success("✅ ShopVera Signup Successfully")


  const formData=new FormData();



formData.append("username",submittedData.name)
formData.append("email",submittedData.email)
formData.append("password",submittedData.password)
formData.append("profileImage",submittedData.ProfilePhoto)


const resp=Register(formData)

console.log(resp);

navigate("/")
  //  if(resp){
     setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Clear all inputs after success
      setForm({ name: "", email: "", password: "" });
      setAgreed(false);
      setAvatar(null);
      setErrors({});
      setTouched({});
      setShowPass(false);
      console.log("🧹 ShopVera Signup — All fields cleared after submission.");
    
    }, 1000);

  //  }

  
  };

  // Field border color helper
  const borderColor = (field) => {
    if (errors[field] && touched[field]) return "rgba(239,68,68,0.6)";
    if (focused === field) return "rgba(168,85,247,0.5)";
    return "rgba(255,255,255,0.08)";
  };

  const bgColor = (field) => {
    if (errors[field] && touched[field]) return "rgba(239,68,68,0.05)";
    if (focused === field) return "rgba(168,85,247,0.08)";
    return "rgba(255,255,255,0.04)";
  };

  const boxShadow = (field) => {
    if (errors[field] && touched[field]) return "0 0 0 3px rgba(239,68,68,0.1)";
    if (focused === field) return "0 0 0 3px rgba(168,85,247,0.1)";
    return "none";
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background:"radial-gradient(ellipse at 20% 50%, #1e1b4b 0%, #0f172a 50%, #1a0a2e 100%)"}}>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-7px)}
          30%{transform:translateX(7px)}
          45%{transform:translateX(-5px)}
          60%{transform:translateX(5px)}
          75%{transform:translateX(-3px)}
          90%{transform:translateX(3px)}
        }
        @keyframes errorSlide {
          from{opacity:0;transform:translateY(-4px)}
          to{opacity:1;transform:translateY(0)}
        }
        .error-msg { animation: errorSlide 0.2s ease forwards; }
      `}</style>

      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background:"radial-gradient(circle,#7c3aed,transparent)"}} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{background:"radial-gradient(circle,#db2777,transparent)"}} />
        <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(168,85,247,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.03) 1px,transparent 1px)",backgroundSize:"50px 50px"}} />
        {[...Array(6)].map((_,i) => (
          <div key={i} className="absolute rounded-full opacity-20" style={{width:`${4+i}px`,height:`${4+i}px`,background:i%2===0?"#a855f7":"#ec4899",top:`${15+i*13}%`,left:`${5+i*3}%`}} />
        ))}
      </div>

      <div className="w-full max-w-md relative">

        {/* Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.2 2.4C6.1 2.4 5.1 3 4.6 4L2 9h20l-2.6-5c-.5-1-1.5-1.6-2.6-1.6H7.2zM2 11v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9H2zm10 7a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight" style={{fontFamily:"'Georgia',serif"}}>ShopVera</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1" style={{fontFamily:"'Georgia',serif",letterSpacing:"-0.03em"}}>Create your account</h1>
          <p className="text-slate-400 text-sm">Join millions discovering curated style</p>
        </div>

        {/* Card */}
        <div
          className="relative rounded-3xl p-8 overflow-hidden"
          style={{
            background:"rgba(15,23,42,0.85)",
            backdropFilter:"blur(24px)",
            border:"1px solid rgba(168,85,247,0.15)",
            boxShadow:"0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            animation: shake ? "shake 0.5s ease" : "none",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{background:"linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)"}} />

          {/* Global error banner — shows when submit clicked with errors */}
          {shake && Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 error-msg" style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)"}}>
              <div className="text-red-400"><AlertIcon /></div>
              <p className="text-red-400 text-xs font-medium">Please fix the errors below before continuing.</p>
            </div>
          )}

          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-7">
            <p className="text-xs font-semibold text-slate-400 mb-3 tracking-widest uppercase" style={{fontSize:"10px",letterSpacing:"0.08em"}}>Profile Photo</p>
            <div className="relative">
              <div
                className="relative w-24 h-24 rounded-full cursor-pointer transition-all duration-300"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current.click()}
                style={{
                  border: dragOver ? "2px dashed #a855f7" : avatar ? "2px solid transparent" : "2px dashed rgba(168,85,247,0.35)",
                  background: avatar ? "linear-gradient(#0f172a,#0f172a) padding-box, linear-gradient(135deg,#7c3aed,#db2777) border-box" : dragOver ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                  boxShadow: avatar ? "0 0 30px rgba(124,58,237,0.25)" : "none",
                }}
              >
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1">
                    <div style={{color:"rgba(168,85,247,0.6)"}}><CameraIcon /></div>
                    <span className="text-slate-600 text-center leading-tight" style={{fontSize:"9px"}}>Upload<br/>photo</span>
                  </div>
                )}
                {avatar && avatarHover && (
                  <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center gap-1" style={{background:"rgba(0,0,0,0.55)",backdropFilter:"blur(2px)"}}>
                    <div className="text-white"><CameraIcon /></div>
                    <span className="text-white leading-tight" style={{fontSize:"9px"}}>Change</span>
                  </div>
                )}
                {dragOver && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{background:"rgba(124,58,237,0.25)"}}>
                    <span className="text-violet-300" style={{fontSize:"9px"}}>Drop!</span>
                  </div>
                )}
              </div>
              {!avatar && <div className="absolute inset-0 rounded-full pointer-events-none animate-ping" style={{border:"1px solid rgba(168,85,247,0.15)",animationDuration:"2.5s"}} />}
              {avatar && (
                <button onClick={(e) => { e.stopPropagation(); setAvatar(null); }} className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform" style={{background:"linear-gradient(135deg,#ef4444,#dc2626)",boxShadow:"0 2px 8px rgba(239,68,68,0.4)"}}>
                  <TrashIcon />
                </button>
              )}
              {avatar && !avatarHover && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)",boxShadow:"0 2px 8px rgba(124,58,237,0.5)"}}>
                  <CheckIcon />
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} name="profileImage" />
            <p className="text-slate-600 text-center mt-2.5 leading-relaxed" style={{fontSize:"10px"}}>
              Click to upload · Drag & drop<br/>
              <span style={{color:"rgba(168,85,247,0.5)"}}>JPG, PNG, WEBP · Max 5MB</span>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
            <span className="text-slate-600" style={{fontSize:"10px",letterSpacing:"0.1em"}}>YOUR DETAILS</span>
            <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {socialProviders.map((p) => (
              <button key={p.name} className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white hover:scale-[1.02]" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
                {p.icon}
                <span style={{fontSize:"12px"}}>with {p.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
            <span className="text-slate-500 tracking-widest uppercase" style={{fontSize:"10px"}}>or</span>
            <div className="flex-1 h-px" style={{background:"rgba(255,255,255,0.07)"}} />
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-5">

            {/* Name */}
            <div>
              <label className="block text-slate-400 mb-1.5" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={e => handleChange("name", e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => handleBlur("name")}
                  className="w-full py-3 px-4 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{ background: bgColor("name"), border:`1px solid ${borderColor("name")}`, boxShadow: boxShadow("name") }}
                />
                {form.name.length > 1 && !errors.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
                    <CheckIcon />
                  </div>
                )}
                {errors.name && touched.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                    <AlertIcon />
                  </div>
                )}
              </div>
              {errors.name && touched.name && (
                <p className="error-msg flex items-center gap-1.5 mt-1.5 text-red-400" style={{fontSize:"11px"}}>
                  <AlertIcon /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-400 mb-1.5" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full py-3 px-4 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{ background: bgColor("email"), border:`1px solid ${borderColor("email")}`, boxShadow: boxShadow("email") }}
                />
                {form.email.includes("@") && form.email.includes(".") && !errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
                    <CheckIcon />
                  </div>
                )}
                {errors.email && touched.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
                    <AlertIcon />
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p className="error-msg flex items-center gap-1.5 mt-1.5 text-red-400" style={{fontSize:"11px"}}>
                  <AlertIcon /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-400 mb-1.5" style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => handleChange("password", e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full py-3 pl-4 pr-10 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  style={{ background: bgColor("password"), border:`1px solid ${borderColor("password")}`, boxShadow: boxShadow("password") }}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  <EyeIcon show={showPass} />
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{background: i<=strength ? strengthColor[strength] : "rgba(255,255,255,0.08)"}} />
                    ))}
                  </div>
                  <p className="text-xs" style={{color:strengthColor[strength]}}>{strengthLabel[strength]}</p>
                </div>
              )}

              {errors.password && touched.password && (
                <p className="error-msg flex items-center gap-1.5 mt-1.5 text-red-400" style={{fontSize:"11px"}}>
                  <AlertIcon /> {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <button
                onClick={() => {
                  setAgreed(!agreed);
                  if (touched.agreed) setErrors(prev => ({ ...prev, agreed: !agreed ? undefined : "You must agree to the Terms of Service." }));
                }}
                className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: agreed ? "linear-gradient(135deg,#7c3aed,#db2777)" : errors.agreed && touched.agreed ? "rgba(239,68,68,0.1)" : "transparent",
                  border: agreed ? "none" : errors.agreed && touched.agreed ? "1.5px solid rgba(239,68,68,0.6)" : "1.5px solid rgba(255,255,255,0.2)",
                }}
              >
                {agreed && <CheckIcon />}
              </button>
              <p className="text-slate-500 text-xs leading-relaxed">
                I agree to ShopVera's{" "}
                <span className="text-violet-400 hover:text-violet-300 cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-violet-400 hover:text-violet-300 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
            {errors.agreed && touched.agreed && (
              <p className="error-msg flex items-center gap-1.5 mt-1.5 ml-7 text-red-400" style={{fontSize:"11px"}}>
                <AlertIcon /> {errors.agreed}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full cursor-pointer py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
            style={{
              background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg,#7c3aed 0%,#a21caf 50%,#db2777 100%)",
              boxShadow: "0 8px 30px rgba(124,58,237,0.4)",
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 ">
                <div className="w-4 h-4  rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Creating account…</span>
              </div>
            ) : "Create Account"}
          </button>

          <p className="text-center text-slate-500 text-xs mt-5">
            Already have an account?{" "}
            <NavLink to="/login">
              <span className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium transition-colors">Sign in</span>
            </NavLink>
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Protected by industry-grade encryption · <span className="text-slate-500">SOC 2 Compliant</span>
        </p>
      </div>
    </div>
  );
}
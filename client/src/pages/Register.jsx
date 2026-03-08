import { useState, useRef, useEffect, useCallback } from "react";
import { RegisterProduct } from "../api/api";

const useNavigate = () => (path) => {
  console.log(`[Router] Redirecting to: ${path}`);
};

const CATEGORIES = [
  "Electronics", "Clothing & Apparel", "Home & Garden", "Sports & Outdoors",
  "Books & Media", "Beauty & Personal Care", "Toys & Games", "Automotive",
  "Food & Grocery", "Health & Wellness", "Office Supplies", "Jewelry & Accessories",
];

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const styles = {
    success: {
      bar: "bg-emerald-500",
      icon: "bg-emerald-500/20 text-emerald-400",
      border: "border-emerald-500/20",
      path: "M5 13l4 4L19 7",
    },
    error: {
      bar: "bg-rose-500",
      icon: "bg-rose-500/20 text-rose-400",
      border: "border-rose-500/20",
      path: "M6 18L18 6M6 6l12 12",
    },
  };
  const s = styles[toast.type] || styles.success;

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div className={`bg-slate-800 border ${s.border} rounded-2xl shadow-2xl shadow-black/40 overflow-hidden w-80`}>
        <div className={`h-0.5 ${s.bar}`} />
        <div className="p-4 flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full ${s.icon} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={s.path} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors mt-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="h-0.5 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full ${s.bar} opacity-60 animate-shrink`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ value, onChange, error }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
            <svg className={`w-9 h-9 transition-all duration-150 drop-shadow-sm ${
              star <= (hovered || value) ? "text-amber-400" : "text-slate-700"
            }`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        {value > 0 && (
          <span className="ml-3 text-sm text-slate-300 self-center font-mono font-semibold">
            {value}.00 <span className="text-slate-500 font-normal">/ 5.00</span>
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

const Field = ({ label, required, error, hint, children }) => (
  <div>
    <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
      {label}{required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    {children}
    {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    {error && (
      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        {error}
      </p>
    )}
  </div>
);

const ic = (err) =>
  `w-full bg-slate-800/60 border ${err ? "border-rose-500/60" : "border-slate-700/60"} rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 ${err ? "focus:ring-rose-500/30" : "focus:ring-indigo-500/30"} focus:border-transparent transition-all duration-200 hover:border-slate-600`;

const ImageUpload = ({ preview, onFile, onClear, error }) => {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFile(file);
  }, [onFile]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  return (
    <div>
      <div
        onClick={() => !preview && inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden
          ${error ? "border-rose-500/50 bg-rose-500/5" : dragging ? "border-indigo-400 bg-indigo-500/10" : "border-slate-700 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/60"}
          ${preview ? "cursor-default" : "cursor-pointer"}`}
        style={{ minHeight: "180px" }}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Product preview" className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                Preview
              </span>
              <button type="button" onClick={onClear}
                className="text-xs text-white bg-rose-500/80 hover:bg-rose-500 backdrop-blur-sm px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-colors ${dragging ? "bg-indigo-500/20" : "bg-slate-700/50"}`}>
              <svg className={`w-7 h-7 transition-colors ${dragging ? "text-indigo-400" : "text-slate-400"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-300">
              {dragging ? "Drop image here" : "Click or drag image here"}
            </p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP, GIF — max 10 MB</p>
            <button type="button" onClick={() => inputRef.current.click()}
              className="mt-4 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg transition-all duration-150">
              Browse Files
            </button>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" name="productImage"/>
      {error && (
        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", category: "", rating: 0, description: "", price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  const handleImageFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors(p => ({ ...p, image: "File size must be under 10 MB" }));
      return;
    }
    setImageFile(file);
    setErrors(p => ({ ...p, image: undefined }));
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    else if (form.name.trim().length < 3) e.name = "Minimum 3 characters";
    if (!form.category) e.category = "Please select a category";
    if (!imageFile) e.image = "Please upload a product image";
    if (form.rating === 0) e.rating = "Please select a rating";
    if (!form.description.trim()) e.description = "Description is required";
    else if (form.description.trim().length < 20) e.description = "At least 20 characters required";
    if (!form.price) e.price = "Price is required";
    else if (isNaN(form.price) || parseFloat(form.price) <= 0) e.price = "Enter a valid price greater than 0";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setToast({ type: "error", title: "Validation Failed", message: "Please fix the highlighted fields before submitting." });
      return;
    }

    setLoading(true);

    await new Promise(r => setTimeout(r, 1500));

    const payload = {
      name: form.name.trim(),
      category: form.category,
      pic_url: imagePreview,
      rating: parseFloat(`${form.rating}.00`),
      description: form.description.trim(),
      price: parseFloat(form.price),
      _meta: {
        imageFile: {
          name: imageFile.name,
          size: `${(imageFile.size / 1024).toFixed(1)} KB`,
          type: imageFile.type,
          lastModified: new Date(imageFile.lastModified).toISOString(),
        },
        registeredAt: new Date().toISOString(),
        registeredBy: "admin",
      },
    };

    console.group("📦 New Product Registered");
    console.log("%cFull Payload", "color: #818cf8; font-weight: bold;", payload);
    console.log("%cDB Columns", "color: #34d399; font-weight: bold;");
    console.log({
      name:        payload.name,
      category:    payload.category,
      pic_url:     payload.pic_url.substring(0, 60) + "...",
      rating:      payload.rating,
      description: payload.description,
      price:       payload.price,
    });
    console.log("%cFile Info", "color: #fb923c; font-weight: bold;", payload._meta.imageFile);
    console.log("%cRegistered At", "color: #94a3b8;", payload._meta.registeredAt);
    console.groupEnd();

    const formData = new FormData();
    formData.append("username", payload.name);
    formData.append("productImage", imageFile);
    formData.append("desc", payload.description);
    formData.append("category", payload.category);
    formData.append("rating", payload.rating);
    formData.append("price", payload.price);

    const resp = RegisterProduct(formData);
    console.log("registered", resp);

    setLoading(false);
    setToast({
      type: "success",
      title: "Product Registered!",
      message: `"${payload.name}" has been added. Redirecting to admin...`,
    });
navigate("/admin")
    handleReset()
  };

  const handleReset = () => {
    setForm({ name: "", category: "", rating: 0, description: "", price: "" });
    clearImage();
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] flex items-start justify-center p-4 py-12"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Syne:wght@700;800;900&display=swap');
        select option { background: #1a1f2e; }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(110%) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .animate-shrink    { animation: shrink 4s linear forwards; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 1.1s linear infinite; }
        @keyframes shimmer-slide {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }
        .btn-shimmer:hover .shimmer { animation: shimmer-slide 0.7s ease-in-out; }
      `}</style>

      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="w-full max-w-2xl">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs tracking-widest text-indigo-400 uppercase font-semibold">Admin Panel</span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Register
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Product
            </span>
          </h1>
          <p className="text-slate-400 mt-3 text-sm max-w-sm leading-relaxed">
            Upload product details to publish it on the storefront. Fields marked
            <span className="text-rose-400"> *</span> are required.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Product Name */}
            <Field label="Product Name" required error={errors.name}>
              <input type="text" value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                className={ic(!!errors.name)} maxLength={255} />
            </Field>

            {/* Category */}
            <Field label="Category" required error={errors.category}>
              <div className="relative">
                <select value={form.category}
                  onChange={e => handleChange("category", e.target.value)}
                  className={`${ic(!!errors.category)} appearance-none pr-10 cursor-pointer`}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </Field>

            {/* Image Upload */}
            <Field label="Product Image" required
              hint="High-quality image recommended. PNG, JPG, WebP, GIF — max 10 MB">
              <ImageUpload
                preview={imagePreview}
                onFile={handleImageFile}
                onClear={clearImage}
                error={errors.image}
              />
            </Field>

            {/* Rating */}
            <Field label="Initial Rating" required>
              <StarRating value={form.rating}
                onChange={v => handleChange("rating", v)}
                error={errors.rating} />
            </Field>

            {/* Price */}
            <Field label="Price" required error={errors.price}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none select-none">$</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => handleChange("price", e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`${ic(!!errors.price)} pl-8`}
                />
              </div>
            </Field>

            {/* Description */}
            <Field label="Description" required error={errors.description}>
              <div className="relative">
                <textarea value={form.description}
                  onChange={e => handleChange("description", e.target.value)}
                  placeholder="Describe the product — features, materials, dimensions, use cases..."
                  rows={5}
                  className={`${ic(!!errors.description)} resize-none`} />
                <span className={`absolute bottom-3 right-3 text-xs font-mono select-none pointer-events-none ${
                  form.description.length > 900 ? "text-amber-400" : "text-slate-700"
                }`}>
                  {form.description.length}
                </span>
              </div>
            </Field>

            <div className="h-px bg-slate-800" />

            <div className="flex gap-3">
              <button type="button" onClick={handleReset} disabled={loading}
                className="px-6 py-3.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium hover:text-slate-200 hover:border-slate-600 hover:bg-slate-800/40 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                Reset
              </button>
              <button type="submit" disabled={loading}
                className="btn-shimmer flex-1 relative bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:bg-indigo-900 disabled:text-indigo-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50 overflow-hidden">
                <span className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {loading ? (
                  <>
                    <svg className="w-4 h-4 spin-slow" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Register Product
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        <div className="flex items-center justify-center gap-6 mt-5">
          <span className="flex items-center gap-1.5 text-xs text-slate-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin access only
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            Redirects to /admin on success
          </span>
        </div>
      </div>
    </div>
  );
}
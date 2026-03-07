import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts, fetchUsers, updateProduct } from "../api/api";




/* ─── Seed Data ─── */




  


  


const CATEGORIES = ["Bags", "Outerwear", "Footwear", "Tops", "Bottoms", "Jewelry", "Accessories"];

const getStatus = (stock) => stock === 0 ? "Out of Stock" : stock <= 5 ? "Low Stock" : "Active";

/* ─── Inline SVG icons ─── */
const Icons = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  products:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  users:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  plus:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  close:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  logout:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  search:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star:      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  menu:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  arrow:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  bag:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
};

/* ── Status Badge ── */
function StatusBadge({ stock }) {
  const status = getStatus(stock);
  const cfg = {
    Active: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    "Low Stock": "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    "Out of Stock": "bg-red-500/10 text-red-400 ring-red-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 tracking-wide ${cfg[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

/* ── Stat Card ── */
function StatCard({ label, value, change, icon, gradient, delay }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[140px] group cursor-default"
      style={{ background: gradient, animationDelay: delay }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "rgba(255,255,255,0.03)" }} />
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-white backdrop-blur-sm">
          {icon}
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-white/60 bg-white/10 px-2 py-1 rounded-full">
          {Icons.arrow} {change}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
        <p className="text-sm text-white/60 font-medium tracking-wide">{label}</p>
      </div>
      {/* Decorative circle */}
      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/5" />
    </div>
  );
}

/* ── Edit Modal ── */
function EditModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({ ...product });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(145deg,#1a1a2e,#16213e)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Edit Product</h3>
            <p className="text-sm text-white/40 mt-0.5">Update product details</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            {Icons.close}
          </button>
        </div>
        {/* Image preview */}
        <div className="px-8 pt-6 flex items-center gap-4">
          <img src={product.pic_url} alt={product.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10" />
          <div>
            <p className="text-white font-semibold">{product.name}</p>
            <p className="text-white/40 text-sm">{product.category}</p>
          </div>
        </div>
        <div className="px-8 pb-8 pt-6 grid grid-cols-2 gap-4">
          {[["Product Name", "name", "text", "col-span-2"], ["Price ($)", "price", "number", ""], ["Stock Qty", "stock", "number", ""]].map(([lbl, key, type, span]) => (
            <div key={key} className={span}>
              <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">{lbl}</label>
              <input type={type} value={form[key]}
                onChange={e => set(key, type === "number" ? Number(e.target.value) : e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#1a1a2e" }}>{c}</option>)}
            </select>
          </div>
          <button onClick={onClose} className="col-span-1 py-3 rounded-xl text-sm font-semibold text-white/50 transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Cancel
          </button>
          <button onClick={() => onSave(form)}
            className="col-span-1 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#c9a84c,#e2c06b)", color: "#0a0800" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Modal ── */
function DeleteModal({ product, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl" style={{ background: "linear-gradient(145deg,#1a1a2e,#16213e)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" className="w-7 h-7">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Delete Product</h3>
        <p className="text-white/40 text-sm mb-8">You're about to remove <span className="text-white font-medium">"{product.name}"</span>. This action is permanent.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/50" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Keep It
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Users Modal ── */
function UsersModal({ onClose }) {
const [users,setUsers]=useState([])
console.log("ok");

useEffect(()=>{
  fetchUsers().then((resp)=>{
    console.log(resp,"response");
setUsers(resp)

}).catch((err)=>{
    console.log(err);
    
  })
},[])

  const tierColors = ["#c9a84c", "#94a3b8", "#c4a882", "#94a3b8", "#c9a84c", "#94a3b8"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(145deg,#1a1a2e,#16213e)", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
        <div className="flex items-center justify-between px-8 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Registered Users</h3>
            <p className="text-white/40 text-sm mt-0.5">{users.length} members in ShopVera</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              {users.length} Total
            </span>
            <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              {Icons.close}
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-6 space-y-3">
          {users.map((u, i) => (
            <div key={u.id} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
               <img
                        
                        src={`${u.profile_image_url}`}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.15)" }}/>
                         
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{u.username}</p>
                <p className="text-xs text-white/35 truncate">{u.email}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-sm font-bold" style={{ color: "#c9a84c" }}>${Math.random().toFixed(2)*100}</p>
                <p className="text-xs text-white/35">{u.orders} orders</p>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <p className="text-xs text-white/25 mb-0.5">Joined</p>
                <p className="text-xs text-white/50">{u.joined}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════ MAIN COMPONENT ══════ */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
const [users,setUsers]=useState([])
console.log("ok");

  useEffect(() => { 
  
fetchProducts()
  .then((data) => {
    console.log(data, "products response");
    setProducts(data); // just use data directly
  })
  .catch((err) => {
    console.log(err);
  });

fetchUsers()
  .then((data) => {
    console.log(data, "users response");

if(!data){
  setUsers([]);
  return
}


    setUsers(data); // use data directly
  })
  .catch((err) => {
    console.log(err);
  });
  
    setTimeout(() => setMounted(true), 50); 
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    revenue: products.reduce((s, p) => s + p.price * p.sales, 0),
    products: products.length,
    users: users.length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  const handleSaveEdit = updated => {


    console.log(updated);


    updateProduct(updated)

    
    // setProducts(prev => prev.map(p => p.id === updated.id ? { ...updated, status: getStatus(updated.stock) } : p));
    setEditTarget(null);
  };

  const handleDelete = () => {


console.log(deleteTarget);


deleteProduct(deleteTarget.id)


    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Icons.dashboard },
    { id: "products",  label: "Products",  icon: Icons.products  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body { background: #0d0d1a; font-family: 'Outfit', sans-serif; }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 99px; }

        /* Page fade-in */
        @keyframes pageIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .page-in { animation: pageIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }
        .delay-5 { animation-delay: 0.4s; }

        /* Sidebar */
        .sidebar { transition: transform 0.35s cubic-bezier(.22,1,.36,1); }
        @media (max-width:767px) {
          .sidebar { position:fixed; top:0; left:0; height:100vh; z-index:40; transform:translateX(-100%); }
          .sidebar.open { transform:translateX(0); }
        }

        /* Nav active */
        .nav-item { transition: all 0.2s; position: relative; }
        .nav-item.active {
          background: linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05));
          color: #c9a84c;
        }
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 60%;
          background: linear-gradient(180deg,#c9a84c,#e2c06b);
          border-radius: 0 3px 3px 0;
        }
        .nav-item:not(.active):hover { background: rgba(255,255,255,0.04); }

        /* Table rows */
        .trow { transition: background 0.15s; }
        .trow:hover { background: rgba(255,255,255,0.025); }

        /* Product card */
        .product-card { transition: all 0.25s cubic-bezier(.22,1,.36,1); }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }

        /* Gold button */
        .btn-gold {
          background: linear-gradient(135deg,#c9a84c 0%,#e2c06b 50%,#c9a84c 100%);
          background-size: 200% 100%;
          color: #0a0800;
          font-weight: 700;
          transition: all 0.3s;
        }
        .btn-gold:hover { background-position: 100% 0; box-shadow: 0 8px 30px rgba(201,168,76,0.35); transform: translateY(-1px); }
        .btn-gold:active { transform: translateY(0); }

        /* Glass card */
        .glass {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
        }

        /* Glow behind sidebar logo */
        .logo-glow { box-shadow: 0 0 30px rgba(201,168,76,0.3); }

        select option { background: #1a1a2e; }

        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div className="flex min-h-screen" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(99,60,180,0.05) 0%, transparent 50%), #0d0d1a" }}>

        {/* ══════ MOBILE OVERLAY ══════ */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ══════ SIDEBAR ══════ */}
        <aside className={`sidebar w-64 flex flex-col ${sidebarOpen ? "open" : ""}`}
          style={{ background: "linear-gradient(180deg, rgba(18,18,32,0.98) 0%, rgba(13,13,26,0.98) 100%)", borderRight: "1px solid rgba(255,255,255,0.06)", minHeight: "100vh" }}>

          {/* Brand */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center logo-glow"
                style={{ background: "linear-gradient(135deg,#c9a84c,#e2c06b)" }}>
                <span className="text-[#0a0800]">{Icons.bag}</span>
              </div>
              <div>
                <p className="font-bold text-white tracking-widest text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>SHOPVERA</p>
                <p className="text-[10px] tracking-widest" style={{ color: "rgba(201,168,76,0.55)" }}>ADMIN CONSOLE</p>
              </div>
            </div>

            {/* Admin badge */}
            <div className="mt-6 p-3 rounded-2xl flex items-center gap-3" style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.12)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg,#c9a84c,#a07830)", color: "#0a0800" }}>A</div>
              <div>
                <p className="text-xs font-semibold text-white">Administrator</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Full Access</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-1">
            <p className="text-[10px] font-bold tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>NAVIGATION</p>
            {navItems.map(n => (
              <button key={n.id} onClick={() => { setTab(n.id); setSidebarOpen(false); }}
                className={`nav-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-left ${tab === n.id ? "active" : "text-white/40"}`}>
                {n.icon} {n.label}
              </button>
            ))}

            <div className="pt-4">
              <p className="text-[10px] font-bold tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>MANAGEMENT</p>
              <button onClick={() => { setShowUsers(true); setSidebarOpen(false); }}
                className="nav-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-left text-white/40">
                {Icons.users}
                <span>Users</span>
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
                  {users.length}
                </span>
              </button>

              <button onClick={() => navigate("/register")}
                className="nav-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-left text-white/40">
                {Icons.plus}
                Add New Product
              </button>
            </div>
          </nav>

          {/* Bottom */}
          <div className="px-4 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={() => navigate("/admin-login")}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/30 hover:text-white/60 transition-colors">
              {Icons.logout} Sign Out
            </button>
          </div>
        </aside>

        {/* ══════ MAIN CONTENT ══════ */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* ── Top Bar ── */}
          <header className="flex items-center gap-4 px-6 py-4 sticky top-0 z-20"
            style={{ background: "rgba(13,13,26,0.85)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}>

            <button className="md:hidden text-white/50 hover:text-white transition-colors" onClick={() => setSidebarOpen(true)}>
              {Icons.menu}
            </button>

            {/* Page title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {tab === "dashboard" ? "Dashboard Overview" : "Product Management"}
              </h2>
              <p className="text-xs text-white/35 mt-0.5">
                {tab === "dashboard" ? "Welcome back — here's what's happening" : "Manage your product catalog"}
              </p>
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
              <button onClick={() => setShowUsers(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                <LogOut color="red" size={20}
                onClick={()=>{
                    localStorage.removeItem("isAuthenticate");
                    navigate("/")
                }}></LogOut>
              
              </button>
              <button onClick={() => setShowUsers(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                {Icons.users}
                <span className="hidden sm:inline">Users</span>
                <span className="text-xs px-1.5 py-0.5 rounded-lg font-bold" style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c" }}>
                  {users.length}
                </span>
              </button>
              <button onClick={() => navigate("/register")}
                className="btn-gold flex items-center gap-2 px-4 py-2 rounded-xl text-sm">
                {Icons.plus}
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </header>

          {/* ════════ DASHBOARD TAB ════════ */}
          {tab === "dashboard" && (
            <main className="flex-1 p-6 overflow-y-auto space-y-8">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Total Revenue" value={`$${(50000 / 1000).toFixed(0)}k`} change="+12.4%" delay="0s"
                  gradient="linear-gradient(135deg,#1e3a5f 0%,#0f2640 100%)"
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
                <StatCard label="Total Products" value={stats.products} change="+2 new" delay="0.06s"
                  gradient="linear-gradient(135deg,#3d1e5f 0%,#270f40 100%)"
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>} />
                <StatCard label="Registered Users" value={stats.users} change="+3 this wk" delay="0.12s"
                  gradient="linear-gradient(135deg,#1e5f3a 0%,#0f4026 100%)"
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
                <StatCard label="Out of Stock" value={stats.outOfStock} change="Restock now" delay="0.18s"
                  gradient="linear-gradient(135deg,#5f1e1e 0%,#400f0f 100%)"
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} />
              </div>

              {/* Products Grid + Users Panel */}
              <div className="grid xl:grid-cols-3 gap-6">

                {/* Featured Products */}
                <div className="xl:col-span-2 page-in delay-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Products</h3>
                    <button onClick={() => setTab("products")} className="text-xs font-semibold transition-colors" style={{ color: "#c9a84c" }}>
                      Manage all →
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {products.map((p, i) => (
                      <div key={p.id} className="product-card glass rounded-2xl p-4 flex gap-4 cursor-default"
                        style={{ animationDelay: `${i * 60}ms` }}>
                        <img src={p.pic_url} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate mb-0.5">{p.name}</p>
                          <p className="text-xs text-white/40 mb-2">{p.category}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold" style={{ color: "#c9a84c" }}>${p.price}</p>
                            <StatusBadge stock={p.stock} />
                          </div>
                          <div className="flex items-center gap-1 mt-1.5" style={{ color: "#f59e0b" }}>
                            {Icons.star}
                            <span className="text-[11px] text-white/40">{p.rating}</span>
                            <span className="text-[11px] text-white/25 ml-1">·</span>
                            <span className="text-[11px] text-white/30">{p.sales} sold</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Users */}
                <div className="page-in delay-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Top Customers</h3>
                    <button onClick={() => setShowUsers(true)} className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
                      View all →
                    </button>
                  </div>
                  <div className="glass rounded-2xl overflow-hidden">
                    {users.map((u, i) => (
                      <div key={u.id} className="flex items-center gap-3 px-4 py-3.5 trow"
                        style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                        <span className="text-xs font-bold w-4 shrink-0" style={{ color: i === 0 ? "#c9a84c" : "rgba(255,255,255,0.2)" }}>
                          {i + 1}
                        </span>
                        <img
                        
                        src={`${u.profile_image_url}`}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.15)" }}/>
                         
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{u.username}</p>
                          <p className="text-[10px] text-white/30">{u.email} email</p>
                        </div>
                        <p className="text-xs font-bold shrink-0" style={{ color: "#c9a84c" }}>${Math.random().toFixed(2)*100}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="page-in delay-4">
                <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Actions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Add New Product",
                      desc: "List a new item to your catalog",
                      action: () => navigate("/register"),
                      gradient: "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
                      border: "rgba(201,168,76,0.25)",
                      gold: true,
                    },
                    {
                      title: "Manage Inventory",
                      desc: "Edit, update or remove products",
                      action: () => setTab("products"),
                      gradient: "rgba(255,255,255,0.03)",
                      border: "rgba(255,255,255,0.07)",
                      gold: false,
                    },
                    {
                      title: "View All Users",
                      desc: `${users.length} registered members`,
                      action: () => setShowUsers(true),
                      gradient: "rgba(255,255,255,0.03)",
                      border: "rgba(255,255,255,0.07)",
                      gold: false,
                    },
                  ].map(a => (
                    <button key={a.title} onClick={a.action}
                      className="p-5 rounded-2xl text-left transition-all hover:scale-[1.02] hover:shadow-xl"
                      style={{ background: a.gradient, border: `1px solid ${a.border}` }}>
                      <p className="text-sm font-bold mb-1.5" style={{ color: a.gold ? "#c9a84c" : "#f0ece4" }}>{a.title}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{a.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </main>
          )}

          {/* ════════ PRODUCTS TAB ════════ */}
          {tab === "products" && (
            <main className="flex-1 p-6 overflow-y-auto space-y-6">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-in">
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>All Products</h2>
                  <p className="text-white/35 text-sm mt-0.5">{products.length} items in catalog</p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">{Icons.search}</span>
                    <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
                      className="pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none w-44 sm:w-56"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Outfit', sans-serif" }} />
                  </div>
                  <button onClick={() => navigate("/register")} className="btn-gold flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
                    {Icons.plus} <span className="hidden sm:inline">Add Product</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="glass rounded-2xl overflow-hidden page-in delay-1">
                {/* Table Head */}
                <div className="hidden md:grid px-6 py-3.5 text-[11px] font-bold tracking-widest uppercase"
                  style={{ gridTemplateColumns: "2.5fr 1fr 80px 70px 110px 90px", color: "rgba(255,255,255,0.25)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span className="text-right">Actions</span>
                </div>

                {filtered.length === 0 ? (
                  <div className="py-20 text-center text-white/25 text-sm">No products match your search.</div>
                ) : filtered.map((p, i) => (
                  <div key={p.id} className="trow" style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    {/* Desktop */}
                    <div className="hidden md:grid items-center px-6 py-4 gap-4"
                      style={{ gridTemplateColumns: "2.5fr 1fr 80px 70px 110px 90px" }}>
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img src={p.pic_url} alt={p.name} className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-white/10" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                          <div className="flex items-center gap-1 mt-0.5" style={{ color: "#f59e0b" }}>
                            {Icons.star}
                            <span className="text-[11px] text-white/35">{p.rating} · {p.sales} sold</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-white/40">{p.category}</span>
                      <span className="text-sm font-bold" style={{ color: "#c9a84c" }}>${p.price}</span>
                      <span className="text-sm" style={{ color: p.stock === 0 ? "#f87171" : "rgba(255,255,255,0.55)" }}>{p.stock === 0 ? "—" : p.stock}</span>
                      <StatusBadge stock={p.stock} />
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditTarget(p)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}>
                          {Icons.edit}
                        </button>
                        <button onClick={() => setDeleteTarget(p)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                          {Icons.trash}
                        </button>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-4 px-4 py-4">
                      <img src={p.pic_url} alt={p.username} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{p.user}</p>
                        <p className="text-xs text-white/40 mb-1.5">{p.category} · <span style={{ color: "#c9a84c" }}>${p.price}</span></p>
                        <StatusBadge stock={p.stock} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setEditTarget(p)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c" }}>
                          {Icons.edit}
                        </button>
                        <button onClick={() => setDeleteTarget(p)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                          {Icons.trash}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {editTarget   && <EditModal product={editTarget} onSave={handleSaveEdit} onClose={() => setEditTarget(null)} />}
      {deleteTarget && <DeleteModal product={deleteTarget} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />}
      {showUsers    && <UsersModal onClose={() => setShowUsers(false)} />}
    </>
  );
}
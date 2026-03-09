import { NavLink, useParams } from 'react-router'




import { useEffect, useState } from "react";
import { fetchDetail } from '../api/api';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../slice/slice';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';


const reviews = [
  { id: 1, user: "Alex M.", avatar: "AM", rating: 5, comment: "Absolutely stunning device. The  quality is unreal.", date: "Jan 12, 2025" },
  { id: 2, user: "Sarah K.", avatar: "SK", rating: 4, comment: "Fast, smooth, and premium feel. Worth every penny.", date: "Feb 3, 2025" },
  { id: 3, user: "Jordan T.", avatar: "JT", rating: 5, comment: "Best I've ever owned. Screen is gorgeous.", date: "Mar 8, 2025" },
];

const StarRating = ({ rating, size = "sm" }) => {
  const full = Math.floor(rating);
  const partial = rating - full;
  const sizeClass = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${sizeClass}`} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`star-${i}-${size}`}>
              <stop offset={i < full ? "100%" : i === full ? `${partial * 100}%` : "0%"} stopColor="#f59e0b" />
              <stop offset={i < full ? "100%" : i === full ? `${partial * 100}%` : "0%"} stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i < full ? "#f59e0b" : i === full && partial > 0 ? "url(#star-fill)" : "#d1d5db"}
          />
          {i === full && partial > 0 && (
            <>
              <defs>
                <linearGradient id="star-fill" x1="0" x2="1" y1="0" y2="0">
                  <stop offset={`${partial * 100}%`} stopColor="#f59e0b" />
                  <stop offset={`${partial * 100}%`} stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill="url(#star-fill)"
              />
            </>
          )}
        </svg>
      ))}
    </div>
  );
};

export default function Detail() {

  
  
  
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedColor, setSelectedColor] = useState(0);
  const [product, setProduct] = useState({});
  
  const params=useParams();
  console.log(params);

const dispatch=useDispatch()
  useEffect(()=>{
const data=fetchDetail(params).then((res)=>{
console.log(res);
setProduct(res.data[0])
});
// console.log("detail",data);

  },[])
  const colors = [
    { name: "Space Gray", bg: "bg-gray-800", ring: "ring-gray-800" },
    { name: "Silver", bg: "bg-gray-200", ring: "ring-gray-300" },
    { name: "Gold", bg: "bg-yellow-200", ring: "ring-yellow-300" },
  ];

  const handleCart = () => {
    setAddedToCart(true);


dispatch(AddToCart(product))

toast.success("Item Added To Cart")
    // setTimeout(() => setAddedToCart(false), 2000);
  };

  const inStock = parseInt(product.quantity) > 0;




useEffect(()=>{
const inCartItems=JSON.parse(localStorage.getItem("cart"))


if(!AddToCart)return setAddedToCart(false)

  const exists = inCartItems?.some(item => item.id === product.id);


console.log(product,inCartItems,exists);




if (exists) {
    setAddedToCart(true);


}else{
  setAddedToCart(false)
}

},[product])




console.log("products",product);









  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        minHeight: "100vh",
      }}
      className="text-white"
    >
      {/* Ambient background blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span>›</span>
          <span className="hover:text-white cursor-pointer transition-colors">{product.category}</span>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{product.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>

          {/* LEFT — Image */}
          <div style={{ position: "relative" }}>
            {/* Glow behind image */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "24px",
              background: "radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 70%)",
              filter: "blur(40px)", transform: "scale(0.85)"
            }} />
            <div style={{
              position: "relative",
              background: "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "420px",
            }}>
              {/* Wishlist button */}
              <button
                onClick={() => {setWishlist(!wishlist)
               if (!wishlist) {
                toast.success("Added to favorites") 
               }else{
                toast.error("Removed to favorites") 
               }
                }
                }
                style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: wishlist ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)",
                  border: `1px solid ${wishlist ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.15)"}`,
                  borderRadius: "50%", width: "44px", height: "44px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill={wishlist ? "#ef4444" : "none"} stroke={wishlist ? "#ef4444" : "rgba(255,255,255,0.6)"} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              {/* Badge */}
              <div style={{
                position: "absolute", top: "16px", left: "16px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "8px", padding: "4px 12px",
                fontSize: "11px", fontWeight: "700", letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                Pro
              </div>

              <img
                src={product.pic_url}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x380/1e1e3a/6366f1?text=iPhone+Xs+Max";
                }}
                style={{ maxHeight: "340px", objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(99,102,241,0.4))" }}
              />
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: "64px", height: "64px", borderRadius: "12px",
                  background: i === 1 ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))" : "rgba(255,255,255,0.04)",
                  border: i === 1 ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col gap-6">
            {/* Category tag */}
            <div className="flex items-center gap-2">
              <span style={{
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "6px", padding: "3px 10px", fontSize: "11px",
                color: "#a5b4fc", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {product.category}
              </span>
              {inStock ? (
                <span style={{ color: "#34d399", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                  In Stock
                </span>
              ) : (
                <span style={{ color: "#f87171", fontSize: "12px", fontWeight: "600" }}>Out of Stock</span>
              )}
            </div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "800", lineHeight: "1.1", letterSpacing: "-0.02em", margin: 0 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={parseFloat(product.rating)} size="lg" />
              <span style={{ fontSize: "22px", fontWeight: "700", color: "#fbbf24" }}>{product.rating}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>({reviews.length} reviews)</span>
            </div>

            {/* Description */}
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7", fontSize: "15px", margin: 0 }}>
              {product.description} Experience the most advanced  ever made, featuring a stunning  display,Quality and look
            </p>

            {/* Specs chips */}
 {params.category=="Electronics"&&
            <div className="flex flex-wrap gap-2">
              {["6.5″ OLED", "flagship", "Face ID", "12MP Dual",].map((spec) => (
                <span key={spec} style={{
                  padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}>
                  {spec}
                </span>
              ))}
            </div>}
 {params.category=="watches"&&
            <div className="flex flex-wrap gap-2">
              {[" OLED", "Premium", "Attractive",].map((spec) => (
                <span key={spec} style={{
                  padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: "600",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}>
                  {spec}
                </span>
              ))}
            </div>}

            {/* Color picker */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.5)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Color — <span style={{ color: "white" }}>{colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-3">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    style={{
                      width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer",
                      border: selectedColor === i ? "3px solid #6366f1" : "3px solid transparent",
                      outline: selectedColor === i ? "2px solid rgba(99,102,241,0.4)" : "none",
                      outlineOffset: "2px", transition: "all 0.2s ease",
                    }}
                    className={c.bg}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Price + Quantity */}
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Price</p>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: "38px", fontWeight: "800", letterSpacing: "-0.02em", background: "linear-gradient(135deg, #fff, #a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    ${product.price}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", textDecoration: "line-through" }}>$1,099.00</span>
                </div>
              </div>

              {/* Qty stepper */}
                <NavLink
                
                to={"/cart"}
                style={{
                padding: "16px 28px", borderRadius: "14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
              }}
              className='flex gap-2'
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.12)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.transform = "translateY(0)"; }}
              >
                Check Cart
                <ShoppingCart size={20} />
              </NavLink>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleCart}
                style={{
                  flex: 1, minWidth: "160px", padding: "16px 28px",
                  background: addedToCart
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", borderRadius: "14px", color: "white",
                  fontWeight: "700", fontSize: "15px", cursor: "pointer",
                  transition: "all 0.3s ease", letterSpacing: "0.01em",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
                  transform: "translateY(0)",
                }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(99,102,241,0.5)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(99,102,241,0.35)"; }}
              
              
              disabled={addedToCart}
              >
                {addedToCart ? "✓ Already into Cart!" : "Add to Cart"}

                
              </button>

              <button style={{
                padding: "16px 28px", borderRadius: "14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.12)"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.transform = "translateY(0)"; }}
              >
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 flex-wrap" style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { icon: "🔒", text: "Secure Payment" },
                { icon: "🚚", text: "Free Shipping" },
                { icon: "↩️", text: "30-Day Returns" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: "500" }}>
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs section */}
        {params.category=="Electronics"&&<div style={{ marginTop: "60px" }}>
          <div className="flex gap-1" style={{
            background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "4px",
            display: "inline-flex", marginBottom: "32px",
          }}>
            {["overview", "specs", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 24px", borderRadius: "10px", border: "none",
                  background: activeTab === tab ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                  color: activeTab === tab ? "white" : "rgba(255,255,255,0.45)",
                  fontWeight: "600", fontSize: "14px", cursor: "pointer",
                  transition: "all 0.2s ease", textTransform: "capitalize",
                  boxShadow: activeTab === tab ? "0 4px 16px rgba(99,102,241,0.3)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {[
                { icon: "📸", title: "Dual Camera", desc: "12MP wide & telephoto lenses with optical zoom and OIS." },
                { icon: "⚡", title: "A12 Bionic", desc: "Next-generation Neural Engine for blazing fast performance." },
                { icon: "🖥️", title: "Super Retina OLED", desc: "6.5-inch all-screen OLED with HDR, True Tone, and wide color." },
                { icon: "🔋", title: "All-Day Battery", desc: "Up to 25 hours talk time and wireless charging support." },
              ].map((feat) => (
                <div key={feat.title} style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{feat.icon}</div>
                  <h3 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "8px" }}>{feat.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "specs" && (
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px", overflow: "hidden",
            }}>
              {[
                ["Display", "6.5-inch Super Retina OLED"],
                ["Chip", "A12 Bionic with Neural Engine"],
                ["Camera", "12MP Dual camera system"],
                ["Battery", "Up to 25 hrs talk time"],
                ["Storage", "64GB / 256GB / 512GB"],
                ["Water Resistance", "IP68 (2m, 30 min)"],
                ["Face ID", "Yes"],
                ["iOS", "iOS 12 (upgradable)"],
              ].map(([key, val], i) => (
                <div key={key} className="flex justify-between items-center" style={{
                  padding: "16px 24px",
                  borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", fontWeight: "500" }}>{key}</span>
                  <span style={{ fontWeight: "600", fontSize: "14px" }}>{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {/* Summary */}
              <div style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                border: "1px solid rgba(99,102,241,0.2)", borderRadius: "16px",
                padding: "24px", display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap",
              }}>
                <div className="text-center">
                  <div style={{ fontSize: "56px", fontWeight: "800", lineHeight: 1, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {product.rating}
                  </div>
                  <StarRating rating={parseFloat(product.rating)} size="lg" />
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>{reviews.length} reviews</div>
                </div>
                <div className="flex-1" style={{ minWidth: "200px" }}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const pct = (count / reviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-2" style={{ marginBottom: "6px" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", width: "8px" }}>{star}</span>
                        <svg viewBox="0 0 12 12" width="12" height="12"><polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#fbbf24" /></svg>
                        <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "100px", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #fbbf24, #f59e0b)", borderRadius: "100px" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", width: "16px" }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual reviews */}
              {reviews.map((review) => (
                <div key={review.id} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px", padding: "20px",
                  transition: "border-color 0.2s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", fontSize: "13px", flexShrink: 0,
                    }}>
                      {review.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>{review.user}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{review.date}</div>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react'

import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from "react-redux";
import { AddToCart, RemoveToCart } from '../slice/slice';
import { NavLink } from 'react-router';

const ProductCards = () => {

 

const dispatch=useDispatch()

      useEffect(()=>{
        const data=fetch("http://localhost:8000/data").then((res)=>{
  return res.json()
}).then((data)=>{
  // console.log("data",data);
  setProducts(data)
  
}).catch((err)=>{
  console.log("err",err);
  
})
.finally(()=>{
  // console.log("API is Called and resp is received");
  
})

    },[])
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());
  const [products,setProducts] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);


  const inCartItems =JSON.parse(localStorage.getItem("cart")) || [];









  const toggleFavorite = (id) => {

  
    
    setFavorites(prev => {
      const  newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
                toast.error("removed from favorite")

      } else {
        newSet.add(id);
                toast.success("added to favorite")

      }
      return newSet;
    });
  };


  const toggleCart = (id,exists) => {  
    // console.log(id,"called",cart);
    setCart(prev => {
      
      const newSet = new Set(prev);

      if (newSet.has(id)||exists) {
        newSet.delete(id);
     
    } else {
        newSet.add(id);

      }
      return newSet;
    
    
    
    
    
    
    });




   const newSet = new Set(cart);
    // newSet = new Set(cart);
      console.log("loop1",newSet);
      if (newSet.has(id)||exists) {
        newSet.delete(id);
        toast.error(`removed from cart `)

        const cart=products.filter((curr)=>curr.id==id)

// console.log(cart,"removed");

dispatch(RemoveToCart(cart[0]))
    } else {
        newSet.add(id);
const cart=products.filter((curr)=>curr.id==id)

// console.log(cart,"added");

dispatch(AddToCart(cart[0]))

        toast.success(`item added to cart`)
      }


    
  };






// 


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-black bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Premium Devices
          </h1>
          <p className="text-slate-400 text-lg font-light tracking-wide">
            Discover the latest in mobile technology
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => {
          // console.log(index);
          // console.log(inCartItems[index]?.id==product.id ,inCartItems,product.id,inCartItems[index]?.id)
        
        const exists = inCartItems.some(item => item.id === product.id);

// console.log(exists); // true
        
          return(
            <>
            
            <div
            key={product.id}
            className="group relative"
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Container */}
            <div className="relative bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20 hover:border-purple-500/50">
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-linear-to-br from-slate-700/30 to-slate-800/30">
                <img
                  src={product.pic_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:bg-slate-800 z-10"
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-300 ${
                      favorites.has(product.id)
                        ? 'fill-pink-500 stroke-pink-500'
                        : 'stroke-slate-300'
                    }`}
                  />
                </button>

                {/* Quick View Badge */}
                <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/90 backdrop-blur-md border border-cyan-400/30 transition-all duration-300 ${
                  hoveredCard === product.id ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 -translate-y-2'
                }`}>
                  <Eye size={14} className="text-white" />
                  <NavLink to={`/shop/${product.id}/category/electronics`} className="text-xs font-semibold text-white cursor-pointer">Quick View</NavLink>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30">
                  <span className="text-xs font-semibold text-purple-300">{product.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(parseFloat(product.rating))
                            ? 'fill-yellow-400 stroke-yellow-400'
                            : 'fill-slate-600 stroke-slate-600'
                        } transition-all duration-300`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-300">
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    ${Math.floor(product.price * 1.2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      
                      
                      toggleCart(product.id,exists)}}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      exists
                        ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : 'bg-linear-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span className="text-sm">
                      {exists ? 'In Cart' : 'Add to Cart'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
          </div></>
          )
})}
      </div>

  
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductCards;
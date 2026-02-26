import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Lock, Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveToCart } from '../slice/slice';
import { toast } from 'sonner';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const cart=useSelector((state)=>state)
  console.log(cart.IncrementReducer);
const dispatch=useDispatch()
  useEffect(()=>{
    
setCartItems(cart.IncrementReducer)
  },[])




  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Number(item.quantity) + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
     const cart=cartItems.filter((curr)=>curr.id==id)
    
  toast.error("Item removed from Cart")
    
    dispatch(RemoveToCart(cart[0]))
  };

  const toggleSaved = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo({ code: promoCode, discount: 0.10 });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-slate-100 ">


      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-slate-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
      </div>

     <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  {/* Page Header */}
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-3">
      <ShoppingBag className="w-8 h-8 text-slate-800" strokeWidth={1.5} />
      <h1 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight">Shopping Cart</h1>
    </div>
    <p className="text-slate-600 text-lg font-light ml-11">
      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
    </p>
  </div>

  <div className="grid lg:grid-cols-3 gap-8">
    {/* Cart Items Section */}
    <div className="lg:col-span-2 space-y-4">
      {cartItems.length === 0 ? (
        <div className="bg-white/70 rounded-2xl shadow-sm border border-slate-200/50 p-16 text-center">
          <ShoppingBag className="w-20 h-20 text-slate-300 mx-auto mb-4" strokeWidth={1} />
          <p className="text-slate-500 text-xl font-light">Your cart is empty</p>
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-4 sm:p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200/50">
                  <img
                    src={item.pic_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button
                  onClick={() => toggleSaved(item.id)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Heart
                    className={`w-4 h-4 ${item.saved ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-amber-100/80 text-amber-800 text-xs font-medium rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-1 truncate">{item.name}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed line-clamp-2">{item.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">{item.rating}</span>
                </div>

                {/* Price and Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <div className="text-2xl sm:text-3xl font-light text-slate-900">
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    {item.quantity > 1 && (
                      <span className="text-sm text-slate-500 ml-2 font-normal">
                        ${Number(item.price).toFixed(2)} each
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-slate-100/80 rounded-xl px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-slate-600 hover:text-slate-900 transition-colors p-1 hover:bg-white rounded-lg"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-slate-900 font-medium w-8 text-center">
                        {Number(item.quantity)}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-slate-600 hover:text-slate-900 transition-colors p-1 hover:bg-white rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Free Shipping Banner */}
      {cartItems.length > 0 && (
        <div className="bg-linear-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-2xl border border-amber-200/50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
              </div>
              <p className="text-sm font-medium text-amber-900">
                {subtotal >= 500
                  ? '🎉 You qualify for free shipping!'
                  : `Add $${(500 - subtotal).toFixed(2)} more for free shipping`}
              </p>
            </div>
            {subtotal < 500 && (
              <div className="w-24 sm:w-32 h-2 bg-amber-200/50 rounded-full overflow-hidden flex-shrink-0">
                <div
                  className="h-full bg-linear-to-r from-amber-500 to-amber-600 transition-all duration-500"
                  style={{ width: `${(subtotal / 500) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Order Summary Sidebar */}
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <h2 className="text-2xl font-light text-slate-900 mb-6">Order Summary</h2>

          {/* Promo Code */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 min-w-0 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
              <button
                onClick={applyPromo}
                className="px-4 sm:px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium text-sm flex-shrink-0"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                ✓ Code "{appliedPromo.code}" applied - {appliedPromo.discount * 100}% off
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span className="font-light">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-green-600">
                <span className="font-light">Discount</span>
                <span className="font-medium">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span className="font-light">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-light">Tax (8%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline mb-6">
            <span className="text-lg font-medium text-slate-900">Total</span>
            <span className="text-3xl font-light text-slate-900">${total.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
          onClick={()=>{
console.log(total.toFixed(2));

          }}
            disabled={cartItems.length === 0}
            className="w-full bg-linear-to-r from-slate-900 to-slate-800 text-white py-4 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Proceed to Checkout
          </button>

          {/* Security Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="w-3 h-3" />
            <span className="font-light">Secure checkout · SSL encrypted</span>
          </div>

          {/* Accepted Payment Methods */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-3 font-medium">We accept</p>
            <div className="flex justify-center gap-3 opacity-60">
              {['VISA', 'MC', 'AMEX', 'PP'].map((method) => (
                <div key={method} className="w-10 h-7 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-600">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 bg-slate-900/5 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-5 space-y-3">
          {[
            { title: 'Free Returns', sub: '30-day return policy' },
            { title: 'Warranty Included', sub: '1-year manufacturer warranty' },
          ].map(({ title, sub }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{title}</p>
                <p className="text-xs text-slate-600 font-light">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
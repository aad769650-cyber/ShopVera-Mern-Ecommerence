import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, Package, LogOut, UserCircle, LogIn, Home } from 'lucide-react';
import { toast } from 'sonner';
import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(7);


const cart=useSelector((state)=>state)
// console.log("inCart",cart);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Beauty',
    'Sports',
    'Books',
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },

    { name: 'About', href: '/about' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5'
            : 'bg-white'
        }`}
      >               
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0 group cursor-pointer">
              <div className="relative">
                <h1 className="">
                 <img src="/logo.svg" alt="Main Logo" className='w-30 h-20' />
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({isActive})=>`relative px-4 py-2 text-sm font-medium  transition-all duration-300 hover:text-slate-900 group ${isActive?"text-black":"text-slate-700"}`}
                
                
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:text-slate-900 group"
                  aria-expanded={categoriesOpen}
                  aria-label="Categories menu"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      categoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Categories Dropdown Menu */}
                {categoriesOpen && (
                  <div
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                    className="absolute top-7 left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 py-2 animate-fadeIn"
                  >
                    {categories.map((category, index) => (
                      <a
                        key={category}
                        href={`#${category.toLowerCase()}`}
                        className="block px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Bar - Desktop */}
              <div className="hidden md:block">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-64 pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 focus:w-80 placeholder:text-slate-400"
                    aria-label="Search products"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors duration-300" />
                </div>
              </div>

              {/* Search Button - Mobile */}
              <button
                onClick={() => setSearchExpanded(!searchExpanded)}
                className="md:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
           
              {/* Cart */}
              <NavLink
              to={"/cart"}
                className="relative p-2.5 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300 group"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
               
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {cart.IncrementReducer.length}
                  </span>
                
              </NavLink>

              {/* User Profile - Desktop */}
              <div className="hidden sm:block relative ">
                <button
                  onClick={() => {
                    console.log(userMenuOpen);
                    
                    setUserMenuOpen(!userMenuOpen)}}
                  className="p-2.5 text-slate-700 cursor-pointer hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300 group"
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                 {/* <NavLink to={"/signup"}> */}
                   <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
               
                 {/* </NavLink> */}
              
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 py-2 animate-fadeIn">
                    <NavLink
                    to={"/login"}

                    onClick={() => {
                    console.log(userMenuOpen);
                    
                    setUserMenuOpen(!userMenuOpen)}}
                      className="flex items-center space-x-3 px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </NavLink>
                    <NavLink
                      to={"/signup"}
                        onClick={() => {
                    console.log(userMenuOpen);
                    
                    setUserMenuOpen(!userMenuOpen)}}

                      className="flex items-center space-x-3 px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>Register</span>
                    </NavLink>
                    <div className="my-2 border-t border-slate-100"></div>
                    <NavLink
                     to={"/cart"}
                  
    onClick={() => {
                    console.log(userMenuOpen);
                    
                    setUserMenuOpen(!userMenuOpen)}}
                      className="flex items-center space-x-3 px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                      <Package className="w-4 h-4" />
                      <span>My Orders</span>
                    </NavLink>
                    <NavLink
                      to="/"
                       onClick={()=> setUserMenuOpen(!userMenuOpen)}
                      // onClick={setUserMenuOpen(!userMenuOpen)}

                      className="flex items-center space-x-3 px-5 py-3 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" 
                       
                         />
                      <span>Logout</span>
                    </NavLink>
                  </div>
 )} 
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-300"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Expanded */}
          {searchExpanded && (
            <div className="md:hidden py-4 animate-slideDown">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 placeholder:text-slate-400"
                  aria-label="Search products"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl lg:hidden animate-slideInRight overflow-y-auto">
            <div className="p-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile - Mobile */}
              <div className="mb-6 p-4 bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Welcome!</p>
                    <p className="text-xs text-slate-600">Sign in to continue</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-all duration-300 text-center"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all duration-300 text-center"
                  >
                    Register
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 mb-6">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="px-4 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <a
                      key={category}
                      href={`#${category.toLowerCase()}`}
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-300"
                      style={{ animationDelay: `${(index + 5) * 50}ms` }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="px-4 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Account
                </h3>
                <div className="space-y-1">
                  <a
                    href="#orders"
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-300"
                  >
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </a>
                  <a
                    href="#logout"
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Demo Content */}
    

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;
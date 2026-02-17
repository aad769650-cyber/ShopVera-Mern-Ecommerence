import { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Send,
  ShoppingBag,
  MapPin,
  Phone,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const customerService = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Track Order', href: '/track' }
  ];

  const accountLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Wishlist', href: '/wishlist' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'Linkedin', icon: Linkedin, href: '#', color: 'hover:text-blue-500' }
  ];

  const paymentMethods = [
    { name: 'Visa', image: '💳' },
    { name: 'Mastercard', image: '💳' },
    { name: 'PayPal', image: '🅿️' },
    { name: 'Apple Pay', image: '🍎' }
  ];

  return (
    <footer className="relative bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-300 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-linear(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                           linear-linear(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Section - Spans 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <ShoppingBag className="text-white" size={24} />
                  </div>
                  <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <span className="text-2xl font-black bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ShopVera
                </span>
              </div>

              {/* Brand Description */}
              <p className="text-slate-400 leading-relaxed text-sm">
                Your premier destination for cutting-edge electronics and premium devices. We bring innovation to your doorstep with unmatched quality and service.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors duration-300">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-slate-400">123 Tech Street, Silicon Valley, CA 94025</span>
                </div>
                <div className="flex items-center gap-3 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors duration-300">
                    <Phone size={16} className="text-purple-400" />
                  </div>
                  <span className="text-slate-400">+92 3281700284</span>
                </div>
                <div className="flex items-center gap-3 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors duration-300">
                    <Mail size={16} className="text-pink-400" />
                  </div>
                  <span className="text-slate-400">aad769650@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-b from-cyan-500 to-purple-500 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-0 h-0.5 bg-linear-to-r from-cyan-500 to-purple-500 group-hover:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Customer Service
              </h3>
              <ul className="space-y-3">
                {customerService.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-slate-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 group-hover:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Links - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-b from-pink-500 to-orange-500 rounded-full"></div>
                My Account
              </h3>
              <ul className="space-y-3">
                {accountLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-slate-400 hover:text-pink-400 transition-all duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-0 h-0.5 bg-linear-to-r from-pink-500 to-orange-500 group-hover:w-3 transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-b from-orange-500 to-cyan-500 rounded-full"></div>
                Newsletter
              </h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Subscribe to get exclusive deals, product launches, and tech news delivered to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-slate-800 transition-all duration-300 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-linear-to-r from-cyan-500 to-purple-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
                
                {/* Success Message */}
                {isSubscribed && (
                  <div className="absolute top-full mt-2 left-0 right-0 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
                    <p className="text-green-400 text-xs font-semibold">✓ Successfully subscribed!</p>
                  </div>
                )}
              </form>

              {/* Social Media Icons */}
              <div className="mt-6">
                <p className="text-slate-400 text-sm mb-3 font-semibold">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-slate-700 hover:border-slate-600 ${social.color}`}
                        aria-label={social.name}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-slate-400 text-sm text-center lg:text-left">
              <p>© 2026 <span className="font-semibold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ShopVera</span>. All rights reserved.</p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CreditCard size={16} className="text-slate-500" />
                <span className="font-semibold">We Accept</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Visa */}
                <div className="w-12 h-8 rounded-md bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-cyan-500 transition-all duration-300 group">
                  <svg viewBox="0 0 48 32" className="w-8 h-5">
                    <rect width="48" height="32" fill="white" rx="3"/>
                    <text x="24" y="20" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#1434CB" textAnchor="middle">VISA</text>
                  </svg>
                </div>

                {/* Mastercard */}
                <div className="w-12 h-8 rounded-md bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-orange-500 transition-all duration-300 group">
                  <svg viewBox="0 0 48 32" className="w-8 h-5">
                    <rect width="48" height="32" fill="white" rx="3"/>
                    <circle cx="18" cy="16" r="8" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="w-12 h-8 rounded-md bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-blue-500 transition-all duration-300 group">
                  <svg viewBox="0 0 48 32" className="w-8 h-5">
                    <rect width="48" height="32" fill="#003087" rx="3"/>
                    <text x="24" y="20" fontFamily="Arial" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">PayPal</text>
                  </svg>
                </div>

                {/* Apple Pay */}
                <div className="w-12 h-8 rounded-md bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-white transition-all duration-300 group">
                  <svg viewBox="0 0 48 32" className="w-8 h-5">
                    <rect width="48" height="32" fill="black" rx="3"/>
                    <text x="12" y="19" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white">🍎</text>
                    <text x="24" y="19" fontFamily="Arial" fontSize="7" fontWeight="normal" fill="white">Pay</text>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Gradient Accent */}
      <div className="h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;
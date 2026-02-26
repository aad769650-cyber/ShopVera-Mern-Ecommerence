import React from 'react';

export default function ShopveraHero() {




  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 py-4">
      {/* Animated background orbs */}
         <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{background:"rgba(255,255,237,0.15)"}} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{background:"rgba(255,255,255,0.12)"}} />
          <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)",backgroundSize:"40px 40px"}} />
        </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-fuchsia-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Brand Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase text-violet-300">
                Shopvera
              </span>
            </div>

            {/* Gradient Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Elevate Your
              </span>
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x-reverse">
                Shopping Experience
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Where innovation meets style. Discover curated collections that blend cutting-edge design 
              with timeless elegance, crafted for those who refuse to settle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-linear-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50">
                <span className="relative z-10">Start Shopping</span>
                <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="px-8 py-4 border-2 border-slate-600 rounded-full font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition-all duration-300">
                View Collection
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-800">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  100K+
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Active Users</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-linear-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  25K+
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Products</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative animate-fade-in-up animation-delay-200">
            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
                  alt="Shopping experience"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-4 shadow-2xl shadow-violet-500/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Flash Sale</div>
                  <div className="text-xs text-slate-400">Up to 70% OFF</div>
                </div>
              </div>
            </div>

        

            {/* Decorative Elements */}
            <div className="absolute top-1/4 -left-12 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse animation-delay-500" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-x-reverse {
          0%, 100% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }

        .animate-gradient-x-reverse {
          background-size: 200% 200%;
          animation: gradient-x-reverse 8s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
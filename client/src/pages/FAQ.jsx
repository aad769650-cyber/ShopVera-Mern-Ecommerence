import { useState } from 'react';
import { ChevronDown, HelpCircle, Package, CreditCard, RefreshCw, Shield, Truck, MessageCircle } from 'lucide-react';

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Ordering',
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'Simply browse our catalog, add items to your cart, and proceed to checkout. You can pay securely using various payment methods including credit cards, PayPal, and Apple Pay. Once your order is confirmed, you\'ll receive a confirmation email with your order details.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Yes! You can modify or cancel your order within 2 hours of placing it. Go to "My Orders" in your account dashboard and select the order you wish to change. After 2 hours, the order enters processing and cannot be modified.'
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost and estimated delivery date at checkout before finalizing your purchase.'
        }
      ]
    },
    {
      category: 'Payment',
      icon: CreditCard,
      color: 'from-violet-500 to-purple-500',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with 256-bit SSL encryption for your safety.'
        },
        {
          question: 'Is it safe to use my credit card on your site?',
          answer: 'Absolutely! We use industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your complete credit card details on our servers.'
        },
        {
          question: 'Do you offer installment payment options?',
          answer: 'Yes! For orders over $500, we offer flexible installment plans through Affirm and Klarna. You can choose 3, 6, or 12-month payment plans with competitive interest rates at checkout.'
        }
      ]
    },
    {
      category: 'Shipping',
      icon: Truck,
      color: 'from-emerald-500 to-teal-500',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days, Express shipping takes 1-2 business days, and overnight shipping delivers the next business day. International orders typically arrive within 7-14 business days depending on the destination.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in real-time by logging into your account and visiting the "Track Order" section.'
        },
        {
          question: 'What if my package is damaged or lost?',
          answer: 'All shipments are fully insured. If your package arrives damaged or goes missing, contact our support team within 48 hours with your order number and photos (if damaged). We\'ll either replace the item or issue a full refund.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      icon: RefreshCw,
      color: 'from-orange-500 to-red-500',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in resalable condition. Digital products and custom orders are non-returnable. Simply initiate a return from your account dashboard.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Once we receive your return, we\'ll inspect it and process your refund within 3-5 business days. The refund will be credited to your original payment method. Bank processing times may vary, typically 5-10 business days.'
        },
        {
          question: 'Who pays for return shipping?',
          answer: 'If the return is due to our error (wrong item, defective product), we\'ll provide a prepaid shipping label. For other returns, customers are responsible for return shipping costs unless you have ShopHub Premium membership.'
        }
      ]
    },
    {
      category: 'Product Support',
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-500',
      questions: [
        {
          question: 'Do products come with a warranty?',
          answer: 'Yes! All products come with the manufacturer\'s warranty. Most electronics have a 1-year warranty, while select premium items have extended 2-3 year warranties. Extended warranty options are also available at checkout.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Our support team is available 24/7 via live chat, email (support@shophub.com), or phone (+1-555-123-4567). Average response time is under 2 hours for emails and instant for live chat.'
        },
        {
          question: 'Do you offer technical support for products?',
          answer: 'Yes! Our technical support team can help with setup, troubleshooting, and general questions about your products. We also have detailed setup guides and video tutorials in our Help Center.'
        }
      ]
    }
  ];

  const toggleQuestion = (questionIndex) => {
    setOpenIndex(openIndex === questionIndex ? null : questionIndex);
  };

  const currentCategory = faqs[selectedCategory];

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-linear(circle, rgba(148, 163, 184, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-float">
                <HelpCircle className="text-white" size={40} />
              </div>
              <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about ordering, shipping, returns, and more. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          
          {/* Category Tabs */}
          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {faqs.map((category, index) => {
                const CategoryIcon = category.icon;
                const isActive = selectedCategory === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(index);
                      setOpenIndex(null); // Reset open question when switching categories
                    }}
                    className={`relative p-4 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-linear-to-br text-white shadow-xl'
                        : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
                    }`}
                    style={isActive ? {
                      backgroundImage: `linear-linear(to bottom right, ${category.color.includes('blue') ? '#3b82f6, #06b6d4' : 
                                                                          category.color.includes('violet') ? '#8b5cf6, #a855f7' :
                                                                          category.color.includes('emerald') ? '#10b981, #14b8a6' :
                                                                          category.color.includes('orange') ? '#f97316, #ef4444' :
                                                                          '#ec4899, #f43f5e'})`
                    } : {}}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                    )}
                    
                    <div className="relative flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                      }`}>
                        <CategoryIcon size={20} />
                      </div>
                      <span className="text-sm font-semibold text-center">
                        {category.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Category Header */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${currentCategory.color} flex items-center justify-center shadow-lg`}>
              <currentCategory.icon className="text-white" size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {currentCategory.category}
            </h2>
            <div className={`flex-1 h-0.5 bg-linear-to-r ${currentCategory.color} opacity-30`}></div>
          </div>

          {/* Questions for Selected Category */}
          <div className="space-y-3">
            {currentCategory.questions.map((faq, questionIndex) => {
              const isOpen = openIndex === questionIndex;
              
              return (
                <div
                  key={questionIndex}
                  className="group"
                >
                  <div className={`backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isOpen 
                      ? 'bg-slate-800/60 border-indigo-500/50 shadow-xl shadow-indigo-500/20' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/40 hover:border-slate-600/50'
                  }`}>
                    
                    {/* Question Button */}
                    <button
                      onClick={() => toggleQuestion(questionIndex)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-linear-to-br ${currentCategory.color} flex-shrink-0 transition-all duration-300 ${
                          isOpen ? 'scale-150' : 'scale-100'
                        }`}></div>
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isOpen 
                          ? `bg-linear-to-br ${currentCategory.color}` 
                          : 'bg-slate-700/50 group-hover:bg-slate-700'
                      }`}>
                        <ChevronDown 
                          className={`transition-all duration-500 ${
                            isOpen ? 'rotate-180 text-white' : 'rotate-0 text-slate-400'
                          }`}
                          size={20}
                        />
                      </div>
                    </button>

                    {/* Answer */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 pt-2">
                        <div className={`pl-6 border-l-2 border-linear-to-b ${currentCategory.color}`}>
                          <p className="text-slate-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
     

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
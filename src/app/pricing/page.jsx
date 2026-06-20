"use client";

import { useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "@gravity-ui/icons";

export default function PricingPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const currentPlan = (user?.plan || "free").toLowerCase();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Ideal for casual art lovers and curious collectors.",
      maxPurchases: "3 paintings",
      features: [
        "Up to 3 artwork purchases allowed",
        "Standard gallery browsing support",
        "Community chat access",
        "Secure checkout and basic security",
      ],
      isPopular: false,
      color: "border-[#D6CFC4] bg-[#EDE9E1]",
      buttonColor: "border border-[#D6CFC4] hover:bg-[#F7F4EF] hover:border-[#1E1E1E] text-[#1E1E1E]",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/ month",
      priceId: "price_1TkLaS3r2bTEFkmmoN8FZVnl",
      description: "Perfect for active art collectors building their personal collection.",
      maxPurchases: "9 paintings",
      features: [
        "Up to 9 artwork purchases allowed",
        "Priority customer support lines",
        "Early access to exclusive art exhibitions",
        "High-definition artwork zoom access",
        "Verification badge on profile",
      ],
      isPopular: true,
      color: "border-[#C2693F] bg-[#EDE9E1] shadow-[0_4px_20px_rgba(194,105,63,0.12)]",
      buttonColor: "bg-[#C2693F] hover:bg-[#A3522E] text-[#F7F4EF] shadow-md",
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/ month",
      priceId: "price_1TkM043r2bTEFkmmtLTzhJ0X",
      description: "Designed for premium gallerists and ultimate art enthusiasts.",
      maxPurchases: "Unlimited",
      features: [
        "Unlimited artwork purchases",
        "Dedicated curator assistance (24/7)",
        "Zero purchasing convenience fees",
        "Certificate of Authenticity generation",
        "Exclusive VIP artist interviews & previews",
      ],
      isPopular: false,
      color: "border-[#1E1E1E] bg-[#EDE9E1]",
      buttonColor: "bg-[#1E1E1E] hover:bg-zinc-800 text-[#F7F4EF] shadow-md",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-semibold text-[#C2693F] tracking-widest uppercase font-['DM_Mono']">
            Pricing Plans
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Choose a Membership Tier
          </h1>
          <p className="font-['DM_Sans'] text-sm sm:text-base text-[#6B6560] leading-relaxed">
            Support original creators, expand your collection capabilities, and access exclusive gallery services.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => {
            const isCurrent = currentPlan.includes(plan.name.toLowerCase());
            
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between p-8 rounded-[12px] border ${plan.color}`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 right-6 bg-[#C2693F] text-[#F7F4EF] text-[11px] font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-md font-['DM_Mono']">
                    Popular
                  </span>
                )}

                <div>
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1E1E1E]">{plan.name}</h3>
                    <p className="text-xs text-[#6B6560] mt-2 leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-4xl font-bold text-[#1E1E1E] font-['DM_Mono']">{plan.price}</span>
                    {plan.period && <span className="text-xs text-[#6B6560]">{plan.period}</span>}
                  </div>

                  {/* Limit Badge */}
                  <div className="py-3 border-t border-b border-[#D6CFC4] my-6 flex items-center justify-between">
                    <span className="text-xs text-[#6B6560] uppercase tracking-wider font-semibold">Max Purchases</span>
                    <span className="text-sm font-semibold text-[#C2693F] bg-[#C2693F]/10 px-3 py-0.5 rounded-full">
                      {plan.maxPurchases}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-[13px] text-[#6B6560] leading-relaxed">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4.5 h-4.5 text-[#C2693F] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Form */}
                <div className="mt-auto">
                  {isCurrent ? (
                    <div className="w-full h-11 inline-flex items-center justify-center bg-[#D6CFC4] text-[#6B6560] text-sm font-semibold rounded-[6px] cursor-default">
                      Your Current Plan
                    </div>
                  ) : plan.name === "Free" ? (
                    <div className="w-full h-11 inline-flex items-center justify-center bg-[#D6CFC4] text-[#6B6560] text-sm font-semibold rounded-[6px] cursor-default">
                      Basic Plan
                    </div>
                  ) : (
                    <form action="/api/checkout_sessions" method="POST" className="w-full">
                      <input type="hidden" name="priceId" value={plan.priceId} />
                      <button
                        type="submit"
                        role="link"
                        className={`w-full h-11 inline-flex items-center justify-center text-sm font-semibold rounded-[6px] transition-colors duration-200 cursor-pointer ${plan.buttonColor}`}
                      >
                        Upgrade to {plan.name}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

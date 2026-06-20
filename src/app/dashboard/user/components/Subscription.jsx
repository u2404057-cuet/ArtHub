"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Check } from "@gravity-ui/icons";

export default function Subscription() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  
  // Normalize current plan (Free is default)
  const currentPlan = (user?.plan || "Free").toLowerCase();
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

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
      buttonColor: "bg-[#C2693F] hover:bg-[#A3522E] text-[#F7F4EF]",
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/ month",
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
      buttonColor: "bg-[#1E1E1E] hover:bg-zinc-800 text-[#F7F4EF]",
    },
  ];

  const handleUpgrade = async (planName) => {
    setLoadingPlan(planName);
    setSuccessMsg("");
    try {
      // Simulate upgrading plan API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMsg(`Successfully upgraded to the ${planName} tier!`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(null);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-['DM_Sans']">
      {/* Title */}
      <div>
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1E1E1E]">Subscription Tiers</h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1">Select the subscription tier that best fits your art collection journey.</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-[6px] bg-green-50 text-green-800 border border-green-200 text-sm max-w-3xl flex items-center gap-2">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.name.toLowerCase();
          
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between p-6 rounded-[12px] border ${plan.color}`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 right-6 bg-[#C2693F] text-[#F7F4EF] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-['DM_Mono']">
                  Popular
                </span>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-4">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1E1E1E]">{plan.name}</h3>
                  <p className="text-xs text-[#6B6560] mt-1.5 min-h-[36px]">{plan.description}</p>
                </div>

                {/* Plan Price */}
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-bold text-[#1E1E1E] font-['DM_Mono']">{plan.price}</span>
                  {plan.period && <span className="text-xs text-[#6B6560]">{plan.period}</span>}
                </div>

                {/* Max Purchases Allowed */}
                <div className="py-2.5 border-t border-b border-[#D6CFC4] my-4 flex items-center justify-between">
                  <span className="text-xs text-[#6B6560] uppercase tracking-wider font-semibold">Max Purchases</span>
                  <span className="text-sm font-semibold text-[#C2693F] bg-[#C2693F]/10 px-2.5 py-0.5 rounded-full">
                    {plan.maxPurchases}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mt-6 mb-8 text-xs text-[#6B6560]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C2693F] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                {isCurrent ? (<>
                  <div className="w-full h-11 inline-flex items-center justify-center bg-[#D6CFC4] text-[#6B6560] text-sm font-semibold rounded-[6px] cursor-default">
                    Current Plan
                  </div>
                </>) : (
                    <>
                    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link" className="w-full h-11 inline-flex items-center justify-center bg-[#D6CFC4] text-[#6B6560] text-sm font-semibold rounded-[6px] cursor-default">
          Checkout
        </button>
      </section>
    </form>
                  <button
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={loadingPlan !== null}
                    className={`w-full h-11 inline-flex items-center justify-center text-sm font-semibold rounded-[6px] transition-colors duration-200 cursor-pointer disabled:opacity-50 ${plan.buttonColor}`}
                  >
                    {loadingPlan === plan.name ? "Processing..." : `Choose ${plan.name}`}
                  </button></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

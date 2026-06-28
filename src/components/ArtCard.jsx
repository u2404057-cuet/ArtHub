"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Check, Xmark } from "@gravity-ui/icons";
import { createPortal } from "react-dom";

export default function ArtCard({ artwork }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Modal & Toast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "success", message: "" });
  const [purchasing, setPurchasing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe fallbacks and database property mapping
  const id = artwork?._id || artwork?.id || "#";
  const title = artwork?.title || "Untitled Artwork";
  const artist = artwork?.artistName || artwork?.artist || "Unknown Artist";
  const rawPrice = artwork?.price;
  const price = typeof rawPrice === "number" ? `$${rawPrice.toLocaleString()}` : rawPrice || "Contact for Price";
  const imageSrc = artwork?.imageUrl || artwork?.image || "/art_tools_composition.png";

  // Auto-dismiss toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleBuyClick = () => {
    if (!session || !session.user) {
      router.push("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    setIsModalOpen(false);
    setPurchasing(true);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artworkId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          setToastConfig({
            type: "error",
            message: data.error || "Purchase limit reached. Redirecting to upgrades...",
          });
          setShowToast(true);
          setTimeout(() => {
            router.push("/pricing");
          }, 3000);
        } else {
          setToastConfig({
            type: "error",
            message: data.error || "Failed to purchase artwork.",
          });
          setShowToast(true);
        }
      } else {
        setToastConfig({
          type: "success",
          message: data.message || `Successfully purchased "${title}"!`,
        });
        setShowToast(true);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setToastConfig({
        type: "error",
        message: "An error occurred during purchase. Please try again.",
      });
      setShowToast(true);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <div className="group bg-[#EDE9E1] rounded-[8px] overflow-hidden shadow-[0_2px_12px_rgba(30,30,30,0.07)] transition-transform duration-300 hover:-translate-y-1 relative">
        {/* Thumbnail Container: Strict 4:3 Aspect Ratio */}
        <div className="w-full aspect-[4/3] overflow-hidden bg-[#D6CFC4] relative">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Details Footer */}
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-['DM_Sans'] font-semibold text-[17px] text-[#1E1E1E] leading-tight truncate">
                {title}
              </h3>
              <span className="font-['DM_Mono'] text-sm font-semibold text-[#C2693F] whitespace-nowrap">
                {price}
              </span>
            </div>
            <p className="font-['DM_Sans'] font-light text-[13px] text-[#6B6560]">
              by {artist}
            </p>
          </div>

          {/* Action Buttons: Details and Buy Artwork */}
          <div className="pt-3 border-t border-[#D6CFC4]/50 flex gap-3">
            <Link
              href={`/artworks/${id}`}
              className="flex-grow basis-1/2 h-9 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#C2693F] hover:text-[#C2693F] transition-colors duration-200 cursor-pointer text-center"
            >
              Details
            </Link>
            <button
              onClick={handleBuyClick}
              disabled={purchasing}
              className="flex-grow basis-1/2 h-9 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-xs font-['DM_Sans'] font-medium rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200 cursor-pointer shadow-sm text-center disabled:opacity-55"
            >
              {purchasing ? "Buying..." : "Buy Artwork"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {mounted && typeof window !== "undefined" && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-[#1E1E1E]/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-[#EDE9E1] border border-[#D6CFC4] rounded-[12px] p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 font-['DM_Sans']">
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1E1E1E] border-b border-[#D6CFC4] pb-3 mb-4">
              Confirm Purchase
            </h3>
            <p className="text-sm text-[#6B6560] leading-relaxed mb-6">
              Are you sure you want to purchase <strong className="text-[#1E1E1E]">{title}</strong> by {artist} for <strong className="text-[#C2693F] font-mono">{price}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-10 px-4 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-xs font-medium rounded-[6px] hover:bg-[#F7F4EF] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="h-10 px-5 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-xs font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors cursor-pointer shadow-sm"
              >
                Confirm & Buy
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Custom Premium Toast Alert */}
      {mounted && typeof window !== "undefined" && showToast && createPortal(
        <div className="fixed bottom-6 right-6 z-[110] max-w-xs w-full bg-[#EDE9E1] border-l-4 rounded-[6px] p-4 shadow-[0_4px_20px_rgba(30,30,30,0.15)] flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 font-['DM_Sans'] text-xs border-[#C2693F]">
          <div className="flex gap-2">
            {toastConfig.type === "success" ? (
              <Check className="w-4 h-4 text-[#C2693F] flex-shrink-0 mt-0.5" />
            ) : (
              <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <div>
              <p className="font-semibold text-[#1E1E1E]">
                {toastConfig.type === "success" ? "Purchase Successful" : "Purchase Error"}
              </p>
              <p className="text-[#6B6560] mt-1">{toastConfig.message}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-[#6B6560] hover:text-[#1E1E1E] transition-colors cursor-pointer"
          >
            <Xmark className="w-4 h-4" />
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

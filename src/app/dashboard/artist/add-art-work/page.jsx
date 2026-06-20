"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import Link from "next/link";

function AddArtworkForm() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Edit states
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("Painting");
  const [formImage, setFormImage] = useState(null); // File object
  const [formImageUrl, setFormImageUrl] = useState(""); // URL string
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const categories = ["Painting", "Digital", "Sculpture", "Photography", "Drawing", "Mixed Media"];

  // If in edit mode, fetch the artwork details to populate the form
  useEffect(() => {
    if (editId) {
      const fetchArtworkDetails = async () => {
        try {
          // Fetch from standard get artwork route
          const res = await fetch(`/api/artworks`);
          if (res.ok) {
            const data = await res.json();
            const art = (data.artworks || []).find(a => a._id === editId);
            if (art) {
              setFormTitle(art.title || "");
              setFormDescription(art.description || "");
              setFormPrice(art.price || "");
              setFormCategory(art.category || "Painting");
              setFormImageUrl(art.imageUrl || art.image || "");
            }
          }
        } catch (err) {
          console.error("Failed to load artwork details for editing:", err);
        }
      };
      fetchArtworkDetails();
    }
  }, [editId]);

  // Upload image to imgBB
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "f50085a6ad3b0f5ef11e64906f3a3bfb";
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to imgBB.");
    }

    const data = await res.json();
    return data.data.url;
  };

  // Handle Form Submit (Add/Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");

    try {
      let finalImageUrl = formImageUrl;

      // If a new file is uploaded, send it to imgBB first
      if (formImage) {
        finalImageUrl = await uploadToImgBB(formImage);
      }

      if (!finalImageUrl) {
        throw new Error("Please upload an image or provide an image URL.");
      }

      const payload = {
        title: formTitle,
        description: formDescription,
        price: Number(formPrice),
        category: formCategory,
        imageUrl: finalImageUrl,
      };

      let res;
      if (isEditing) {
        res = await fetch("/api/artworks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editId, ...payload }),
        });
      } else {
        res = await fetch("/api/artworks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setFormSuccess(data.message || "Artwork saved successfully!");
        setTimeout(() => {
          router.push("/dashboard/artist");
        }, 1500);
      } else {
        setFormError(data.error || "Failed to save artwork.");
      }
    } catch (err) {
      console.error(err);
      setFormError(err.message || "Something went wrong.");
    } finally {
      setFormLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4">
      {/* Title */}
      <div className="mb-8">
        <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#1E1E1E]">
          {isEditing ? "Edit Artwork Details" : "Add New Artwork"}
        </h2>
        <p className="font-['DM_Sans'] text-sm text-[#6B6560] mt-1.5">
          {isEditing ? "Modify the gallery listing properties below." : "Share your visual creations with ArtHub collectors."}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#EDE9E1] border border-[#D6CFC4] rounded-[8px] p-6 shadow-[0_2px_12px_rgba(30,30,30,0.07)]">
        {formError && (
          <div className="p-4 rounded-[6px] mb-5 bg-red-50 text-red-800 border border-red-200 text-sm font-['DM_Sans']">
            {formError}
          </div>
        )}
        {formSuccess && (
          <div className="p-4 rounded-[6px] mb-5 bg-green-50 text-green-800 border border-green-200 text-sm font-['DM_Sans'] flex items-center gap-2">
            <Check className="w-5 h-5 text-green-700 flex-shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5 font-['DM_Sans'] text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Artwork Title</label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Whispering Ocean"
              className="w-full h-11 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              rows={4}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Provide context or medium details..."
              className="w-full p-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Price (USD)</label>
              <input
                type="number"
                required
                min="1"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                placeholder="e.g. 1450"
                className="w-full h-11 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Upload Image (imgBB)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormImage(e.target.files[0])}
              className="w-full text-xs text-[#6B6560] file:mr-4 file:py-2.5 file:px-4 file:rounded-[6px] file:border file:border-[#D6CFC4] file:bg-[#F7F4EF] file:text-xs file:font-semibold file:text-[#1E1E1E] file:hover:bg-[#EDE9E1] file:cursor-pointer"
            />
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#D6CFC4]"></div>
            <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-[#6B6560] font-['DM_Mono']">or</span>
            <div className="flex-grow border-t border-[#D6CFC4]"></div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">Image URL Link</label>
            <input
              type="url"
              value={formImageUrl}
              onChange={(e) => setFormImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full h-11 px-4 rounded-[6px] border border-[#D6CFC4] bg-[#F7F4EF] text-[#1E1E1E] focus:outline-none focus:border-[#C2693F] transition-colors"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Link
              href="/dashboard/artist"
              className="flex-grow h-11 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] font-medium rounded-[6px] hover:bg-[#F7F4EF] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formLoading}
              className="flex-grow h-11 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors cursor-pointer disabled:opacity-55"
            >
              {formLoading ? "Saving Listing..." : "Save Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddArtworkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="w-8 h-8 border-2 border-t-transparent border-[#C2693F] rounded-full animate-spin"></div>
      </div>
    }>
      <AddArtworkForm />
    </Suspense>
  );
}

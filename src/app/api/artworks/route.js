import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const serverURL = process.env.SERVER_URL || "http://localhost:8000";

// Fetch artworks of the logged-in artist
export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    // Call the backend server "/arts" API route to get all artworks
    const artsRes = await fetch(`${serverURL}/arts`, { cache: "no-store" });
    if (!artsRes.ok) {
      throw new Error("Failed to fetch artworks from the backend server.");
    }
    const allArts = await artsRes.json();

    const artistId = session.user.id || session.user._id || "";

    // Filter artworks belonging to this artist, or return all if the user is an admin
    const artworks = session.user.role === "admin"
      ? allArts
      : allArts.filter(art => 
          art.artistId === artistId || art.artistEmail === session.user.email
        );

    return NextResponse.json({ artworks });
  } catch (err) {
    console.error("Error fetching artist artworks via backend route:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch artworks." }, { status: 500 });
  }
}

// Add a new artwork
export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, price, category, imageUrl } = body;

    if (!title || !price || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const payload = {
      title,
      description: description || "",
      price: Number(price),
      category,
      imageUrl,
      artistId: session.user.id || session.user._id || "",
      artistName: session.user.name,
      artistEmail: session.user.email,
      soldCount: 0,
      available: true,
      createdAt: new Date().toISOString(),
    };

    // Call the backend server "/arts" POST API route to create the artwork
    const artsRes = await fetch(`${serverURL}/arts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!artsRes.ok) {
      throw new Error("Failed to save artwork to the backend server.");
    }

    const data = await artsRes.json();
    return NextResponse.json({ success: true, artworkId: data._id || data.insertedId || "", message: "Artwork added successfully!" });
  } catch (err) {
    console.error("Error creating artwork via backend route:", err);
    return NextResponse.json({ error: err.message || "Failed to create artwork." }, { status: 500 });
  }
}

// Edit/update artwork
export async function PUT(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || session.user.role !== "artist") {
      return NextResponse.json({ error: "Unauthorized. Artist role required." }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, description, price, category, imageUrl } = body;

    if (!id || !title || !price || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const updateFields = {
      title,
      description: description || "",
      price: Number(price),
      category,
      imageUrl,
    };

    // Update via backend PUT route `/arts/:id`
    const artsRes = await fetch(`${serverURL}/arts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateFields),
    });

    if (!artsRes.ok) {
      throw new Error("Failed to update artwork on the backend server.");
    }

    return NextResponse.json({ success: true, message: "Artwork updated successfully!" });
  } catch (err) {
    console.error("Error updating artwork:", err);
    return NextResponse.json({ error: err.message || "Failed to update artwork." }, { status: 500 });
  }
}

// Delete artwork
export async function DELETE(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || (session.user.role !== "artist" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized. Artist or Admin role required." }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Artwork ID is required." }, { status: 400 });
    }

    // Delete via backend DELETE route `/arts/:id`
    const artsRes = await fetch(`${serverURL}/arts/${id}`, {
      method: "DELETE",
    });

    if (!artsRes.ok) {
      throw new Error("Failed to delete artwork from the backend server.");
    }

    return NextResponse.json({ success: true, message: "Artwork deleted successfully!" });
  } catch (err) {
    console.error("Error deleting artwork:", err);
    return NextResponse.json({ error: err.message || "Failed to delete artwork." }, { status: 500 });
  }
}

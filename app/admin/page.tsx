"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  photographer: string;
  image_url: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Football");
  const [photographer, setPhotographer] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    checkUser();
    getGallery();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function getGallery() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setImages(data);
  }

  async function uploadImage() {
    if (!file) {
      alert("Choose an image first.");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    await supabase.from("gallery").insert({
      title,
      category,
      photographer,
      image_url: publicUrl,
    });

    setTitle("");
    setCategory("Football");
    setPhotographer("");
    setFile(null);

    getGallery();
  }

  async function deleteImage(id: string, url: string) {
    const fileName = url.split("/").pop();

    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    await supabase.from("gallery").delete().eq("id", id);

    getGallery();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Gallery CMS
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mb-10 space-y-4">

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Photographer"
            value={photographer}
            onChange={(e) => setPhotographer(e.target.value)}
          />

          <select
            className="w-full p-3 rounded bg-zinc-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Football</option>
            <option>Basketball</option>
            <option>Soccer</option>
            <option>Baseball</option>
            <option>Softball</option>
            <option>Volleyball</option>
            <option>Track</option>
            <option>Other</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={uploadImage}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded"
          >
            Upload Image
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {images.map((image) => (
            <div
              key={image.id}
              className="bg-zinc-900 rounded-xl overflow-hidden"
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 space-y-2">

                <h2 className="text-lg font-bold">
                  {image.title}
                </h2>

                <p className="text-gray-400">
                  {image.category}
                </p>

                <p className="text-sm text-gray-500">
                  📷 {image.photographer}
                </p>

                <button
                  onClick={() => deleteImage(image.id, image.image_url)}
                  className="w-full bg-red-600 hover:bg-red-700 py-2 rounded mt-3"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
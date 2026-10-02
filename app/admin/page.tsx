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

type Article = {
  id: number;
  title: string;
  slug: string;
  author: string;
  category: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

type FeaturedStory = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  story_url: string;
  created_at: string;
  updated_at: string;
};

const categories = [
  "Football",
  "Basketball",
  "Soccer",
  "Baseball",
  "Softball",
  "Volleyball",
  "Track",
  "Other",
];

export default function AdminPage() {
  const router = useRouter();

  // =========================================================
  // GENERAL
  // =========================================================

  const [loading, setLoading] = useState(true);

  // =========================================================
  // ARTICLES
  // =========================================================

  const [articles, setArticles] = useState<Article[]>([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleCategory, setArticleCategory] =
    useState("Football");
  const [articleContent, setArticleContent] = useState("");
  const [articlePublished, setArticlePublished] =
    useState(false);

  const [editingArticleId, setEditingArticleId] =
    useState<number | null>(null);

  // =========================================================
  // FEATURED STORY
  // =========================================================

  const [featuredStory, setFeaturedStory] =
    useState<FeaturedStory | null>(null);

  const [featuredTitle, setFeaturedTitle] = useState("");
  const [featuredDescription, setFeaturedDescription] =
    useState("");
  const [featuredStoryUrl, setFeaturedStoryUrl] =
    useState("");
  const [featuredImageUrl, setFeaturedImageUrl] =
    useState("");
  const [featuredFile, setFeaturedFile] =
    useState<File | null>(null);
  const [savingFeatured, setSavingFeatured] =
    useState(false);

  // =========================================================
  // GALLERY
  // =========================================================

  const [images, setImages] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Football");
  const [photographer, setPhotographer] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    await Promise.all([
      getArticles(),
      getFeaturedStory(),
      getGallery(),
    ]);

    setLoading(false);
  }

  // =========================================================
  // AUTH
  // =========================================================

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // =========================================================
  // ARTICLE HELPERS
  // =========================================================

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function clearArticleForm() {
    setEditingArticleId(null);
    setArticleTitle("");
    setArticleAuthor("");
    setArticleCategory("Football");
    setArticleContent("");
    setArticlePublished(false);
  }

  // =========================================================
  // GET ARTICLES
  // =========================================================

  async function getArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error loading articles:",
        error.message
      );
      return;
    }

    if (data) {
      setArticles(data);
    }
  }

  // =========================================================
  // CREATE ARTICLE
  // =========================================================

  async function createArticle() {
    if (
      !articleTitle.trim() ||
      !articleAuthor.trim() ||
      !articleContent.trim()
    ) {
      alert(
        "Title, author, and article content are required."
      );
      return;
    }

    const slug = makeSlug(articleTitle);

    if (!slug) {
      alert("Please enter a valid article title.");
      return;
    }

    const { error } = await supabase
      .from("articles")
      .insert({
        title: articleTitle.trim(),
        slug,
        author: articleAuthor.trim(),
        category: articleCategory,
        content: articleContent,
        published: articlePublished,
      });

    if (error) {
      alert(error.message);
      return;
    }

    clearArticleForm();
    await getArticles();
  }

  // =========================================================
  // EDIT ARTICLE
  // =========================================================

  function startEditingArticle(article: Article) {
    setEditingArticleId(article.id);
    setArticleTitle(article.title);
    setArticleAuthor(article.author);
    setArticleCategory(article.category);
    setArticleContent(article.content);
    setArticlePublished(article.published);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveArticleChanges() {
    if (editingArticleId === null) return;

    if (
      !articleTitle.trim() ||
      !articleAuthor.trim() ||
      !articleContent.trim()
    ) {
      alert(
        "Title, author, and article content are required."
      );
      return;
    }

    const slug = makeSlug(articleTitle);

    if (!slug) {
      alert("Please enter a valid article title.");
      return;
    }

    const { error } = await supabase
      .from("articles")
      .update({
        title: articleTitle.trim(),
        slug,
        author: articleAuthor.trim(),
        category: articleCategory,
        content: articleContent,
        published: articlePublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingArticleId);

    if (error) {
      alert(error.message);
      return;
    }

    clearArticleForm();
    await getArticles();
  }

  // =========================================================
  // PUBLISH ARTICLE
  // =========================================================

  async function togglePublished(article: Article) {
    const { error } = await supabase
      .from("articles")
      .update({
        published: !article.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", article.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getArticles();
  }

  // =========================================================
  // DELETE ARTICLE
  // =========================================================

  async function deleteArticle(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this article?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    if (editingArticleId === id) {
      clearArticleForm();
    }

    await getArticles();
  }

  // =========================================================
  // GET FEATURED STORY
  // =========================================================

  async function getFeaturedStory() {
    const { data, error } = await supabase
      .from("featured_story")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(
        "Error loading featured story:",
        error.message
      );
      return;
    }

    if (data) {
      setFeaturedStory(data);
      setFeaturedTitle(data.title || "");
      setFeaturedDescription(
        data.description || ""
      );
      setFeaturedStoryUrl(data.story_url || "");
      setFeaturedImageUrl(data.image_url || "");
    } else {
      setFeaturedStory(null);
      setFeaturedTitle("");
      setFeaturedDescription("");
      setFeaturedStoryUrl("");
      setFeaturedImageUrl("");
    }
  }

  // =========================================================
  // FEATURED IMAGE HELPER
  // =========================================================

  function getFeaturedStorageFileName(url: string) {
    if (!url) return null;

    try {
      const decodedUrl = decodeURIComponent(url);
      const marker = "/featured-story/";

      const index = decodedUrl.indexOf(marker);

      if (index === -1) return null;

      return decodedUrl.substring(
        index + marker.length
      );
    } catch {
      return null;
    }
  }

  // =========================================================
  // SAVE FEATURED STORY
  // =========================================================

  async function saveFeaturedStory() {
    if (!featuredTitle.trim()) {
      alert("Enter a featured story title.");
      return;
    }

    if (!featuredStoryUrl.trim()) {
      alert("Enter a story link.");
      return;
    }

    setSavingFeatured(true);

    let finalImageUrl = featuredImageUrl;
    let newlyUploadedFileName: string | null = null;

    // -----------------------------------------
    // UPLOAD NEW IMAGE IF ONE WAS SELECTED
    // -----------------------------------------

    if (featuredFile) {
      const safeFileName = featuredFile.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      newlyUploadedFileName =
        `${Date.now()}-${safeFileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("featured-story")
          .upload(
            newlyUploadedFileName,
            featuredFile
          );

      if (uploadError) {
        setSavingFeatured(false);
        alert(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("featured-story")
        .getPublicUrl(newlyUploadedFileName);

      finalImageUrl = publicUrl;
    }

    // -----------------------------------------
    // CREATE OR UPDATE DATABASE ROW
    // -----------------------------------------

    let databaseError = null;

    if (featuredStory) {
      const { error } = await supabase
        .from("featured_story")
        .update({
          title: featuredTitle.trim(),
          description:
            featuredDescription.trim(),
          story_url: featuredStoryUrl.trim(),
          image_url: finalImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", featuredStory.id);

      databaseError = error;
    } else {
      const { error } = await supabase
        .from("featured_story")
        .insert({
          title: featuredTitle.trim(),
          description:
            featuredDescription.trim(),
          story_url: featuredStoryUrl.trim(),
          image_url: finalImageUrl,
          updated_at: new Date().toISOString(),
        });

      databaseError = error;
    }

    // -----------------------------------------
    // DATABASE FAILED
    // REMOVE NEW IMAGE SO WE DON'T LEAVE JUNK
    // -----------------------------------------

    if (databaseError) {
      if (newlyUploadedFileName) {
        await supabase.storage
          .from("featured-story")
          .remove([newlyUploadedFileName]);
      }

      setSavingFeatured(false);
      alert(databaseError.message);
      return;
    }

    // -----------------------------------------
    // DATABASE SUCCEEDED
    // DELETE OLD IMAGE IF IT WAS REPLACED
    // -----------------------------------------

    if (
      featuredFile &&
      featuredImageUrl &&
      finalImageUrl !== featuredImageUrl
    ) {
      const oldFileName =
        getFeaturedStorageFileName(
          featuredImageUrl
        );

      if (oldFileName) {
        const { error: deleteError } =
          await supabase.storage
            .from("featured-story")
            .remove([oldFileName]);

        if (deleteError) {
          console.error(
            "Could not remove old featured image:",
            deleteError.message
          );
        }
      }
    }

    // -----------------------------------------
    // RESET FILE INPUT
    // -----------------------------------------

    setFeaturedFile(null);

    const input = document.getElementById(
      "featured-file"
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }

    await getFeaturedStory();

    setSavingFeatured(false);

    alert("Featured story saved.");
  }

  // =========================================================
  // GET GALLERY
  // =========================================================

  async function getGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error loading gallery:",
        error.message
      );
      return;
    }

    if (data) {
      setImages(data);
    }
  }

  // =========================================================
  // UPLOAD GALLERY IMAGE
  // =========================================================

  async function uploadImage() {
    if (!file) {
      alert("Choose an image first.");
      return;
    }

    if (!title.trim()) {
      alert("Enter an image title.");
      return;
    }

    const safeFileName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    );

    const fileName =
      `${Date.now()}-${safeFileName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("gallery")
        .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: databaseError } =
      await supabase
        .from("gallery")
        .insert({
          title: title.trim(),
          category,
          photographer: photographer.trim(),
          image_url: publicUrl,
        });

    if (databaseError) {
      await supabase.storage
        .from("gallery")
        .remove([fileName]);

      alert(databaseError.message);
      return;
    }

    setTitle("");
    setCategory("Football");
    setPhotographer("");
    setFile(null);

    const input = document.getElementById(
      "gallery-file"
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }

    await getGallery();
  }

  // =========================================================
  // DELETE GALLERY IMAGE
  // =========================================================

  async function deleteImage(
    id: string,
    url: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this image?"
    );

    if (!confirmed) return;

    const fileName = decodeURIComponent(
      url.split("/").pop() || ""
    );

    if (fileName) {
      const { error: storageError } =
        await supabase.storage
          .from("gallery")
          .remove([fileName]);

      if (storageError) {
        console.error(
          "Storage delete error:",
          storageError.message
        );
      }
    }

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await getGallery();
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading...
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-12">

          <div>
            <h1 className="text-4xl font-bold">
              JET Sports Network CMS
            </h1>

            <p className="text-gray-400 mt-2">
              Manage website content
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* ===================================================
            ARTICLES
        =================================================== */}

        <section className="mb-20">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Articles
            </h2>

            <span className="text-gray-500">
              {articles.length}{" "}
              {articles.length === 1
                ? "article"
                : "articles"}
            </span>

          </div>

          {/* ARTICLE FORM */}

          <div className="bg-zinc-900 rounded-xl p-6 mb-8 space-y-4">

            <div className="flex justify-between items-center">

              <h3 className="text-xl font-bold">
                {editingArticleId !== null
                  ? "Edit Article"
                  : "New Article"}
              </h3>

              {editingArticleId !== null && (
                <button
                  onClick={clearArticleForm}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel Editing
                </button>
              )}

            </div>

            <input
              className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Article Title"
              value={articleTitle}
              onChange={(e) =>
                setArticleTitle(e.target.value)
              }
            />

            <input
              className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Author"
              value={articleAuthor}
              onChange={(e) =>
                setArticleAuthor(e.target.value)
              }
            />

            <select
              className="w-full p-3 rounded bg-zinc-800"
              value={articleCategory}
              onChange={(e) =>
                setArticleCategory(e.target.value)
              }
            >
              {categories.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <textarea
              className="w-full p-3 rounded bg-zinc-800 min-h-80 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write the article..."
              value={articleContent}
              onChange={(e) =>
                setArticleContent(e.target.value)
              }
            />

            <label className="flex items-center gap-3 cursor-pointer w-fit">

              <input
                type="checkbox"
                checked={articlePublished}
                onChange={(e) =>
                  setArticlePublished(
                    e.target.checked
                  )
                }
              />

              <span>Published</span>

            </label>

            {editingArticleId === null ? (
              <button
                onClick={createArticle}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
              >
                Create Article
              </button>
            ) : (
              <div className="flex gap-3">

                <button
                  onClick={saveArticleChanges}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
                >
                  Save Changes
                </button>

                <button
                  onClick={clearArticleForm}
                  className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

          {/* ARTICLE LIST */}

          <div className="space-y-4">

            {articles.length === 0 && (
              <div className="bg-zinc-900 rounded-xl p-6 text-gray-400">
                No articles yet.
              </div>
            )}

            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-zinc-900 rounded-xl p-5"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-bold">
                        {article.title}
                      </h3>

                      <span
                        className={
                          article.published
                            ? "text-xs bg-green-900 text-green-300 px-3 py-1 rounded-full"
                            : "text-xs bg-yellow-900 text-yellow-300 px-3 py-1 rounded-full"
                        }
                      >
                        {article.published
                          ? "Published"
                          : "Draft"}
                      </span>

                    </div>

                    <p className="text-gray-400 mt-2">
                      {article.category} •{" "}
                      {article.author}
                    </p>

                    <p className="text-gray-600 text-sm mt-2 break-all">
                      /articles/{article.slug}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        startEditingArticle(article)
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        togglePublished(article)
                      }
                      className={
                        article.published
                          ? "bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
                          : "bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                      }
                    >
                      {article.published
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() =>
                        deleteArticle(article.id)
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* ===================================================
            FEATURED STORY
        =================================================== */}

        <section className="mb-20">

          <h2 className="text-3xl font-bold mb-6">
            Featured Story
          </h2>

          <div className="bg-zinc-900 rounded-xl p-6 space-y-5">

            <p className="text-gray-400">
              This controls the featured story shown on
              the JET Sports Network homepage.
            </p>

            {/* TITLE */}

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Featured Story Title
              </label>

              <input
                className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Featured Story Title"
                value={featuredTitle}
                onChange={(e) =>
                  setFeaturedTitle(e.target.value)
                }
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>

              <textarea
                className="w-full p-3 rounded bg-zinc-800 min-h-32 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Featured story description..."
                value={featuredDescription}
                onChange={(e) =>
                  setFeaturedDescription(
                    e.target.value
                  )
                }
              />
            </div>

            {/* LINK */}

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Story Link
              </label>

              <input
                className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="/articles/example-story"
                value={featuredStoryUrl}
                onChange={(e) =>
                  setFeaturedStoryUrl(
                    e.target.value
                  )
                }
              />

              <p className="text-gray-500 text-sm mt-2">
                Example: /articles/oregon-football
              </p>
            </div>

            {/* CURRENT IMAGE */}

            {featuredImageUrl && (
              <div>

                <p className="text-sm text-gray-400 mb-2">
                  Current Image
                </p>

                <img
                  src={featuredImageUrl}
                  alt="Current featured story"
                  className="w-full max-w-2xl h-72 object-cover rounded-xl"
                />

              </div>
            )}

            {/* IMAGE UPLOAD */}

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                {featuredImageUrl
                  ? "Replace Featured Image"
                  : "Upload Featured Image"}
              </label>

              <input
                id="featured-file"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFeaturedFile(
                    e.target.files?.[0] || null
                  )
                }
              />

              {featuredFile && (
                <p className="text-sm text-green-400 mt-2">
                  Selected: {featuredFile.name}
                </p>
              )}

            </div>

            {/* SAVE */}

            <button
              onClick={saveFeaturedStory}
              disabled={savingFeatured}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed px-6 py-3 rounded font-semibold"
            >
              {savingFeatured
                ? "Saving..."
                : "Save Featured Story"}
            </button>

          </div>

        </section>

        {/* ===================================================
            GALLERY
        =================================================== */}

        <section>

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">
              Gallery
            </h2>

            <span className="text-gray-500">
              {images.length}{" "}
              {images.length === 1
                ? "image"
                : "images"}
            </span>

          </div>

          {/* GALLERY UPLOAD */}

          <div className="bg-zinc-900 rounded-xl p-6 mb-10 space-y-4">

            <h3 className="text-xl font-bold">
              Upload Image
            </h3>

            <input
              className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <input
              className="w-full p-3 rounded bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Photographer"
              value={photographer}
              onChange={(e) =>
                setPhotographer(e.target.value)
              }
            />

            <select
              className="w-full p-3 rounded bg-zinc-800"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              id="gallery-file"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <button
              onClick={uploadImage}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
            >
              Upload Image
            </button>

          </div>

          {/* GALLERY GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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

                  <h3 className="text-lg font-bold">
                    {image.title}
                  </h3>

                  <p className="text-gray-400">
                    {image.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    📷{" "}
                    {image.photographer ||
                      "No photographer listed"}
                  </p>

                  <button
                    onClick={() =>
                      deleteImage(
                        image.id,
                        image.image_url
                      )
                    }
                    className="w-full bg-red-600 hover:bg-red-700 py-2 rounded mt-3"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}
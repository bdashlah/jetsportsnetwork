import Navbar from "./components/navbar";
import { League_Spartan } from "next/font/google";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export default async function Home() {
  // =========================================================
  // GALLERY
  // =========================================================

  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  // =========================================================
  // FEATURED STORY
  // =========================================================

  const { data: featuredStory } = await supabase
    .from("featured_story")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  // =========================================================
  // LATEST PUBLISHED ARTICLES
  // =========================================================

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          id="home"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Video */}

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover scale-140"
          >
            <source
              src="/sports-highlight.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/50" />

          {/* Hero Content */}

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">

            <Image
              src="/logo.png"
              alt="JET Sports Network Logo"
              width={288}
              height={288}
              className="object-contain mb-8"
            />

            <h1
              className={`${leagueSpartan.className} text-6xl md:text-7xl font-bold uppercase mb-4`}
            >
              JET Sports Network
            </h1>

            <p className="text-xl max-w-2xl">
              Tucson&apos;s Go-To For Nonstop Local Sports
              Coverage
            </p>

          </div>
        </section>

        {/* ===================================================
            FEATURED STORY
        =================================================== */}

        {featuredStory && (
          <section
            id="stories"
            className="max-w-6xl mx-auto py-20 px-6"
          >

            <h2
              className={`${leagueSpartan.className} text-4xl font-bold mb-10`}
            >
              Featured Story 🔥
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* FEATURED IMAGE */}

              {featuredStory.image_url && (
                <div className="relative h-80 rounded-lg overflow-hidden group shadow-xl">

                  <img
                    src={featuredStory.image_url}
                    alt={featuredStory.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                </div>
              )}

              {/* STORY CONTENT */}

              <div>

                <h3 className="text-3xl font-bold mb-4">
                  {featuredStory.title}
                </h3>

                {featuredStory.description && (
                  <p className="text-gray-400 mb-6 leading-7">
                    {featuredStory.description}
                  </p>
                )}

                {featuredStory.story_url && (
                  <a
                    href={featuredStory.story_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    ▶ View Story
                  </a>
                )}

              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            LATEST ARTICLES
        =================================================== */}

        <section
          id="articles"
          className="max-w-6xl mx-auto py-24 px-6"
        >

          <h2
            className={`${leagueSpartan.className} text-4xl font-bold mb-14`}
          >
            Latest Articles
          </h2>

          {articles && articles.length > 0 ? (

            <div className="grid md:grid-cols-2 gap-16">

              {articles.map((article) => (

                <article
                  key={article.id}
                  className="border-l-4 border-white pl-6 flex flex-col"
                >

                  {/* CATEGORY */}

                  <p className="uppercase tracking-[0.25em] text-sm text-gray-400 mb-4">
                    {article.category}
                  </p>

                  {/* TITLE */}

                  <h3
                    className={`${leagueSpartan.className} text-3xl font-bold leading-tight mb-4`}
                  >
                    {article.title}
                  </h3>

                  {/* AUTHOR */}

                  <p className="text-sm text-gray-500 mb-5">
                    By {article.author}
                  </p>

                  {/* ARTICLE PREVIEW */}

                  <p className="text-gray-300 leading-8 flex-grow">

                    {article.content.length > 220
                      ? `${article.content.substring(
                          0,
                          220
                        )}...`
                      : article.content}

                  </p>

                  {/* READ STORY */}

                  <Link
                    href={`/articles/${article.slug}`}
                    className="mt-8 w-fit bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    Read Story →
                  </Link>

                </article>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No articles have been published yet.
            </p>

          )}

        </section>

        {/* ===================================================
            GALLERY
        =================================================== */}

        <section
          id="gallery"
          className="py-20 overflow-hidden"
        >

          <h2
            className={`${leagueSpartan.className} text-4xl font-bold text-center mb-10`}
          >
            Gallery
          </h2>

          <div className="overflow-hidden">

            <div className="flex gap-6 animate-scroll w-max">

              {/* FIRST SET */}

              {gallery?.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={image.title}
                  className="h-64 w-96 rounded-lg object-cover flex-shrink-0"
                />
              ))}

              {/* DUPLICATE SET FOR INFINITE SCROLL */}

              {gallery?.map((image) => (
                <img
                  key={`duplicate-${image.id}`}
                  src={image.image_url}
                  alt={image.title}
                  className="h-64 w-96 rounded-lg object-cover flex-shrink-0"
                />
              ))}

            </div>

          </div>

        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer
          id="contact"
          className="border-t border-white/10 py-10 px-6"
        >

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

            <div>

              <h3 className="text-2xl font-bold">
                Let&apos;s Connect
              </h3>

              <p className="text-gray-400">
                Follow JET Sports Network for the latest
                local sports coverage.
              </p>

            </div>

            <a
              href="https://www.instagram.com/jetsportsnetwork/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              @jetsportsnetwork
            </a>

          </div>

        </footer>

      </main>
    </>
  );
}
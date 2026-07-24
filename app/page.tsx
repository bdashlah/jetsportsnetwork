import Navbar from "./components/navbar";
import { League_Spartan } from "next/font/google";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export default async function Home() {
  const { data: gallery } = await supabase
  .from("gallery")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(12);
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* ================= HERO ================= */}
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
    <source src="/sports-highlight.mp4" type="video/mp4" />
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
    <img
      src="/JET SPORTS.png"
      alt="JET Sports Network Logo"
      className="w-72 h-72 object-contain mb-8"
    />

    <h1
      className={`${leagueSpartan.className} text-6xl md:text-7xl font-bold uppercase mb-4`}
    >
      JET Sports Network
    </h1>

    <p className="text-xl max-w-2xl">
      Tucson&apos;s Go-To For Nonstop Local Sports Coverage
    </p>
  </div>
</section>
       {/* ================= FEATURED STORY ================= */}
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

    {/* Featured Image */}
    <div className="relative h-80 rounded-lg overflow-hidden group shadow-xl">
      <Image
        src="/ssc1.png"
        alt="Anthony Birchak Interview"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Story Content */}
    <div>

      <h3 className="text-3xl font-bold mb-4">
        520 Fight Club with Anthony Birchak
      </h3>

      <p className="text-gray-400 mb-6">
        Watch the full interview for an in-depth look at the mindset,
        legacy, and future of one of Arizona's most respected MMA veterans.
      </p>

      <a
        href="https://www.youtube.com/watch?v=hNMnfub4LBI"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
      >
        ▶ View Story
      </a>

    </div>

  </div>

</section>

{/* ================= LATEST ARTICLES ================= */}
<section
  id="articles"
  className="max-w-6xl mx-auto py-20 px-6"
>
  <h2
    className={`${leagueSpartan.className} text-4xl font-bold mb-12`}
  >
    Latest Articles
  </h2>

  <div className="grid md:grid-cols-2 gap-12">

    {/* Article 1 */}
    <article className="border-l-4 border-white pl-6">

      <p className="uppercase tracking-[0.25em] text-sm text-gray-400 mb-3">
        Tucson at Salpointe MBB
      </p>

      <h3
        className={`${leagueSpartan.className} text-3xl font-bold mb-5`}
      >
        Badgers' defense dominates in Thursday night's matchup against t
      </h3>

      <p className="text-gray-300 leading-8">
      Tucson High earned its fifth straight victory with a 72–55 road win over Salpointe Catholic, using relentless defense to take control after the opening quarter. Sophomore Jaylan Knight led the Badgers with 19 points, while senior Malaki Cunningham-Hiadzi added 15 points and dominated the paint. Tucson now looks to make it six consecutive wins when it hosts Marana in a 6A South matchup.
      </p>

    </article>

    {/* Article 2 */}
    <article className="border-l-4 border-white pl-6">

      <p className="uppercase tracking-[0.25em] text-sm text-gray-400 mb-3">
       Tucson at Walden Grove FB
      </p>

      <h3
        className={`${leagueSpartan.className} text-3xl font-bold mb-5`}
      >
        Strong Fourth Quarter Secures Tucson High’s First Win of the Season

      </h3>

      <p className="text-gray-300 leading-8">
      Tucson High earned its first victory of the season with a 27–16 comeback win over Walden Grove after trailing 13–7 at halftime. Quarterback Derek Mesa and wide receiver Noah Chanez sparked the second-half rally, connecting on a go-ahead touchdown before Chanez sealed the game with a 65-yard rushing score. A strong defensive effort and timely plays helped the Badgers improve to 1–2 as they head into next week's matchup against Buena.
      </p>

    </article>

  </div>
</section>
       {/* ================= GALLERY ================= */}
<section id="gallery" className="py-20 overflow-hidden">

<h2
  className={`${leagueSpartan.className} text-4xl font-bold text-center mb-10`}
>
  Gallery
</h2>

<div className="overflow-hidden">

  <div className="flex gap-6 animate-scroll w-max">

    {/* First Set */}
    {gallery?.map((image) => (
      <img
        key={image.id}
        src={image.image_url}
        alt={image.title}
        className="h-64 w-96 rounded-lg object-cover flex-shrink-0"
      />
    ))}

    {/* Duplicate Set for Infinite Scroll */}
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

        {/* ================= FOOTER ================= */}
        <footer
          id="contact"
          className="border-t border-white/10 py-10 px-6"
        >

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

            <div>

              <h3 className="text-2xl font-bold">
                Let's Connect
              </h3>

              <p className="text-gray-400">
                Follow JET Sports Network for the latest local sports coverage.
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

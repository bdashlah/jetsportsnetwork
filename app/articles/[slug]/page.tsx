import Navbar from "../../components/navbar";
import { League_Spartan } from "next/font/google";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Error loading article:", error.message);
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <article className="max-w-4xl mx-auto px-6 pt-36 pb-24">

          <p className="uppercase tracking-[0.25em] text-sm text-gray-400 mb-6">
            {article.category}
          </p>

          <h1
            className={`${leagueSpartan.className} text-4xl md:text-6xl font-bold leading-tight mb-6`}
          >
            {article.title}
          </h1>

          <p className="text-gray-400 mb-12">
            By {article.author}
          </p>

          <div className="border-t border-white/20 mb-12" />

          <div className="text-lg text-gray-200 leading-8 whitespace-pre-wrap">
            {article.content}
          </div>

          <div className="mt-16 pt-8 border-t border-white/20">
            <Link
              href="/#articles"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              ← Back to Articles
            </Link>
          </div>

        </article>
      </main>
    </>
  );
}
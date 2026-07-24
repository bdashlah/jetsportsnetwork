import Link from "next/link";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export default function BadgersDefense() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition"
        >
          ← Back to Home
        </Link>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 my-10" />

        {/* Headline */}
        <h1
          className={`${leagueSpartan.className} text-5xl md:text-6xl font-bold leading-tight`}
        >
          Badgers' defense dominates in Thursday night's matchup against the Lancers
        </h1>

        {/* Author */}
        <p className="text-gray-400 text-lg mt-8 mb-16">
          By JET Sports Network
        </p>

        {/* Article */}
        <article className="text-xl leading-10 text-gray-200 space-y-8">

          <p>
            Tucson High (16-6) continues to roll, winning five in a row in its
            72-55 road win against Salpointe Catholic (9-9), putting on a
            defensive masterclass.
          </p>

          <p>
            "It felt good to come in here and get a dub (win) because everyone
            knows this is our trap(city). This is Tucson," sophomore Jaylan
            Knight said.
          </p>

          <p>
            Both teams were feeling each other out in the first quarter.
            Salpointe jumped out to an early 16-12 lead, hitting on their
            second-chance points and getting to the line to complete
            three-point plays.
          </p>

          <p>
            Once the second quarter hit, Tucson found its footing and dominated
            the remainder of the game. The Badgers disrupted the Lancers'
            passing lanes, double and triple teaming their playmakers, forcing
            them to take difficult shots and commit costly turnovers.
          </p>

          <p>
            Knight led the team in scoring with 19 points on the night. Most of
            them came in the second quarter, where he started to make his mark,
            moving his way through defenders, making midrange shots, and driving
            to the basket, giving Tucson a 34-25 lead at halftime.
          </p>

          <p>
            The second half was more of the same as Tucson continued to assert
            its dominance on both sides of the ball. Fast break points helped
            the Badgers extend their lead, giving them a 17-point cushion to
            put the game out of reach.
          </p>

          <p>
            The paint belonged to senior Malaki Cunningham-Hiadzi in the second
            half, ending his night with 15 points. Cunningham-Hiadzi imposed
            his will and got anything he wanted, whether that was points,
            rebounds, or making it difficult for Salpointe Catholic's offense
            to buy a bucket.
          </p>

          <p>
            "We wanted this game. We knew what we wanted, and we took it.
            That's what we do, when we want something, we get it,"
            Cunningham-Hiadzi said.
          </p>

          <p>
            Tucson looks to win six in a row, hosting Marana Tuesday night in a
            6A South matchup.
          </p>

          <p>
            Salpointe Catholic has a quick turnaround, traveling to Sahuaro for
            a 4A Kino matchup tonight.
          </p>

          <p>
            Both games tip off at 7:00 p.m.
          </p>

        </article>

        {/* Bottom Divider */}
        <div className="w-full h-px bg-white/20 my-20" />

        {/* Return Button */}
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition"
        >
          ← Return to Home
        </Link>

      </div>
    </main>
  );
}
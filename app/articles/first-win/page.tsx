import Link from "next/link";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export default function FirstWin() {
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
          Strong Fourth Quarter Secures Tucson High's First Win of the Season
        </h1>

        {/* Author */}
        <p className="text-gray-400 text-lg mt-8 mb-16">
          By JET Sports Network
        </p>

        {/* Article */}
        <article className="text-xl leading-10 text-gray-200 space-y-8">

          <p>
            Tucson High (1-2) gets its first win of the season, 27-16 in a gritty
            defensive battle over Walden Grove (1-2).
          </p>

          <p>
            "Going 0-2 the first two weeks was not the best feeling, and we know
            we could produce better games, so we knew coming out here and getting
            that win felt good as a team," senior wide receiver Noah Chanez said.
          </p>

          <p>
            Things weren't clicking for Tucson High's offense in the first half.
            On their first drive, senior quarterback Derek Mesa threw an
            interception to senior linebacker Angel Armenta, setting up Walden
            Grove at Tucson High's 30-yard line.
          </p>

          <p>
            The Tucson High defense wouldn't allow the Mesa interception to hurt
            them. On a third-and-long, senior linebacker Dominic Drow and senior
            defensive tackle Taysean Romero combined for a sack of junior
            quarterback Gauge Abalos, forcing Walden Grove to punt instead of
            attempting a field goal.
          </p>

          <p>
            Tucson High's second drive reached midfield before Walden Grove's
            defense stopped senior running back Makoa Pena on fourth down.
            Walden Grove took advantage of the field position when Abalos found
            junior wide receiver Jordan Dobson for a 35-yard touchdown, giving
            the Red Wolves a 7-0 lead at the end of the first quarter.
          </p>

          <p>
            Early in the second quarter, Walden Grove attempted a fake punt, but
            Tucson High's special teams sniffed it out and took over at the Red
            Wolves' 36-yard line. Noah Chanez sparked the drive with an 18-yard
            run before the Badgers appeared ready to settle for a field goal.
            Instead, Tucson High called a fake, with Chanez weaving across the
            field to pick up the first down. A few plays later, Pena punched in
            a touchdown to tie the game.
          </p>

          <p>
            Walden Grove answered by pounding the football before Abalos
            connected with senior wide receiver Kylian Knight for a 29-yard
            touchdown. Tucson High couldn't answer before halftime, as Walden
            Grove controlled all three phases of the game and took a 13-7 lead
            into the locker room.
          </p>

          <p>
            Both defenses continued to battle in the second half. After blocking
            a Tucson High punt deep in Badger territory, Walden Grove looked
            ready to pull away. Instead, Tucson's defense forced a field goal,
            keeping the deficit at 16-7.
          </p>

          <p>
            As the third quarter came to a close, the Badgers' offense finally
            found its rhythm. Mesa connected with Chanez on a short pass that
            turned into a 51-yard gain thanks to Chanez's speed and agility. One
            play into the fourth quarter, Mesa kept the ball himself and raced
            30 yards for a touchdown, cutting the deficit to two points.
          </p>

          <p>
            Tucson High's defense came through again with another stop, giving
            the offense a chance to take the lead. Facing fourth-and-two, Mesa
            floated a pass to Chanez, who beat his defender for a 55-yard
            touchdown that gave Tucson High its first lead of the night with
            just over eight minutes remaining.
          </p>

          <p>
            "Derek Mesa does a great job. He sees that they're blitzing, calls
            the hot, Noah's one-on-one with a linebacker. I'll take Noah Chanez
            all day one-on-one over a linebacker," Tucson High head coach Zach
            Neveleff said.
          </p>

          <p>
            Walden Grove attempted to answer, but senior cornerback Kenzy Couch
            broke up a fourth-down pass to give the Badgers the football one
            more time.
          </p>

          <p>
            To seal Tucson High's first victory of the season, Mesa handed the
            ball to Chanez, who sprinted 65 yards for the game's final
            touchdown.
          </p>

          <p>
            "I kept telling them to stay focused on the main goal, which is
            always to have more points on that board. The first half, they had
            more, but you just got to keep going and fighting. At the end of the
            day, we were able to put up more," Chanez said.
          </p>

          <p>
            Tucson High will look to build off its first win next week when it
            travels to Sierra Vista to face Buena. Walden Grove will also be on
            the road, taking on Vista Grande in Casa Grande.
          </p>

          <p>
            Both games kick off Friday at 7:00 p.m.
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
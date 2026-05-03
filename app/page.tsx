import { Button } from '@/components/ui/button'

// ─── In-page anchor nav ───────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Offer', href: '#offer' },
  { label: 'Schedules', href: '#schedules' },
  { label: 'Prices', href: '#prices' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

export default function HomePage() {
  return (
    <div className="w-full">

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-[#1E0A3C] via-[#0F0A1A] to-[#0F0F0F] text-white py-24 md:py-36 px-4 overflow-hidden"
      >
        {/* Watermark volleyball */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-6 -right-6 text-[22rem] opacity-[0.04] leading-none"
        >
          🏐
        </span>
        {/* Diagonal orange accent stripe */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute -top-32 right-[10%] w-[3px] h-[140%] bg-[#F97316]/10 rotate-[20deg]" />
          <div className="absolute -top-32 right-[14%] w-[1px] h-[140%] bg-[#F97316]/6 rotate-[20deg]" />
        </div>

        {/* In-page anchor nav — hidden on mobile, horizontal on md+ */}
        <nav className="hidden md:flex justify-center gap-6 mb-14">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold tracking-widest uppercase text-white/60 hover:text-[#F97316] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-8">
            🏐 <span>Free trial session · No commitment</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-wide leading-tight mb-6">
            Train beach volleyball<br className="hidden sm:block" /> in Barcelona<br className="hidden sm:block" /> and improve while having fun
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            For all levels · Small groups · Certified coaches · Great community
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#ea6c0c] text-white font-bold text-base px-8 py-6 rounded-xl shadow-lg shadow-[#F97316]/30"
            >
              <a href="#contact">Join a training session</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white font-bold text-base px-8 py-6 rounded-xl bg-transparent"
            >
              <a href="#schedules">See schedules</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — ABOUT
      ════════════════════════════════════════════════════════ */}
      <section id="about" className="bg-[#FFFBF0] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Who are we?
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-14">
            Sara, Jesús and David — passionate about beach volleyball and rock 🤘. After years
            training and competing, they created Block N&apos; Roll: a space to learn, improve,
            enjoy and build a true community. Dynamic and intensive training, adapted to each
            person, in a fun and welcoming environment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Sara', role: 'Co-Founder', emoji: '🏐' },
              { name: 'Jesús García', role: 'Co-Founder & Head Coach', emoji: '🏐' },
              { name: 'David Bardina', role: 'Co-Founder & Coach', emoji: '🏐' },
            ].map(({ name, role, emoji }) => (
              <div
                key={name}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 text-center"
              >
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="font-bold text-lg text-slate-900">{name}</h3>
                <p className="text-sm text-slate-500 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — WHO IS IT FOR
      ════════════════════════════════════════════════════════ */}
      <section id="for-who" className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Who is it for?
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                icon: '🌱',
                title: 'Complete beginners',
                desc: 'Never touched a volleyball? Perfect starting point.',
              },
              {
                icon: '📈',
                title: 'Basic level',
                desc: 'You know the basics and want to build a solid foundation.',
              },
              {
                icon: '🔥',
                title: 'Intermediate',
                desc: 'You compete or want to take your game to the next level.',
              },
              {
                icon: '👥',
                title: 'Social players',
                desc: 'Looking to meet people and enjoy sport with good vibes.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md transition-shadow p-6 text-center"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 italic">
            Train solo, with a partner, or bring your whole group.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — WHAT WE OFFER
      ════════════════════════════════════════════════════════ */}
      <section id="offer" className="bg-[#FFFBF0] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            What we offer
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Complete, personalised training', desc: 'Every session tailored to your level and goals.' },
              { icon: '👥', title: 'Small groups', desc: 'Max 8 players per court — more touches, more feedback.' },
              { icon: '⏱️', title: '90-minute sessions', desc: 'With certified coaches who track your progress.' },
              { icon: '🆓', title: 'Free trial session', desc: 'Come once on us — zero commitment required.' },
              { icon: '🤝', title: 'Private & custom sessions', desc: 'One-on-one or group sessions available on request.' },
              { icon: '🤘', title: 'Active community', desc: 'Great atmosphere — we play hard and laugh harder.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-7"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — METHODOLOGY
      ════════════════════════════════════════════════════════ */}
      <section id="methodology" className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Our training approach
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: '💪',
                title: 'Physical',
                desc: 'Resistance, speed, coordination and specific strength for beach volleyball.',
              },
              {
                icon: '🏐',
                title: 'Technical',
                desc: 'Ball control, precision and mastering the key technical gestures.',
              },
              {
                icon: '🧠',
                title: 'Tactical',
                desc: 'Reading the game, smart decision-making and positioning on court.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border-t-4 border-[#F97316] bg-slate-50 shadow-sm hover:shadow-md transition-shadow p-8 text-center"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-2xl uppercase mb-3">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 max-w-2xl mx-auto">
            We design dynamic sessions to maximise repetitions and real game situations. Each
            exercise is adapted to your level so you progress from your starting point.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — SCHEDULES
      ════════════════════════════════════════════════════════ */}
      <section id="schedules" className="bg-[#F0F9FF] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Schedules
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          {/* Schedule grid */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-6 text-center text-sm font-bold bg-[#1E0A3C] text-white">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT–SUN'].map((d) => (
                <div key={d} className="py-3 border-r border-white/10 last:border-0">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6 text-center text-sm">
              {[true, true, true, true, true, false].map((active, i) => (
                <div
                  key={i}
                  className={`py-5 border-r border-slate-100 last:border-0 ${
                    active ? 'text-slate-700 font-medium' : 'text-slate-300'
                  }`}
                >
                  {active ? (
                    <>
                      <div className="font-bold text-[#F97316]">18:00</div>
                      <div className="text-xs text-slate-400 mt-0.5">→ 22:30</div>
                    </>
                  ) : (
                    '—'
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-500 mb-8">
            90-minute sessions · Specific times published on{' '}
            <a
              href="https://www.instagram.com/blocknrollbeachvolleybcn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7C3AED] font-semibold hover:underline"
            >
              Instagram
            </a>
          </p>

          {/* Summer callout */}
          <div className="border-2 border-[#F97316] rounded-2xl bg-white p-6 max-w-2xl mx-auto mb-10">
            <p className="text-slate-700 text-sm leading-relaxed">
              ⚠️{' '}
              <span className="font-semibold">Summer training available May–July 2025</span> with
              limited morning and afternoon slots — message us to find out more.
            </p>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#ea6c0c] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#F97316]/30"
            >
              <a href="#contact">Ask for available spots</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — PRICES
      ════════════════════════════════════════════════════════ */}
      <section id="prices" className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Prices
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 1 day/week */}
            <div className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-8 text-center">
              <h3 className="font-display text-2xl uppercase mb-2">1 day/week</h3>
              <div className="text-4xl font-black text-slate-900 mb-1">€35</div>
              <div className="text-sm text-slate-400 mb-4">per month</div>
              <p className="text-slate-500 text-sm">Perfect to start</p>
            </div>

            {/* 2 days/week — featured */}
            <div className="relative rounded-2xl border-2 border-[#F97316] shadow-md hover:shadow-lg transition-shadow p-8 text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most popular
              </span>
              <h3 className="font-display text-2xl uppercase mb-2 mt-2">2 days/week</h3>
              <div className="text-4xl font-black text-slate-900 mb-1">€65</div>
              <div className="text-sm text-slate-400 mb-4">per month</div>
              <p className="text-slate-500 text-sm">Best value for progress</p>
            </div>

            {/* Small group */}
            <div className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-8 text-center">
              <h3 className="font-display text-2xl uppercase mb-2">Small group</h3>
              <div className="text-4xl font-black text-slate-900 mb-1">—</div>
              <div className="text-sm text-slate-400 mb-4">price varies</div>
              <p className="text-slate-500 text-sm">Contact us for custom groups</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 max-w-2xl mx-auto text-center">
            <p className="text-slate-600 text-sm leading-relaxed">
              🛡️ <span className="font-semibold">Federation license required</span> (includes
              sports insurance): <span className="font-bold text-slate-900">€35/year</span>. We
              can handle the paperwork for you at no extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 8 — LOCATION
      ════════════════════════════════════════════════════════ */}
      <section id="location" className="bg-[#FFFBF0] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Where we train
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Info */}
            <div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                CEM Eurofitness Vall d&apos;Hebron
              </h3>
              <p className="text-slate-500 mb-6">
                Pg. de la Vall d&apos;Hebron 178, Horta-Guinardó, Barcelona 08035
              </p>

              <ul className="space-y-2 text-slate-600 mb-8">
                {[
                  '🏐 Outdoor beach volleyball courts',
                  '💡 Night lighting',
                  '🚿 Changing rooms, showers and bar',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-800 mb-3">How to get there</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>🚇 Metro L3 — Montbau (7 min walk)</li>
                <li>🚇 Metro L5 — Vall d&apos;Hebron (8 min walk)</li>
                <li>🚌 Bus 19, 27, 60, 76, H4, V17, V21</li>
                <li>🚗 Car parking available nearby</li>
              </ul>
            </div>

            {/* Map placeholder */}
            <a
              href="https://maps.google.com/?q=Pg.+de+la+Vall+d'Hebron+178+Barcelona"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-[#7C3AED]/10 via-[#F97316]/10 to-[#FFFBF0] h-56 flex flex-col items-center justify-center gap-3 border border-slate-200">
                <span className="text-5xl">📍</span>
                <span className="font-semibold text-slate-700 text-sm text-center px-4">
                  Pg. de la Vall d&apos;Hebron 178, Barcelona
                </span>
                <span className="text-xs text-[#7C3AED] group-hover:underline">
                  Open in Google Maps →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 9 — COMMUNITY
      ════════════════════════════════════════════════════════ */}
      <section id="community" className="bg-white py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Our community
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          {/* Photo placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              'from-[#F97316]/30 to-[#F97316]/10',
              'from-[#FFFBF0] to-[#F97316]/20',
              'from-[#7C3AED]/20 to-[#1E0A3C]/30',
            ].map((gradient, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gradient-to-br ${gradient} h-48 flex items-center justify-center text-5xl shadow-sm`}
              >
                🏐
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: 'Marta R.',
                text: 'I joined as a complete beginner and now I can actually play! The coaches are super patient and the group is so welcoming.',
              },
              {
                name: 'Pau G.',
                text: 'Best decision I made last year. Amazing training, great vibes, and I have made real friends here.',
              },
              {
                name: 'Laura M.',
                text: 'The energy at every session is incredible. You work hard but you\'re always smiling. Block N\' Roll is special.',
              },
            ].map(({ name, text }) => (
              <div
                key={name}
                className="rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <p className="text-slate-600 text-sm italic mb-4">&quot;{text}&quot;</p>
                <p className="font-bold text-slate-900 text-sm">— {name}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xl font-semibold text-slate-700">
            Come for the volleyball, stay for the community 🤘
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 10 — COACHES
      ════════════════════════════════════════════════════════ */}
      <section id="coaches" className="bg-[#FFFBF0] py-16 md:py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-center mb-4">
            Your coaches
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto mb-10 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Jesús García', initials: 'JG', from: 'from-[#7C3AED]', to: 'to-[#1E0A3C]' },
              { name: 'David Bardina', initials: 'DB', from: 'from-[#F97316]', to: 'to-[#1E0A3C]' },
            ].map(({ name, initials, from, to }) => (
              <div
                key={name}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 text-center"
              >
                {/* Avatar */}
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${from} ${to} flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black`}
                >
                  {initials}
                </div>

                <h3 className="font-bold text-xl text-slate-900 mb-4">{name}</h3>

                <ul className="space-y-2 text-sm text-slate-600 text-left max-w-xs mx-auto">
                  <li className="flex items-center gap-2">
                    <span>📜</span> Level 1 certified coach
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎯</span> 6+ years competing and coaching
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🤘</span> Volleyball and rock lover
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 11 — CONTACT / FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="bg-gradient-to-br from-[#1E0A3C] to-[#0F0F0F] text-white py-16 md:py-24 px-4"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4">
            Ready to try your first session?
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Fill in the form below or contact us directly — we&apos;ll find the perfect group for
            you.
          </p>

          {/* Contact form */}
          <form
            action="mailto:blocknroll.bcnclub@gmail.com"
            method="GET"
            encType="text/plain"
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left space-y-5 mb-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white/80 mb-1.5">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/80 mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-white/80 mb-1.5">
                Phone <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+34 600 000 000"
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white/80 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="body"
                rows={4}
                placeholder="Tell us your level, availability, any questions..."
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#F97316] hover:bg-[#ea6c0c] text-white font-bold py-6 rounded-xl shadow-lg shadow-[#F97316]/30"
            >
              Send message
            </Button>
          </form>

          {/* Direct contact buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              asChild
              size="lg"
              className="bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold px-8 py-6 rounded-xl"
            >
              <a
                href="https://wa.me/34000000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white font-bold px-8 py-6 rounded-xl bg-transparent"
            >
              <a href="mailto:blocknroll.bcnclub@gmail.com">✉️ Send us an email</a>
            </Button>
          </div>

          {/* Social */}
          <p className="text-white/50 text-sm">
            Follow us on Instagram{' '}
            <a
              href="https://www.instagram.com/blocknrollbeachvolleybcn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7C3AED] font-semibold hover:text-[#9f6ef5] transition-colors"
            >
              @blocknrollbeachvolleybcn
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

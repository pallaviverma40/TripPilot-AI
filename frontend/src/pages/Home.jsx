import { Link } from 'react-router-dom'
import {
  Plane, Train, Bus, Hotel, MapPin, Brain, Zap,
  ArrowRight, Star, Shield, Clock, TrendingDown,
  Globe, Sparkles, ChevronRight
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Home.jsx — Landing Page
//
// Sections:
//  1. Hero          — headline, subtext, CTA button
//  2. Stats         — numbers that build trust
//  3. Features      — what the app does
//  4. How It Works  — step-by-step explanation
//  5. Transport     — showcase flight/train/bus comparison
//  6. CTA Banner    — final push to start planning
// ─────────────────────────────────────────────────────────────

// ── Data for Features Section ──
const FEATURES = [
  {
    icon: Brain,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    title: 'Multi-Agent AI',
    desc: 'Specialized AI agents work simultaneously to find the best options for transport, hotels, and activities.',
  },
  {
    icon: TrendingDown,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    title: 'Budget Optimizer',
    desc: 'Set your budget and the AI automatically optimizes every choice to fit within it.',
  },
  {
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    title: 'Instant Planning',
    desc: 'Get a complete day-by-day itinerary in seconds, not hours.',
  },
  {
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    title: 'Multimodal Routes',
    desc: 'Combine flights, trains, and buses into the optimal multi-leg journey.',
  },
  {
    icon: Clock,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    title: 'Weather-Aware',
    desc: 'Activities automatically shift around rain and poor weather forecasts.',
  },
  {
    icon: Sparkles,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    title: 'AI Replanning',
    desc: 'Just say "make it cheaper" or "add historical sites" and the trip updates instantly.',
  },
]

// ── Data for How It Works Section ──
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell us your trip',
    desc: 'Enter origin, destination, dates, number of travelers, and budget.',
  },
  {
    step: '02',
    title: 'AI agents get to work',
    desc: 'Flight, train, bus, hotel, and activity agents search simultaneously.',
  },
  {
    step: '03',
    title: 'Budget optimization',
    desc: 'The budget agent checks totals and optimizes where needed.',
  },
  {
    step: '04',
    title: 'Get your itinerary',
    desc: 'Receive a complete day-by-day plan with maps, timings, and costs.',
  },
]

// ── Transport Comparison Mock ──
const TRANSPORT_COMPARE = [
  {
    label: 'FASTEST',
    icon: Plane,
    mode: 'Flight',
    iconColor: 'text-blue-400',
    bg: 'border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
    time: '2h 40m',
    price: '₹6,200',
    stops: 'Non-stop',
  },
  {
    label: 'BEST VALUE',
    icon: Train,
    mode: 'Train',
    iconColor: 'text-green-400',
    bg: 'border-green-500/30',
    badge: 'bg-green-500/20 text-green-400',
    time: '19h 50m',
    price: '₹1,850',
    stops: 'Direct',
  },
  {
    label: 'CHEAPEST',
    icon: Bus,
    mode: 'Bus',
    iconColor: 'text-orange-400',
    bg: 'border-orange-500/30',
    badge: 'bg-orange-500/20 text-orange-400',
    time: '22h',
    price: '₹1,600',
    stops: 'Direct',
  },
]

// ── Stat Numbers ──
const STATS = [
  { value: '10+', label: 'AI Agents' },
  { value: '3', label: 'Transport Modes' },
  { value: '100%', label: 'Automated' },
  { value: '< 30s', label: 'Plan Generated' },
]

function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        {/* Background glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                          bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px]
                          bg-violet-600/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px]
                          bg-blue-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-indigo-500/10 border border-indigo-500/20 text-indigo-400
                          text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Multi-Agent AI Travel Planner
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">Plan Your Perfect</span>
            <br />
            <span className="gradient-text">Trip With AI</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            TripPilot AI uses a team of specialized AI agents to find the best
            flights, trains, buses, hotels, and activities — then builds a complete
            itinerary that fits your budget.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/plan"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold
                         gradient-primary text-white hover:opacity-90 transition-all
                         shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50
                         hover:-translate-y-0.5"
            >
              <Plane className="w-5 h-5" />
              Start Planning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/agents"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium
                         text-slate-300 bg-slate-700/50 hover:bg-slate-700 transition-all
                         border border-slate-600/50 hover:border-indigo-500/30"
            >
              <Brain className="w-5 h-5 text-indigo-400" />
              View AI Agents
            </Link>
          </div>

          {/* Transport Icons Row */}
          <div className="flex items-center justify-center gap-8 mt-14">
            {[
              { icon: Plane, label: 'Flights', color: 'text-blue-400' },
              { icon: Train, label: 'Trains',  color: 'text-green-400' },
              { icon: Bus,   label: 'Buses',   color: 'text-orange-400' },
              { icon: Hotel, label: 'Hotels',  color: 'text-purple-400' },
              { icon: MapPin,label: 'Activities',color: 'text-pink-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700
                                flex items-center justify-center group-hover:border-indigo-500/40
                                transition-colors">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 2. STATS SECTION                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="border-y border-slate-700/50 bg-slate-800/30 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text mb-1">{value}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 3. TRANSPORT COMPARISON PREVIEW                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Compares All Transport Modes
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Instantly see flights, trains, and buses side-by-side. Ranked by speed, price, and value.
            </p>
          </div>

          {/* Route Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-white font-semibold">Lucknow</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="text-white font-semibold">Goa</span>
            <span className="text-slate-500 text-sm ml-2">(Example)</span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRANSPORT_COMPARE.map(({ label, icon: Icon, mode, iconColor, bg, badge, time, price, stops }) => (
              <div
                key={label}
                className={`glass rounded-2xl p-6 border ${bg} card-hover`}
              >
                {/* Badge */}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${badge} mb-4`}>
                  <Star className="w-3 h-3" />
                  {label}
                </div>
                {/* Icon + Mode */}
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                  <span className="text-white text-lg font-semibold">{mode}</span>
                </div>
                {/* Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white font-medium">{time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Price</span>
                    <span className="text-green-400 font-bold">{price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Stops</span>
                    <span className="text-white font-medium">{stops}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 4. FEATURES SECTION                                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need, Automated
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A full team of AI agents handles every aspect of trip planning simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-6 card-hover border border-slate-700/50 hover:border-indigo-500/30"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 5. HOW IT WORKS                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400">From idea to itinerary in four steps.</p>
          </div>

          <div className="space-y-4">
            {HOW_IT_WORKS.map(({ step, title, desc }, index) => (
              <div
                key={step}
                className="flex items-start gap-5 glass rounded-2xl p-6 border border-slate-700/50
                           hover:border-indigo-500/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center
                               flex-shrink-0 text-white font-bold text-lg">
                  {step}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
                {index < HOW_IT_WORKS.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-slate-600 ml-auto self-center flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 6. FINAL CTA BANNER                                  */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 border border-indigo-500/20
                          bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center
                           mx-auto mb-6 animate-float">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Plan Your Trip?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Let AI agents do the heavy lifting. Get flights, trains, hotels,
              and activities — all within your budget.
            </p>
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base
                         font-semibold gradient-primary text-white hover:opacity-90
                         transition-all shadow-xl shadow-indigo-500/30"
            >
              Start Planning Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home


import { Link } from 'react-router-dom'
import { Compass, Heart, Plane, Train, Bus } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Footer.jsx
//
// Bottom footer shown on every page via MainLayout.
// Contains: logo, nav links, feature highlights, copyright.
// ─────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  Product: [
    { label: 'Plan a Trip', path: '/plan' },
    { label: 'My Trips',    path: '/my-trips' },
    { label: 'Search',      path: '/results' },
  ],
  Features: [
    { label: 'AI Planning',   path: '/' },
    { label: 'Flights',       path: '/' },
    { label: 'Hotels',        path: '/' },
    { label: 'Activities',    path: '/' },
  ],
  Developers: [
    { label: 'API Docs',      path: '/docs' },
    { label: 'Agent Monitor', path: '/agents' },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-slate-700/50 mt-auto" style={{ backgroundColor: '#0a0f1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Top Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">Trip</span>
                <span className="text-white">Pilot</span>
                <span className="text-indigo-400 text-xs font-medium ml-1">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Multi-agent AI travel planner that finds the best flights,
              trains, buses, hotels and activities — automatically.
            </p>

            {/* Transport Icons */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Plane className="w-3 h-3 text-blue-400" /> Flights
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Train className="w-3 h-3 text-green-400" /> Trains
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Bus className="w-3 h-3 text-orange-400" /> Buses
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using
            <span className="text-slate-400 font-medium ml-1">React + FastAPI + LangGraph</span>
          </p>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TripPilot AI — Demo Project
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


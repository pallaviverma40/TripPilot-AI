import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plane, Menu, X, MapPin, Compass } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Navbar.jsx
//
// Top navigation bar shown on every page.
// Features:
//  - Logo + brand name on the left
//  - Navigation links on the right (desktop)
//  - Hamburger menu for mobile
//  - Active link highlighting based on current URL
// ─────────────────────────────────────────────────────────────

// Navigation links — add more here as new pages are created
const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'Plan Trip', path: '/plan' },
  { label: 'My Trips', path: '/my-trips' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()  // tells us the current URL

  // Check if a link is the active page
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Trip</span>
              <span className="text-white">Pilot</span>
              <span className="text-indigo-400 text-sm font-medium ml-1">AI</span>
            </span>
          </Link>

          {/* ── Desktop Navigation Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA Button ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/plan"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                         gradient-primary text-white hover:opacity-90 transition-opacity
                         shadow-lg shadow-indigo-500/25"
            >
              <Plane className="w-4 h-4" />
              Plan a Trip
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── Mobile Menu (shown when hamburger is clicked) ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-700/50 py-3 space-y-1 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/plan"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 mx-4 mt-2 px-4 py-2 rounded-xl text-sm
                         font-semibold gradient-primary text-white text-center justify-center"
            >
              <Plane className="w-4 h-4" />
              Plan a Trip
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


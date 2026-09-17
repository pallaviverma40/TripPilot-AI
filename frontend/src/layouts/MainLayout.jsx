import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─────────────────────────────────────────────────────────────
// MainLayout.jsx
//
// Shared wrapper for all pages.
// Structure:
//   ┌─────────────────┐
//   │     Navbar      │  ← always visible
//   ├─────────────────┤
//   │  <Outlet />     │  ← the current page renders here
//   │  (Home, Plan,   │
//   │   Results, etc) │
//   ├─────────────────┤
//   │     Footer      │  ← always visible
//   └─────────────────┘
// ─────────────────────────────────────────────────────────────

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a' }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content — React Router inserts the current page here */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout


import React, { useState, useMemo } from 'react'
import { useVessels } from './hooks/useVessels'
import StatsPanel from './components/StatsPanel'
import FilterBar from './components/FilterBar'
import VesselList from './components/VesselList'

function Header({ lastUpdated, error }) {
  return (
    <header className="glass border-b border-ocean-600/20 px-6 py-4 mb-6 relative overflow-hidden">
      <div className="scan-line absolute inset-y-0 w-1/3 pointer-events-none" />
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <h1 className="text-xl font-semibold text-ocean-400 tracking-wider">MINI TRIDENT</h1>
              <span className="text-xs px-2 py-0.5 rounded border border-ocean-700 text-ocean-500 hidden sm:block">
                MARITIME SURVEILLANCE
              </span>
            </div>
            <p className="text-xs text-slate-500 ml-10">Indian Ocean Domain — Live AIS + Radar Fusion</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {error ? (
            <span className="text-red-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 pulse-dot" />
              API offline — start backend
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              LIVE · {lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}
            </span>
          )}
          <span className="hidden sm:block text-slate-600">BlurgsAI Demo · 2026</span>
        </div>
      </div>
    </header>
  )
}

function DarkShipAlert({ count }) {
  if (!count) return null
  return (
    <div className="mb-5 rounded-lg border border-red-800/60 bg-red-950/30 px-4 py-3 flex items-center gap-3">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500 pulse-dot flex-shrink-0" />
      <span className="text-sm text-red-300">
        <strong>{count} dark vessel{count > 1 ? 's' : ''}</strong> detected — AIS transponder off.
        Cross-referencing radar and satellite signatures.
      </span>
    </div>
  )
}

export default function App() {
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const { vessels, stats, loading, error, lastUpdated } = useVessels(statusFilter)

  const darkCount = stats?.dark ?? 0

  return (
    <div className="min-h-screen bg-navy-900">
      <Header lastUpdated={lastUpdated} error={error} />

      <main className="px-4 sm:px-6 pb-10 max-w-screen-2xl mx-auto">
        <StatsPanel stats={stats} />
        <DarkShipAlert count={darkCount} />
        <FilterBar
          active={statusFilter}
          onChange={setStatusFilter}
          search={search}
          onSearch={setSearch}
        />

        {loading && vessels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-10 h-10 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Connecting to Trident API...</p>
          </div>
        ) : error && vessels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.96L13.75 4a2 2 0 00-3.5 0L3.25 16.04A2 2 0 005.07 19z" />
            </svg>
            <p className="text-red-400 text-sm font-medium">Backend not running</p>
            <p className="text-slate-500 text-xs">Run: <code className="text-ocean-400">uvicorn main:app --reload</code> in the backend folder</p>
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-600 mb-3">
              Showing {vessels.length} vessel{vessels.length !== 1 ? 's' : ''} · sorted by risk score ↓
              {search && ` · filtered by "${search}"`}
            </div>
            <VesselList vessels={vessels} search={search} />
          </>
        )}
      </main>
    </div>
  )
}

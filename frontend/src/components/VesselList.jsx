import React, { useMemo } from 'react'
import { FixedSizeGrid } from 'react-window'
import VesselCard from './VesselCard'

const CARD_H = 210
const CARD_W = 300
const GAP = 12

export default function VesselList({ vessels, search }) {
  const filtered = useMemo(() => {
    if (!search) return vessels
    const q = search.toLowerCase()
    return vessels.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.mmsi.includes(q) ||
      v.flag.toLowerCase().includes(q) ||
      v.type.toLowerCase().includes(q)
    )
  }, [vessels, search])

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">No vessels match your filter</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {filtered.map(v => (
        <VesselCard key={v.id} vessel={v} />
      ))}
    </div>
  )
}

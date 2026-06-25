import React from 'react'

const FILTERS = [
  { value: '', label: 'All Vessels' },
  { value: 'normal', label: 'Normal' },
  { value: 'suspicious', label: 'Suspicious' },
  { value: 'dark', label: 'Dark Ships' },
]

export default function FilterBar({ active, onChange, search, onSearch }) {
  return (
    <div className="flex flex-wrap gap-3 mb-5 items-center">
      <div className="flex gap-2">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all border
              ${active === f.value
                ? 'bg-ocean-600 border-ocean-400 text-white'
                : 'bg-transparent border-slate-700 text-slate-400 hover:border-ocean-600 hover:text-slate-200'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search vessel name, MMSI, flag..."
        value={search}
        onChange={e => onSearch(e.target.value)}
        className="ml-auto bg-navy-700 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-200
          placeholder-slate-500 focus:outline-none focus:border-ocean-500 w-64"
      />
    </div>
  )
}

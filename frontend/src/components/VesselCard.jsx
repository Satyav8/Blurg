import React from 'react'

const STATUS_META = {
  normal:     { label: 'NORMAL',     bg: 'bg-emerald-900/40', border: 'border-emerald-700/40', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  suspicious: { label: 'SUSPICIOUS', bg: 'bg-amber-900/40',   border: 'border-amber-700/40',   dot: 'bg-amber-400',   text: 'text-amber-400'   },
  dark:       { label: 'DARK / AIS OFF', bg: 'bg-red-900/40', border: 'border-red-700/40',     dot: 'bg-red-500',     text: 'text-red-400'     },
}

function RiskBar({ score }) {
  const color = score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-amber-400' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-semibold w-8 text-right ${
        score >= 70 ? 'text-red-400' : score >= 40 ? 'text-amber-400' : 'text-emerald-400'
      }`}>{score}%</span>
    </div>
  )
}

export default function VesselCard({ vessel }) {
  const meta = STATUS_META[vessel.status] ?? STATUS_META.normal
  const lastSeen = new Date(vessel.last_seen)
  const minsAgo = Math.round((Date.now() - lastSeen.getTime()) / 60000)

  return (
    <div className={`glass-card rounded-lg p-4 border ${meta.border} ${meta.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot} ${vessel.status === 'dark' ? 'pulse-dot' : ''}`} />
            <span className="text-sm font-semibold text-slate-100 truncate max-w-[160px]">{vessel.name}</span>
            <span className="text-xs text-slate-500">{vessel.flag}</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 ml-4">{vessel.type}</div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${meta.border} ${meta.text}`}>
          {meta.label}
        </span>
      </div>

      <RiskBar score={vessel.risk_score} />

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs">
        <div className="text-slate-500">MMSI <span className="text-slate-300 font-mono">{vessel.mmsi}</span></div>
        <div className="text-slate-500">Speed <span className="text-slate-300">{vessel.speed} kn</span></div>
        <div className="text-slate-500">HDG <span className="text-slate-300">{vessel.heading}°</span></div>
        <div className="text-slate-500">AIS <span className={vessel.ais_active ? 'text-emerald-400' : 'text-red-400'}>{vessel.ais_active ? 'ON' : 'OFF'}</span></div>
        <div className="text-slate-500 col-span-2">
          POS <span className="text-slate-300">{vessel.lat}°N {vessel.lon}°E</span>
        </div>
        <div className="text-slate-500 col-span-2">
          Last seen <span className="text-slate-400">{minsAgo < 1 ? 'just now' : `${minsAgo}m ago`}</span>
        </div>
      </div>
    </div>
  )
}

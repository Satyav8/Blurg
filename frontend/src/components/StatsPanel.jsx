import React from 'react'

function StatBox({ label, value, color, pulse }) {
  return (
    <div className="glass-card rounded-lg p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {pulse && <span className={`w-2 h-2 rounded-full pulse-dot ${color}`} />}
        <span className="text-xs text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-2xl font-semibold ${color.replace('bg-', 'text-')}`}>{value ?? '—'}</span>
    </div>
  )
}

export default function StatsPanel({ stats }) {
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <StatBox label="Total Vessels" value={stats.total} color="text-ocean-400" pulse />
      <StatBox label="Normal" value={stats.normal} color="text-emerald-400" />
      <StatBox label="Suspicious" value={stats.suspicious} color="text-amber-400" />
      <StatBox label="Dark Ships" value={stats.dark} color="text-red-400" pulse />
      <StatBox label="AIS Active" value={stats.ais_active} color="text-ocean-400" />
      <StatBox label="Avg Risk" value={`${stats.avg_risk}%`} color="text-purple-400" />
    </div>
  )
}

"use client"

import { useAppStore } from "../lib/store"

export function MomentSelector() {
  const moments = useAppStore((state) => state.moments)
  const selectedMomentId = useAppStore((state) => state.selectedMomentId)
  const selectMoment = useAppStore((state) => state.selectMoment)

  return (
    <div className="space-y-2">
      <label htmlFor="moment-selector" className="block text-sm font-medium text-gray-700">
        Assessment Moment
      </label>
      <select
        id="moment-selector"
        value={selectedMomentId || ""}
        onChange={(e) => selectMoment(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
      >
        <option value="" disabled>
          Select assessment moment
        </option>
        {moments.map((moment) => (
          <option key={moment.id} value={moment.id}>
            {moment.name} - {new Date(moment.date).toLocaleDateString()}
          </option>
        ))}
      </select>

      {selectedMomentId && (
        <p className="text-sm text-gray-500 mt-1">{moments.find((m) => m.id === selectedMomentId)?.description}</p>
      )}
    </div>
  )
}


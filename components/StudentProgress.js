"use client"

import { useAppStore } from "../lib/store"

export function StudentProgress({ studentId }) {
  const students = useAppStore((state) => state.students)
  const moments = useAppStore((state) => state.moments)

  const student = students.find((s) => s.id === studentId)

  if (!student) return null

  // Calculate level scores
  const levelScores = {
    undefined: 0,
    orienting: 1,
    beginning: 2,
    proficient: 3,
    outstanding: 4,
  }

  // Calculate progress for each moment
  const momentProgress = moments.map((moment) => {
    const outcomes = student.outcomes[moment.id] || []
    const totalScore = outcomes.reduce((sum, outcome) => {
      return sum + levelScores[outcome.level]
    }, 0)

    const maxPossibleScore = outcomes.length * 4 // 4 is the score for "outstanding"
    const progressPercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0

    return {
      momentId: moment.id,
      momentName: moment.name,
      progressPercentage,
    }
  })

  // Calculate the average level for each learning outcome across all moments
  const outcomeTrends =
    student.outcomes[moments[0].id]?.map((outcome, index) => {
      const levels = moments.map((moment) => {
        const outcomeInMoment = student.outcomes[moment.id]?.[index]
        return outcomeInMoment ? levelScores[outcomeInMoment.level] : 0
      })

      const averageLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length
      const trendPercentage = Math.round((averageLevel / 4) * 100) // 4 is the score for "outstanding"

      return {
        outcomeId: outcome.id,
        outcomeTitle: outcome.title,
        trendPercentage,
      }
    }) || []

  const getLevelColorClass = (percentage) => {
    if (percentage < 25) return "bg-gray-300" // undefined
    if (percentage < 50) return "bg-blue-400" // orienting
    if (percentage < 75) return "bg-indigo-500" // beginning
    if (percentage < 95) return "bg-violet-500" // proficient
    return "bg-purple-600" // outstanding
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Overall Progress</h3>
        </div>
        <div className="p-4 space-y-6">
          {momentProgress.map((moment) => (
            <div key={moment.momentId} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{moment.momentName}</span>
                <span className="text-sm text-gray-500">{moment.progressPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getLevelColorClass(moment.progressPercentage)}`}
                  style={{ width: `${moment.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Learning Outcome Trends</h3>
        </div>
        <div className="p-4 space-y-6">
          {outcomeTrends.map((trend) => (
            <div key={trend.outcomeId} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{trend.outcomeTitle}</span>
                <span className="text-sm text-gray-500">{trend.trendPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getLevelColorClass(trend.trendPercentage)}`}
                  style={{ width: `${trend.trendPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


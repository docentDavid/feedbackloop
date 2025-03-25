"use client"

import { useAppStore } from "../lib/store"
import { cn } from "../lib/utils"

export function LearningOutcomeCard({ outcome, studentId, momentId }) {
  const updateOutcomeLevel = useAppStore((state) => state.updateOutcomeLevel)
  const updateOutcomeFeedback = useAppStore((state) => state.updateOutcomeFeedback)

  const handleLevelChange = (e) => {
    updateOutcomeLevel(studentId, momentId, outcome.id, e.target.value)
  }

  const handleFeedbackChange = (e) => {
    updateOutcomeFeedback(studentId, momentId, outcome.id, e.target.value, outcome.feedforward)
  }

  const handleFeedforwardChange = (e) => {
    updateOutcomeFeedback(studentId, momentId, outcome.id, outcome.feedback, e.target.value)
  }

  const getLevelColorClass = (level) => {
    switch (level) {
      case "undefined":
        return "level-undefined"
      case "orienting":
        return "level-orienting"
      case "beginning":
        return "level-beginning"
      case "proficient":
        return "level-proficient"
      case "outstanding":
        return "level-outstanding"
      default:
        return "level-undefined"
    }
  }

  return (
    <div className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in bg-white border rounded-lg">
      <div className="pb-2 p-4 border-b">
        <div className="flex flex-col mb-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">{outcome.title}</h3>
            <div
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0",
                getLevelColorClass(outcome.level),
              )}
            >
              {outcome.level.charAt(0).toUpperCase() + outcome.level.slice(1)}
            </div>
          </div>
          <p className="text-sm text-gray-500">{outcome.description}</p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor={`level-${outcome.id}`} className="block text-sm font-medium text-gray-700">
            Assessment Level
          </label>
          <select
            id={`level-${outcome.id}`}
            value={outcome.level}
            onChange={handleLevelChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="undefined">Undefined</option>
            <option value="orienting">Orienting</option>
            <option value="beginning">Beginning</option>
            <option value="proficient">Proficient</option>
            <option value="outstanding">Outstanding</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor={`feedback-${outcome.id}`} className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id={`feedback-${outcome.id}`}
            placeholder="Provide feedback on current performance"
            value={outcome.feedback}
            onChange={handleFeedbackChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border resize-none min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`feedforward-${outcome.id}`} className="block text-sm font-medium text-gray-700">
            Feedforward
          </label>
          <textarea
            id={`feedforward-${outcome.id}`}
            placeholder="Provide suggestions for improvement"
            value={outcome.feedforward}
            onChange={handleFeedforwardChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border resize-none min-h-[80px]"
          />
        </div>
      </div>
    </div>
  )
}


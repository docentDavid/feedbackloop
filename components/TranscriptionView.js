"use client"

import { useAppStore } from "../lib/store"

export function TranscriptionView() {
  const transcription = useAppStore((state) => state.transcription)

  if (!transcription) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-gray-300 mb-3"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-400">No Transcription Available</h3>
          <p className="text-sm text-gray-400 mt-1">Record and process a conversation to see the transcription here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden shadow-md rounded-lg border">
      <div className="bg-gray-50 border-b border-gray-100 pb-3 p-4">
        <h3 className="text-lg font-medium flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 mr-2 text-blue-500"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Conversation Transcription
        </h3>
      </div>
      <div className="p-0">
        <div className="h-[300px] p-4 overflow-auto">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{transcription}</div>
        </div>
      </div>
    </div>
  )
}


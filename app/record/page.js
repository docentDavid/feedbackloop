"use client"

import { Header } from "../../components/Header"
import { StudentList } from "../../components/StudentList"
import { MomentSelector } from "../../components/MomentSelector"
import { RecordingView } from "../../components/RecordingView"
import { TranscriptionView } from "../../components/TranscriptionView"
import { LearningOutcomeCard } from "../../components/LearningOutcomeCard"
import { useAppStore } from "../../lib/store"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Record() {
  const router = useRouter()
  const selectedStudentId = useAppStore((state) => state.selectedStudentId)
  const selectedMomentId = useAppStore((state) => state.selectedMomentId)
  const transcription = useAppStore((state) => state.transcription)
  const students = useAppStore((state) => state.students)
  const moments = useAppStore((state) => state.moments)

  const selectedStudent = students.find((s) => s.id === selectedStudentId)
  const selectedMoment = moments.find((m) => m.id === selectedMomentId)

  const handleSaveFeedback = () => {
    if (!selectedStudentId || !selectedMomentId) {
      alert("Please select a student and assessment moment.")
      return
    }

    alert("The feedback has been saved successfully.")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900">Record Feedback</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 pb-3 p-4">
                <h3 className="text-lg font-medium">Session Details</h3>
              </div>
              <div className="p-4 space-y-6">
                <MomentSelector />

                {!selectedStudentId && (
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Select Student</h3>
                    <StudentList />
                  </div>
                )}

                {selectedStudentId && (
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Student</h3>
                    <div className="flex items-center space-x-3">
                      {selectedStudent?.profileImage ? (
                        <img
                          src={selectedStudent.profileImage || "/placeholder.svg"}
                          alt={selectedStudent.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
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
                            className="w-5 h-5 text-gray-500"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{selectedStudent?.name}</p>
                        <p className="text-sm text-gray-500">{selectedStudent?.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStudentId && selectedMomentId && (
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSaveFeedback}
                      disabled={!transcription}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save Feedback
                    </button>
                  </div>
                )}
              </div>
            </div>

            <RecordingView />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <TranscriptionView />

            {transcription && selectedStudentId && selectedMomentId && (
              <div className="space-y-4">
                <div className="flex items-center">
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2 className="text-xl font-medium text-gray-800">Learning Outcomes Assessment</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStudent?.outcomes[selectedMomentId]?.map((outcome) => (
                    <LearningOutcomeCard
                      key={outcome.id}
                      outcome={outcome}
                      studentId={selectedStudentId}
                      momentId={selectedMomentId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


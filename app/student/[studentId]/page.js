"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "../../../components/Header"
import { StudentProgress } from "../../../components/StudentProgress"
import { LearningOutcomeCard } from "../../../components/LearningOutcomeCard"
import { useAppStore } from "../../../lib/store"
import Link from "next/link"

export default function StudentDetail() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.studentId

  const students = useAppStore((state) => state.students)
  const moments = useAppStore((state) => state.moments)
  const recordings = useAppStore((state) => state.recordings)

  const [activeTab, setActiveTab] = useState(`moment${moments[0].id}`)

  const student = students.find((s) => s.id === studentId)

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-medium">Student Not Found</h2>
                <p className="text-gray-500">The student you're looking for doesn't exist or has been removed.</p>
                <button
                  onClick={() => router.push("/students")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  Back to Students
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Get student recordings
  const studentRecordings = recordings.filter((recording) => recording.studentId === studentId)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center mb-6">
          <Link
            href="/students"
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
            Back to Students
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900">Student Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {student.profileImage ? (
                      <img
                        src={student.profileImage || "/placeholder.svg"}
                        alt={student.name}
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
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
                          className="w-10 h-10 text-gray-500"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}

                    <h2 className="text-xl font-medium text-gray-900">{student.name}</h2>
                    <p className="text-gray-500">{student.email}</p>

                    <div className="mt-6 w-full">
                      <button
                        onClick={() => router.push("/record")}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Record Feedback
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <StudentProgress studentId={student.id} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="pb-0 border-b border-gray-200">
                <div className="w-full">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                      {moments.map((moment) => (
                        <button
                          key={moment.id}
                          onClick={() => setActiveTab(`moment${moment.id}`)}
                          className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                            activeTab === `moment${moment.id}`
                              ? "border-blue-500 text-blue-500"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {moment.name}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {moments.map((moment) => (
                    <div
                      key={moment.id}
                      className={`pt-4 px-6 ${activeTab === `moment${moment.id}` ? "block" : "hidden"}`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-medium">{moment.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(moment.date).toLocaleDateString()} - {moment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {moments.map((moment) => (
                  <div
                    key={moment.id}
                    className={`space-y-6 ${activeTab === `moment${moment.id}` ? "block" : "hidden"}`}
                  >
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
                      <h3 className="text-lg font-medium">Learning Outcomes</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {student.outcomes[moment.id]?.map((outcome) => (
                        <LearningOutcomeCard
                          key={outcome.id}
                          outcome={outcome}
                          studentId={student.id}
                          momentId={moment.id}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


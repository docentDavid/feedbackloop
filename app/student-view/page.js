"use client"

import { useState } from "react"
import { Header } from "../../components/Header"
import { useAppStore } from "../../lib/store"
import { StudentProgress } from "../../components/StudentProgress"

export default function StudentView() {
  const user = useAppStore((state) => state.user)
  const students = useAppStore((state) => state.students)
  const moments = useAppStore((state) => state.moments)
  const selectedMomentId = useAppStore((state) => state.selectedMomentId)
  const selectMoment = useAppStore((state) => state.selectMoment)

  // For demo purposes, we'll use the first student as the logged-in student
  // In a real app, this would come from authentication
  const [studentId] = useState(students[0].id)
  const student = students.find((s) => s.id === studentId)

  const [activeTab, setActiveTab] = useState(`moment${moments[0].id}`)

  if (!student) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">My Portfolio Progress</h1>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Student View
              </span>
            </div>
          </div>
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
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium">Portfolio Timeline</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {moments.map((moment, index) => (
                      <div key={moment.id} className="flex items-start">
                        <div className={`flex flex-col items-center mr-4`}>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index < 2 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {index < 2 ? (
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
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          {index < moments.length - 1 && <div className="w-0.5 h-12 bg-gray-200"></div>}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{moment.name}</h4>
                          <p className="text-xs text-gray-500">{new Date(moment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500 mt-1">{moment.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <StudentProgress studentId={studentId} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="pb-0 border-b border-gray-200">
                <div className="w-full">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex overflow-x-auto">
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

                    <div className="space-y-6">
                      {student.outcomes[moment.id]?.map((outcome) => (
                        <div key={outcome.id} className="bg-white border rounded-lg overflow-hidden">
                          <div className="pb-2 p-4 border-b">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-medium">{outcome.title}</h3>
                              <div
                                className={`px-2 py-1 rounded-full text-xs font-medium level-${outcome.level} ml-2 flex-shrink-0`}
                              >
                                {outcome.level.charAt(0).toUpperCase() + outcome.level.slice(1)}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{outcome.description}</p>
                          </div>
                          <div className="p-4 space-y-4">
                            {outcome.feedback && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700">Feedback</h4>
                                <div className="bg-gray-50 p-3 rounded-md text-sm">{outcome.feedback}</div>
                              </div>
                            )}

                            {outcome.feedforward && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700">Feedforward</h4>
                                <div className="bg-gray-50 p-3 rounded-md text-sm">{outcome.feedforward}</div>
                              </div>
                            )}

                            {!outcome.feedback && !outcome.feedforward && (
                              <div className="text-sm text-gray-500 italic">
                                No feedback has been provided yet for this learning outcome.
                              </div>
                            )}
                          </div>
                        </div>
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


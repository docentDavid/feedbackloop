"use client"

import { Header } from "../components/Header"
import { StudentList } from "../components/StudentList"
import { MomentSelector } from "../components/MomentSelector"
import { StudentProgress } from "../components/StudentProgress"
import { useAppStore } from "../lib/store"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const selectedStudentId = useAppStore((state) => state.selectedStudentId)
  const students = useAppStore((state) => state.students)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Student Feedback Dashboard</h1>

              <div className="space-y-8">
                <StudentList />

                {selectedStudentId && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <h2 className="text-lg font-medium text-gray-800">
                        {students.find((s) => s.id === selectedStudentId)?.name}
                      </h2>
                      <p className="text-sm text-gray-500">Selected for feedback and assessment</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/student/${selectedStudentId}`)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => router.push("/record")}
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
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" y1="19" y2="22" x2="12"></line>
                        </svg>
                        Record Feedback
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
                          className="ml-2 h-4 w-4"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedStudentId && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-slide-in">
                <MomentSelector />
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            {selectedStudentId && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-slide-in">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Progress Overview</h2>
                <StudentProgress studentId={selectedStudentId} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


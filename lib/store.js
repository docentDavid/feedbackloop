"use client"

import { create } from "zustand"

// Update the mockMoments array with the dates from the attachment
const mockMoments = [
  {
    id: "1",
    name: "Portfolio / FeedPulse - versie 1 (Week 6)",
    date: "2023-03-30",
    description: "First iteration of your portfolio",
  },
  {
    id: "2",
    name: "Portfolio / FeedPulse - versie 2 (Week 10)",
    date: "2023-05-04",
    description: "Second iteration of your portfolio",
  },
  {
    id: "3",
    name: "Portfolio / FeedPulse - versie 3 (Week 15)",
    date: "2023-06-15",
    description: "Third iteration of your portfolio",
  },
  {
    id: "4",
    name: "Portfolio / FeedPulse - versie 4 (Week 18)",
    date: "2023-07-02",
    description: "Fourth/Final iteration of your portfolio",
  },
]

// Update the mockOutcomes array with the new learning outcomes
const mockOutcomes = [
  {
    id: "1",
    title: "LO1 - Conceptualize, design, and develop interactive media products",
    description:
      "You create engaging concepts and translate them into interactive validated media products by applying user-centred design principles, and visual design techniques and by exploring emerging trends and developments in media, design and technologies.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "2",
    title: "LO2 - Transferable production",
    description:
      "You document and comment on your code using version control in a personal and team context and communicate technical recommendations.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "3",
    title: "LO3 - Creative iterations",
    description:
      "You present the successive iterations of your creative process, and the connections between them, of your methodically substantiated, iterative design and development process.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "4",
    title: "LO4 - Professional standards",
    description:
      "Both individually and in teams, you apply a relevant methodological approach used in the professional field to formulate project goals, involve stakeholders, conduct applied (BA) or action-oriented (AD) research, provide advice, make decisions, and deliver reports. In doing so, you consider the relevant ethical, intercultural, and sustainable aspects.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "5",
    title: "LO5 - Personal leadership",
    description:
      "You are aware of your strengths and weaknesses, both in ICT and your personal development. You choose actions aligning with your core values to promote your personal growth and develop your learning attitude.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
]

// Expand the mockStudents array to 16 students
const mockStudents = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    profileImage: "https://i.pravatar.cc/150?img=1",
    outcomes: {},
  },
  {
    id: "2",
    name: "Liam Smith",
    email: "liam.smith@example.com",
    profileImage: "https://i.pravatar.cc/150?img=2",
    outcomes: {},
  },
  {
    id: "3",
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    profileImage: "https://i.pravatar.cc/150?img=3",
    outcomes: {},
  },
  {
    id: "4",
    name: "Noah Wilson",
    email: "noah.wilson@example.com",
    profileImage: "https://i.pravatar.cc/150?img=4",
    outcomes: {},
  },
  {
    id: "5",
    name: "Ava Martinez",
    email: "ava.martinez@example.com",
    profileImage: "https://i.pravatar.cc/150?img=5",
    outcomes: {},
  },
  {
    id: "6",
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    profileImage: "https://i.pravatar.cc/150?img=6",
    outcomes: {},
  },
  {
    id: "7",
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    profileImage: "https://i.pravatar.cc/150?img=7",
    outcomes: {},
  },
  {
    id: "8",
    name: "Mason Anderson",
    email: "mason.anderson@example.com",
    profileImage: "https://i.pravatar.cc/150?img=8",
    outcomes: {},
  },
  {
    id: "9",
    name: "Isabella Thomas",
    email: "isabella.thomas@example.com",
    profileImage: "https://i.pravatar.cc/150?img=9",
    outcomes: {},
  },
  {
    id: "10",
    name: "Lucas Jackson",
    email: "lucas.jackson@example.com",
    profileImage: "https://i.pravatar.cc/150?img=10",
    outcomes: {},
  },
  {
    id: "11",
    name: "Mia White",
    email: "mia.white@example.com",
    profileImage: "https://i.pravatar.cc/150?img=11",
    outcomes: {},
  },
  {
    id: "12",
    name: "Alexander Harris",
    email: "alexander.harris@example.com",
    profileImage: "https://i.pravatar.cc/150?img=12",
    outcomes: {},
  },
  {
    id: "13",
    name: "Charlotte Martin",
    email: "charlotte.martin@example.com",
    profileImage: "https://i.pravatar.cc/150?img=13",
    outcomes: {},
  },
  {
    id: "14",
    name: "Benjamin Thompson",
    email: "benjamin.thompson@example.com",
    profileImage: "https://i.pravatar.cc/150?img=14",
    outcomes: {},
  },
  {
    id: "15",
    name: "Amelia Garcia",
    email: "amelia.garcia@example.com",
    profileImage: "https://i.pravatar.cc/150?img=15",
    outcomes: {},
  },
  {
    id: "16",
    name: "William Rodriguez",
    email: "william.rodriguez@example.com",
    profileImage: "https://i.pravatar.cc/150?img=16",
    outcomes: {},
  },
]

// Initialize outcomes for each student
mockStudents.forEach((student) => {
  mockMoments.forEach((moment) => {
    student.outcomes[moment.id] = JSON.parse(JSON.stringify(mockOutcomes))
  })
})

const mockUser = {
  id: "1",
  name: "Teacher Smith",
  email: "teacher@example.com",
  role: "teacher",
}

export const useAppStore = create((set) => ({
  user: mockUser,
  moments: mockMoments,
  students: mockStudents,
  recordings: [],
  selectedMomentId: mockMoments[0].id,
  selectedStudentId: null,
  isRecording: false,
  transcription: null,

  // Actions
  setUser: (user) => set({ user }),

  selectMoment: (momentId) => set({ selectedMomentId: momentId }),

  selectStudent: (studentId) => set({ selectedStudentId: studentId }),

  startRecording: () => set({ isRecording: true }),

  stopRecording: (audioUrl, duration) =>
    set((state) => {
      if (!state.selectedStudentId || !state.selectedMomentId) return state

      const newRecording = {
        id: Date.now().toString(),
        studentId: state.selectedStudentId,
        momentId: state.selectedMomentId,
        date: new Date().toISOString(),
        audioUrl,
        duration,
      }

      return {
        isRecording: false,
        recordings: [...state.recordings, newRecording],
      }
    }),

  setTranscription: (transcription) => set({ transcription }),

  updateOutcomeLevel: (studentId, momentId, outcomeId, level) =>
    set((state) => {
      const students = state.students.map((student) => {
        if (student.id !== studentId) return student

        const updatedOutcomes = { ...student.outcomes }
        if (updatedOutcomes[momentId]) {
          updatedOutcomes[momentId] = updatedOutcomes[momentId].map((outcome) => {
            if (outcome.id !== outcomeId) return outcome
            return { ...outcome, level }
          })
        }

        return { ...student, outcomes: updatedOutcomes }
      })

      return { students }
    }),

  updateOutcomeFeedback: (studentId, momentId, outcomeId, feedback, feedforward) =>
    set((state) => {
      const students = state.students.map((student) => {
        if (student.id !== studentId) return student

        const updatedOutcomes = { ...student.outcomes }
        if (updatedOutcomes[momentId]) {
          updatedOutcomes[momentId] = updatedOutcomes[momentId].map((outcome) => {
            if (outcome.id !== outcomeId) return outcome
            return { ...outcome, feedback, feedforward }
          })
        }

        return { ...student, outcomes: updatedOutcomes }
      })

      return { students }
    }),

  addStudent: (name, email) =>
    set((state) => {
      const newStudent = {
        id: Date.now().toString(),
        name,
        email,
        profileImage: `https://i.pravatar.cc/150?img=${state.students.length + 4}`,
        outcomes: {},
      }

      // Initialize outcomes for the new student
      state.moments.forEach((moment) => {
        newStudent.outcomes[moment.id] = JSON.parse(JSON.stringify(mockOutcomes))
      })

      return { students: [...state.students, newStudent] }
    }),
}))


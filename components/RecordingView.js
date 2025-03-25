"use client"

import { useState, useRef, useEffect } from "react"
import { useAppStore } from "../lib/store"

export function RecordingView() {
  const isRecording = useAppStore((state) => state.isRecording)
  const startRecording = useAppStore((state) => state.startRecording)
  const stopRecording = useAppStore((state) => state.stopRecording)
  const setTranscription = useAppStore((state) => state.setTranscription)
  const selectedStudentId = useAppStore((state) => state.selectedStudentId)
  const selectedMomentId = useAppStore((state) => state.selectedMomentId)

  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartRecording = async () => {
    if (!selectedStudentId) {
      alert("Please select a student before recording.")
      return
    }

    if (!selectedMomentId) {
      alert("Please select a feedback moment before recording.")
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data)
      })

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioUrl(audioUrl)

        // Clean up stream tracks
        stream.getTracks().forEach((track) => track.stop())
      })

      startRecording()
      mediaRecorderRef.current.start()

      // Start timer
      setRecordingTime(0)
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      alert("Recording Started")
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Please ensure you have granted microphone permissions.")
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()

      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }

      stopRecording("", recordingTime)

      alert(`Recording Complete: Recorded ${formatTime(recordingTime)} of conversation.`)
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProcessAudio = async () => {
    if (!audioBlob) return

    setIsProcessing(true)

    try {
      // Mock transcription process for now
      // In a real app, you would send the audio to a transcription service
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockTranscription =
        "This is a mock transcription of the recorded conversation. In a real application, this would contain the actual transcription of the audio from a service like Google Speech-to-Text, Azure Speech Services, or similar."

      setTranscription(mockTranscription)

      alert("Your conversation has been transcribed successfully.")
    } catch (error) {
      console.error("Error transcribing audio:", error)
      alert("There was an error processing your recording.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="overflow-hidden shadow-md bg-white rounded-lg border">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {isRecording ? (
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse-recording"></div>
            ) : null}
            <div
              className={`relative z-10 w-20 h-20 rounded-full ${isRecording ? "bg-red-500" : "bg-gray-200"} flex items-center justify-center shadow-md transition-all duration-300`}
            >
              {isRecording ? (
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
                  className="w-10 h-10 text-white"
                >
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" y2="23" x2="12"></line>
                </svg>
              ) : (
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
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" y2="22" x2="12"></line>
                </svg>
              )}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-medium">
              {isRecording ? formatTime(recordingTime) : audioUrl ? "Recording Complete" : "Ready to Record"}
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {isRecording
                ? "Recording in progress..."
                : audioUrl
                  ? "You can now play back the recording or process it for transcription"
                  : "Click the button below to start recording"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {!isRecording && !audioUrl && (
              <button
                onClick={handleStartRecording}
                disabled={!selectedStudentId || !selectedMomentId}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" y2="22" x2="12"></line>
                </svg>
                Start Recording
              </button>
            )}

            {isRecording && (
              <button
                onClick={handleStopRecording}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 hover:shadow-lg"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" y2="23" x2="12"></line>
                </svg>
                Stop Recording
              </button>
            )}

            {audioUrl && !isProcessing && (
              <>
                <button
                  onClick={handlePlayPause}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
                >
                  {isPlaying ? (
                    <>
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
                        className="mr-2 h-5 w-5"
                      >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
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
                        className="mr-2 h-5 w-5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Play
                    </>
                  )}
                </button>

                <button
                  onClick={handleProcessAudio}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
                >
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
                    className="mr-2 h-5 w-5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" y2="15" x2="12"></line>
                  </svg>
                  Process Recording
                </button>
              </>
            )}

            {isProcessing && (
              <div className="w-full max-w-md space-y-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "50%" }}></div>
                </div>
                <div className="flex items-center justify-center text-gray-500 text-sm">
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
                    className="mr-2 h-4 w-4 animate-spin"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  Processing your recording...
                </div>
              </div>
            )}
          </div>
        </div>

        {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />}
      </div>
    </div>
  )
}


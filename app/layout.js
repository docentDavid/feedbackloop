import "./globals.css"

export const metadata = {
  title: "FeedbackLoop",
  description: "A platform for providing feedback to students",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'
import type { Metadata } from 'next'
import './globals.css'
import './components/sass/starflow.scss'

export const metadata: Metadata = {
  title: 'DEEPSPACE',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        {children}
      </body>
    </html>
  )
}

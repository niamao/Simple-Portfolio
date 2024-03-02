"use client"
import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
      setLoaded(true);
  }, [setLoaded]);

  return (
    <html lang="en">
      <body className={`bg-white dark:bg-stone-900`}>
        {loaded && (
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}

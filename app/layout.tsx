import '../styles/globals.css'
import React, { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppMetadata } from "@/components/AppMetadata";
import { ThemeContext } from "context";
import Loading from "./loading";

export const metadata = { ...AppMetadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-white dark:bg-stone-900`}>
        <ThemeContext>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </ThemeContext>
      </body>
    </html>
  )
}

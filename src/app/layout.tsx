import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { cn } from "@/utils"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "jStack App",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
    <body className="font-sans min-h-[calc(100vh-1px)] flex flex-col bg-brand-50 text-brand-950 antialiased">
    <main className={"relative flex-1 flex flex-col"}>
        <Providers>{children}</Providers>
    </main>
      </body>
    </html>
    </ClerkProvider>
  )
}

import React from "react"
import { cn } from "@/utils"


interface MaxWidthWrapperProps {
  classname?: string
  children: React.ReactNode
}

const MaxWidthWrapper = ({ classname, children }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("h-full w-full mx-auto max-w-screen-xl px-2.5 md:px-20", classname)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
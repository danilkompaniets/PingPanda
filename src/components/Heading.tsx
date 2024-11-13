import React, { HTMLAttributes } from "react"
import { cn } from "@/utils"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  className?: string
  props?: any
}

const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn("text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800", className)}>
      {children}
    </h1>
  )
}

export default Heading
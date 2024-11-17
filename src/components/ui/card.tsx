import React, { HTMLAttributes } from "react"
import { cn } from "@/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string
}

const Card = ({ className, contentClassName, children, ...props }: CardProps) => {
  return (
    <div className={cn(className, "relative h-full rounded-lg bg-gray-50 text-card-foreground")} {...props}>
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
      <div className={"absolute z-0 inset-px rounded-lg bg-white"} />
      <div className={"pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"} />
    </div>
  )
}

export default Card
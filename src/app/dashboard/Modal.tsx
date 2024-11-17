"use client"

import React, { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Dialog, DialogContent } from "@/components/ui/dialog"


interface ModalProps {
  isOpen: boolean,
  closeFn: () => void,
  children: React.ReactNode,
}

const Modal = ({ children, isOpen, closeFn }: ModalProps) => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    // Check if window is available
    if (typeof window !== "undefined") {
      // Set initial width
      setWidth(window.innerWidth)

      // Update width on resize
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)

      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, []);

  if (width < 768) {
    return (
      <Drawer open={isOpen} onClose={() => closeFn()}>
        <DrawerContent className={"p-4 flex items-center"}>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className={"text-center"}></DrawerDescription>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
  if (width > 768) {
    return (
      <Dialog open={isOpen} onOpenChange={() => closeFn()}>
        <DialogContent className={"p-4"}>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
}


export default Modal
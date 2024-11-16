"use client"

import React from "react"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


interface ModalProps {
  deletingCategory: string | null
  setDeletingCategory: () => void
  children: React.ReactNode,
}

const Modal = ({ deletingCategory, children, setDeletingCategory }: ModalProps) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth)

  window.onresize = () => {
    setWidth(window.innerWidth)
  }

  if (width < 768) {
    return (
      <Drawer open={deletingCategory != null} onClose={setDeletingCategory}>
        <DrawerContent className={"p-4 flex items-center"}>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className={"text-center"}>
            This action cannot be undone.
          </DrawerDescription>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
  if (width > 768) {
    return (
      <Dialog open={deletingCategory != null} onOpenChange={setDeletingCategory}>
        <DialogContent className={"p-4"}>
          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
}


export default Modal
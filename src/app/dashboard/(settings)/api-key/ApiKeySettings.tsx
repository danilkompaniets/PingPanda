"use client"

import { useState } from "react"
import Card from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckIcon, ClipboardIcon } from "lucide-react"


export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }
  return (
    <Card className={"max-w-xl"}>
      <div>
        <Label>
          Your api key
        </Label>
        <div className={"mt-1 relative"}>
          <Input type={"password"} value={apiKey} disabled={true} />
          <div className={"absolute space-x-0.5 inset-y-0 right-0 flex items-center"}>
            <Button variant={"ghost"} onClick={copyApiKey}
                    className={"w-10 p-1 focus:outline-none focus:ring-2 focus:ring-brand-500"}>
              {copySuccess ? <CheckIcon className={"size-4 text-brand-900"} /> :
                <ClipboardIcon className={"size-4 text-brand-900"} />}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

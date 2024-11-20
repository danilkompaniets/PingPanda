"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { client } from "@/lib/client"
import Card from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const AccountSettings = ({ discordId: initialDiscordId }: { discordId: string }) => {
  const [discordId, setDiscordId] = useState<string>(initialDiscordId)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.auth.setDiscordId.$post({ discordId })
      return await res.json()
    },
  })

  return (
    <Card className={"max-w-xl w-full space-y-4"}>
      <div>
        <Label>
          Discord Id:
        </Label>
        <Input className={"mt-1"} value={discordId} onChange={(e) => setDiscordId(e.target.value)} />
      </div>

      <div className={"pt-4"}>
        <Button onClick={() => mutate(discordId)}>
          {isPending ? "Saving" : "Save changes"}
        </Button>
      </div>
    </Card>
  )
}
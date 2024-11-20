import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import DashboardPage from "@/components/DashboardPage"
import { AccountSettings } from "@/app/dashboard/(settings)/account-settings/SettingsPageContent"

const Page = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-up")
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) {
    redirect("/sign-in")
  }


  return (
    <DashboardPage title={"Profile settings"}>
      <AccountSettings discordId={user.discordId ?? ""} />
    </DashboardPage>
  )
}

export default Page
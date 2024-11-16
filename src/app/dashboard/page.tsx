import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import DashboardPage from "@/components/DashboardPage"
import DashboardPageContent from "@/app/dashboard/DashboardPageContent"

const Page = async () => {
  const auth = await currentUser()

  console.log(auth)

  if (!auth) {
    redirect("/sign-in")
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
    <div>
      <DashboardPage title={"asdasd"}>
        <DashboardPageContent />
      </DashboardPage>
    </div>
  )
}

export default Page
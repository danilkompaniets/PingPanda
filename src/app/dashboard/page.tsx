import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import DashboardPage from "@/components/DashboardPage"
import DashboardPageContent from "@/app/dashboard/DashboardPageContent"
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const Page = async () => {
  const auth = await currentUser()

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
      <DashboardPage cta={
        <CreateEventCategoryModal>
          <Button className={"flex items-center"}>
            <PlusIcon className={"mr-1 size-4"} />
            Add Category
          </Button>
        </CreateEventCategoryModal>
      } title={"Dashboard"}>
        <DashboardPageContent />
      </DashboardPage>
    </div>
  )
}

export default Page
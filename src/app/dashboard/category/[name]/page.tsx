import React from "react"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import DashboardPage from "@/components/DashboardPage"
import EmptyCategoryState from "@/app/dashboard/category/[name]/EmptyCategoryState"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

const Page = async ({ params }: PageProps) => {

  console.log(params)
  if (typeof params.name !== "string") notFound()
  const auth = await currentUser()

  if (!auth) notFound()


  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) notFound()


  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })

  if (!category) notFound()

  const hasEvents = category._count.events > 0


  return (
    <div>
      <DashboardPage title={`${category.emoji} ${category.name} events`}>
        <EmptyCategoryState categoryName={category.name} />
      </DashboardPage>
    </div>
  )
}

export default Page
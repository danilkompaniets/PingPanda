"use client"

import React from "react"
import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import EmptyCategoryState from "@/app/dashboard/category/[name]/EmptyCategoryState"

interface CategoryPageContentProps {
  hasEvents: boolean,
  category: EventCategory
}

const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {
  const { data: poolingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: {
      hasEvents: initialHasEvents,
    },
  })

  if (!poolingData.hasEvents) {
    return (
      <EmptyCategoryState categoryName={category.name} />
    )
  }

  return (
    <div>
      <CategoryPageContent hasEvents={initialHasEvents} category={category} />
    </div>
  )
}

export default CategoryPageContent
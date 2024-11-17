"use client"

import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import LoadingSpinner from "@/components/LoadingSpinner"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import Modal from "@/app/dashboard/Modal"
import DashboardEmptyState from "@/app/dashboard/DashboardEmptyState"

const DashboardPageContent = () => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: async (name: string) => {
      await client.category.deleteCategory.$post({ name })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      })
      setDeletingCategory(null)
    },
  })
  const { data: categories, isPending: isEventCategoriesPending } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    }
  })

  if (isEventCategoriesPending) {
    return (
      <div className={"flex items-center justify-center flex-1 h-full w-full"}>
        <LoadingSpinner />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className={"flex h-[100%] items-center justify-center"}>
        <DashboardEmptyState />
      </div>
    )
  }

  return (
    <>
      <ul className={"grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"}>
        {categories.map((category) => (
          <li key={category.id} className={"relative group z-10 transition-all duration-200 hover:translate-y-0.5"}>
            <div className={"absolute -z-10 inset-px rounded-lg bg-white"} />
            <div
              className={"pointer-events-none z-0  absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5"} />
            <div className={"relative p-6 z-10"}>
              <div className={"flex gap-x-2 items-center"}>
                <div className={"size-12 text-xl flex items-center justify-center rounded-full"}
                     style={{
                       backgroundColor: category.color
                         ? `#${category.color.toString(16).padStart(6, "0")}`
                         : "#f3f4f6",
                     }}>
                  {category.emoji}
                </div>
                <h3 className={"text-xl/7"}>
                  {category.name}
                </h3>
              </div>
              <div>
                <p className={"text-sm/6 mt-2 text-gray-600"}>
                  {format(category.createdAt, "MMM d, yyyy")}
                </p>
              </div>
              <div className={"flex items-center text-sm/5 text-gray-600 mt-2"}>
                <Clock className={"size-4 mr-2 text-brand-500"} />
                <span className={"font-medium"}>Last ping:</span>
                <span className={"ml-1"}>
                {category.lastPing ? formatDistanceToNow(category.lastPing) + "ago" : "Never"}
              </span>
              </div>

              <div className={"flex items-center text-sm/5 text-gray-600"}>
                <Database className={"size-4 mr-2 text-brand-500"} />
                <span className={"font-medium"}>Unique fields:</span>
                <span className={"ml-1"}>
                {category.uniqueFieldCount || 0}
              </span>
              </div>

              <div className={"flex items-center text-sm/5 text-gray-600"}>
                <BarChart2 className={"size-4 mr-2 text-brand-500"} />
                <span className={"font-medium"}>Events this month:</span>
                <span className={"ml-1"}>
                {category.eventsCount || 0}
            </span>
              </div>


              <div className={"flex items-center justify-between mt-4"}>
                <Link className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "flex items-center gap-2 text-sm",
                })}
                      href={`/dashboard/category/${category.name}`}> View All <ArrowRight className={"size-4"} /></Link>

                <Button variant={"outline"}
                        className={"text-gray-500 hover:text-red-600 transition-colors"}
                        onClick={() => setDeletingCategory(category.name)}>
                  <Trash2 className={"size-5"} />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={deletingCategory !== null} closeFn={() => setDeletingCategory(null)}>
        <h2 className={"mt-0 text-gray-950 "}>
          Are you sure you want to delete {deletingCategory} category?
        </h2>
        <div className={"flex gap-x-2 mt-2"}>
          <Button onClick={() => {
            deletingCategory && deleteCategory(deletingCategory)
            setDeletingCategory(null)
          }} variant={"destructive"}>
            Delete
          </Button>
          <Button variant={"outline"} onClick={() => setDeletingCategory(null)}>
            Cancel
          </Button>

        </div>
      </Modal>
    </>
  )
}

export default DashboardPageContent
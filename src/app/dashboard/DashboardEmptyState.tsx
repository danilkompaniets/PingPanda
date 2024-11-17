import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import Card from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal"

const DashboardEmptyState = () => {
  const queryClient = useQueryClient()
  const { mutate: insertQuickStartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickStartCategories.$post()
    },
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["user-event-categories"],
    }),
  })
  return (
    <Card className={"flex h-screen flex-grow flex-col items-center justify-center rounded-2xl flex-1 text-center p-6"}>
      <div className={"flex justify-center w-full"}>
        <img src={"/brand-asset-wave.png"} alt={"no categories "} className={"size-48 resize-none -mt-24"} />
      </div>

      <h1 className={"mt-2 text-xl/8 font-medium tracking-tight"}>

        No event categories yet
      </h1>

      <p className={"text-sm/6 text-gray-600 max-w-prose mt-2 mb-8"}>
        Start tracking event by creating your first category
      </p>

      <div className={"flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"}>
        <Button variant={"outline"} className={"flex items-center space-x-2 w-full sm:w-auto"}
                onClick={() => insertQuickStartCategories()}
                disabled={isPending}>
          <span className={"size-5"}>
            🚀
          </span>
          {isPending ? "Creating..." : "QuickStart"}
        </Button>
        <CreateEventCategoryModal>
          <Button className={"flex items-center space-x-2 w-full sm:w-auto"}>
            <span>Add Category</span>
          </Button>
        </CreateEventCategoryModal>
      </div>


    </Card>
  )
}

export default DashboardEmptyState
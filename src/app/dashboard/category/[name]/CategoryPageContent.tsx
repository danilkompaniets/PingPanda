"use client"

import React, { useMemo, useState } from "react"
import { Event, EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { client } from "@/lib/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, BarChartIcon } from "lucide-react"
import Card from "@/components/ui/card"
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns"
import { ColumnDef, Row } from "@tanstack/table-core"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils"

interface CategoryPageContentProps {
  hasEvents: boolean,
  category: EventCategory
}

const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {
  const searchParams = useSearchParams()

  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "30", 10)

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  })

  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("today")

  const { data: poolingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: {
      hasEvents: initialHasEvents,
    },
  })

  const { data } = useQuery({
    queryKey: ["events", category.name, pagination.pageIndex, pagination.pageSize, activeTab],
    queryFn: async () => {
      const res = await client.category.getEventsByCategoryName.$get({
        name: category.name,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTab,
      })

      return await res.json()
    },
    refetchOnWindowFocus: false,
    enabled: poolingData.hasEvents,
  })

  const numericFieldSums = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {}

    const sums: Record<
      string,
      {
        total: number
        thisWeek: number
        thisMonth: number
        today: number
      }
    > = {}

    const now = new Date()
    const weekStart = startOfWeek(now, { weekStartsOn: 0 })
    const monthStart = startOfMonth(now)

    data.events.forEach((event) => {
      const eventDate = event.createdAt

      Object.entries(event.fields as object).forEach(([field, value]) => {
        if (typeof value === "number") {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 }
          }

          sums[field].total += value

          if (
            isAfter(eventDate, weekStart) ||
            eventDate.getTime() === weekStart.getTime()
          ) {
            sums[field].thisWeek += value
          }

          if (
            isAfter(eventDate, monthStart) ||
            eventDate.getTime() === monthStart.getTime()
          ) {
            sums[field].thisMonth += value
          }

          if (isToday(eventDate)) {
            sums[field].today += value
          }
        }
      })
    })

    return sums
  }, [data?.events])

  const colums: ColumnDef<Event>[] = useMemo(() => [
    {
      accessorKey: "category",
      header: "category",
      cell: () => <span>{category.name || "Uncategorized"}</span>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant={"ghost"} onClick={
            () => {
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          }>
            Date
            <ArrowUpDown className={"ml-3 size-4"} />
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString()
      },
    },
    ...(data?.events[0] ? Object.keys(data.events[0].fields as object) : []).map((field) => ({
      accessorFn: (row: Event) => (row.fields as Record<string, any>)[field],
      header: field,
      cell: ({ row }: { row: Row<Event> }) => (row.original.fields as Record<string, any>)[field] || "-",
    })),
    {
      accessorKey: "deliveryStatus",
      header: "delivery status",
      cell: ({ row }) => {
        return (
          <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
            "bg-green-100 text-green-800": row.getValue("deliveryStatus") === "DELIVERED",
            "bg-red-100 text-red-800": row.getValue("deliveryStatus") === "FAILED",
            "bg-yellow-100 text-yellow-800": row.getValue("deliveryStatus") === "PENDING",
          })}>

          </span>
        )
      },
    },
  ], [category.name, data?.events])


  const NumericFieldSumCards = () => {
    if (!numericFieldSums || Object.keys(numericFieldSums).length === 0) return null
    return Object.entries(numericFieldSums).map(([field, sums]) => {
      const relevantSum =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
            ? sums.thisWeek
            : sums.thisMonth
      return (
        <Card key={field} className={"border-2 border-brand-700"}>
          <div className={"flex flex-row items-center justify-between space-y-0 pb-2"}>
            <p className={"text-sm/6 font-medium"}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </p>
            <BarChartIcon className={"size-4 text-muted-foreground"} />
          </div>

          <div>
            <p className={"text-2xl font-bold"}>
              {relevantSum.toFixed(2)}
            </p>
            <p className={"text-xs/5 text-muted-foreground"}>
              Events {activeTab}
            </p>
          </div>
        </Card>

      )
    })
  }


  return (
    <div className={"space-y-6"}>
      <Tabs value={activeTab} onValueChange={(value: string) => {
        setActiveTab(value as "today" | "week" | "month")
      }}>
        <TabsList>
          <TabsTrigger value={"today"}>
            Today
          </TabsTrigger>
          <TabsTrigger value={"week"}>
            Week
          </TabsTrigger>
          <TabsTrigger value={"month"}>
            Month
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className={"grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"}>
          <Card className={"border-2 border-brand-700"}>
            <div className={"flex flex-row items-center justify-between space-y-0 pb-2"}>
              <p className={"text-sm/6 font-medium"}>
                Total Events
              </p>
              <BarChartIcon className={"size-4 text-muted-foreground"} />
            </div>

            <div>
              <p className={"text-2xl font-bold"}>
                {data?.eventsCount || 0}
              </p>
              <p className={"text-xs/5 text-muted-foreground"}>
                Events {activeTab}
              </p>
            </div>
          </Card>

          <NumericFieldSumCards />
        </TabsContent>
      </Tabs>


    </div>
  )
}

export default CategoryPageContent
import React from "react"
import { useQuery } from "@tanstack/react-query"

const DashboardPageContent = () => {
  const { data } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: () => {

    }
  })

  return (
    <div>

    </div>
  )
}

export default DashboardPageContent
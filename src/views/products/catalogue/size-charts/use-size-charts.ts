import { useState } from "react"
import { useGetSizeChartsQuery } from "services/size-charts/index.query"

const useSizeCharts = () => {

  const { data: sizeChartsData, isLoading } = useGetSizeChartsQuery()

  return {
    sizeChartsData,
    isLoading,
  }
}

export default useSizeCharts
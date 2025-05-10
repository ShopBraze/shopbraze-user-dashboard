import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDeleteSizeChartMutation } from 'services/size-charts/index.query'


type UseDeleteSizeChartProps = {
  data: SizeChartType
}

const useDeleteSizeChart = ({ data }: UseDeleteSizeChartProps) => {
  const [deleteSizeChart, { isLoading: isDeleting }] = useDeleteSizeChartMutation()

  const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
  const handleToggleDeletePopUp = () => {
    setOpenDeletePopUp(!openDeletePopUp)
  }

  const handleDeleteSizeChart = () => {
    deleteSizeChart({ size_chart_id: data?.id })
      .unwrap()
      .then(() => {
        toast.success("Size Chart Deleted Successfully")
        handleToggleDeletePopUp()
      })
      .catch((error) => {
        toast.error("Size Chart Deletion Failed")
      })
  }
  return {
    openDeletePopUp,
    handleToggleDeletePopUp,
    handleDeleteSizeChart,
    isDeleting
  }
}

export default useDeleteSizeChart
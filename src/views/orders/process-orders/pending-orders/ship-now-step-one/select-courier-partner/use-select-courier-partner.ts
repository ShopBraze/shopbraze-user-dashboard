import { useEffect, useState } from "react"
import { useGetCourierServiceabilityQuery } from "services/orders-processing/index.query"

type UseSelectCourierPartnerProps = {}

const useSelectCourierPartner = ({ }: UseSelectCourierPartnerProps) => {

  const { data: courierServiceabilityData = [], isLoading: isFetchingCourierData } = useGetCourierServiceabilityQuery({ pickup_postcode: "457001", delivery_postcode: "180005", cod: "1", weight: "1" })

  console.log(courierServiceabilityData, "courierServiceabilityData")

  const [selectedCourierType, setSelectedCourierType] = useState('All')
  const [courierDataToShow, setCourierDataToShow] = useState([])

  useEffect(() => {
    if (courierServiceabilityData) {
      if (selectedCourierType === "All") setCourierDataToShow(courierServiceabilityData?.available_courier_companies)
      else if (selectedCourierType === 'Surface') setCourierDataToShow(courierServiceabilityData?.available_courier_companies?.filter((item: any) => item?.is_surface))
      else if (selectedCourierType === 'Air') setCourierDataToShow(courierServiceabilityData?.available_courier_companies?.filter((item: any) => !item?.is_surface))

    }
  }, [courierServiceabilityData, selectedCourierType])

  return {
    selectedCourierType,
    setSelectedCourierType,
    courierServiceabilityData,
    isFetchingCourierData,
    courierDataToShow
  }
}

export default useSelectCourierPartner
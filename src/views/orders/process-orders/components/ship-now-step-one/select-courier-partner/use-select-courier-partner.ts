import { useEffect, useState } from "react"
import { useGetCourierServiceabilityQuery } from "services/orders-processing/index.query"

type UseSelectCourierPartnerProps = {
  order: CustomerOrderType
}

const useSelectCourierPartner = ({ order }: UseSelectCourierPartnerProps) => {

  const pickup_postcode = order?.pickup_address?.pincode
  const delivery_postcode = order?.customer_details?.address?.pincode
  const declared_value = order?.bill_details?.total_amount
  const is_cod = order?.payment_mode === "cod"

  const { data: courierServiceabilityData = {}, isLoading: isFetchingCourierData } = useGetCourierServiceabilityQuery({ pickup_postcode, delivery_postcode, cod: is_cod ? 1 : 0, weight: "0.5", recommended_val: "4", declared_value })

  const { currency, recommended_by, available_courier_companies, shiprocket_recommended_courier_id, } = courierServiceabilityData

  console.log(courierServiceabilityData, "courierServiceabilityData")

  const [selectedCourierType, setSelectedCourierType] = useState('All')
  const [courierDataToShow, setCourierDataToShow] = useState([])

  useEffect(() => {
    if (courierServiceabilityData) {
      if (selectedCourierType === "All") setCourierDataToShow(available_courier_companies)
      else if (selectedCourierType === 'Surface') setCourierDataToShow(available_courier_companies?.filter((item: any) => item?.is_surface))
      else if (selectedCourierType === 'Air') setCourierDataToShow(available_courier_companies?.filter((item: any) => !item?.is_surface))

    }
  }, [courierServiceabilityData, selectedCourierType])

  return {
    selectedCourierType,
    setSelectedCourierType,
    courierServiceabilityData,
    isFetchingCourierData,
    courierDataToShow,

    recommended_by,
    shiprocket_recommended_courier_id,
    available_courier_companies
  }
}

export default useSelectCourierPartner
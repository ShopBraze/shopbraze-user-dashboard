import { useState } from "react"

type UseShipNowStepOneProps = {}

const useShipNowStepOne = ({ }: UseShipNowStepOneProps) => {
  const [openDetails, setOpenDetails] = useState(false)
  const handleToggleOpenDetails = () => { setOpenDetails(!openDetails) }


  return {
    openDetails,
    handleToggleOpenDetails
  }
}

export default useShipNowStepOne
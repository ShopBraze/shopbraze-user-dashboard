import { useState } from "react"

type UseSelectCourierPartnerProps = {}

const useSelectCourierPartner = ({ }: UseSelectCourierPartnerProps) => {
  const [selectedCourierType, setSelectedCourierType] = useState('All')

  return {
    selectedCourierType,
    setSelectedCourierType
  }
}

export default useSelectCourierPartner
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { CatalogueDataType, CustomerSkuType, ProductAttributeType } from './types/index.type'


type Props = {}

const useCreateCatalogue = (props: Props) => {
  const [activeStep, setActiveStep] = useState(1)
  const handleActiveStep = (stepNumber: number) => {
    setActiveStep(stepNumber)
  }


  const { control, watch, setValue } = useForm({
    defaultValues: {
      catalogue_data: {
        name: "",
        product_type: "",
        color: "",
        size_type: "",
        pickup_point: "",
        return_condition: "",
        gst_number: '',
        description: '',
        seller_sku_id: "",
        customer_skus: [] as CustomerSkuType[],
        product_attributes: [] as ProductAttributeType[],
        collections_to_add: [] as string[]
      } as CatalogueDataType
    }
  })

  console.log(watch('catalogue_data.product_attributes'))

  return {
    activeStep,
    handleActiveStep,
    control,
    watch,
    setValue
  }
}

export default useCreateCatalogue
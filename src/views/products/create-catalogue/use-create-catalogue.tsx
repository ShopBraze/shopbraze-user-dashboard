import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { CatalogueDataType, CustomerSkuType, ProductAttributeType } from './types/index.type'


const defaultSkuDetail = {
  size: "",
  sku_id: "",
  length: 15,
  breadth: 10,
  height: 10,
  cost_price: 0,
  selling_price: 120,
  mrp: 140,
  quantity: 100,
  weight: 0.4,
  volume: 0.5,
  is_active: false,
  is_custom_sku_size: false,
}

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
        customer_skus: [defaultSkuDetail] as CustomerSkuType[],
        product_attributes: [] as ProductAttributeType[],
        collections_to_add: [] as string[]
      } as CatalogueDataType
    }
  })

  console.log(watch('catalogue_data.customer_skus'))

  return {
    activeStep,
    handleActiveStep,
    control,
    watch,
    setValue
  }
}

export default useCreateCatalogue
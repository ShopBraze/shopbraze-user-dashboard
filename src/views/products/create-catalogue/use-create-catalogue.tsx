import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { CatalogueDataType, CustomerSkuType, ProductAttributeType } from './types/index.type'
import { useToaster } from 'rsuite';


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
  const toaster = useToaster()

  const [activeStep, setActiveStep] = useState(1)
  const { control, watch, setValue, getValues, trigger } = useForm({
    defaultValues: {
      catalogue_data: {
        name: "", // required
        product_type: "",
        color: "",
        size_type: "",
        pickup_point: "",  // required
        return_condition: "", // required
        product_code: "",  //required
        gst_number: '',
        description: '',
        seller_sku_id: "",
        customer_skus: [defaultSkuDetail] as CustomerSkuType[],
        product_attributes: [] as ProductAttributeType[],
        collections_to_add: [] as string[]
      } as CatalogueDataType
    },
    mode: 'onChange'
  })

  const productAttributeFields = getValues("catalogue_data.product_attributes").map(
    (_, index) => [`catalogue_data.product_attributes.${index}.key`, `catalogue_data.product_attributes.${index}.value`]
  ).flat()

  const customerSkuFields = getValues("catalogue_data.customer_skus").map((_, index) => [
    `catalogue_data.customer_skus.${index}.size`,
    `catalogue_data.customer_skus.${index}.sku_id`,
    `catalogue_data.customer_skus.${index}.length`,
    `catalogue_data.customer_skus.${index}.breadth`,
    `catalogue_data.customer_skus.${index}.height`,
    `catalogue_data.customer_skus.${index}.selling_price`,
    `catalogue_data.customer_skus.${index}.mrp`,
    `catalogue_data.customer_skus.${index}.quantity`,
    `catalogue_data.customer_skus.${index}.weight`,
    `catalogue_data.customer_skus.${index}.volume`,
  ]).flat()


  const handleActiveStep = async (stepNumber: number) => {
    if (stepNumber < activeStep) setActiveStep(stepNumber)
    else if (activeStep === 1) {
      const isStepOneValid = await trigger(['catalogue_data.name', 'catalogue_data.pickup_point', 'catalogue_data.return_condition', 'catalogue_data.product_code', ...productAttributeFields] as any)
      if (isStepOneValid) setActiveStep(stepNumber)
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await (trigger([...customerSkuFields] as any))
      if (isStepTwoValid) setActiveStep(stepNumber)
    }
    else if (activeStep === 3) {

    }
  }


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
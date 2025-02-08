import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { CatalogueFormDataType, CustomerSkuFormType, ProductAttributeFormType } from './types/index.type'
import { FileType } from "rsuite/esm/Uploader"
import { convertFileListToFormData } from 'utils/convert-file-list-to-formdata';
import { usePostCatalogueMutation } from 'services/catalogues/index.query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';


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
  const router = useRouter()
  const [postCatalogue, { isLoading: isCreating }] = usePostCatalogueMutation()

  const [activeStep, setActiveStep] = useState(1)
  const { control, watch, setValue, getValues, trigger, handleSubmit } = useForm({
    defaultValues: {
      catalogue_data: {
        title: "", // required
        description: '',
        product_type: "",
        color: "",
        size_type: "",
        pickup_point: "",  // required
        return_condition: "", // required
        product_code: "",  //required
        gst_number: '',
        customer_skus: [defaultSkuDetail] as CustomerSkuFormType[],
        product_attributes: [] as ProductAttributeFormType[],
        collections_to_add: [] as string[]
      } as CatalogueFormDataType,
      files: {
        images: [] as FileType[],
        videos: [] as FileType[]
      }
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
    `catalogue_data.customer_skus.${index}.cost_price`,
    `catalogue_data.customer_skus.${index}.quantity`,
    `catalogue_data.customer_skus.${index}.weight`,
    `catalogue_data.customer_skus.${index}.volume`,
  ]).flat()


  const handleActiveStep = async (stepNumber: number) => {
    if (stepNumber < activeStep) setActiveStep(stepNumber)
    else if (activeStep === 1) {
      const isStepOneValid = await trigger(['catalogue_data.title', 'catalogue_data.pickup_point', 'catalogue_data.size_type', 'catalogue_data.return_condition', 'catalogue_data.seller_sku_id', ...productAttributeFields] as any)
      if (isStepOneValid) setActiveStep(stepNumber)
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await (trigger([...customerSkuFields] as any))
      if (isStepTwoValid) setActiveStep(stepNumber)
    }
  }

  const handleCreateCatalogue = handleSubmit((data) => {
    const { catalogue_data, files } = data
    const formDataPayload = new FormData();
    formDataPayload.append("catalogue_data", JSON.stringify(catalogue_data));
    files.images.forEach((file) => {
      if (file.blobFile) {
        formDataPayload.append("images", file.blobFile, file.name);
      }
    });

    files.videos.forEach((file) => {
      if (file.blobFile) {
        formDataPayload.append("videos", file.blobFile, file.name);
      }
    });
    postCatalogue(formDataPayload)
      .unwrap()
      .then(() => {
        toast.success('Catalogue created successfully')
        router.push('/products/catalogue/list')
      })
      .catch((error) => {
        toast.error(error?.message || "Couldn't create the catalogue", { duration: 6000 })
      })
  })

  return {
    activeStep,
    handleActiveStep,
    control,
    watch,
    setValue,
    handleCreateCatalogue,
    trigger,
    isCreating
  }
}

export default useCreateCatalogue
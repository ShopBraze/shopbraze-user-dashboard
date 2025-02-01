import { useState } from "react"
import { CatalogueFormDataType, CustomerSkuFormType, ProductAttributeFormType } from "./types/index.type"
import { FileType } from "rsuite/esm/Uploader"
import { useUpdateCatalogueMutation } from "services/catalogues/index.query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/router"


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


type UseEditCatalogueProps = {
  catalogueData?: Catalogue
  editStep?: number
  handleClose?: () => void
}

const useEditCatalogue = ({ editStep, catalogueData, handleClose }: UseEditCatalogueProps) => {
  const router = useRouter()

  const [updateCatalogue, { isLoading: isUpdating }] = useUpdateCatalogueMutation()

  const [activeStep, setActiveStep] = useState(editStep || 1)
  const { control, watch, setValue, getValues, trigger, handleSubmit, reset } = useForm({
    defaultValues: {
      catalogue_data: {
        title: catalogueData?.title || "",
        description: catalogueData?.description || "",
        product_type: catalogueData?.product_type || "",
        color: catalogueData?.color || "",
        size_type: catalogueData?.size_type || "",
        pickup_point: catalogueData?.pickup_point || "",
        return_condition: catalogueData?.return_condition || "",
        product_code: catalogueData?.product_code || "",
        gst_number: catalogueData?.gst_number || '',
        customer_skus: catalogueData?.customer_skus || [defaultSkuDetail] as CustomerSkuFormType[],
        product_attributes: catalogueData?.product_attributes || [] as ProductAttributeFormType[],
        collections_to_add: catalogueData?.collections_to_add || [] as string[]
      } as CatalogueFormDataType,
      files: {
        images: (catalogueData?.media?.images || []).map((img, index) => ({
          name: `Image ${index + 1}`,
          url: img.url,
        })),
        videos: (catalogueData?.media?.videos || []).map((vid, index) => ({
          name: `Video ${index + 1}`,
          url: vid.url,
        })),
        delete_media: {
          images: [],
          videos: []
        }
        // delete_media: [],
        // delete_media_video: []
      } as any
    },
    mode: 'onChange'
  })

  const productAttributeFields = getValues("catalogue_data.product_attributes")?.map(
    (_, index) => [`catalogue_data.product_attributes.${index}.key`, `catalogue_data.product_attributes.${index}.value`]
  ).flat()

  const customerSkuFields = getValues("catalogue_data.customer_skus")?.map((_, index) => [
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
      const isStepOneValid = await trigger(['catalogue_data.title', 'catalogue_data.pickup_point', 'catalogue_data.size_type', 'catalogue_data.return_condition', 'catalogue_data.seller_sku_id', ...productAttributeFields] as any)
      if (isStepOneValid) setActiveStep(stepNumber)
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await (trigger([...customerSkuFields] as any))
      if (isStepTwoValid) setActiveStep(stepNumber)
    }
  }

  const handleUpdateCatalogue = handleSubmit((data) => {
    const { catalogue_data, files } = data

    const formDataPayload = new FormData();

    formDataPayload.append("catalogue_data", JSON.stringify(catalogue_data));

    if (files?.delete_media?.images?.length > 0 || files?.delete_media?.videos?.length > 0) {
      formDataPayload.append("delete_media", JSON.stringify(files?.delete_media));
    }

    if (files?.images?.filter((file: FileType) => file?.blobFile)?.length > 0 || files?.delete_media?.images?.length > 0) { // This means either new file is added or any file is deleted
      formDataPayload.append("all_images", JSON.stringify(files.images));
      files?.images?.forEach((file: FileType) => {
        if (file?.blobFile) {
          formDataPayload.append("images", file.blobFile, file.name);
        }
      });
    }

    if (files?.videos?.filter((file: FileType) => file?.blobFile)?.length > 0 || files?.delete_media?.videos?.length > 0) { // This means either new file is added or any file is deleted
      formDataPayload.append("all_videos", JSON.stringify(files.videos));
      files?.videos?.forEach((file: FileType) => {
        if (file?.blobFile) {
          formDataPayload.append("videos", file.blobFile, file.name);
        }
      });
    }

    updateCatalogue({ body: formDataPayload, catalogueId: catalogueData?.id })
      .unwrap()
      .then(() => {
        if (handleClose) handleClose()
        toast.success('Details Updated Successfully')
        router.push('/products/catalogue/list')
      })
      .catch((error) => {
        toast.error(error?.message || "Error in updating the catalogue", { duration: 6000 })
      })
  })
  return {
    activeStep,
    handleActiveStep,
    control,
    watch,
    setValue,
    handleUpdateCatalogue,
    trigger,
    isUpdating
  }
}

export default useEditCatalogue
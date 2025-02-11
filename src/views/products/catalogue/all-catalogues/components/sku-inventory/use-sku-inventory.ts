import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useUpdateCatalogueSkuDataMutation } from "services/catalogues/index.query"

type UseSkuInventoryProps = {
  catalogueData: Catalogue
}

const useSkuInventory = ({ catalogueData }: UseSkuInventoryProps) => {
  const [updateCatalogueSkuData, { isLoading: isUpdatingSkuData }] = useUpdateCatalogueSkuDataMutation()
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const { watch, control, register, setValue, formState, formState: { isDirty } } = useForm({
    defaultValues: {
      sku_data: catalogueData?.customer_skus
    }
  })

  useEffect(() => {
    if (catalogueData?.customer_skus) {
      setValue("sku_data", catalogueData.customer_skus);
    }
  }, [catalogueData?.customer_skus, setValue]);

  useEffect(() => {
    if (isDirty) setShowUpdateButton(true)
  }, [isDirty])

  const handleUpdateSkuData = () => {
    const body = {
      sku_data: watch("sku_data")?.map((item) => ({ ...item, quantity: Number(item?.quantity) }))
    }
    updateCatalogueSkuData({ body, catalogueShortId: catalogueData?.product_short_id })
      .unwrap()
      .then(() => {
        toast.success("Quantity updated successfully")
      }).catch((error) => {
        toast.error("Something went wrong")
      }).finally(() => {
        setShowUpdateButton(false)
      })
  }

  return {
    watch,
    control,
    register,
    isDirty,
    handleUpdateSkuData,
    isUpdatingSkuData,
    showUpdateButton
  }
}

export default useSkuInventory
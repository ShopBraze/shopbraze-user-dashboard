import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useUpdateCatalogueSkuDataMutation } from "services/catalogues/index.query"

type UseSkuInventoryProps = {
  catalogueData: Catalogue
}

const useSkuInventory = ({ catalogueData }: UseSkuInventoryProps) => {
  const [updateCatalogueSkuData, { isLoading: isUpdatingSkuData, isSuccess }] = useUpdateCatalogueSkuDataMutation()
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const { watch, control, register, setValue, reset, formState: { isDirty, dirtyFields } } = useForm({
    defaultValues: {
      sku_data: catalogueData?.customer_skus
    },
  })

  useEffect(() => {
    if (catalogueData?.customer_skus) {
      reset({ sku_data: catalogueData.customer_skus });
    }
  }, [catalogueData?.customer_skus, reset]);

  useEffect(() => {
    if (isDirty && Object.keys(dirtyFields).length > 0) {
      setShowUpdateButton(true);
    } else {
      setShowUpdateButton(false);
    }
  }, [isDirty, dirtyFields]);

  const handleUpdateSkuData = () => {
    const body = {
      sku_data: watch("sku_data")?.map((item) => ({ ...item, quantity: Number(item?.quantity) }))
    }
    updateCatalogueSkuData({ body, catalogueShortId: catalogueData?.product_short_id })
      .unwrap()
      .then(() => {
        toast.success("Quantity updated successfully")
        setShowUpdateButton(false)
      }).catch((error) => {
        toast.error("Something went wrong")
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
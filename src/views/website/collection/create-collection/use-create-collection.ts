
import { useRouter } from 'next/router'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FileType } from "rsuite/esm/Uploader"
import toast from 'react-hot-toast'
import { usePostCollectionMutation } from 'services/collections/index.query'


const useCreateCollection = () => {
  const router = useRouter()

  const [postCollection, { isLoading: isCreating }] = usePostCollectionMutation()

  const [activeSubTab, setActiveSubTab] = useState("Bulk Upload")

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      collection_title: "",
      selectedProducts: [] as Catalogue[],
      selectedProductsShortIds: [] as string[],
      collection_csv_file: [] as FileType[]
    }
  })

  // For Bulk Upload Collections
  const handleFileUpload = (fileList: FileType[]) => {
    console.log(fileList)
  };

  // For Select Products Collections

  const handleSelectedProducts = (product: Catalogue, action: "Add" | "Remove") => {
    if (action === "Add") {
      setValue('selectedProducts', [...watch('selectedProducts'), product])
      setValue('selectedProductsShortIds', [...watch('selectedProductsShortIds'), product?.product_short_id])
    }
    else if (action === "Remove") {
      setValue('selectedProducts', watch('selectedProducts').filter((item) => item?.id !== product?.id))
      setValue('selectedProductsShortIds', watch('selectedProductsShortIds').filter((shortId) => shortId !== product?.product_short_id))
    }
  }

  const handleCreateCollection = handleSubmit((data: any) => {
    if (!watch('collection_title')) return toast.error("Collection Title is required")
    if (data?.selectedProducts?.length > 0 && activeSubTab === "Select Products") {
      const payload = {
        name: data?.collection_title,
        product_short_ids: data?.selectedProductsShortIds,
        type: "catalogues_selection"
      }
      postCollection(payload).unwrap()
        .then((data) => {
          toast.success("Collection created successfully")
          router.push('/website/collection/collection-list')
        })
        .catch((error) => {
          toast.error("Something went wrong")
          console.log(error)
        })
    }
  })

  return {
    control,
    watch,
    activeSubTab,
    setActiveSubTab,
    handleSelectedProducts,
    handleCreateCollection,
    handleFileUpload,
    isCreating
  }
}

export default useCreateCollection
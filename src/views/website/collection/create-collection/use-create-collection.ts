
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { usePostCollectionMutation } from 'services/collections/index.query'


const useCreateCollection = () => {
  const router = useRouter()

  const [postCollection, { isLoading: isCreating }] = usePostCollectionMutation()

  const [activeSubTab, setActiveSubTab] = useState("Bulk Upload")

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      collection_title: ""
    }
  })

  const [selectedProducts, setSelectedProducts] = useState<Catalogue[]>([])
  const [selectedProductsShortIds, setSelectedProductShortIds] = useState<string[]>([])

  const handleSelectedProducts = (product: Catalogue, action: "Add" | "Remove") => {
    if (action === "Add") {
      setSelectedProducts((prev) => ([...prev, product]))
      setSelectedProductShortIds((prev) => ([...prev, product?.product_short_id]))
    }
    else if (action === "Remove") {
      setSelectedProducts((prev) => (prev?.filter((item) => item?.id !== product?.id)))
      setSelectedProductShortIds((prev) => (prev?.filter((shortId) => shortId !== product?.product_short_id)))
    }
  }

  const handleCreateCollection = handleSubmit((data: any) => {
    if (!watch('collection_title')) return toast.error("Collection Title is required")
    if (selectedProducts?.length > 0 && activeSubTab === "Select Products") {
      const payload = {
        name: data?.collection_title,
        product_short_ids: selectedProductsShortIds,
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
    selectedProducts,
    handleSelectedProducts,
    selectedProductsShortIds,
    handleCreateCollection,
    isCreating
  }
}

export default useCreateCollection
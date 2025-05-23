import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useGetAllCollectionsQuery } from 'services/collections/index.query'
import { useCreateTemplateMutation, useUpdateTemplateDataMutation } from 'services/website-page-and-template/index.query'


const ProductGroupSubTypeOptions = [
  {
    label: "New Arrivals",
    value: 'new_arrivals'
  },
  {
    label: 'Best Sellers',
    value: 'best_sellers'
  },
  {
    label: 'All Products',
    value: 'all_products'
  },
  {
    label: 'Recently Viewed',
    value: 'recently_viewed'
  },
  {
    label: 'Curated',
    value: 'curated'
  }
]

type UseProductGroupTemplateType = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const useProductGroupTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: UseProductGroupTemplateType) => {
  const { data: collectionResponse } = useGetAllCollectionsQuery({ page: 1, limit: 50 })
  const collectionOptions = collectionResponse?.collectionsData?.map((item) => ({ label: item?.name, value: item?.short_id })) ?? []

  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()
  const [updateTemplateData, { isLoading: isUpdating }] = useUpdateTemplateDataMutation()

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: templateData?.title ?? '',
      description: templateData?.description ?? '',
      layout: templateData?.layout ?? '',
      sub_type: templateData?.sub_type ?? '',
      collection_short_id: templateData?.product_group_data?.collection_short_id ?? '',
      custom_style: templateData?.custom_style ?? {
        title_alignment: 'center'
      },
    }
  })

  const handleSave = handleSubmit((data) => {
    const productGroupDataPayload = {
      ...data,
      type: "product_group"
    }
    const formDataPayload = new FormData()
    formDataPayload.append("page_id", page_id!)
    formDataPayload.append("templateData", JSON.stringify(productGroupDataPayload));

    if (templateData) {
      updateTemplateData({ body: formDataPayload, template_id: templateData?.short_id })
        .unwrap()
        .then(() => {
          toast.success("Template updated successfully")
          if (handleCloseTemplateDetailsModal) handleCloseTemplateDetailsModal()
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
    }
    else {
      createTemplate(formDataPayload)
        .unwrap()
        .then(() => {
          toast.success("Template added successfully")
          handleCloseTemplateDetailsModal()
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
    }


  })

  return {
    watch,
    control,
    setValue,
    ProductGroupSubTypeOptions,
    collectionOptions,
    handleSave,
    isCreating,
    isUpdating
  }
}

export default useProductGroupTemplate
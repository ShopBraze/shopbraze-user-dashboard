import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useGetAllCollectionsQuery } from "services/collections/index.query"
import { useCreateTemplateMutation, useUpdateTemplateDataMutation } from "services/website-page-and-template/index.query"


type UseCategoryTabbedTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

type CategoryTabbedDataType = {
  name: string,
  collection_short_id: string
}

const useCategoryTabbedTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: UseCategoryTabbedTemplateProps) => {
  const { data: collectionResponse } = useGetAllCollectionsQuery({ page: 1, limit: 50 })
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()
  const [updateTemplateData, { isLoading: isUpdating }] = useUpdateTemplateDataMutation()

  const collectionOptions = collectionResponse?.collectionsData?.map((item) => ({ label: item?.name, value: item?.short_id })) ?? []

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: templateData?.title ?? '',
      description: templateData?.description ?? '',
      custom_style: templateData?.custom_style ?? {
        title_alignment: 'center'
      },
      categoryTabbedItems: templateData?.category_tabbed_data ?? [] as CategoryTabbedDataType[]
    }
  })

  const categoryTabbedItems = watch('categoryTabbedItems')

  const handleAddNewTab = () => {
    const newTabItem: CategoryTabbedDataType = {
      name: '',
      collection_short_id: ''
    }
    const updatedCategoryTabbedItems = [...categoryTabbedItems, newTabItem]
    setValue('categoryTabbedItems', updatedCategoryTabbedItems)
  }

  const handleRemoveTab = (index: number) => {
    const updatedCategoryTabbedItems = categoryTabbedItems.filter((_, i) => i !== index);
    setValue("categoryTabbedItems", updatedCategoryTabbedItems);
  }

  const handleSave = handleSubmit((data: any) => {
    const categoryTabbedDataPayload = {
      ...data,
      type: "category_tabbed"
    }
    const formDataPayload = new FormData()
    formDataPayload.append("page_id", page_id!)
    formDataPayload.append("templateData", JSON.stringify(categoryTabbedDataPayload));

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
    handleSave,
    isCreating,
    isUpdating,
    collectionOptions,
    handleAddNewTab,
    handleRemoveTab
  }
}

export default useCategoryTabbedTemplate
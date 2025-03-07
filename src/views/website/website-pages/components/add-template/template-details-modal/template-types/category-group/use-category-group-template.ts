import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FileType } from 'rsuite/esm/Uploader'
import { useGetAllCollectionsQuery } from 'services/collections/index.query'
import { useCreateTemplateMutation } from 'services/website-page-and-template/index.query'

type useCategoryGroupTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
}

type CategoryGroupedDataType = {
  name: string,
  image: FileType | null,
  collection_short_id: string
}

const useCategoryGroupTemplate = ({ handleCloseTemplateDetailsModal, page_id }: useCategoryGroupTemplateProps) => {
  const { data: collectionResponse } = useGetAllCollectionsQuery({ page: 1, limit: 50 })
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const collectionOptions = collectionResponse?.collectionsData?.map((item) => ({ label: item?.name, value: item?.short_id })) ?? []

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      custom_style: {
        title_alignment: 'center'
      },
      categoryGroupItems: [] as CategoryGroupedDataType[]
    }
  })

  const categoryGroupItems = watch('categoryGroupItems')

  const handleAddNewCategory = () => {
    const newCategory: CategoryGroupedDataType = {
      name: "",
      image: null,
      collection_short_id: ''
    };
    setValue("categoryGroupItems", [...categoryGroupItems, newCategory]);
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategoryData = categoryGroupItems.filter((_, i) => i !== index);
    setValue("categoryGroupItems", updatedCategoryData);
  }

  const handleFileChange = (index: number, fileList: FileType[]) => {
    const updatedCategoryData = [...categoryGroupItems];
    updatedCategoryData[index].image = fileList?.length > 0 ? fileList?.[0] : null;
    setValue("categoryGroupItems", updatedCategoryData);
  };

  const handleSave = handleSubmit((data: any) => {
    console.log(data)
    const categoryGroupDataDataPayload = {
      ...data,
      type: "category_group",
      categoryGroupItems: data?.categoryGroupItems?.map((item: any) => ({ name: item?.name, collection_short_id: item?.collection_short_id }))
    }

    const formDataPayload = new FormData();
    formDataPayload.append("page_id", page_id!)
    formDataPayload.append("templateData", JSON.stringify(categoryGroupDataDataPayload));

    data?.categoryGroupItems?.forEach((item: CategoryGroupedDataType) => {
      if (item.image?.blobFile) {
        formDataPayload.append(`images`, item.image.blobFile);
      }
    });

    createTemplate(formDataPayload)
      .unwrap()
      .then(() => {
        toast.success("Template added successfully")
        handleCloseTemplateDetailsModal()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
  })

  return {
    watch,
    control,
    setValue,
    handleAddNewCategory,
    handleRemoveCategory,
    handleFileChange,
    collectionOptions,
    handleSave,
    isCreating
  }
}

export default useCategoryGroupTemplate
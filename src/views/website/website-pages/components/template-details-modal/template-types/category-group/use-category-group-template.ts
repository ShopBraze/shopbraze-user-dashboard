import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FileType } from 'rsuite/esm/Uploader'
import { useGetAllCollectionsQuery } from 'services/collections/index.query'
import { useCreateTemplateMutation } from 'services/website-page-and-template/index.query'

type useCategoryGroupTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

type CategoryGroupedDataType = {
  name: string,
  image: FileType | null,
  collection_short_id: string
}

const useCategoryGroupTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: useCategoryGroupTemplateProps) => {
  const { data: collectionResponse } = useGetAllCollectionsQuery({ page: 1, limit: 50 })
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const collectionOptions = collectionResponse?.collectionsData?.map((item) => ({ label: item?.name, value: item?.short_id })) ?? []

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: templateData?.title ?? '',
      description: templateData?.description ?? '',
      custom_style: templateData?.custom_style ?? {
        title_alignment: 'center'
      },
      categoryGroupItems:
        // templateData?.category_group_data ?
        //   templateData?.category_group_data?.map((data, index) => {
        //     return {
        //       name: data?.name,
        //       image: {
        //         name: `Image-${index + 1}`,
        //         url: data?.img_url
        //       },
        //       collection_short_id: data?.collection_short_id
        //     }
        //   }):
        [] as CategoryGroupedDataType[]
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
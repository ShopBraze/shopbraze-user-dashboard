import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useGetAllCollectionsQuery } from "services/collections/index.query"
import { usePostCreateNavigationMutation, useUpdateWebsiteNavigationMenuItemByIdMutation } from "services/website-page-navigation-menu/index.query"

type UseNavigationModalProps = {
  navigationData?: WebsiteNavigationMenuType
  parent_short_id?: null | string
  handleToggleModal: () => void
}

const useNavigationModal = ({ navigationData, parent_short_id, handleToggleModal }: UseNavigationModalProps) => {
  const { data: collectionResponse } = useGetAllCollectionsQuery({ page: 1, limit: 50 })
  const collectionOptions = collectionResponse?.collectionsData?.map((item) => ({ label: item?.name, value: item?.short_id })) ?? []

  const [postCreateNavigation, { isLoading: isCreating }] = usePostCreateNavigationMutation()
  const [updateWebsiteNavigationMenuItemById, { isLoading: isUpdating }] = useUpdateWebsiteNavigationMenuItemByIdMutation()

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: navigationData?.title ?? '',
      link: navigationData?.link ?? '',
      collection: collectionOptions?.find((item) => item?.value === navigationData?.link?.split("/")?.[2])?.value ?? ''
    }
  })

  useEffect(() => {
    setValue('link', `/collection/${watch('collection')}`)
  }, [watch('collection')])


  const handleCreate = handleSubmit((data: any) => {
    const payload = {
      data: {
        title: data?.title,
        link: data?.link,
        parent_short_id
      }
    }
    postCreateNavigation(payload).unwrap()
      .then(() => {
        toast.success("Navigation added Successfully")
        handleToggleModal()
      }).catch((error) => {
        toast.error("Couldn't add Navigation")
      })
  })

  const handleUpdate = handleSubmit((data: any) => {
    const payload = {
      navigationMenuItemId: navigationData?.short_id,
      body: {
        title: data?.title,
        link: data?.link,
      }
    }
    updateWebsiteNavigationMenuItemById(payload).unwrap()
      .then(() => {
        toast.success("Navigation updated Successfully")
        handleToggleModal()
      }).catch((error) => {
        toast.error("Couldn't update Navigation")
      })
  })

  return {
    control,
    collectionOptions,
    handleCreate,
    isCreating,
    handleUpdate,
    isUpdating
  }
}

export default useNavigationModal
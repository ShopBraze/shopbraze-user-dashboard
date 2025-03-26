import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useGetWebsiteNavigationMenuQuery, useUpdateWebsiteNavigationMenuMutation } from "services/website-page-navigation-menu/index.query"

const useNavigationIndexContainer = () => {

  const [updateWebsiteNavigationMenu, { isLoading: isSaving }] = useUpdateWebsiteNavigationMenuMutation()

  const { data: websiteNavigationMenuData = [], isSuccess } = useGetWebsiteNavigationMenuQuery()
  const [navigationListToRender, setNavigationListToRender] = useState<WebsiteNavigationMenuType[]>([])

  useEffect(() => {
    if (websiteNavigationMenuData?.length) setNavigationListToRender(websiteNavigationMenuData ? structuredClone(websiteNavigationMenuData) : [])
  }, [websiteNavigationMenuData])

  const [enableSaveNavigationOrder, setEnableSaveNavigationOrder] = useState(false)
  const handleEnableSaveNavigationOrder = (val: boolean) => {
    setEnableSaveNavigationOrder(val)
  }

  const handleSave = () => {
    updateWebsiteNavigationMenu({ data: navigationListToRender }).unwrap()
      .then(() => {
        toast.success("Navigation menu order updated")
      }).catch((error) => {
        toast.error("Something went wrong")
      })
  }

  return {
    enableSaveNavigationOrder,
    handleEnableSaveNavigationOrder,
    navigationListToRender,
    setNavigationListToRender,
    handleSave,
    isSaving
  }
}

export default useNavigationIndexContainer
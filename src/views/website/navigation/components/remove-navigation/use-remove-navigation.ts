import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDeleteWebsiteNavigationMenuMutation } from 'services/website-page-navigation-menu/index.query'

type UseRemoveNavigationProps = {
  navigationData: WebsiteNavigationMenuType
}

const useRemoveNavigation = ({ navigationData }: UseRemoveNavigationProps) => {
  const [deleteWebsiteNavigationMenu, { isLoading: isDeleting }] = useDeleteWebsiteNavigationMenuMutation()

  const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
  const handleToggleDeletePopUp = () => {
    setOpenDeletePopUp(!openDeletePopUp)
  }

  const handleRemoveNavigation = () => {
    deleteWebsiteNavigationMenu(navigationData?.short_id)
      .unwrap()
      .then(() => {
        toast.success("Collection Deleted Successfully")
        handleToggleDeletePopUp()
      })
      .catch((error) => {
        toast.error("Collection Deletion Failed")
      })
  }
  return {
    openDeletePopUp,
    handleToggleDeletePopUp,
    handleRemoveNavigation,
    isDeleting
  }
}

export default useRemoveNavigation
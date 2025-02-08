import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDeleteCatalogueMutation } from 'services/catalogues/index.query'

type UseDeleteCatalogueProps = {
  catalogueData: Catalogue,
}

const useDeleteCatalogue = ({ catalogueData }: UseDeleteCatalogueProps) => {
  const [deleteCatalogue, { isLoading: isDeleting }] = useDeleteCatalogueMutation()

  const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
  const handleToggleDeletePopUp = () => {
    setOpenDeletePopUp(!openDeletePopUp)
  }

  const handleDeleteCatalogue = () => {
    deleteCatalogue(catalogueData?.id)
      .unwrap()
      .then(() => {
        toast.success("Catalogue Deleted Successfully")
        handleToggleDeletePopUp()
      })
      .catch((error) => {
        toast.error("Catalogue Deletion Failed")
      })
  }
  return {
    openDeletePopUp,
    handleToggleDeletePopUp,
    handleDeleteCatalogue,
    isDeleting
  }
}

export default useDeleteCatalogue
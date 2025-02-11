import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDeleteCatalogueMutation } from 'services/catalogues/index.query'
import { useDeleteCollectionMutation } from 'services/collections/index.query'

type UseDeleteCollectionProps = {
  collectionData: Collection,
}

const useDeleteCollection = ({ collectionData }: UseDeleteCollectionProps) => {
  const [deleteCollection, { isLoading: isDeleting }] = useDeleteCollectionMutation()

  const [openDeletePopUp, setOpenDeletePopUp] = useState(false)
  const handleToggleDeletePopUp = () => {
    setOpenDeletePopUp(!openDeletePopUp)
  }

  const handleDeleteCollection = () => {
    deleteCollection(collectionData?.id)
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
    handleDeleteCollection,
    isDeleting
  }
}

export default useDeleteCollection
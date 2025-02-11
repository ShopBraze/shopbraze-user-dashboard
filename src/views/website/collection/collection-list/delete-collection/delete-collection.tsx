import Button from 'common-components/button/button'
import Image from 'next/image'
import DeleteIcon from "assets/icons/action-icons/delete-bin-red.svg"
import DeleteCatalogueWarningImage from "assets/icons/catalogue-listing/delet-catalogue-warning-image.jpg"
import { Modal } from 'rsuite'
import useDeleteCollection from './use-delete-collection'

type DeleteCollectionProps = {
  collectionData: Collection,
}

const DeleteCollection = ({ collectionData }: DeleteCollectionProps) => {
  const { openDeletePopUp, handleToggleDeletePopUp, handleDeleteCollection, isDeleting } = useDeleteCollection({ collectionData })
  return (
    <>
      <Button onClick={handleToggleDeletePopUp}>
        <Image src={DeleteIcon} alt="delete-bin.svg" className='h-4 w-4' />
      </Button>

      {
        openDeletePopUp &&
        <Modal open={openDeletePopUp} onClose={handleToggleDeletePopUp} className='w-[450px] !flex items-center h-[96vh]' >
          <Modal.Header></Modal.Header>
          <Modal.Body className='space-y-3'>
            <Image src={DeleteCatalogueWarningImage} alt="delete-catalogue-warning.jpg" className='w-full h-full' />
            <h3 className='font-bold'>Are you sure want to delete the collection ?</h3>
            <p className="text-sm font-medium text-gray-800">Deleting the collection might affect the website banners, widgets and navigation links</p>
          </Modal.Body>
          <Modal.Footer className='flex justify-end gap-3'>
            <Button variant='primary-outline' onClick={handleToggleDeletePopUp}>
              Cancel
            </Button>
            <Button className='py-2 px-[18px] bg-error-500 text-[#fff]' onClick={handleDeleteCollection} isLoading={isDeleting}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }


    </>
  )
}

export default DeleteCollection
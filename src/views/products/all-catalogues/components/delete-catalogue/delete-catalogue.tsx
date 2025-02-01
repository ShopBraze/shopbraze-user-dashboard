import Button from 'common-components/button/button'
import Image from 'next/image'
import DeleteBinIcon from "assets/icons/catalogue-listing/delete-bin-red-icon.svg"
import DeleteCatalogueWarningImage from "assets/icons/catalogue-listing/delet-catalogue-warning-image.jpg"
import { Modal } from 'rsuite'
import useDeleteCatalogue from './use-delete-catalogue'

type Props = {
  catalogueData: Catalogue,
}

const DeleteCatalogue = ({ catalogueData }: Props) => {
  const { openDeletePopUp, handleToggleDeletePopUp, handleDeleteCatalogue, isDeleting } = useDeleteCatalogue({ catalogueData })
  return (
    <>
      <Button className='w-full py-[5px] gap-2 rounded' onClick={handleToggleDeletePopUp}>
        <Image src={DeleteBinIcon} alt="edi-pencil.svg" className='h-4 w-4' />
        <p className="text-error-500 font-semibold">Delete</p>
      </Button>

      {
        openDeletePopUp &&
        <Modal open={openDeletePopUp} onClose={handleToggleDeletePopUp} className='w-[450px] !flex items-center h-[96vh]' >
          <Modal.Header></Modal.Header>
          <Modal.Body className='space-y-3'>
            <Image src={DeleteCatalogueWarningImage} alt="delete-catalogue-warning.jpg" className='w-full h-full' />
            <h3 className='font-bold'>Are you sure want to delete the catalogue ?</h3>
            <p className="text-sm font-medium text-gray-800">Note : Deleting the catalogue will remove it from the dashboard and website permanently and might affect your marketing performance. Are you sure you want to delete the catalogue?</p>
          </Modal.Body>
          <Modal.Footer className='flex justify-end gap-3'>
            <Button variant='primary-outline' onClick={handleToggleDeletePopUp}>
              Cancel
            </Button>
            <Button className='py-2 px-[18px] bg-error-500 text-[#fff]' onClick={handleDeleteCatalogue} isLoading={isDeleting}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }


    </>
  )
}

export default DeleteCatalogue
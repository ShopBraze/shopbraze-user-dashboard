import Button from "common-components/button/button"
import DeleteWarningImage from "assets/icons/catalogue-listing/delet-catalogue-warning-image.jpg"
import useRemoveNavigation from "./use-remove-navigation"
import { Modal } from "rsuite"
import Image from "next/image"

type RemoveNavigationProps = {
  navigationData: WebsiteNavigationMenuType
}

const RemoveNavigation = ({ navigationData }: RemoveNavigationProps) => {
  const { openDeletePopUp, handleToggleDeletePopUp, handleRemoveNavigation, isDeleting } = useRemoveNavigation({ navigationData })
  return (
    <>
      <Button className="px-4 text-sm font-semibold text-error-600" onClick={handleToggleDeletePopUp}>Remove</Button>

      {
        openDeletePopUp &&
        <Modal open={openDeletePopUp} onClose={handleToggleDeletePopUp} className='w-[480px] !flex items-center h-[96vh]' >
          {/* <Modal.Header></Modal.Header> */}
          <Modal.Body className='space-y-3 p-5'>
            <Image src={DeleteWarningImage} alt="delete-catalogue-warning.jpg" className='w-full h-full cursor-pointer' />
            <h3 className='font-bold'>Are you sure want to delete this navigation ?</h3>
            <p className="text-sm font-medium text-gray-800">Deleting this navigation affect the website navigations.</p>
          </Modal.Body>
          <Modal.Footer className='flex justify-end gap-3 p-5'>
            <Button variant='primary-outline' onClick={handleToggleDeletePopUp}>
              Cancel
            </Button>
            <Button className='py-2 px-[18px] bg-error-500 text-[#fff]' onClick={handleRemoveNavigation} isLoading={isDeleting}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  )
}

export default RemoveNavigation
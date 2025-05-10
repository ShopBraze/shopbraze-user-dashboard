import DeleteCatalogueWarningImage from "assets/icons/catalogue-listing/delet-catalogue-warning-image.jpg"
import { Modal } from 'rsuite'
import DeleteBinIcon from "assets/icons/action-icons/delete-bin-red.svg"

import useDeleteSizeChart from "./use-delete-size-chart"
import Image from "next/image"
import Button from "common-components/button/button"

type DeleteSizeChartProps = {
  data: SizeChartType
}

const DeleteSizeChart = ({ data }: DeleteSizeChartProps) => {
  const { openDeletePopUp, handleToggleDeletePopUp, handleDeleteSizeChart, isDeleting } = useDeleteSizeChart({ data })
  return (
    <>
      <Button onClick={handleToggleDeletePopUp}>
        <Image src={DeleteBinIcon} alt="delete.svg" className="h-4 w-4" />
      </Button>
      {
        openDeletePopUp &&
        <Modal open={openDeletePopUp} onClose={handleToggleDeletePopUp} className='w-[480px] !flex items-center h-[96vh]' >
          {/* <Modal.Header></Modal.Header> */}
          <Modal.Body className='space-y-3 p-5'>
            <Image src={DeleteCatalogueWarningImage} alt="delete-catalogue-warning.jpg" className='w-full h-full cursor-pointer' />
            <h3 className='font-bold'>Are you sure want to delete the Size Chart ?</h3>
            <p className="text-sm font-medium text-gray-800">Deleting the size chart might affect the live products</p>
          </Modal.Body>
          <Modal.Footer className='flex justify-end gap-3 p-5'>
            <Button variant='primary-outline' onClick={handleToggleDeletePopUp}>
              Cancel
            </Button>
            <Button className='py-2 px-[18px] bg-error-500 text-[#fff]' onClick={handleDeleteSizeChart} isLoading={isDeleting}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }

    </>
  )
}

export default DeleteSizeChart
import { Modal } from "rsuite"

import Image from "next/image"
import Button from "common-components/button/button"
import WarningIcon from "assets/icons/warning-triangle-red-icon.svg"
import InfoIcon from "assets/icons/info-icon-primary.svg"

type CancelOrderShipmentProps = {
  open: boolean
  handleClose: () => void
}

const CancelOrderShipment = ({ open, handleClose }: CancelOrderShipmentProps) => {
  return (
    <Modal open={open} onClose={handleClose} className='w-[540px]'>
      <Modal.Header></Modal.Header>
      <Modal.Body className='scrollbar-hide !max-h-[65vh] p-5 space-y-5'>
        <div className="flex flex-col justify-center items-center gap-y-4 ">
          <Image src={WarningIcon} alt="warning.svg" className="h-10 w-10" />
          <p className="text-gray-800 text-xl font-semibold">Do you want to cancel the Order or Shipment?</p>
          <p className="text-gray-700 text-sm font-medium">You can't undo this action.</p>
        </div>
        <div className="p-2 bg-[#FFFCEB] rounded-md flex items-start gap-3">
          <Image src={InfoIcon} alt="info.svg" className="" />
          <div className="space-y-3 text-xs font-medium text-gray-700">
            <p>Once the shipment is cancelled, you can still reassign the Order to a different courier</p>
            <p>However, a cancelled Order will not be available in the pannel for reassignment. Please choose to cancel the Order only if there is no need to ship it anymore.</p>
            <p>In both cases, a cancellation request would be sent to the courier partner. Once confirmed by the partner, the freight charges will be refunded and credited to your Shiprocket wallet immediately.</p>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <Button className="w-full py-2.5 bg-[#FE2222] text-sm text-[#fff] font-semibold rounded-md">
            Cancel Order
          </Button>
          <Button className="w-full py-2.5 rounded-md text-sm font-semibold text-[#E74044] border border-[#a92c2e]">
            Cancel Shipment
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CancelOrderShipment
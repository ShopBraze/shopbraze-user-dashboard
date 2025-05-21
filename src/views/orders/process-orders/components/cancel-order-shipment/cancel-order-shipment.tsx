import { Modal } from "rsuite"
import Image from "next/image"
import Button from "common-components/button/button"
import WarningIcon from "assets/icons/warning-triangle-red-icon.svg"
import InfoIcon from "assets/icons/info-icon-primary.svg"
import useCancelOrderShipment from "./use-cancel-order-shipment"

type CancelOrderShipmentProps = {
  open: boolean
  handleClose: Function
  shipment_awb_code: string
  shipment_order_id: string
  handleSuccess?: Function
}

const CancelOrderShipment = ({ open, handleClose, handleSuccess, shipment_awb_code, shipment_order_id }: CancelOrderShipmentProps) => {
  const { handleCancelOrder, handleCancelShipment, isCancellingShipment, isCancellingOrder } = useCancelOrderShipment({ shipment_awb_code, handleSuccess, shipment_order_id })

  return (
    <Modal open={open} onClose={() => { handleClose() }} className='w-[540px]'>
      <Modal.Header className='border-b border-gray-200 p-4'>
        <h3 className="text-xl font-semibold">Order/Shipment Cancellation</h3>
      </Modal.Header>
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
          <Button
            className="w-full py-2.5 bg-[#FE2222] text-sm text-[#fff] font-semibold rounded-md"
            onClick={handleCancelOrder}
            isLoading={isCancellingOrder}
          >
            Cancel Order
          </Button>
          <Button
            className="w-full py-2.5 rounded-md text-sm font-semibold text-[#E74044] border border-[#a92c2e]"
            onClick={handleCancelShipment}
            isLoading={isCancellingShipment}
          >
            Cancel Shipment
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CancelOrderShipment
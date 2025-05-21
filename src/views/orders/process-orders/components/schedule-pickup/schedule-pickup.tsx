import { Modal } from "rsuite"
import SuccessTickIcon from "assets/icons/success-tick.svg"
import LocationIcon from "assets/icons/location.svg"
import CalendarIcon from "assets/icons/calendar.svg"
import Image from "next/image"
import Button from "common-components/button/button"
import { useGetShipmentFuturePickupDatesQuery } from "services/orders-processing/index.query"

type SchedulePickupProps = {
  open: boolean
  handleClose: Function
  shipment_id: string,
  shipment_awb_code: string,
  shipping_courier_name: string
}

const SchedulePickup = ({ open, handleClose, shipment_id, shipment_awb_code, shipping_courier_name }: SchedulePickupProps) => {

  const { data: pickupDates } = useGetShipmentFuturePickupDatesQuery({ awb_code: shipment_awb_code }, { skip: !shipment_awb_code })

  return (
    <Modal open={open} onClose={() => { handleClose() }} className='w-auto'>
      <Modal.Header className='border-b border-gray-200 p-5'>
        <h3 className="text-2xl font-bold">Schedule Your Pickup</h3>
      </Modal.Header>
      <Modal.Body className='scrollbar-hide !max-h-[65vh] p-5 space-y-5'>
        <div className="w-full py-2.5 px-3 bg-[#E5FFE3] flex gap-2 rounded-md">
          <Image src={SuccessTickIcon} alt="success.svg" className="h-5 w-5" />
          <p className="text-sm font-medium">Your Package has been assigned to <b>{shipping_courier_name}</b> successfully. The AWB number of the same is <span className="font-semibold text-blue-gray-500">{shipment_awb_code}</span></p>
        </div>

        <div className="w-full py-2.5 px-3 rounded-md bg-gray-100 flex gap-4 items-center">
          <Image src={LocationIcon} alt="pickup-icon.svg" className="h-6 w-6" />
          <div className="space-y-[1px]]">
            <p className="text-lg font-semibold">Pick Up Address</p>
            <p className="text-sm font-medium">Home, Gali No.1 DhupNagar, Ambala Cant , Haryna , India, 144011</p>
          </div>
        </div>

        <div className="w-full py-2.5 px-3 rounded-md bg-[#F1F8FF] space-y-3 border border-[#bccfe7]">
          <div className="flex items-center gap-3">
            <Image src={CalendarIcon} alt="calendar.svg" className="" />
            <p className="font-semibold">Please select a suitable date for your order to be picked up</p>
          </div>
          <div className="flex gap-4 ">
            <button className={`px-6 py-2 border border-gray-300 font-medium rounded-full text-sm text-gray-700 bg-gray-100`}>
              Today
            </button>
            <button className={`px-6 py-2 border border-gray-300 font-medium rounded-full text-sm text-gray-700 bg-[#fff]`}>
              15 May'25
            </button>
            <button className={`px-6 py-2 border border-gray-300 font-medium rounded-full text-sm text-gray-700 bg-[#fff]`}>
              16 May'25
            </button>
          </div>
          <p className="text-sm font-medium text-[#397fd5]">In case you schedule the pick up for Today, You will not be able to reschedule this pick up</p>
        </div>

        <div className="space-y-6">
          <p className=" text-sm font-semibold text-gray-600">
            <b>Note:</b> Please ensure that your invoice is in the package, and your label is visible on te package to be delivered.
          </p>

          <div className="flex gap-5 items-center justify-center">
            <Button onClick={() => { handleClose() }}>I'll do it later</Button>
            <Button variant="primary" className="px-12 !font-bold">Schedule Pick Up</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SchedulePickup
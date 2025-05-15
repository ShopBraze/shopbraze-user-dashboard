import { Popover, Whisper } from "rsuite";

type OrderDetailsProps = {
  order: CustomerOrderType
}

const OrderDetails = ({ order }: OrderDetailsProps) => {

  const pickup_address_obj = order?.pickup_address
  const formattedPickupAddress = `${pickup_address_obj?.address}, ${pickup_address_obj?.landmark} ${pickup_address_obj?.city},<br/> ${pickup_address_obj?.state} - ${pickup_address_obj?.pincode}<br/>${pickup_address_obj?.contact_number}`;

  const delivery_address_obj = order?.customer_details?.address
  const formattedDeliveryAddress = `${delivery_address_obj?.building_name}, ${delivery_address_obj?.area_name}, ${delivery_address_obj?.city},<br/>${delivery_address_obj?.state} - ${delivery_address_obj?.pincode}`;

  return (
    <div className="h-full flex-[0.17] py-5 px-8 bg-[#f0f0f0]">
      <h3 className='text-lg font-semibold mb-6'>Order Details</h3>
      <div className="space-y-4">

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Pickup From</p>
          <Whisper
            placement="bottom"
            trigger="hover"
            speaker={
              <Popover >
                <div className=" !max-w-[300px]">
                  <p className="text-[11px]" dangerouslySetInnerHTML={{ __html: formattedPickupAddress }} />
                </div>
              </Popover>
            }
          >
            <p className="border-b border-dashed pb-[2px] w-fit">
              <strong>{order?.pickup_address?.pincode}, {order?.pickup_address?.state}</strong>
            </p>
          </Whisper>

        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Deliver To</p>
          <Whisper
            placement="bottom"
            trigger="hover"
            speaker={
              <Popover >
                <div className="!max-w-[300px]">
                  <p className="text-[11px]" dangerouslySetInnerHTML={{ __html: formattedDeliveryAddress }} />
                </div>
              </Popover>
            }
          >
            <p className="border-b border-dashed pb-[2px] w-fit">
              <strong>{order?.customer_details?.address?.pincode}, {order?.customer_details?.address?.state}</strong>
            </p>
          </Whisper>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Order Value</p>
          <p className="">
            <strong>₹ {order?.bill_details?.total_amount}</strong>
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Payment Mode</p>
          <p className="">
            <strong>{order?.payment_mode === "cod" ? "COD" : "Online"}</strong>
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Applicable Weight (in Kg)</p>
          <p className="">
            <strong>0.5 Kg</strong>
          </p>
        </div>

      </div>

    </div>
  )
}

export default OrderDetails
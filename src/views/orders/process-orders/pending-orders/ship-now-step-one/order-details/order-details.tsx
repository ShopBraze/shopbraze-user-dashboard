type OrderDetailsProps = {
  order: CustomerOrderType
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="h-full flex-[0.17] py-5 px-8 bg-[#f0f0f0]">
      <h3 className='text-lg font-semibold mb-6'>Order Details</h3>
      <div className="space-y-4">

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Pickup From</p>
          <p className="border-b border-dashed pb-[2px] w-fit">
            <strong>132103, Haryana</strong>
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-gray-600 font-semibold">Deliver To</p>
          <p className="border-b border-dashed pb-[2px] w-fit">
            <strong>180005, Jammu and Kashmir</strong>
          </p>
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
            <strong>{order?.payment_mode}</strong>
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
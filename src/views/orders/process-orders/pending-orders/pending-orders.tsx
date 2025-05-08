import Button from 'common-components/button/button'
import Image from 'next/image'
import ShowClubbedOrderDetails from './show-clubbed-order-details/show-clubbed-order-details'
import { useGetPendingOrdersQuery } from 'services/orders/index.query'
import moment from 'moment'
import ComponentLoader from 'common-components/loaders/component-loader'
import { calculateOrderTotalDeadWeight, calculateOrderTotalVolumetricWeight, getOrderDimensionsText } from 'utils/orders-dimension-calculator'

const PendingOrders = () => {

  const { data: ordersData, isLoading } = useGetPendingOrdersQuery()
  console.log(ordersData)

  return (
    isLoading ? <ComponentLoader />
      :
      <div className='min-w-[1024px] overflow-x-auto'>
        <table className=" w-full bg-[#fff] ">
          <thead className=' border-b border-gray-300'>
            <tr className=''>
              <th className="text-sm font-semibold text-gray-800 p-4">Orders</th>
              <th className="text-sm font-semibold text-gray-800">Product</th>
              <th className="text-sm font-semibold text-gray-800">Package Details</th>
              <th className="text-sm font-semibold text-gray-800">Payment</th>
              <th className="text-sm font-semibold text-gray-800">Customer</th>
              <th className="text-sm font-semibold text-gray-800">Pickup Address</th>
              <th className="text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className='mt-5'>
            {
              ordersData?.map((order) => {
                return (
                  <tr key={order?._id} className='border-b border-gray-200 text-[#555] text-[13px]  font-semibold' >
                    <td className='space-y-2 p-4'>
                      {order?.products?.length > 1 && <div className="py-1 px-1.5 rounded flex justify-center items-center bg-indigo-500 text-[#fff] font-semibold text-xs w-fit">Clubbed</div>}
                      <p >{moment(order?.createdAt)?.utcOffset("+05:30").format("DD MMM YYYY | hh:mm A")}</p>
                      {order?.products?.length === 1 && <p className="text-indigo-500">{order?.products?.[0]?.order_item_id}</p>}
                    </td>
                    <td className='space-y-1.5 p-4'>
                      {
                        order?.products?.length > 1 ? <div className="flex gap-3 items-center">
                          <p className="text-indigo-700 font-semibold">{order?.products?.length} Items</p>
                          <ShowClubbedOrderDetails productsDetails={order?.products} />
                        </div> :
                          <>
                            <div className="flex gap-1.5">
                              <Image src={order?.products?.[0]?.product_image}
                                alt="product_image.png"
                                height={64}
                                width={64}
                                className='h-16 w-16 rounded-lg'
                              />
                              <div>
                                <p className="text-gray-900 max-w-[160px] truncate">{order?.products?.[0]?.product_name} </p>
                                <p className="">Color: <span className="text-gray-900">{order?.products?.[0]?.color}</span> </p>
                                <p className="">Size: <span className="text-gray-900">{order?.products?.[0]?.size}</span></p>
                                <div className="flex gap-1 items-center">
                                  Quantity:
                                  <div className="border border-gray-300 py-1 px-2.5 text-[#000] font-bold">{order?.products?.[0]?.quantity_to_buy}</div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <p >SKU ID: {order?.products?.[0]?.customer_sku_short_id}</p>
                              <p >Product ID: {order?.products?.[0]?.customer_product_short_id}</p>
                            </div>
                          </>
                      }
                    </td>
                    <td className='p-4 space-y-1.5'>
                      <p>Dead Weight: {calculateOrderTotalDeadWeight(order).toFixed(1)} Kg</p>
                      <p dangerouslySetInnerHTML={{ __html: getOrderDimensionsText(order) }} />
                      <p>Volumetric Weight: {calculateOrderTotalVolumetricWeight(order)} Kg</p>
                    </td>
                    <td className='p-4 space-y-1.5'>
                      <p>Total Bill Amount: <span className="text-[#000]">₹{order?.bill_details?.total_amount + order?.bill_details?.coupon_discount}</span> </p>
                      <p>Total Discount: <span className="text-[#000]">₹{order?.bill_details?.coupon_discount}</span></p>
                      <p>Total Amount To Collect: <span className="text-[#000]">₹{order?.bill_details?.total_amount}</span></p>
                    </td>
                    <td className='p-4 space-y-1.5'>
                      <p className='ma-w-[120px] truncate'>{order?.customer_details?.name}</p>
                      <p>{order?.customer_details?.phone}</p>
                      <p>{order?.customer_details?.address?.city} {order?.customer_details?.address?.pincode} {order?.customer_details?.address?.state}</p>
                    </td>
                    <td className='p-4'>
                      <p>{order?.pickup_address?.nickname} {order?.pickup_address?.contact_number}<br />
                        {order?.pickup_address?.landmark}<br />
                        {order?.pickup_address?.city} {order?.pickup_address?.pincode} <br />
                        {order?.pickup_address?.state}
                        <br /> </p>
                    </td>
                    <td className='p-4'>
                      <div className="flex flex-col items-center gap-y-3">
                        <Button variant='primary'> Ship Now</Button>
                        <Button variant='tertiary'> Cancel</Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
  )
}

export default PendingOrders
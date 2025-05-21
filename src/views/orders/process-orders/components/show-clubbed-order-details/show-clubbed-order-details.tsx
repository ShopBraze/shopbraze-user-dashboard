import ChevronRightIcon from "assets/icons/chevron-right.svg"
import Image from "next/image"
import { useState } from "react"
import { Button, Drawer } from "rsuite"
import { calculateProductVolumetricWeight } from "utils/orders-dimension-calculator"

type ShowClubbedOrderDetailsProps = {
  productsDetails: CustomereOrderProductType[]
}

const ShowClubbedOrderDetails = ({ productsDetails }: ShowClubbedOrderDetailsProps) => {

  const [openDetails, setOpenDetails] = useState(false)
  const handleToggleOpenDetails = () => { setOpenDetails(!openDetails) }

  return (
    <>
      <Button
        className='border border-gray-400 text-gray-700 p-1 !rounded text-xs flex gap-1 items-center bg-gray-100'
        onClick={handleToggleOpenDetails}
      >
        Show Details
        <Image src={ChevronRightIcon} alt="expand.svg" className='h-4 w-4' />
      </Button>
      <Drawer open={openDetails} onClose={handleToggleOpenDetails}>
        <Drawer.Body className="text-[#555] text-[13px] font-semibold space-y-6 divide-y divide-gray-200">
          {
            productsDetails?.map((product) => {
              return (
                <div className="flex gap-4 pt-4" key={product?.order_item_id}>
                  <div>
                    <div className="flex gap-1.5">
                      <Image src={product?.product_image}
                        alt="product_image.png"
                        height={64}
                        width={64}
                        className='h-16 w-16 rounded-lg'
                      />
                      <div>
                        <p className="text-gray-900 ">{product?.product_name} </p>
                        <p className="">Color: <span className="text-gray-900">{product.color}</span> </p>
                        <p className="">Size: <span className="text-gray-900">{product?.size}</span></p>
                        <div className="flex gap-1 items-center">
                          Quantity:
                          <div className="border border-gray-300 py-1 px-2.5 text-[#000] font-bold">{product?.quantity_to_buy}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-gray-800">SKU ID: {product?.customer_sku_short_id}</p>
                      <p className="text-gray-800">Product ID: {product?.customer_product_short_id}</p>
                    </div>
                  </div>
                  <div className='p-4 space-y-1.5'>
                    <p>Dead Weight: {(product?.sku_details?.weight * product?.quantity_to_buy).toFixed(1)} Kg</p>
                    <p>{product?.sku_details?.length}⨯{product?.sku_details?.breadth}⨯{product?.sku_details?.height * product?.quantity_to_buy} cm</p>
                    <p>Volumetric Weight: {calculateProductVolumetricWeight(product)} Kg</p>
                  </div>
                  <div className='p-4 space-y-1.5'>

                    <p>Total Amount <span className="text-[#000]">₹{product?.effective_price}</span></p>
                  </div>
                </div>
              )
            })
          }
        </Drawer.Body>
      </Drawer>

    </>
  )
}

export default ShowClubbedOrderDetails
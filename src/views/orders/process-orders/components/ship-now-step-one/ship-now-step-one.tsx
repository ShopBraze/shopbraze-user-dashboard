import Button from 'common-components/button/button'
import useShipNowStepOne from './use-ship-now-step-one'
import { Drawer } from 'rsuite'
import OrderDetails from './order-details/order-details'
import SelectCourierPartner from './select-courier-partner/select-courier-partner'

type ShipNowStepOneProps = {
  order: CustomerOrderType
}

const ShipNowStepOne = ({ order }: ShipNowStepOneProps) => {
  const { openDetails, handleToggleOpenDetails } = useShipNowStepOne({ order })
  return (
    <>
      <Button variant='primary' disabled={!order?.order_confirmation} onClick={handleToggleOpenDetails}> Ship Now</Button>

      <Drawer open={openDetails} onClose={handleToggleOpenDetails} className='!w-[90vw]' closeButton={false}>
        <Drawer.Body className="!p-0 flex">
          <OrderDetails order={order} />
          <SelectCourierPartner order={order} handleToggleOpenDetails={handleToggleOpenDetails} />
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export default ShipNowStepOne
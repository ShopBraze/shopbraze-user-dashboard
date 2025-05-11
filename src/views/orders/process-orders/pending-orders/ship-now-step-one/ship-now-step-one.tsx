import Button from 'common-components/button/button'
import useShipNowStepOne from './use-ship-now-step-one'
import { Drawer } from 'rsuite'
import OrderDetails from './order-details/order-details'
import SelectCourierPartner from './select-courier-partner/select-courier-partner'

type ShipNowStepOneProps = {}

const ShipNowStepOne = ({ }: ShipNowStepOneProps) => {
  const { openDetails, handleToggleOpenDetails } = useShipNowStepOne({})
  return (
    <>
      <Button variant='primary' onClick={handleToggleOpenDetails}> Ship Now</Button>


      <Drawer open={openDetails} onClose={handleToggleOpenDetails} className='!w-[90vw]' closeButton={false}>
        <Drawer.Body className="!p-0 flex">
          <OrderDetails />
          <SelectCourierPartner handleToggleOpenDetails={handleToggleOpenDetails} />
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export default ShipNowStepOne
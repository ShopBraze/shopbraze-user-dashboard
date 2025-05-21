import React, { useState } from 'react'
import SchedulePickup from '../components/schedule-pickup/schedule-pickup'
import Button from 'common-components/button/button'
import CancelOrderShipment from '../components/cancel-order-shipment/cancel-order-shipment'
import { useGetReadyToShipOrdersQuery } from 'services/orders/index.query'

type Props = {}

const ReadyToShipOrders = (props: Props) => {

  const { data: readyToShipOrdersData, isLoading } = useGetReadyToShipOrdersQuery()

  console.log({ readyToShipOrdersData })

  const [openSchedulePickupModal, setOpenSchedulePickupModal] = useState(false)
  const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false)

  const handleToggleSchedulePickupModal = () => {
    setOpenSchedulePickupModal(!openSchedulePickupModal)
  }
  const handleToggleCancelOrderModal = () => {
    setOpenCancelOrderModal(!openCancelOrderModal)
  }

  return (
    <div>
      <Button variant='primary' onClick={handleToggleSchedulePickupModal}>
        Schedule Pickup
      </Button>
      <Button variant='primary' onClick={handleToggleCancelOrderModal}>
        Cancel Order
      </Button>
      <CancelOrderShipment open={openCancelOrderModal} handleClose={handleToggleCancelOrderModal} />
      <SchedulePickup open={openSchedulePickupModal} handleClose={handleToggleSchedulePickupModal} />
    </div>
  )
}

export default ReadyToShipOrders
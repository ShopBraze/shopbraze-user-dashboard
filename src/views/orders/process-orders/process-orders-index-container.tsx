import { useRouter } from 'next/router';
import React from 'react'
import PendingOrders from './pending-orders/pending-orders';
import ReadyToShipOrders from './ready-to-ship-orders/ready-to-ship-orders';
import PickupPending from './pickup-pending-orders/pickup-pending-orders';

type Props = {}

const ProcessOrdersIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  console.log(tabName)
  return (
    <div className='pt-5'>
      {tabName === "pending" && <PendingOrders />}
      {tabName === "ready-to-ship" && <ReadyToShipOrders />}
      {tabName === "pickup-pending" && <PickupPending />}
    </div>
  )
}

export default ProcessOrdersIndexContainer
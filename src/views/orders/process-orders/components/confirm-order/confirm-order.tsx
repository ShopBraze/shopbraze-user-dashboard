import Button from 'common-components/button/button'
import React from 'react'
import toast from 'react-hot-toast'
import { usePostConfirmOrderMutation } from 'services/orders-processing/index.query'

type ConfirmOrderProps = {
  order_id: string
}

const ConfirmOrder = ({ order_id }: ConfirmOrderProps) => {
  const [postConfirmOrder, { isLoading }] = usePostConfirmOrderMutation()
  const handleConfirmOrder = () => {
    postConfirmOrder(order_id).unwrap()
      .then(() => {
        toast.success("Order Confirmed.. You can ship now")
      })
      .catch((error) => {
        toast.error("Couldn't confirm Order")
      })
  }
  return (
    <Button
      className='text-sm font-semibold text-success-700 whitespace-nowrap'
      disabled={isLoading}
      onClick={handleConfirmOrder}
      isLoading={isLoading}
    >
      Confirm Order
    </Button>
  )
}

export default ConfirmOrder
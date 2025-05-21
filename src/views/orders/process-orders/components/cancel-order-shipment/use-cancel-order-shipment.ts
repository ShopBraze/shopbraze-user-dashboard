import toast from "react-hot-toast"
import { usePostCancelOrderMutation, usePostCancelShipmentMutation } from "services/orders-processing/index.query"

type UseCancelOrderShipmentProps = {
  shipment_awb_code: string
  shipment_order_id: string
  handleSuccess?: Function
}

const useCancelOrderShipment = ({ shipment_order_id, shipment_awb_code, handleSuccess }: UseCancelOrderShipmentProps) => {
  const [postCancelShipment, { isLoading: isCancellingShipment }] = usePostCancelShipmentMutation()
  const [postCancelOrder, { isLoading: isCancellingOrder }] = usePostCancelOrderMutation()

  const handleCancelShipment = () => {
    postCancelShipment({ awb_codes: [shipment_awb_code] })
      .unwrap()
      .then(() => {
        toast.success("Shipment cancelled successfully")
        if (handleSuccess) handleSuccess()
      })
      .catch((error) => {
        toast.error("Couldn't cancel the shipment")
      })
  }

  const handleCancelOrder = () => {
    postCancelOrder({ order_ids: [shipment_order_id] })
      .unwrap()
      .then(() => {
        toast.success("Order cancelled successfully")
        if (handleSuccess) handleSuccess()
      })
      .catch((error) => {
        toast.error("Couldn't cancel the order")
      })
  }

  return {
    handleCancelShipment,
    handleCancelOrder,
    isCancellingShipment,
    isCancellingOrder
  }
}

export default useCancelOrderShipment
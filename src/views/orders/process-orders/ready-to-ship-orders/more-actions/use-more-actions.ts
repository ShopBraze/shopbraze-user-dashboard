
import { useState } from 'react'
import toast from 'react-hot-toast'
import { usePostGenerateInvoiceMutation, usePostGenerateLabelMutation } from 'services/orders-processing/index.query'

type UseMoreActionsProps = {
  shipment_id: string
  order_id: string
  awb_code: string
}

const useMoreActions = ({ shipment_id, order_id, awb_code }: UseMoreActionsProps) => {
  const [postGenerateLabel] = usePostGenerateLabelMutation()
  const [postGenerateInvoice] = usePostGenerateInvoiceMutation()

  const handleDownloadLabel = () => {
    postGenerateLabel({ shipment_ids: [shipment_id] })
      .unwrap()
      .then((data) => {
        window?.open(data?.label_url, "_blank")
        toast.success("Label Downloaded")
      })
      .catch((error) => {
        toast.error("Couldn't download label")
      })
  }

  const handleDownloadInvoice = () => {
    postGenerateInvoice({ order_ids: [order_id] })
      .unwrap()
      .then((data) => {
        window?.open(data?.invoice_url, "_blank")
        toast.success("Invoice Downloaded")
      })
      .catch((error) => {
        toast.error("Couldn't download invoice")
      })
  }

  return {
    handleDownloadLabel,
    handleDownloadInvoice
  }
}

export default useMoreActions
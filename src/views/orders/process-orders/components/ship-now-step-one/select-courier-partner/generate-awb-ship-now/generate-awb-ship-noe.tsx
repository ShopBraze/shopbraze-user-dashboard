import Button from "common-components/button/button"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { usePostGenerateAwbMutation } from "services/orders-processing/index.query"

type GenerateAwbShipNowProps = {
  courier_id: number
  order_id: string
}

const GenerateAwbShipNow = ({ courier_id, order_id }: GenerateAwbShipNowProps) => {
  const router = useRouter()
  const [postGenerateAwb, { isLoading: isGeneratingAwb }] = usePostGenerateAwbMutation()

  const handleSubmitShipNow = () => {
    postGenerateAwb({
      order_id,
      courier_id
    })
      .unwrap()
      .then(() => {
        toast.success("AWB generated...Schedule Your Pickup")
        router.push('/orders/process-orders/ready-to-ship')
      })
      .catch((error: any) => {
        console.log(error)
        toast.success("Something went wrong")
      })
  }

  return (
    <Button variant="primary" className="text-xs" onClick={handleSubmitShipNow} isLoading={isGeneratingAwb}>
      Ship Now
    </Button>
  )
}

export default GenerateAwbShipNow
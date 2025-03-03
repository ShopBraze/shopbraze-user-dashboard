import ReorderIcon from "assets/icons/action-icons/reorder.svg"
import CopyIcon from "assets/icons/action-icons/copy-icon-primary.svg"
import DeleteBinIcon from "assets/icons/action-icons/delete-bin-red.svg"
import LiveEyeIcon from "assets/icons/action-icons/visible-eye.svg"
import DeliveEyeIcon from 'assets/icons/action-icons/invisible-eye.svg'
import Image from "next/image"

type Props = {}

const TemplateListItem = (props: Props) => {

  return (
    <div className="p-5 rounded-md bg-[#fff] flex text-sm cursor-grab">
      <div className="flex justify-center items-center w-[8%]">
        <Image src={ReorderIcon} alt="reorder.svg" />
      </div>
      <div className="flex justify-center items-center w-[12%]">
        Live
      </div>
      <div className="flex justify-center items-center w-[15%]">
        Customers Feedback
      </div>
      <div className="flex justify-center items-center w-[20%]">
        product_group
      </div>
      <div className="flex justify-center items-center w-[15%]">
        vd9yfoehhjoe
      </div>
      <div className="flex justify-center items-center w-[10%]">
        Carousel
      </div>
      <div className="flex justify-around items-center w-[30%]">
        <Image src={LiveEyeIcon} alt="live.svg" className="h-4 w-4" />
        <Image src={CopyIcon} alt="copy.svg" className="h-4 w-4" />
        <Image src={DeleteBinIcon} alt="delete.svg" className="h-4 w-4" />
      </div>
    </div>
  )
}

export default TemplateListItem
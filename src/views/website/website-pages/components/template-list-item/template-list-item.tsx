import ReorderIcon from "assets/icons/action-icons/reorder.svg"
import CopyIcon from "assets/icons/action-icons/copy-icon-primary.svg"
import DeleteBinIcon from "assets/icons/action-icons/delete-bin-red.svg"
import LiveEyeIcon from "assets/icons/action-icons/visible-eye.svg"
import DeliveEyeIcon from 'assets/icons/action-icons/invisible-eye.svg'
import Image from "next/image"
import Button from "common-components/button/button"
import useTemplateListItem from "./use-template-list-item"

type TemplateListItemProps = {
  data?: WebsitePageTemplate
}

const TemplateListItem = ({ data }: TemplateListItemProps) => {

  const { handleChangeVisibility, handleDeleteTemplate } = useTemplateListItem({ templateData: data })

  return (
    <div className="p-5 rounded-md bg-[#fff] flex text-sm font-medium cursor-grab">
      <div className="flex justify-center items-center w-[8%]">
        <Image src={ReorderIcon} alt="reorder.svg" />
      </div>
      <div className="flex justify-center items-center w-[12%]">
        {
          data?.is_visible ?
            <div className=" py-1 px-2 rounded bg-success-600 text-[#fff] font-semibold text-xs tracking-[.8px]">LIVE</div>
            :
            <div className="py-1 px-2 rounded bg-error-600 text-[#fff] font-semibold text-xs tracking-[0.8px]">DELIVE</div>
        }
      </div>
      <div className="flex justify-center items-center w-[15%]">
        {data?.title}
      </div>
      <div className="flex justify-center items-center w-[20%]">
        {data?.type}
      </div>
      <div className="flex justify-center items-center w-[15%]">
        {data?.short_id}
      </div>
      <div className="flex justify-center items-center w-[10%]">
        {data?.layout}
      </div>
      <div className="flex justify-around items-center w-[30%]">
        <Button onClick={handleChangeVisibility} >
          <Image src={data?.is_visible ? LiveEyeIcon : DeliveEyeIcon} alt="live.svg" className="h-5 w-4" />
        </Button>
        <Button>
          <Image src={CopyIcon} alt="copy.svg" className="h-4 w-4" />
        </Button>
        <Button onClick={handleDeleteTemplate}>
          <Image src={DeleteBinIcon} alt="delete.svg" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default TemplateListItem
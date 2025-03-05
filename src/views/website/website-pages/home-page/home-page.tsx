import InfoIcon from "assets/icons/info-icon-black.svg"
import Image from "next/image"
import PreviewButton from "../components/preview-btn/preview-btn"
import AddTemplate from "../components/add-template/add-template"
import Button from "common-components/button/button"
import TemplateListContainer from "./template-list-container/template-list-container"
import { useGetWebsitePageInfoQuery } from "services/website-page-and-template/index.query"


type Props = {}

const HomePage = (props: Props) => {
  const { data: homePageData, isLoading } = useGetWebsitePageInfoQuery('home-page')
  return (
    <div className='space-y-5'>
      <div className="p-3 bg-[#fff] rounded-md flex flex-col md:flex-row gap-y-4 justify-between">
        <div className="px-4 py-2 rounded-md bg-gray-100 flex justify-center items-center gap-4">
          <Image src={InfoIcon} alt="info.svg" />
          <p className="text-gray-900 text-sm font-medium">Please note that it may take upto 2 hours for the changes to propagate in the system.</p>
        </div>
        <div className="flex gap-3">
          <PreviewButton url="" />
          <AddTemplate page_id={homePageData?.short_id} />
          <Button variant="primary" disabled className="text-sm">
            Save Template Order
          </Button>
        </div>
      </div>
      <TemplateListContainer page_id={homePageData?.short_id} />
    </div>
  )
}

export default HomePage
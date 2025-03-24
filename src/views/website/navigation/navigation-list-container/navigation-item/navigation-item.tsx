import Button from "common-components/button/button"
import EditNavigation from "../../components/edit-navigation/edit-navigation"
import CreateNavigation from "../../components/create-navigation/create-navigation"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import Image from "next/image"
import { useState } from "react"

type NavigationItemProps = {
  navData?: any
}

const NavigationItem = ({ navData }: NavigationItemProps) => {
  const [showSubNavigationItems, setShowSubNavigationItems] = useState(false)
  const handleShowSubNavigationItems = () => {
    setShowSubNavigationItems(!showSubNavigationItems)
  }
  return (
    <div className="w-full px-4 py-5 bg-[#fff] rounded-md flex gap-3 items-start border border-gray-200 cursor-grab">
      {
        navData?.children?.length > 0 ?
          <Button className="pt-2" onClick={handleShowSubNavigationItems}>
            <Image src={ChevronDownIcon} alt="arrow-down.svg" className={`${showSubNavigationItems ? '' : '-rotate-90'}`} />
          </Button>
          : <></>
      }

      <div className="space-y-6 w-full">
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="py-1 px-1.5 bg-gray-200 rounded-md font-semibold text-xs text-gray-600">Title</div>
              <p className="text-sm font-bold">{navData?.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <EditNavigation />
              <CreateNavigation parent_short_id={navData?.short_id} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="py-1 px-1.5 bg-gray-200 rounded-md font-semibold text-xs text-gray-600">Link</div>
              <p className="text-sm font-bold text-blue-gray-500">{navData?.link}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="px-4 text-sm font-semibold text-error-600">Mark Delive</Button>
              <Button className="px-4 text-sm font-semibold text-error-600">Remove</Button>
            </div>
          </div>
        </div>
        {
          navData?.children?.length > 0 && showSubNavigationItems ? navData?.children?.map((item: any) => {
            return (
              <NavigationItem navData={item} />
            )
          }) : null
        }
      </div>
    </div>
  )
}

export default NavigationItem
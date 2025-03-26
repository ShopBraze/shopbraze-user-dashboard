import { useState } from "react"
import Image from "next/image"
import Button from "common-components/button/button"
import EditNavigation from "../../components/edit-navigation/edit-navigation"
import CreateNavigation from "../../components/create-navigation/create-navigation"
import ChevronDownIcon from "assets/icons/chevron-down.svg"
import RemoveNavigation from "../../components/remove-navigation/remove-navigation"
import MarkNavigationVisibility from "../../components/mark-navigation-visibility/mark-navigation-visibility"

type NavigationItemProps = {
  navData?: any
  level?: number
}

const NavigationItem = ({ navData, level = 1 }: NavigationItemProps) => {
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
              <EditNavigation navigationData={navData} />
              <CreateNavigation parent_short_id={navData?.short_id} disabled={level === 3} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="py-1 px-1.5 bg-gray-200 rounded-md font-semibold text-xs text-gray-600">Link</div>
              <p className="text-sm font-bold text-blue-gray-500">{navData?.link}</p>
            </div>
            <div className="flex items-center gap-4">
              <MarkNavigationVisibility navigationData={navData} />
              <RemoveNavigation navigationData={navData} />
            </div>
          </div>
        </div>
        {
          navData?.children?.length > 0 && showSubNavigationItems ? navData?.children?.map((item: any) => {
            return (
              <NavigationItem navData={item} key={item?.short_id} level={level + 1} />
            )
          }) : null
        }
      </div>
    </div>
  )
}

export default NavigationItem
import InfoIcon from "assets/icons/info-icon-black.svg"
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import SaveIcon from "assets/icons/action-icons/save-white.svg"
import Button from "common-components/button/button"
import Image from "next/image"
import NavigationListContainer from "./navigation-list-container/navigation-list-container"
import CreateNavigation from "./components/create-navigation/create-navigation"

const NavigationIndexContainer = () => {
  return (
    <div className="space-y-5">
      <div className="p-4 bg-[#fff] rounded-md flex  flex-col md:flex-row gap-y-4 gap-x-10 md:items-center">
        <div className="px-4 py-2 rounded-md bg-gray-100 flex justify-center items-center gap-4">
          <Image src={InfoIcon} alt="info.svg" />
          <p className="text-gray-900 text-sm font-medium">Upto 12 items can be added on first level and upto 15 items can be added on subsequent levels</p>
        </div>
        <div className="flex gap-3 items-center">
          <CreateNavigation parent_short_id={null}>
            <Button variant="primary" className="text-sm gap-2">
              <Image src={PlusIcon} alt="plus-icon.svg" className="h-5 w-5" />
              Create
            </Button>
          </CreateNavigation>
          <Button variant="primary" className="text-sm gap-2">
            <Image src={SaveIcon} alt="save.svg" className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <NavigationListContainer />
    </div>
  )
}

export default NavigationIndexContainer
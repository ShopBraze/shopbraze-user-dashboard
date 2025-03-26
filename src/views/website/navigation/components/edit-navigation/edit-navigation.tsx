import PencilIcon from "assets/icons/action-icons/edit-pencil-white.svg"
import Button from "common-components/button/button"
import Image from "next/image"
import { useState } from "react"
import { useUpdateWebsiteNavigationMenuItemByIdMutation } from "services/website-page-navigation-menu/index.query"
import NavigationModal from "../navigation-modal/navigation-modal"
type EditNavigationProps = {
  navigationData: WebsiteNavigationMenuType
}

const EditNavigation = ({ navigationData }: EditNavigationProps) => {
  const [openEditNavigationModal, setOpenEditNavigationModal] = useState(false)
  const handleToggleEditNavigationModal = () => {
    setOpenEditNavigationModal(!openEditNavigationModal)
  }

  return (
    <>
      <Button variant="primary" className="text-sm gap-2" onClick={handleToggleEditNavigationModal}>
        <Image src={PencilIcon} alt="edit.svg" className="h-4 w-4" />
        Edit
      </Button>

      {openEditNavigationModal &&
        <NavigationModal
          openModal={openEditNavigationModal}
          handleToggleModal={handleToggleEditNavigationModal}
          navigationData={navigationData}
        />}
    </>
  )
}

export default EditNavigation
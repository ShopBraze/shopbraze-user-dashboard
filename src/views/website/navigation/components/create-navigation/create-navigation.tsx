import Button from "common-components/button/button"
import PlusIcon from "assets/icons/action-icons/plus-icon-primary.svg"
import Image from "next/image"
import { useState } from "react"
import NavigationModal from "../navigation-modal/navigation-modal"

type CreateNavigationProps = {
  children?: React.ReactNode | string
  parent_short_id: null | string
}

const CreateNavigation = ({ children, parent_short_id = null }: CreateNavigationProps) => {
  const [openCreateNavigationModal, setOpenCreateNavigationModal] = useState(false)
  const handleToggleCreateNavigationModal = () => {
    setOpenCreateNavigationModal(!openCreateNavigationModal)
  }

  return (
    <>
      {
        children ?
          <div className="w-full" onClick={handleToggleCreateNavigationModal}>
            {children}
          </div>
          :
          <Button variant="primary-outline" className="text-sm gap-2" onClick={handleToggleCreateNavigationModal}>
            <Image src={PlusIcon} alt="plus-icon.svg" className="" />
            Create
          </Button>
      }
      {openCreateNavigationModal &&
        <NavigationModal
          openModal={openCreateNavigationModal}
          handleToggleModal={handleToggleCreateNavigationModal}
          parent_short_id={parent_short_id}
        />}
    </>
  )
}

export default CreateNavigation
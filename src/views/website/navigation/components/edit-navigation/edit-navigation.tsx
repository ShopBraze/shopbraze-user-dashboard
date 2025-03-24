import PencilIcon from "assets/icons/action-icons/edit-pencil-white.svg"
import Button from "common-components/button/button"
import Image from "next/image"
type EditNavigationProps = {}

const EditNavigation = ({ }: EditNavigationProps) => {
  return (
    <>
      <Button variant="primary" className="text-sm gap-2">
        <Image src={PencilIcon} alt="edit.svg" className="h-4 w-4" />
        Edit
      </Button>
    </>
  )
}

export default EditNavigation
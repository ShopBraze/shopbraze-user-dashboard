import Button from 'common-components/button/button'
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import Image from 'next/image'
import { useState } from 'react'
import TemplateDetailsModal from './template-details-modal/template-details-modal'

type AddTemplateProps = {
  page_id?: string
}

const AddTemplate = ({ page_id }: AddTemplateProps) => {
  const [openTemplateDetailsModal, setOpenTemplateDetailsModal] = useState(false)
  const handleToggleTemplateDetailsModal = () => {
    setOpenTemplateDetailsModal(!openTemplateDetailsModal)
  }
  return (
    <>
      <Button variant='primary' className='gap-1.5' onClick={handleToggleTemplateDetailsModal}>
        <Image src={PlusIcon} alt="add.svg" className='h-5 w-5' />
        <p className="text-sm">Add Template</p>
      </Button>
      {
        openTemplateDetailsModal &&
        <TemplateDetailsModal
          open={openTemplateDetailsModal}
          handleClose={handleToggleTemplateDetailsModal}
          page_id={page_id}
        />
      }

    </>
  )
}

export default AddTemplate
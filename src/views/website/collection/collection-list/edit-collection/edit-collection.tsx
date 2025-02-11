import { Modal } from 'rsuite'
import EditPencilIcon from "assets/icons/action-icons/edit-pencil-primary.svg"
import Button from 'common-components/button/button'
import Image from 'next/image'
import { useState } from 'react'
import ManageCollection from '../../components/manage-collection/manage-collection'

type EditCollectionProps = {
  collectionData: Collection
}

const EditCollection = ({ collectionData }: EditCollectionProps) => {
  const [openModal, setOpenModal] = useState(false)
  const handleToggleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      <Button onClick={handleToggleModal}>
        <Image src={EditPencilIcon} alt="edit-pencil.svg" className='h-4 w-4' />
      </Button>
      <Modal open={openModal} onClose={handleToggleModal} className='w-[90vw] md:w-[80vw]' >
        <Modal.Header className='border-b border-gray-200'>
          <p className="text-gray-1000 font-medium text-lg">Edit Collection</p>
        </Modal.Header>
        <Modal.Body className='scrollbar-hide !max-h-[80vh]'>
          <ManageCollection actionType='Edit' collectionData={collectionData} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditCollection
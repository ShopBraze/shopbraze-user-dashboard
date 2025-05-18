import Button from 'common-components/button/button'
import { useState } from 'react'
import { Modal } from 'rsuite'
import TestimonialForm from '../testimonial-form/testimonial-form'


type EditTestimonialProps = {
  testimonial?: TestiominialType
}

const EditTestimonial = ({ testimonial }: EditTestimonialProps) => {

  const [openEditModal, setOpenEditModal] = useState(false)
  const handleToggleEditModal = () => { setOpenEditModal(!openEditModal) }

  return (
    <>
      <Button variant='primary' onClick={handleToggleEditModal}>
        Edit
      </Button>
      <Modal open={openEditModal} onClose={handleToggleEditModal} className='' >
        <Modal.Header className='p-5 text-xl font-bold'>Edit Testimonial</Modal.Header>
        <Modal.Body className='space-y-3 p-5'>
          <TestimonialForm testimonial={testimonial} onUpdateSuccess={handleToggleEditModal} />
        </Modal.Body>

      </Modal>
    </>
  )
}

export default EditTestimonial
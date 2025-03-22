import Button from 'common-components/button/button'
import { useState } from 'react'
import TemplateDetailsModal from '../template-details-modal/template-details-modal'


type EditTemplateProps = {
  templateData?: WebsitePageTemplate
  page_id?: string
}

const EditTemplate = ({ templateData, page_id }: EditTemplateProps) => {
  const [openTemplateDetailsModal, setOpenTemplateDetailsModal] = useState(false)
  const handleToggleTemplateDetailsModal = () => {
    setOpenTemplateDetailsModal(!openTemplateDetailsModal)
  }
  return (
    <>
      <Button className='text-xs font-semibold text-primary-700' onClick={handleToggleTemplateDetailsModal}>Edit</Button>
      {
        openTemplateDetailsModal &&
        <TemplateDetailsModal
          open={openTemplateDetailsModal}
          handleClose={handleToggleTemplateDetailsModal}
          page_id={page_id}
          templateData={templateData}
        />
      }
    </>
  )
}

export default EditTemplate
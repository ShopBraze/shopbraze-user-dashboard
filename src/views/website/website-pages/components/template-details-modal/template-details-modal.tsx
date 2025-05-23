import Button from "common-components/button/button"
import { useState } from "react"
import { Modal } from "rsuite"
import useTemplateDetailsModal from "./use-template-details-modal"
import SingleSelect from "common-components/form-components/single-select/single-select"
import BannerTemplate from "./template-types/banner/banner-template"
import CategoryGroupTemplate from "./template-types/category-group/category-group-template"
import CategoryTabbedTemplate from "./template-types/category-tabbed/category-tabbed-template"
import ProductGroupTemplate from "./template-types/product-group/product-group-template"
import TestimonialTemplate from "./template-types/testimonial/testimonial-template"


type TemplateDetailsModalProps = {
  open: boolean
  handleClose: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const TemplateDetailsModal = ({ open, handleClose, page_id, templateData }: TemplateDetailsModalProps) => {
  const { watch, control, TemplateTypeOptions } = useTemplateDetailsModal({ templateData })
  const templateType = watch('selectedTemplateType')

  return (
    <Modal open={open} onClose={handleClose} className='w-[80vw] md:w-[60vw] !flex items-center ' backdrop="static">
      <Modal.Header className="p-5">
        <p className="text-gray-900 font-bold ">Widget Details</p>
      </Modal.Header>
      <Modal.Body className='w-full space-y-5 p-5 !max-h-[80vh]'>
        <SingleSelect
          control={control}
          name="selectedTemplateType"
          label={<p className="text-sm font-medium">Template Type <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          options={TemplateTypeOptions}
          placeholder="Select Template Type"
          containerClassName="space-y-1"
          inputClassName="w-full"
          searchable={true}
        />
        <div className="w-full h-[0.8px] bg-gray-200" />

        {templateType === 'banner' && <BannerTemplate handleCloseTemplateDetailsModal={handleClose} page_id={page_id} templateData={templateData} />}
        {templateType === 'category_group' && <CategoryGroupTemplate handleCloseTemplateDetailsModal={handleClose} page_id={page_id} templateData={templateData} />}
        {templateType === 'category_tabbed' && <CategoryTabbedTemplate handleCloseTemplateDetailsModal={handleClose} page_id={page_id} templateData={templateData} />}
        {templateType === 'product_group' && <ProductGroupTemplate handleCloseTemplateDetailsModal={handleClose} page_id={page_id} templateData={templateData} />}
        {templateType === 'testimonial' && <TestimonialTemplate handleCloseTemplateDetailsModal={handleClose} page_id={page_id} templateData={templateData} />}

      </Modal.Body>
    </Modal>
  )
}

export default TemplateDetailsModal
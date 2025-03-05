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
}

const TemplateDetailsModal = ({ open, handleClose, page_id }: TemplateDetailsModalProps) => {
  const { watch, control, TemplateTypeOptions, handleCreateTemplate } = useTemplateDetailsModal()
  const templateType = watch('selectedTemplateType')

  return (
    <Modal open={open} onClose={handleClose} className='w-[80vw] !flex items-center ' backdrop="static">
      <Modal.Header className="p-5">
        <p className="text-gray-900 font-bold ">Widget Details</p>
      </Modal.Header>
      <Modal.Body className='w-full space-y-3 p-5 !max-h-[70vh]'>
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
        {templateType === 'banner' && <BannerTemplate handleCloseBannerDetailsModal={handleClose} page_id={page_id} />}
        {templateType === 'category_group' && <CategoryGroupTemplate />}
        {templateType === 'category_tabbed' && <CategoryTabbedTemplate />}
        {templateType === 'product_group' && <ProductGroupTemplate />}
        {templateType === 'testimonial' && <TestimonialTemplate />}

      </Modal.Body>
    </Modal>
  )
}

export default TemplateDetailsModal
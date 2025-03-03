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
}

const TemplateDetailsModal = ({ open, handleClose }: TemplateDetailsModalProps) => {
  const { watch, control, TemplateTypeOptions, handleCreateTemplate } = useTemplateDetailsModal()
  const templateType = watch('selectedTemplateType')

  return (
    <Modal open={open} onClose={handleClose} className='w-[50vw] !flex items-center h-[96vh]' backdrop="static">
      <Modal.Header className="p-5">
        <p className="text-gray-900 font-bold ">Widget Details</p>
      </Modal.Header>
      <Modal.Body className='w-full space-y-3 p-5'>
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
        {templateType === 'banner' && <BannerTemplate handleCreateTemplate={handleCreateTemplate} />}
        {templateType === 'category_group' && <CategoryGroupTemplate />}
        {templateType === 'category_tabbed' && <CategoryTabbedTemplate />}
        {templateType === 'product_group' && <ProductGroupTemplate />}
        {templateType === 'testimonial' && <TestimonialTemplate />}

      </Modal.Body>
      <Modal.Footer className='flex justify-end gap-3 p-5'>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TemplateDetailsModal
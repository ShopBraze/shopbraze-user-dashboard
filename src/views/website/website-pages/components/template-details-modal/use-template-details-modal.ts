import { useEffect } from "react"
import { useForm } from "react-hook-form"


const TemplateTypeOptions = [
  {
    label: 'Banner',
    value: 'banner'
  },
  {
    label: 'Category Group',
    value: 'category_group'
  },
  {
    label: 'Product Group',
    value: 'product_group'
  },
  {
    label: 'Category Tabbed',
    value: 'category_tabbed'
  },
  {
    label: 'Testimonial',
    value: 'testimonial'
  },
]


const useTemplateDetailsModal = ({ templateData }: { templateData?: WebsitePageTemplate }) => {
  const { watch, control } = useForm({
    defaultValues: {
      selectedTemplateType: templateData?.type ?? ''
    }
  })

  return {
    watch,
    control,
    TemplateTypeOptions,
  }
}

export default useTemplateDetailsModal
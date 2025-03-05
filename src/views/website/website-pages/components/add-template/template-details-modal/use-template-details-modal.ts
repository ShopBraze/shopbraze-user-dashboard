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


const useTemplateDetailsModal = () => {
  const { watch, control } = useForm({
    defaultValues: {
      selectedTemplateType: ''
    }
  })

  const handleCreateTemplate = (data: any) => {
    console.log(data, "create template")
  }

  return {
    watch,
    control,
    TemplateTypeOptions,
    handleCreateTemplate
  }
}

export default useTemplateDetailsModal
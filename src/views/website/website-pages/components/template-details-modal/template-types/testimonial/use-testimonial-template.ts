import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCreateTemplateMutation } from 'services/website-page-and-template/index.query'

type UseTestimonialTemplateType = {
  handleCloseTemplateDetailsModal?: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const useTestimonialTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: UseTestimonialTemplateType) => {

  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: templateData?.title ?? '',
      layout: templateData?.layout ?? '',
      template_settings: {
        sort_by: '',
        autoplay: false,
      },
      custom_style: templateData?.custom_style ?? {
        title_alignment: 'center'
      },
    }
  })

  const handleSave = handleSubmit((data) => {
    const testimonialDataPayload = {
      ...data,
      type: "testimonial"
    }
    const formDataPayload = new FormData()
    formDataPayload.append("page_id", page_id!)
    formDataPayload.append("templateData", JSON.stringify(testimonialDataPayload));

    createTemplate(formDataPayload)
      .unwrap()
      .then(() => {
        toast.success("Template added successfully")
        if (handleCloseTemplateDetailsModal) handleCloseTemplateDetailsModal()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
  })

  return {
    watch,
    control,
    setValue,
    handleSave,
    isCreating
  }
}

export default useTestimonialTemplate
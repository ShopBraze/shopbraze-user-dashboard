import toast from 'react-hot-toast'
import { useDeleteTemplateMutation, usePostCopyTemplateMutation, usePutToggleTemplateVisibilityMutation } from 'services/website-page-and-template/index.query'

type UseTemplateListItemProps = {
  templateData?: WebsitePageTemplate
  page_id?: string
}

const useTemplateListItem = ({ templateData, page_id }: UseTemplateListItemProps) => {
  const [putToggleTemplateVisibility] = usePutToggleTemplateVisibilityMutation()
  const [postCopyTemplate] = usePostCopyTemplateMutation()
  const [deleteTemplate] = useDeleteTemplateMutation()

  const handleChangeVisibility = () => {
    const payload = {
      template_id: templateData?.id ?? '',
      body: {
        visibility: !templateData?.is_visible
      }
    }
    putToggleTemplateVisibility(payload).unwrap()
      .then(() => {
        toast.success("Visibility updated")
      }).catch((error) => {
        toast.error("Something went wrong")
      })
  }

  const handleCopyTemplate = () => {
    if (templateData?.short_id && page_id) {
      postCopyTemplate({ template_id: templateData?.short_id, page_id: page_id }).unwrap()
        .then(() => {
          toast.success("Template Copied")
        }).catch(() => {
          toast.error("Could not copy template")
        })
    }

  }

  const handleDeleteTemplate = () => {
    if (templateData?.id) {
      deleteTemplate(templateData?.id).unwrap()
        .then(() => {
          toast.success("Template Deleted")
        }).catch(() => {
          toast.error("Could not delete template")
        })
    }
  }

  return {
    handleChangeVisibility,
    handleDeleteTemplate,
    handleCopyTemplate
  }
}

export default useTemplateListItem
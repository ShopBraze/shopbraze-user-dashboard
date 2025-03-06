import React from 'react'
import toast from 'react-hot-toast'
import { useDeleteTemplateMutation, usePutToggleTemplateVisibilityMutation } from 'services/website-page-and-template/index.query'

type UseTemplateListItemProps = {
  templateData?: WebsitePageTemplate
}

const useTemplateListItem = ({ templateData }: UseTemplateListItemProps) => {
  const [putToggleTemplateVisibility] = usePutToggleTemplateVisibilityMutation()
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
    handleDeleteTemplate
  }
}

export default useTemplateListItem
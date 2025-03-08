import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useGetTemplatesInPageQuery, useGetWebsitePageInfoQuery, usePostReorderTemplatesInPageMutation } from "services/website-page-and-template/index.query"

const useHomePage = () => {
  const { data: homePageData, isLoading } = useGetWebsitePageInfoQuery('home-page')
  const [postReorderTemplatesInPage, { isLoading: isSavingOrder }] = usePostReorderTemplatesInPageMutation()

  // For Enabling and Disabling Save Template Order Button (untill order is changed)
  const [enableSaveTemplate, setEnableSaveTemplate] = useState(false)
  const handleEnableSaveTemplate = (val: boolean) => {
    setEnableSaveTemplate(val)
  }

  //  For handling showing the templates in order
  const { data: homePageTemplates, } = useGetTemplatesInPageQuery({ page_type: "home_page", page_id: homePageData?.short_id! }, { skip: !homePageData?.short_id })
  const [templateListToRender, setTemplateListToRender] = useState(homePageTemplates ? structuredClone(homePageTemplates) : [])

  useEffect(() => {
    if (homePageTemplates) {
      setTemplateListToRender(structuredClone(homePageTemplates));
    }
  }, [homePageTemplates]);



  const handleSaveTemplateOrder = () => {
    const payload = {
      page_id: homePageData?.short_id || '',
      template_ids: templateListToRender?.map((item) => item?.short_id)
    }
    postReorderTemplatesInPage(payload).unwrap()
      .then(() => {
        toast.success("Order Saved")
        handleEnableSaveTemplate(false)
      }).catch((error) => {
        toast.error("Something went wrong")
      })
  }
  return {
    homePageData,
    handleSaveTemplateOrder,
    enableSaveTemplate,
    handleEnableSaveTemplate,
    templateListToRender,
    setTemplateListToRender,
    isSavingOrder
  }
}

export default useHomePage
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useGetTemplatesInPageQuery, useGetWebsitePageInfoQuery, usePostReorderTemplatesInPageMutation } from "services/website-page-and-template/index.query"

const useProductPage = () => {
  const { data: productPageData, isLoading } = useGetWebsitePageInfoQuery('product-page')
  const [postReorderTemplatesInPage, { isLoading: isSavingOrder }] = usePostReorderTemplatesInPageMutation()

  // For Enabling and Disabling Save Template Order Button (untill order is changed)
  const [enableSaveTemplate, setEnableSaveTemplate] = useState(false)
  const handleEnableSaveTemplate = (val: boolean) => {
    setEnableSaveTemplate(val)
  }

  //  For handling showing the templates in order
  const { data: productPageTemplates, } = useGetTemplatesInPageQuery({ page_type: "product_page", page_id: productPageData?.short_id! }, { skip: !productPageData?.short_id })
  const [templateListToRender, setTemplateListToRender] = useState(productPageTemplates ? structuredClone(productPageTemplates) : [])

  useEffect(() => {
    if (productPageTemplates) {
      setTemplateListToRender(structuredClone(productPageTemplates));
    }
  }, [productPageTemplates]);



  const handleSaveTemplateOrder = () => {
    const payload = {
      page_id: productPageData?.short_id || '',
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
    productPageData,
    handleSaveTemplateOrder,
    enableSaveTemplate,
    handleEnableSaveTemplate,
    templateListToRender,
    setTemplateListToRender,
    isSavingOrder
  }
}

export default useProductPage
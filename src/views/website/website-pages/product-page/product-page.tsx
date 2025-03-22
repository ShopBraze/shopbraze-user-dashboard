import InfoIcon from "assets/icons/info-icon-black.svg"
import Image from "next/image"
import PreviewButton from "../components/preview-btn/preview-btn"
import AddTemplate from "../components/add-template/add-template"
import Button from "common-components/button/button"
import TemplateListContainer from "./template-list-container/template-list-container"
import useProductPage from "./use-product-page"

const ProductPage = () => {
  const { productPageData, handleSaveTemplateOrder, enableSaveTemplate, handleEnableSaveTemplate, templateListToRender, setTemplateListToRender, isSavingOrder } = useProductPage()
  return (
    <div className='space-y-5'>
      <div className="p-3 bg-[#fff] rounded-md flex flex-col md:flex-row gap-y-4 justify-between">
        <div className="px-4 py-2 rounded-md bg-gray-100 flex justify-center items-center gap-4">
          <Image src={InfoIcon} alt="info.svg" />
          <p className="text-gray-900 text-sm font-medium">Please note that it may take upto 2 hours for the changes to propagate in the system.</p>
        </div>
        <div className="flex gap-3">
          <PreviewButton url="" />
          <AddTemplate page_id={productPageData?.short_id} />
          <Button variant="primary" disabled={enableSaveTemplate ? false : true} className="text-sm" onClick={handleSaveTemplateOrder} isLoading={isSavingOrder}>
            Save Template Order
          </Button>
        </div>
      </div>
      <TemplateListContainer
        page_id={productPageData?.short_id}
        handleEnableSaveTemplate={handleEnableSaveTemplate}
        templateListToRender={templateListToRender}
        setTemplateListToRender={setTemplateListToRender}
      />
    </div>
  )
}

export default ProductPage
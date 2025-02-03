import UploadIcon from "assets/icons/upload-icon-primary.svg"
import Button from "common-components/button/button"
import { useRouter } from "next/router"
import { ChangeEvent, useRef } from "react"
import toast from "react-hot-toast"
import { usePostBulkUploadCataloguesMutation } from "services/bulk-uploads/index.query"


const useUploadCsv = () => {
  const router = useRouter()

  const [postBulkUploadCatalogues, { isLoading: isUploading }] = usePostBulkUploadCataloguesMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const payload = new FormData()
      payload.append("file", e?.target?.files[0]);
      postBulkUploadCatalogues(payload)
        .unwrap()
        .then((data) => {
          toast.success("Catalogues uploaded successfully")
          router.push("/products/catalogue/list")
          console.log(data)
        }).
        catch((errors) => {
          toast.error("Errors found in csv , Please check Reports section")
          console.log(errors)
        })
    }
  };
  return (
    {
      handleFileUpload,
      isUploading,
      fileInputRef
    }
  )
}

export default useUploadCsv
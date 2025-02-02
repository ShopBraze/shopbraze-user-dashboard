import UploadIcon from "assets/icons/upload-icon-primary.svg"
import Button from "common-components/button/button"
import { ChangeEvent, useRef } from "react"
import { usePostBulkUploadCataloguesMutation } from "services/bulk-uploads/index.query"

type Props = {}

const UploadCsvButton = (props: Props) => {
  const [postBulkUploadCatalogues, { isLoading }] = usePostBulkUploadCataloguesMutation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const payload = new FormData()
      payload.append("file", e?.target?.files[0]);
      postBulkUploadCatalogues(payload)
        .unwrap()
        .then((data) => {
          console.log(data)
        }).
        catch((errors) => {
          console.log(errors)
        })
    }
  };
  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button variant='primary'
        className='w-full'
        isLoading={isLoading}
        onClick={() => { fileInputRef?.current?.click(); }}
      >
        Upload
      </Button>

    </>
  )
}

export default UploadCsvButton
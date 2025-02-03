import Button from "common-components/button/button"
import useUploadCsv from "./use-upload-csv"

type Props = {}

const UploadCsvButton = (props: Props) => {
  const { handleFileUpload, fileInputRef, isUploading } = useUploadCsv()
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
        isLoading={isUploading}
        onClick={() => { fileInputRef?.current?.click(); }}
      >
        Upload
      </Button>
    </>
  )
}

export default UploadCsvButton
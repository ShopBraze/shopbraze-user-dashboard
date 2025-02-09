import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import { useWatch } from "react-hook-form";
import Image from "next/image";
import { Uploader } from "rsuite";
import { UseFormWatch } from "react-hook-form";
import { FileType } from "rsuite/esm/Uploader";


type BulkUploadCollectionsProps = {
  handleFileUpload: (fileList: FileType[]) => void
  watch: UseFormWatch<{
    collection_title: string;
    selectedProducts: Catalogue[];
    selectedProductsShortIds: string[];
    collection_csv_file: FileType[];
  }>
}

const BulkUploadCollections = ({ handleFileUpload, watch }: BulkUploadCollectionsProps) => {
  console.log(watch('collection_csv_file'), "from bulk upload")
  return (
    <div className="pt-10">
      <div className={`w-full flex justify-center ${watch('collection_csv_file')?.length > 0 ? "opactity-50" : ""}`}>
        <Uploader
          multiple={false}
          disabled={watch('collection_csv_file')?.length > 0 ? true : false}
          action={''}
          shouldUpload={() => false}
          accept=".csv, text/csv"
          onChange={handleFileUpload}
          fileList={watch('collection_csv_file')}
        >
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>

    </div>
  )
}

export default BulkUploadCollections
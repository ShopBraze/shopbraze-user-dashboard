import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
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
  return (
    <div className="pt-10">
      <div className={`w-full flex justify-center`}>
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
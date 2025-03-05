import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Uploader } from 'rsuite'
import { FileType } from "rsuite/esm/Uploader"
import { CatalogueFormDataType } from "../../types/index.type"
import useAssetsUpdateContainer from "./use-assets-update-container"

type AssetsUpdateContainerProps = {
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  catalogueData: Catalogue
}

const AssetsUpdateContainer = ({ setValue, watch, catalogueData }: AssetsUpdateContainerProps) => {
  const { handleImagesChange, handleVideosChange, handleRemoveFile } = useAssetsUpdateContainer({ catalogueData, watch, setValue })

  return (
    <div className='p-2 rounded-md bg-[#fff] space-y-4'>

      {/* For Images */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Images</p>
        <Uploader
          multiple
          listType="picture"
          action={''}
          shouldUpload={() => false}
          accept="image/*"
          fileList={watch('files.images')}
          onChange={handleImagesChange}
          onRemove={(file) => handleRemoveFile(file, "images")}
        >
          <div style={{ height: 100, width: 100 }}>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>

      {/* For Videos */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Videos</p>
        <Uploader multiple
          // listType="picture"
          action={''}
          shouldUpload={() => false}
          maxPreviewFileSize={5242880}
          accept="video/*"
          onChange={handleVideosChange}
          fileList={watch('files.videos')}
          onRemove={(file) => handleRemoveFile(file, "videos")}
          renderFileInfo={(file: FileType) => (
            <video
              src={file.url || URL.createObjectURL(file?.blobFile!)}
              controls
              width={100}
              height={100}
              style={{ maxHeight: "150px", borderRadius: "8px" }}
            />
          )}
        >
          <div style={{ height: 100, width: 100 }}>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>
    </div>
  )
}

export default AssetsUpdateContainer
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import { useState } from "react"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Uploader } from 'rsuite'
import { FileType } from "rsuite/esm/Uploader"
import { CatalogueDataType } from "../../types/index.type"

type AssetsUploadContainerProps = {
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
}

const AssetsUploadContainer = ({ setValue, watch }: AssetsUploadContainerProps) => {

  const handleImagesChange = (fileList: FileType[]) => {
    setValue("files.images", fileList)
  };

  const handleVideosChange = (fileList: FileType[]) => {
    setValue("files.videos", fileList)
  };

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
          onChange={handleImagesChange}
          fileList={watch('files.images')}
        >
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>

      {/* For Videos */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Videos</p>
        <Uploader multiple
          listType="picture"
          action={''}
          shouldUpload={() => false}
          maxPreviewFileSize={5242880}
          accept="video/*"
          onChange={handleVideosChange}
          fileList={watch('files.videos')}
        >
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>
    </div>
  )
}

export default AssetsUploadContainer
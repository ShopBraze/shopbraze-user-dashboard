import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import { useState } from "react"
import { UseFormSetValue } from "react-hook-form"
import { Uploader } from 'rsuite'
import { FileType } from "rsuite/esm/Uploader"
import { CatalogueDataType } from "../../types/index.type"

type AssetsUploadContainerProps = {
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }>
}

const AssetsUploadContainer = ({ setValue }: AssetsUploadContainerProps) => {

  const handleChange = (fileList: FileType[]) => {
    setValue("files", fileList)
  };


  // const media = [
  //   {
  //     "src_url": "https://s3.ap-south-1.amazonaws.com/nushop-catalogue/6539e1d902d8dc3ec1847a09/cat_img/Mens_Jacket_692UDLRO0T_2025-01-24_1.png",
  //     "type": "image",
  //     "index": 0,
  //   },
  //   {
  //     "src_url": "https://s3.ap-south-1.amazonaws.com/nushop-catalogue/6539e1d902d8dc3ec1847a09/cat_img/Mens_Jacket_NSH37HWEIQ_2025-01-24_2.png",
  //     "type": "image",
  //     "index": 1,
  //   },
  //   {
  //     "src_url": "https://s3.ap-south-1.amazonaws.com/nushop-catalogue/6539e1d902d8dc3ec1847a09/cat_img/Mens_Jacket_68135PS0FM_2025-01-24_3.png",
  //     "type": "image",
  //     "index": 2,
  //   }
  // ].map((item, index) => ({
  //   name: `Image ${index + 1}`,
  //   // fileKey: item._id,
  //   url: item.src_url
  // }));

  return (
    <div className='p-2 rounded-md bg-[#fff] space-y-4'>

      {/* For Images */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Images</p>
        <Uploader multiple listType="picture" action={''} shouldUpload={() => false} accept="image/*" onChange={handleChange}>
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>

      {/* For Videos */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Videos</p>
        <Uploader multiple listType="picture" action={''} shouldUpload={() => false} maxPreviewFileSize={5242880} accept="video/*">
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>
    </div>
  )
}

export default AssetsUploadContainer
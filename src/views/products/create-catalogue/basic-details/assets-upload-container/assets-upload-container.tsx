import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import { Uploader } from 'rsuite'

type Props = {}

const AssetsUploadContainer = (props: Props) => {
  return (
    <div className='p-2 rounded-md bg-[#fff] space-y-4'>
      {/* For Images */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Images</p>
        <Uploader multiple listType="picture" action={''} accept="image/*">
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">Upload Videos</p>
        <Uploader multiple listType="picture" action={''} accept="video/*">
          <div>
            <Image src={UploadIcon} alt="upload.svg" />
          </div>
        </Uploader>
      </div>
    </div>
  )
}

export default AssetsUploadContainer
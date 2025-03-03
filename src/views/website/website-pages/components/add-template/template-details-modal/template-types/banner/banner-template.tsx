import TextInput from 'common-components/form-components/text-input/text-input'
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import useBannerTemplate from './use-banner-template'
import { Uploader } from 'rsuite'
import { FileType } from 'rsuite/esm/Uploader'
import Image from 'next/image'

type BannerTemplateProps = {
  handleCreateTemplate: Function
}

const BannerTemplate = ({ handleCreateTemplate }: BannerTemplateProps) => {
  const { watch, control, setValue } = useBannerTemplate({ handleCreateTemplate })
  return (
    <div className='space-y-3'>
      <TextInput
        name="title"
        control={control}
        label={<p className="text-sm font-medium">Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder="Ex: 344"
      />
      <Uploader
        listType="picture-text"
        multiple={false}
        // disabled={watch('kyc_details.gst') ? watch('kyc_details.gst')!?.length > 0 ? true : false : false}
        action={''}
        shouldUpload={() => false}
        accept=".jpg, .jpeg, .png"
        onChange={(fileList: FileType[]) => { }}
        // onRemove={(file) => { setValue('', undefined) }}
        fileList={watch('bannerAttachedImages') ?? undefined}
      >
        <div style={{ width: 200, height: 300 }}>
          <Image src={UploadIcon} alt="upload.svg" />
          <p className="text-sm font-semibold text-gray-800">Browse and Upload Image</p>
        </div>
      </Uploader>
    </div>
  )
}

export default BannerTemplate
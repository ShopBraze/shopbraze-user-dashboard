import TextInput from 'common-components/form-components/text-input/text-input'
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import useBannerTemplate from './use-banner-template'
import { Uploader } from 'rsuite'
import CloseIcon from "assets/icons/cross-icon.svg"
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import Image from 'next/image'
import Button from 'common-components/button/button'

type BannerTemplateProps = {
  handleCloseBannerDetailsModal: () => void
}

const BannerTemplate = ({ handleCloseBannerDetailsModal }: BannerTemplateProps) => {
  const { watch, control, handleAddTemplateChild, handleRemoveTemplateChild, handleFileChange, handleSave, isCreating } = useBannerTemplate({ handleCloseBannerDetailsModal })
  return (
    <div className='space-y-5'>
      <TextInput
        name="title"
        control={control}
        label={<p className="text-sm font-medium">Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder="Ex: 344"
        rules={{
          required: 'Please Add Title'
        }}
      />

      <div className="flex justify-center items-center">
        <Button variant='primary' className='gap-1 text-sm' onClick={handleAddTemplateChild}>
          <Image src={PlusIcon} alt="plus.svg" className='h-6 w-6' />
          Banner Item
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {
          watch('bannerItems')?.map((bannerInfo, index) => {
            return (
              <div className="space-y-3 bg-gray-100 p-3 rounded-md" key={index}>
                <div className="flex justify-between items-center">
                  <p className="text-base font-bold text-gray-500 ">Banner Item {index + 1}</p>
                  <Button onClick={() => { handleRemoveTemplateChild(index) }}>
                    <Image src={CloseIcon} alt="close.svg" className="h-5 w-5" />
                  </Button>
                </div>

                <TextInput
                  name={`bannerItems.${index}.link`}
                  control={control}
                  label={<p className="text-sm font-medium">Link To<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                  containerClassName="space-y-1"
                  placeholder="Enter Link"
                  rules={{
                    required: 'Please Enter Link'
                  }}
                />
                <Uploader
                  listType="picture-text"
                  disabled={bannerInfo?.image ? true : false}
                  multiple={false}
                  action=""
                  shouldUpload={() => false}
                  accept=".jpg, .jpeg, .png"
                  onChange={(fileList) => handleFileChange(index, fileList)}
                  fileList={bannerInfo.image ? [bannerInfo.image] : []}
                >
                  <div style={{ width: "200px", height: 100 }} className="border rounded-md flex flex-col items-center justify-center">
                    <Image src={UploadIcon} alt="upload.svg" />
                    <p className="text-sm font-semibold text-gray-800">Browse</p>
                  </div>
                </Uploader>
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end gap-3 p-5'>
        <Button variant='secondary' onClick={handleCloseBannerDetailsModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isCreating} isLoading={isCreating}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default BannerTemplate
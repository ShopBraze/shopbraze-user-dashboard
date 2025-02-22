import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Button from "common-components/button/button"
import Image from "next/image"
import { useState } from "react"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Modal, Uploader } from "rsuite"
import { CreateSellerFormDataType } from "../../../types/index.type"
import { FileType } from "rsuite/esm/Uploader"

type UploadKYCDetailsProps = {
  watch: UseFormWatch<CreateSellerFormDataType>
  setValue: UseFormSetValue<CreateSellerFormDataType>
}

const UploadKYCDetails = ({ watch, setValue }: UploadKYCDetailsProps) => {
  const [openModal, setOpenModal] = useState(false)
  const handleToggleModal = () => { setOpenModal(!openModal) }

  const handleKycDetailsChange = (type: 'gst' | 'pan' | 'cheque', fileList: FileType[]) => {
    if (type === 'gst') setValue('kyc_details.gst', fileList)
    if (type === 'pan') setValue('kyc_details.pan', fileList)
    if (type === 'cheque') setValue('kyc_details.cheque', fileList)
  }

  return (
    <div>
      <Button variant='primary' className='text-sm' onClick={handleToggleModal}>
        Upload KYC Details
      </Button>

      <Modal open={openModal} onClose={handleToggleModal} className='w-[590px]' >
        <Modal.Header className='border-b border-gray-200 px-5 py-3'>
          <p className="text-gray-700 font-medium text-lg">Upload KYC Documents</p>
        </Modal.Header>
        <Modal.Body className='p-5 py-3 flex justify-around !overflow-hidden'>

          <div className="max-w-[140px]">
            <Uploader
              listType="picture-text"
              multiple={false}
              disabled={watch('kyc_details.gst') ? watch('kyc_details.gst')!?.length > 0 ? true : false : false}
              action={''}
              shouldUpload={() => false}
              accept=".jpg, .jpeg, .png"
              onChange={(fileList: FileType[]) => { handleKycDetailsChange('gst', fileList) }}
              onRemove={(file) => { setValue('kyc_details.gst', undefined) }}
              fileList={watch('kyc_details.gst') ?? undefined}
            >
              <div>
                <Image src={UploadIcon} alt="upload.svg" />
                <p className="text-sm font-semibold text-gray-800">GST</p>
              </div>
            </Uploader>
          </div>

          <div className="max-w-[140px]">
            <Uploader
              listType="picture-text"
              multiple={false}
              disabled={watch('kyc_details.gst') ? watch('kyc_details.pan')!?.length > 0 ? true : false : false}
              action={''}
              shouldUpload={() => false}
              accept=".jpg, .jpeg, .png"
              onChange={(fileList: FileType[]) => { handleKycDetailsChange('pan', fileList) }}
              onRemove={(file) => { setValue('kyc_details.pan', undefined) }}
              fileList={watch('kyc_details.pan') ?? undefined}
            >
              <div className="gap-y-7">
                <Image src={UploadIcon} alt="upload.svg" />
                <p className="text-sm font-semibold text-gray-800">PAN</p>
              </div>
            </Uploader>
          </div>

          <div className="max-w-[140px]">
            <Uploader
              listType="picture-text"
              multiple={false}
              disabled={watch('kyc_details.gst') ? watch('kyc_details.cheque')!?.length > 0 ? true : false : false}
              action={''}
              shouldUpload={() => false}
              accept=".jpg, .jpeg, .png"
              onChange={(fileList: FileType[]) => { handleKycDetailsChange('cheque', fileList) }}
              onRemove={(file) => { setValue('kyc_details.cheque', undefined) }}
              fileList={watch('kyc_details.cheque') ?? undefined}
            >
              <div>
                <Image src={UploadIcon} alt="upload.svg" />
                <p className="text-sm font-semibold text-gray-800">CHEQUE</p>
              </div>
            </Uploader>
          </div>

        </Modal.Body>
        <Modal.Footer className="p-5 flex justify-end gap-3">
          <Button variant="primary" onClick={handleToggleModal}>OK</Button>
          <Button variant="primary-outline" onClick={() => {
            setValue('kyc_details.gst', undefined)
            setValue('kyc_details.pan', undefined)
            setValue('kyc_details.cheque', undefined)
          }}>Cancel</Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default UploadKYCDetails
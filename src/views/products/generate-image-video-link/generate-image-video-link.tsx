import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import { Radio, RadioGroup, Uploader } from "rsuite"
import useGenerateImageVideoLink from "./use-generate-image-video-link"
import Button from "common-components/button/button"
import CloseIcon from "assets/icons/cross-icon.svg"

type Props = {}

const GenerateImageVideoLink = (props: Props) => {
  const { imagesList, videosList, handleImagesChange, handleVideosChange, generateMode, handleGenerateMode, handleRemoveFile } = useGenerateImageVideoLink()

  console.log(imagesList)

  return (
    <div className="space-y-3">
      <div className="p-4 bg-[#fff] rounded-md">
        <div className="w-[full] flex justify-center py-3 border border-primary-400 rounded-md">
          {
            generateMode === "Image" ?
              <div className="space-y-3">
                <Uploader
                  multiple
                  listType="picture"
                  action={''}
                  shouldUpload={() => false}
                  accept="image/*"
                  onChange={handleImagesChange}
                  fileList={imagesList}
                  fileListVisible={false}
                >
                  <div className="!w-[200px]">
                    <Image src={UploadIcon} alt="upload.svg" />
                  </div>
                </Uploader>
                <p className="text-gray-800 font-medium">Upload Images</p>
              </div>

              :
              generateMode === "Video" ?
                <div className="space-y-3">
                  <Uploader multiple
                    listType="picture"
                    action={''}
                    shouldUpload={() => false}
                    maxPreviewFileSize={5242880}
                    accept="video/*"
                    onChange={handleVideosChange}
                    fileList={videosList}
                    fileListVisible={false}
                  >
                    <div>
                      <Image src={UploadIcon} alt="upload.svg" />
                    </div>
                  </Uploader>
                  <p className="text-gray-800 font-medium">Upload Videos</p>
                </div>
                : <></>
          }
        </div>
      </div>

      <div className="p-4 bg-[#fff] rounded-md space-y-3">
        <div className="flex gap-3 justify-end">
          <div className="flex gap-4 items-center px-[18px] border border-gray-200 rounded-lg">
            <RadioGroup name="assets-generate-link-radio" inline value={generateMode} onChange={(val) => { handleGenerateMode(val as string) }}>
              <Radio value="Image" color="green" className="text-sm font-semibold">Image</Radio>
              <Radio value="Video" color="green">Video</Radio>
            </RadioGroup>
          </div>
          <Button variant="primary" className="leading-6" disabled={imagesList?.length === 0 && videosList?.length === 0}>Generate Link</Button>
        </div>
        <div className="space-y-3">
          {
            (generateMode === "Image" ? imagesList : videosList)?.map((item) => {
              return (
                <div className="flex justify-between items-center p-1 py-1.5 pr-3 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-3 ">
                    {generateMode === "Image" ? <Image src={URL.createObjectURL(item?.blobFile!)} alt={`${item?.name}`} height={50} width={50} className="rounded-md h-12 w-12 shrink-0" />
                      :
                      <video src={URL.createObjectURL(item?.blobFile!)} className="h-12 w-12 rounded-md"></video>
                    }
                    <p className="font-medium text-gray-700">{item?.name}</p>
                  </div>
                  <Button onClick={() => { handleRemoveFile(item?.fileKey) }}>
                    <Image src={CloseIcon} alt="close.svg" className="h-4 w-4" />
                  </Button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default GenerateImageVideoLink
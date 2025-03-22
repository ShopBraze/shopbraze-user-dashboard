import TextInput from "common-components/form-components/text-input/text-input"
import InfoIcon from "assets/icons/info-icon-primary.svg"
import useCategoryGroupTemplate from "./use-category-group-template"
import Button from "common-components/button/button"
import { convertFirstLetterCapital } from "utils/text-case-transform"
import Image from "next/image"
import { Uploader } from 'rsuite'
import CloseIcon from "assets/icons/cross-icon.svg"
import PlusIcon from "assets/icons/action-icons/plus-icon-primary.svg"
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import SingleSelect from "common-components/form-components/single-select/single-select"

type CategoryGroupTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const CategoryGroupTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: CategoryGroupTemplateProps) => {
  const { watch, control, setValue, handleAddNewCategory, handleRemoveCategory, handleFileChange, collectionOptions, handleSave, isCreating } = useCategoryGroupTemplate({ handleCloseTemplateDetailsModal, page_id, templateData })
  return (
    <div className="space-y-1">
      <div className="flex gap-10 items-center">
        <TextInput
          name="title"
          control={control}
          label={<p className="text-sm font-medium">Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          containerClassName="flex-[0.6] space-y-1"
          placeholder="Enter Title"
          rules={{
            required: 'Please Add Title'
          }}
        />
        <div className="flex-[0.4] space-y-1.5">
          <p className="text-sm font-medium">Title alignment</p>
          <div className="flex gap-2 items-center">
            {
              ['left', 'center', 'right'].map((item, index) => {
                return (
                  <Button key={index}
                    className={`w-full flex justify-center items-center border py-1.5 px-2 ${watch('custom_style.title_alignment') === item ? 'bg-gray-700 text-[#fff]' : ' border-gray-300'}`}
                    onClick={() => { setValue('custom_style.title_alignment', item) }}>
                    {convertFirstLetterCapital(item)}
                  </Button>
                )
              })
            }
          </div>
        </div>
      </div>
      <TextInput
        name="description"
        control={control}
        label={<p className="text-sm font-medium">Description</p>}
        containerClassName="space-y-1"
        placeholder="Enter small decription about category"
      />

      <div className="space-y-3">
        <div className=" px-4 py-2 rounded-md bg-gray-100 flex items-center gap-4">
          <Image src={InfoIcon} alt="info.svg" />
          <p className="text-gray-900 text-sm font-medium">We would suggest to add atleast 3 categories</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {
            watch('categoryGroupItems')?.map((categoryInfo, index) => {
              return (
                <div className="space-y-2 bg-gray-100 p-3 rounded-md" key={index}>
                  <div className="pb-2 flex justify-between items-center">
                    <p className="text-base font-bold text-gray-500 ">Category {index + 1}</p>
                    <Button onClick={() => { handleRemoveCategory(index) }}>
                      <Image src={CloseIcon} alt="close.svg" className="h-5 w-5" />
                    </Button>
                  </div>

                  <SingleSelect
                    control={control}
                    name={`categoryGroupItems.${index}.collection_short_id`}
                    label={<p className="text-sm font-medium">Link To Collection<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    options={collectionOptions}
                    placeholder="Choose collection to show"
                    containerClassName="space-y-1"
                    inputClassName="w-full"
                    searchable={true}
                  />

                  <TextInput
                    name={`categoryGroupItems.${index}.name`}
                    control={control}
                    label={<p className="text-sm font-medium">Category Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    containerClassName="space-y-1"
                    placeholder="Enter Name"
                    rules={{
                      required: 'Please Enter Name'
                    }}
                  />
                  <Uploader
                    listType="picture-text"
                    disabled={categoryInfo?.image ? true : false}
                    multiple={false}
                    action=""
                    shouldUpload={() => false}
                    accept=".jpg, .jpeg, .png"
                    onChange={(fileList) => handleFileChange(index, fileList)}
                    fileList={categoryInfo.image ? [categoryInfo.image] : []}
                  >
                    <div style={{ width: "200px", height: 150 }} className="border rounded-md flex flex-col items-center justify-center">
                      <Image src={UploadIcon} alt="upload.svg" />
                      <p className="text-sm font-semibold text-gray-800">Browse image</p>
                    </div>
                  </Uploader>
                </div>
              )
            })
          }
          <Button
            className="min-h-[350px] flex flex-col gap-1 items-center justify-center border border-primary-300 rounded-md bg-gray-100"
            onClick={handleAddNewCategory}
          >
            <p className="font-medium text-primary-700">Add New Category</p>
            <Image src={PlusIcon} alt="add.svg" className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <div className='flex justify-end gap-3 p-5'>
        <Button variant='secondary' onClick={handleCloseTemplateDetailsModal}>
          Cancel
        </Button>
        {!templateData && <Button variant="primary" onClick={handleSave} isLoading={isCreating}>
          Save
        </Button>
        }
      </div>
    </div>
  )
}

export default CategoryGroupTemplate
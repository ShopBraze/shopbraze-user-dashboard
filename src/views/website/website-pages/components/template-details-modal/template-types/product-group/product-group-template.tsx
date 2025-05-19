import TextInput from "common-components/form-components/text-input/text-input"
import useProductGroupTemplate from "./use-product-group-template"
import Button from "common-components/button/button"
import { convertFirstLetterCapital } from "utils/text-case-transform"
import SingleSelect from "common-components/form-components/single-select/single-select"

type ProductGroupTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const ProductGroupTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: ProductGroupTemplateProps) => {
  const { watch, control, setValue, ProductGroupSubTypeOptions, collectionOptions, handleSave, isCreating, isUpdating } = useProductGroupTemplate({ handleCloseTemplateDetailsModal, page_id, templateData })
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
      <div className="flex gap-10">
        <SingleSelect
          control={control}
          name={`sub_type`}
          label={<p className="text-sm font-medium">Sub Type<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          options={ProductGroupSubTypeOptions}
          placeholder="Select Sub Type"
          containerClassName="w-full space-y-1"
          inputClassName="w-full"
          searchable={true}
          rules={{
            required: 'Sub Type is required!'
          }}
        />
        <SingleSelect
          control={control}
          name={`layout`}
          label={<p className="text-sm font-medium">Layout<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          options={[{ label: "Grid", value: "grid" }, { label: 'Carousel', value: 'carousel' }]}
          placeholder="Select Layout"
          containerClassName="w-full space-y-1"
          inputClassName="w-full"
          searchable={true}
          rules={{
            required: 'Select layout!'
          }}
        />
      </div>

      {watch('sub_type') === 'curated' &&
        <SingleSelect
          control={control}
          name={`collection_short_id`}
          label={<p className="text-sm font-medium">Select Collection<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          options={collectionOptions}
          placeholder="Choose collection to add"
          containerClassName="space-y-1"
          inputClassName="w-full"
          searchable={true}
          rules={{
            required: 'Select Collection!'
          }}
        />
      }

      <div className='flex justify-end gap-3 p-5'>
        <Button variant='secondary' onClick={handleCloseTemplateDetailsModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} isLoading={isCreating || isUpdating}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default ProductGroupTemplate
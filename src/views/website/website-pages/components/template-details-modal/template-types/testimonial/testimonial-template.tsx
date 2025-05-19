import TextInput from "common-components/form-components/text-input/text-input"
import useTestimonialTemplate from "./use-testimonial-template"
import Button from "common-components/button/button"
import { convertFirstLetterCapital } from "utils/text-case-transform"
import SingleSelect from "common-components/form-components/single-select/single-select"
import { Toggle } from "rsuite"


type TestimonialTemplateProps = {
  handleCloseTemplateDetailsModal: () => void
  page_id?: string
  templateData?: WebsitePageTemplate
}

const TestimonialTemplate = ({ handleCloseTemplateDetailsModal, page_id, templateData }: TestimonialTemplateProps) => {
  const { control, setValue, watch, handleSave, isCreating } = useTestimonialTemplate({ handleCloseTemplateDetailsModal, page_id, templateData })
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

      <SingleSelect
        control={control}
        name={`layout`}
        label={<p className="text-sm font-medium">Layout<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        options={[{ label: 'Carousel', value: 'carousel' }]}
        placeholder="Select Layout"
        containerClassName="w-full space-y-1"
        inputClassName="w-full"
        searchable={true}
        rules={{
          required: 'Select layout!'
        }}
      />

      <SingleSelect
        control={control}
        name={`template_settings.sort_by`}
        label={<p className="text-sm font-medium">Sort By</p>}
        options={[{ label: "Product Wise", value: "product_wise" }, { label: 'Testimonial Order', value: 'testimonial_order' }]}
        placeholder="Select a sorting type"
        containerClassName="w-full space-y-1"
        inputClassName="w-full"
        searchable={true}
      />

      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">AutoPlay</p>
        <Toggle checked={watch('template_settings.autoplay')} color="violet" onChange={(checked) => { setValue('template_settings.autoplay', checked) }} />
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

export default TestimonialTemplate
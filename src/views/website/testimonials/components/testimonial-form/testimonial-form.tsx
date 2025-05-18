import TextInput from "common-components/form-components/text-input/text-input"
import useTestimonialForm from "./use-testimonial-form"
import TextAreaInput from "common-components/form-components/text-area-input/text-area-input"
import { DatePicker, Uploader } from "rsuite"
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import Button from "common-components/button/button"

type TestimonialFormProps = {
  testimonial?: TestiominialType
  onUpdateSuccess?: Function
}

const TestimonialForm = ({ testimonial, onUpdateSuccess }: TestimonialFormProps) => {
  const { register, control, watch, setValue, handleProductImagesChange, handleProfilePicChange,
    handleCreate, isCreating, handleRemoveFile, handleUpdate, isUpdating } = useTestimonialForm({ testimonial, onUpdateSuccess })
  return (
    <div className="space-y-2">
      <TextInput
        name="name"
        control={control}
        label={<p className="text-sm font-medium">Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder="Ex: Harsh"
        rules={{
          required: 'Enter customer name',
        }}
      />
      <TextInput
        name="product_code"
        control={control}
        label={<p className="text-sm font-medium">Product Short Id</p>}
        containerClassName="space-y-1"
        placeholder="Ex: Multi Raha"

      />
      <TextInput
        name="city"
        control={control}
        label={<p className="text-sm font-medium">City</p>}
        containerClassName="space-y-1"
        placeholder="Ex: Gurugram"

      />
      <div className="space-y-1">
        <p className="text-sm font-medium">Review Date</p>
        <DatePicker
          block
          value={new Date(watch('review_date'))}
          onChange={(date) => { setValue('review_date', String(date)) }}
        />
      </div>
      <TextInput
        name="rating"
        control={control}
        label={<p className="text-sm font-medium">Rating<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder="Ranging out of 5 e.g:4"
        rules={{
          required: 'Enter product rating',
        }}
      />
      <TextAreaInput
        control={control}
        name="review_text"
        label={<p className="text-sm font-medium">Customer Review<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        rows={2}
        placeholder="Write description about product"
        containerClassName="space-y-1"
        rules={{
          required: 'Enter customer review',
        }}
      />

      <div className="space-y-3">
        <p className="text-sm font-medium">Product Images</p>
        <div className="" >
          <Uploader
            multiple
            listType="picture-text"
            action={''}
            shouldUpload={() => false}
            accept="image/*"
            onChange={handleProductImagesChange}
            fileList={watch('product_images')}
            onRemove={(file) => handleRemoveFile(file, "product_images")}
            disabled={watch('product_images')?.length >= 5 ? true : false}
          >
            <div style={{ width: "100%", height: 120 }} className="space-y-2">
              <Image src={UploadIcon} alt="upload.svg" />
              <p className="text-xs font-semibold text-gray-600">Max 5 files allowed</p>
            </div>
          </Uploader>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <p className="text-sm font-medium">Pofile Picture</p>
        <div className="">
          <Uploader
            multiple
            listType="picture-text"
            action={''}
            shouldUpload={() => false}
            accept="image/*"
            onChange={handleProfilePicChange}
            fileList={watch('profile_pic')}
            onRemove={(file) => handleRemoveFile(file, "profile_pic")}
            disabled={watch('profile_pic')?.length >= 1 ? true : false}
          >
            <div style={{ width: "100%", height: 120 }} className="space-y-2">
              <Image src={UploadIcon} alt="upload.svg" />
              <p className="text-xs font-semibold text-gray-600">Max One file allowed</p>
            </div>
          </Uploader>
        </div>
      </div>

      <div className="flex justify-end">
        {
          testimonial ?
            <Button variant="primary" onClick={handleUpdate} isLoading={isUpdating} disabled={isCreating}>
              Update
            </Button>
            :
            <Button variant="primary" onClick={handleCreate} isLoading={isCreating} disabled={isCreating}>
              Create
            </Button>
        }

      </div>
    </div>
  )
}

export default TestimonialForm
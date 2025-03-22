import Button from "common-components/button/button"
import { DatePicker, Modal, Toggle } from "rsuite"
import useEditCouponModal from "./use-edit-coupon-modal"
import NumberInputV2 from "common-components/form-components/number-input/number-input-v2"
import SingleSelect from "common-components/form-components/single-select/single-select"
import TextInput from "common-components/form-components/text-input/text-input"

type EditCouponModalProps = {
  couponData?: CouponType
  open: boolean
  handleClose: () => void
}

const EditCouponModal = ({ couponData, open, handleClose }: EditCouponModalProps) => {
  const { control, watch, setValue, handleSave, isUpdating } = useEditCouponModal({ couponData, handleClose })
  return (
    <Modal open={open} onClose={handleClose} className='w-[90vw] md:w-[80vw]'>
      <Modal.Header className='border-b border-gray-200 p-5'>
        Edit Coupon Details
      </Modal.Header>
      <Modal.Body className='scrollbar-hide !max-h-[65vh] p-5'>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <TextInput
            name="title"
            control={control}
            label={<p className="text-sm font-medium">Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Enter Title"
            rules={{
              required: 'Enter Title!',
            }}
            disabled
          />
          <TextInput
            name="subtitle"
            control={control}
            label={<p className="text-sm font-medium">Subtitle<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Enter Subtitle"
            rules={{
              required: 'Enter Subtitle!',
            }}
            disabled
          />
          <TextInput
            name="code"
            control={control}
            label={<p className="text-sm font-medium">Coupon Code<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder=""
            rules={{
              required: 'Enter Coupon Code!',
            }}
            disabled
          />
          <SingleSelect
            control={control}
            name="discount_type"
            label={<p className="text-sm font-medium">Discount Type <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            options={[
              { label: "Percentage", value: "percentage" },
              { label: "Fixed", value: "fixed" },
            ]}
            placeholder="Choose discount type..."
            containerClassName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please choose discount type!',
            }}
            disabled
          />
          {
            watch('discount_type') === "percentage" && <>

              <NumberInputV2
                name="discount"
                control={control}
                label={<p className="text-sm font-medium">Percentage Discount<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                containerClassName="space-y-1"
                defaultValue={0}
                max={100}
                min={0}
                rules={{
                  required: 'Discount percentage must be a number',
                }}
                disabled
              />
              <NumberInputV2
                name={`max_discount`}
                control={control}
                label={<p className="text-sm font-medium">Max Discount<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                containerClassName="space-y-1"
                defaultValue={0}
                rules={{
                  required: 'Max discount must be a number!',
                }}
                disabled
              />
            </>
          }

          {
            watch('discount_type') === "fixed" &&
            <div className="col-span-2">
              <NumberInputV2
                name="discount"
                control={control}
                label={<p className="text-sm font-medium">Discount<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                containerClassName="space-y-1"
                placeholder="0"
                defaultValue={0}
                rules={{
                  required: 'Discount must be a number',
                }}
                disabled
              />
            </div>
          }

          <NumberInputV2
            name="min_order_value"
            control={control}
            label={<p className="text-sm font-medium">Min Order Value<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            defaultValue={0}
            rules={{
              required: 'Min Order Value must be a number',
            }}
            disabled
          />
          <div className="space-y-1">
            <p className="text-sm font-medium">Expiry Date<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>
            <DatePicker
              placeholder="dd-mm-yyyy"
              className='w-full'
              value={new Date(watch('expires_at'))}
              onChange={(value) => { setValue('expires_at', String(value)) }}
            />
          </div>
          <NumberInputV2
            name="max_usage"
            control={control}
            label={<p className="text-sm font-medium">Max Usage<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            defaultValue={1000}
            rules={{
              required: 'Max usage Value must be a number',
            }}
            disabled
          />
          <NumberInputV2
            name="per_user_limit"
            control={control}
            label={<p className="text-sm font-medium">Per User Limit</p>}
            containerClassName="space-y-1"
            defaultValue={1}
            rules={{
              required: 'Per user limit must be a number',
            }}
            disabled
          />

          <div className="h-20 flex gap-3 items-center">
            <p className="text-sm font-medium">Fake Timer</p>
            <Toggle checked={watch('fake_expiry_flag')} color="violet" onChange={(checked) => { setValue('fake_expiry_flag', checked) }} />
          </div>

          <div>
            {
              watch('fake_expiry_flag') &&
              <NumberInputV2
                name="fake_expiry_mins"
                control={control}
                label={<p className="text-sm font-medium">Fake Expiry (in Minutes) <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                containerClassName="space-y-1"
                rules={{
                  required: 'Expiry minutes must be a number',
                }}
              />
            }
          </div>

          <div className="pt-5 flex flex-col gap-4">
            <div className="w-full flex gap-3 items-center opacity-50">
              <p className="text-base font-medium">Only Valid For New Customer</p>
              <Toggle checked={watch('only_for_new_customer')} disabled color="violet" onChange={(checked) => { setValue('only_for_new_customer', checked) }} />
            </div>
            <div className="w-full flex gap-3 items-center  cursor-not-allowed opacity-50">
              <p className="text-base font-medium">Global Visibility</p>
              <Toggle checked={watch('globally_visible')} disabled color="violet" onChange={(checked) => { setValue('globally_visible', checked) }} />
            </div>
            <div className="flex w-full  gap-3 items-center">
              <p className="text-base font-medium">Pre Applied on Ad-Link</p>
              <Toggle checked={watch('pre_apply_on_ad')} color="violet" onChange={(checked) => { setValue('pre_apply_on_ad', checked) }} />
            </div>
            <div className="flex w-full  gap-3 items-center">
              <p className="text-base font-medium">Active</p>
              <Toggle checked={watch('is_active')} color="violet" onChange={(checked) => { setValue('is_active', checked) }} />
            </div>
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer className="p-5  flex justify-end">
        <Button variant="primary" onClick={handleSave} isLoading={isUpdating} disabled={isUpdating}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCouponModal
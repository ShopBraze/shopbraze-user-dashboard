import TextInput from 'common-components/form-components/text-input/text-input'
import useAddGenericCoupon from './use-add-generic-coupon'
import SingleSelect from 'common-components/form-components/single-select/single-select'
import NumberInputV2 from 'common-components/form-components/number-input/number-input-v2'
import { DatePicker, Divider, Toggle } from 'rsuite'
import SelectProducts from './select-products/select-products'
import Button from 'common-components/button/button'


const AddGenericCoupons = () => {
  const { control, watch, setValue, selectedProducts, handleSelectedProducts, handleCreateCoupon, isCreating } = useAddGenericCoupon()
  return (
    <div className='p-4 rounded-md bg-[#fff]'>

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
        />
        <SingleSelect control={control}
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
        />
        <div className="space-y-1">
          <p className="text-sm font-medium">Expiry Date<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>
          <DatePicker
            placeholder="dd-mm-yyyy"
            className='w-full'
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

        <div className="pt-5 flex gap-4">
          <div className="w-full flex gap-3 items-center justify-center">
            <p className="text-base font-medium">Only Valid For New Customer</p>
            <Toggle checked={watch('only_for_new_customer')} color="violet" onChange={(checked) => { setValue('only_for_new_customer', checked) }} />
          </div>
          <div className="w-full flex gap-3 items-center justify-center">
            <p className="text-base font-medium">Global Visibility</p>
            <Toggle checked={watch('globally_visible')} color="violet" onChange={(checked) => { setValue('globally_visible', checked) }} />
          </div>
        </div>
        <div className="flex w-full justify-center gap-3 items-center">
          <p className="text-base font-medium">Pre Applied on Ad-Link</p>
          <Toggle checked={watch('pre_apply_on_ad')} color="violet" onChange={(checked) => { setValue('pre_apply_on_ad', checked) }} />
        </div>
      </div>

      <div className="pt-10 space-y-6">
        <Divider className='text-sm font-semibold'>Select Product From Existing Catalogues</Divider>
        <SelectProducts watch={watch} selectedProducts={selectedProducts} handleSelectedProducts={handleSelectedProducts} />
      </div>

      <div className="pt-10 flex justify-end">
        <Button variant='primary' onClick={handleCreateCoupon} isLoading={isCreating} disabled={isCreating}>
          Create Coupon
        </Button>
      </div>

    </div >
  )
}

export default AddGenericCoupons
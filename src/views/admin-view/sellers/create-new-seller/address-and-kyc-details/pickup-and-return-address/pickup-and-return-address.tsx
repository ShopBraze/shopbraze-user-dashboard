import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CreateSellerFormDataType } from '../../types/index.type'
import Button from 'common-components/button/button'
import TextInput from 'common-components/form-components/text-input/text-input'
import MobileNumberInput from 'common-components/form-components/mobile-number-input/mobile-number-input'
import NumberInputV2 from 'common-components/form-components/number-input/number-input-v2'
import { Toggle } from 'rsuite'

type PickupAndReturnAddressProps = {
  control: Control<CreateSellerFormDataType, any>
  watch: UseFormWatch<CreateSellerFormDataType>
  setValue: UseFormSetValue<CreateSellerFormDataType>
}

const defaultPickUpAddress = {
  nickname: "",
  address: "",
  contact_number: "",
  city: "Fatehpur",
  state: "Uttar Pradesh",
  pincode: "",
  landmark: ""
}

const PickupAndReturnAddress = ({ control, watch, setValue }: PickupAndReturnAddressProps) => {

  const handleAddPickUpAddress = () => {
    const currentPickUpAddresses = watch('pickup_address')
    setValue('pickup_address', [...currentPickUpAddresses, defaultPickUpAddress])
  }

  return (
    <div className='p-4 bg-[#fff] rounded-md space-y-5'>
      <Button variant='primary' className='font-semibold text-sm' onClick={handleAddPickUpAddress}>
        Add Pick-Up Address
      </Button>
      <div>
        {
          watch('pickup_address')?.map((_, index) => {
            return (
              <div key={index} className='space-y-5'>
                <div className="flex items-center gap-3">
                  <div className='h-[0.5px] bg-gray-200 w-full' />
                  <h3 className="text-center font-bold whitespace-nowrap">Pick Up Address {index + 1}</h3>
                  <div className='h-[0.5px] bg-gray-200 w-full' />
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-5">
                  <TextInput
                    name={`pickup_address.${index}.nickname`}
                    control={control}
                    label={<p className="text-sm font-medium">Nick Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    containerClassName="space-y-1"
                    placeholder="Enter NickName"
                    rules={{
                      required: 'Please add Nick Name',
                    }}
                  />
                  <TextInput
                    name={`pickup_address.${index}.landmark`}
                    control={control}
                    label={<p className="text-sm font-medium">Address Line 1<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    containerClassName="space-y-1"
                    placeholder="Ex. H.No: 1, Street 112"
                    rules={{
                      required: 'Please add landmark!',
                    }}
                  />
                  <TextInput
                    name={`pickup_address.${index}.address`}
                    control={control}
                    label={<p className="text-sm font-medium">Address Line 2</p>}
                    containerClassName="space-y-1"
                    placeholder="Ex: Nehru Vihar"
                  />
                  <MobileNumberInput
                    control={control}
                    name={`pickup_address.${index}.contact_number`}
                    label={<p className="text-sm font-medium">Contact Number<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    placeholder="Ex: 7352669258"
                    rules={{
                      required: "Contact number is required",
                    }}
                  />
                  <NumberInputV2
                    name={`pickup_address.${index}.pincode`}
                    control={control}
                    label={<p className="text-sm font-medium">Pincode<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    containerClassName="space-y-1"
                    placeholder="Enter Pincode"
                    minLength={6}
                    maxLength={6}
                    rules={{
                      required: 'Please add pincode!',
                    }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Town/City, State<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>
                    <div className="rounded-md p-[7px] bg-[#f7f7fa] border border-gray-200 hover:border-gray-400 text-sm text-gray-600 font-medium ">
                      {watch(`pickup_address.${index}.city`) ? `${watch(`pickup_address.${index}.city`)}/${watch(`pickup_address.${index}.state`)}` : 'Town/City, State'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className='h-[0.5px] bg-gray-200 w-full' />
          <h3 className="text-center font-bold whitespace-nowrap">Return Address </h3>
          <div className='h-[0.5px] bg-gray-200 w-full' />
        </div>


        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Same Return Address</p>
            <Toggle checked={watch('is_same_return_address')} color="green" onChange={(checked) => { setValue('is_same_return_address', checked) }} />
          </div>
          {
            !watch('is_same_return_address') &&
            <TextInput
              name="billing_address.gst_number"
              control={control}
              placeholder="Ex: 09DCTYS6778XPR"
              rules={{
                required: 'Gst Number is required!',
              }}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default PickupAndReturnAddress
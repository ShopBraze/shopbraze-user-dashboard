import React from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CreateSellerFormDataType } from '../../types/index.type'
import TextInput from 'common-components/form-components/text-input/text-input'
import MobileNumberInput from 'common-components/form-components/mobile-number-input/mobile-number-input'
import NumberInputV2 from 'common-components/form-components/number-input/number-input-v2'
import Button from 'common-components/button/button'
import { Toggle } from 'rsuite'
import UploadKYCDetails from './upload-kyc-details/upload-kyc-details'

type BillingAddressAndKycDetailsProps = {
  control: Control<CreateSellerFormDataType, any>
  watch: UseFormWatch<CreateSellerFormDataType>
  setValue: UseFormSetValue<CreateSellerFormDataType>
}

const BillingAddressAndKycDetails = ({ control, watch, setValue }: BillingAddressAndKycDetailsProps) => {
  return (
    <div className='p-4 bg-[#fff] rounded-md space-y-5'>
      <h3 className="text-center font-bold">Billing Address & KYC Details</h3>
      <div className='grid grid-cols-1 gap-2'>
        <TextInput
          name="billing_address.addr_tag_3pl"
          control={control}
          label={<p className="text-sm font-medium">Seller Address Code (3PL)<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          containerClassName="space-y-1"
          placeholder="Ex: 344"
          rules={{
            required: 'Please enter seller address code!',
          }}
        />
        <div className="grid grid-cols-2 gap-y-2 gap-x-5">
          <TextInput
            name="billing_address.company_name"
            control={control}
            label={<p className="text-sm font-medium">Company Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Ex: Nixova"
            rules={{
              required: 'Please add your company name!',

            }}
          />
          <MobileNumberInput
            control={control}
            name="billing_address.contact_number"
            label={<p className="text-sm font-medium">Contact Number<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            placeholder="Ex: 7352669258"
            rules={{
              required: "Contact number is required",
            }}
          />
          <TextInput
            name="billing_address.email"
            control={control}
            label={<p className="text-sm font-medium">E-mail</p>}
            containerClassName="space-y-1"
            placeholder="Ex: radheshyamnitj@gmail.com"
          />
          <TextInput
            name="billing_address.address"
            control={control}
            label={<p className="text-sm font-medium">Address<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            sme="space-y-1"
            placeholder="Ex: Street 114 , Patna"
            rules={{
              required: 'Please enter address!',
              minLength: {
                value: 20,
                message: 'Address should be at least 20 character long',
              },
            }}
          />
          <NumberInputV2
            name="billing_address.pincode"
            control={control}
            label={<p className="text-sm font-medium">Pincode<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Ex: 132023"
            minLength={6}
            maxLength={6}
            rules={{
              required: 'Please add pincode!',
            }}
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">Town/City, State<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>
            <div className="rounded-md p-[7px] bg-[#f7f7fa] border border-gray-200 hover:border-gray-400 text-sm text-gray-600 font-medium ">
              {watch('billing_address.city') ? `${watch('billing_address.city')}/${watch('billing_address.state')}` : 'Town/City, State'}
            </div>
          </div>

          <TextInput
            name="billing_address.pan_number"
            control={control}
            label={<p className="text-sm font-medium">PAN</p>}
            containerClassName="space-y-1"
            placeholder="Ex: KRDEL1243C"
          />
          <div className='pt-5'>
            <UploadKYCDetails watch={watch} setValue={setValue} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">GST Number</p>
              <Toggle checked={watch('is_gst')} color="green" onChange={(checked) => { setValue('is_gst', checked) }} />
            </div>
            {
              watch('is_gst') ?
                <TextInput
                  name="gst_number"
                  control={control}
                  placeholder="Ex: 09DCTYS6778XPR"
                  rules={{
                    required: 'Gst Number is required!',
                  }}
                />
                : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingAddressAndKycDetails
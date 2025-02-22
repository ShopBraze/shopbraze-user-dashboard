import { Control } from "react-hook-form"
import { CreateSellerFormDataType } from "../types/index.type"
import TextInput from "common-components/form-components/text-input/text-input"
import SingleSelect from "common-components/form-components/single-select/single-select"
import MobileNumberInput from "common-components/form-components/mobile-number-input/mobile-number-input"
import TextAreaInput from "common-components/form-components/text-area-input/text-area-input"
import CheckBoxGroup from "common-components/form-components/checkbox/checkbox-group"


type BasicDetailsProps = {
  control: Control<CreateSellerFormDataType, any>
}

const BasicDetails = ({ control }: BasicDetailsProps) => {
  return (
    <div className="p-4 bg-[#fff] rounded-md">
      <div className='grid grid-cols-1 gap-2'>
        <div className="grid grid-cols-2 gap-y-2 gap-x-5">
          <TextInput
            name="display_name"
            control={control}
            label={<p className="text-sm font-medium">Display Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Enter display name"
            rules={{
              required: 'Please enter display name!',
              minLength: {
                value: 4,
                message: 'Display Name should be at least 5 character long',
              },
            }}
          />
          <SingleSelect control={control}
            name="seller_type"
            label={<p className="text-sm font-medium">Type of Seller <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            options={[
              { label: "ECOM", value: "ecom" },
              { label: "LIVE", value: "live" },
              { label: "SELF", value: "self" },
              { label: "SERVE", value: "serve" },
            ]}
            placeholder="Choose seller type..."
            containerClassName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please chhose seller type!',
            }}
          />
          <TextInput
            name="first_name"
            control={control}
            label={<p className="text-sm font-medium">First Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Enter first name"
            rules={{
              required: 'Please enter your first name!',
              minLength: {
                value: 5,
                message: 'Name should be at least 5 character long',
              },
            }}
          />
          <TextInput
            name="last_name"
            control={control}
            label={<p className="text-sm font-medium">Last Name</p>}
            containerClassName="space-y-1"
            placeholder="Enter last name"
          />
        </div>
        <TextInput
          name="preferred_web_prefix"
          control={control}
          label={<p className="text-sm font-medium">Web Prefix</p>}
          containerClassName="space-y-1"
          placeholder="Enter web prefix"
        />
        <div className="grid grid-cols-2 gap-y-2 gap-x-5">
          <TextInput
            name="email"
            control={control}
            label={<p className="text-sm font-medium">E-mail<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Enter your email"
            rules={{
              required: 'Email is required!',
            }}
          />
          <MobileNumberInput
            control={control}
            name="contact_number"
            label={<p className="text-sm font-medium">Contact Number<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            placeholder="Ex: 7352669258"
            rules={{
              required: "Contact number is required",
            }}
          />
          <MobileNumberInput
            control={control}
            name="whatsapp_number"
            label={<p className="text-sm font-medium">Whatsapp Number</p>}
            placeholder="Ex: 7352669258"
          />
          <MobileNumberInput
            control={control}
            name="additional_login_number"
            label={<p className="text-sm font-medium">Additional Login No</p>}
            placeholder="Enter additional login number"
          />
        </div>
        <TextAreaInput
          control={control}
          name="description"
          label={<p className="text-sm font-medium">Description</p>}
          rows={2}
          placeholder="Enter Description"
          containerClassName="pt-4 space-y-1"
        />
        <CheckBoxGroup
          name="settings.payment_mode"
          options={[{ label: 'Online', value: 'online' }, { label: 'COD', value: 'cod' }, { label: 'Partial COD', value: 'partial-cod' }]}
          control={control}
          label={<span className="text-sm font-medium">Payment Modes</span>}
          containerClassName="space-y-1"
        />
      </div>
    </div>
  )
}

export default BasicDetails
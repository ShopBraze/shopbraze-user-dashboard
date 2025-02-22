import React from 'react'
import BillingAddressAndKycDetails from './billing-address-and-kyc-details/billing-address-and-kyc-details'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CreateSellerFormDataType } from '../types/index.type'
import PickupAndReturnAddress from './pickup-and-return-address/pickup-and-return-address'

type AddressAndKycDetailsProps = {
  control: Control<CreateSellerFormDataType, any>
  watch: UseFormWatch<CreateSellerFormDataType>
  setValue: UseFormSetValue<CreateSellerFormDataType>
}

const AddressAndKycDetails = ({ control, watch, setValue }: AddressAndKycDetailsProps) => {
  return (
    <div className="space-y-4">
      <BillingAddressAndKycDetails control={control} watch={watch} setValue={setValue} />
      <PickupAndReturnAddress control={control} watch={watch} setValue={setValue} />
    </div>
  )
}

export default AddressAndKycDetails
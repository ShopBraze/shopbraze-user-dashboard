import React from 'react'
import { UseFormWatch } from 'react-hook-form'
import { CreateSellerFormDataType } from '../types/index.type'

type VerifyAndSaveProps = {
  watch: UseFormWatch<CreateSellerFormDataType>
}

const VerifyAndSave = ({ watch }: VerifyAndSaveProps) => {
  return (
    <div className='space-y-5'>

      {/* ---------------Billing Address------------------ */}
      <div className="p-4 bg-[#fff] rounded-md">
        <div className="space-y-5">
          <h3 className="text-center font-bold">Basic Details</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Display Name</p>
              <p className="text-xs text-gray-700 font-medium">{watch('display_name')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">First Name</p>
              <p className="text-xs text-gray-700 font-medium">{watch('first_name')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Email</p>
              <p className="text-xs text-gray-700 font-medium">{watch('email')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Contact Number</p>
              <p className="text-xs text-gray-700 font-medium">{watch('contact_number')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Type of Seller</p>
              <p className="text-xs text-gray-700 font-medium">{watch('seller_type')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Payment Modes 1</p>
              <p className="text-xs text-gray-700 font-medium">{watch('settings.payment_mode')?.[0]}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Payment Modes 2</p>
              <p className="text-xs text-gray-700 font-medium">{watch('settings.payment_mode')?.[1]}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Payment Modes 3</p>
              <p className="text-xs text-gray-700 font-medium">{watch('settings.payment_mode')?.[2]}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Seller Address Code (3PL)</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.addr_tag_3pl')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------Billing Address------------------ */}
      <div className="p-4 bg-[#fff] rounded-md">
        <div className="space-y-5">
          <h3 className="text-center font-bold">Billing Address</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Contact Number</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.contact_number')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Address</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.address')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">City</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.city')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">State</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.state')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-medium text-gray-900">Pincode</p>
              <p className="text-xs text-gray-700 font-medium">{watch('billing_address.pincode')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------Pickup Addresses------------------ */}
      {
        watch('pickup_address')?.map((pickupData, index) => {
          return (
            <div className="p-4 bg-[#fff] rounded-md">
              <div className="space-y-5">
                <h3 className="text-center font-bold">Pickup Address {index + 1}</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">Nick Name</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData?.nickname}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">Address Line 1</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData?.landmark}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">Pincode</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData?.pincode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">City</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData.city}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">State</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData.state}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-gray-900">Contact Number</p>
                    <p className="text-xs text-gray-700 font-medium">{pickupData.contact_number}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default VerifyAndSave